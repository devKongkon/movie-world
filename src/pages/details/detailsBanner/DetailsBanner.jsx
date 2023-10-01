import React, { useState } from 'react';
import './style.scss'
import { useParams } from 'react-router-dom';
import { CircleRating, Genres, Img, PosterFallBack, UseFetch, Wrapper } from "../../index"
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { PlayIcon } from '../PlayBtn';

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null)

  const { mediaType, id } = useParams();
  const { data, loading } = UseFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const _genres = data?.genres?.map((g) => g.id)


  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };


  return (
    <div className='detailsBanner'>
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className='backdrop-img'>
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className='opacity-layer'></div>
              <Wrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    )
                      :
                      (
                        <Img
                          className="posterImg"
                          src={PosterFallBack}
                        />
                      )
                    }
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title}(${dayjs(data?.release_date).format("YYYY")})`}
                    </div>
                    <div className="subTitle">
                      {data.tagline}
                    </div>

                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating
                        rating={data?.vote_average?.toFixed(1)}
                      />
                      <div className='playbtn'>
                        <PlayIcon />
                        <span
                          className='text'
                        >
                          Watch Trailer
                        </span>
                      </div>
                    </div>

                    <div className='overview'>
                      <div className='heading'>
                        Overview
                      </div>
                      <div className='description'>
                        {data.overview}
                      </div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className='text bold'>
                            Status: {""}
                          </span>
                          <span className="text">
                            {data.status}
                          </span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className='text bold'>
                            Release Date: {""}
                          </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className='text bold'>
                           Runtime: {""}
                          </span>
                          <span className="text">
                            {toHoursAndMinutes(
                            data.runtime
                          )}
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </Wrapper>
            </React.Fragment>
          )}
        </>
      )
        :
        (
          <div className='detailsBannerSkeleton'>
            <Wrapper>
              <div className='left skeleton'></div>
              <div className='right'>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
              </div>
            </Wrapper>
          </div>
        )}

    </div>
  )
};

export default DetailsBanner;
