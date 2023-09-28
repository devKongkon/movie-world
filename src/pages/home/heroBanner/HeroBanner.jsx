import { useEffect, useState } from "react";
import "./style.scss"
import { useNavigate } from "react-router-dom";
import UseFetch from "../../../hook/UseFetch";
import { useSelector } from "react-redux";
import { Img, Wrapper } from '../../index'

const HeroBanner = () => {
  const [background, setBackground] = useState("")
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home)
  const { data, loading } = UseFetch("/movie/upcoming")

  useEffect(() => {
    const bg = url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg)
  }, [data, url.backdrop])

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  const searchQueryHandlerButton = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`)
    }
  }


  return (
    <div className="heroBanner">
     {!loading && <div className="backdrop-img">
        <Img src={background} />
      </div>}
      <div className="opacity-layer"></div>

      <Wrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome. </span>
          <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv shows"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={searchQueryHandlerButton}>Search</button>
          </div>
        </div>
      </Wrapper>

    </div>
  )
};

export default HeroBanner;
