import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import './style.scss'
import { CircleRating, Genres, Img, Wrapper } from '../../pages/index'
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import noPoster from "../../assets/no-poster.png"
import { useRef } from "react";

const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home)

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20)
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }


    return (
        <div className="carousel">
            <Wrapper>
                {title && <div className="carouselTitle">{ title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ?
                    (
                        <div
                            className="carouselItems"
                            ref={carouselContainer}
                        >
                            {data?.map((item) => {
                                const posterUrl = item.poster_path
                                    ? url.poster + item.poster_path
                                    : noPoster
                                return (
                                    <div
                                        key={item.id}
                                        className="carouselItem"
                                        onClick={() =>
                                            navigate(`/${item.media_type || endpoint}/${item.id}`)}
                                    >
                                        <div className="posterBlock">
                                            <Img src={posterUrl} />
                                            <CircleRating rating={item.vote_average.toFixed(1)}
                                            />
                                            <Genres data={item.genre_ids.slice(0, 2)} />
                                        </div>


                                        <div className="textBlock">
                                            <span className="title">
                                                {item.title || item.name}
                                            </span>
                                            <span className="date">
                                                {dayjs(item.release_date || item.first_air_date).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                    :
                    (
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )
                }

            </Wrapper>
        </div>


    )

}
export default Carousel;
