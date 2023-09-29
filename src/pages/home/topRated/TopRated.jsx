import { useState } from "react";
import {
  Carousel,
  SwitchTabs,
  UseFetch,
  Wrapper
} from "../../index"

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie")

  const { data, loading } = UseFetch(`/${endpoint}/top_rated`)

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv")
  };

  return (
    <div className='carouselSection'>
      <Wrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs
          data={["Movies", "Tv Shows"]}
          onTabChange={onTabChange}
        />
      </Wrapper>
      <Carousel
        data={data?.results}
        loading={loading}
      />
    </div>
  )
};

export default TopRated;
