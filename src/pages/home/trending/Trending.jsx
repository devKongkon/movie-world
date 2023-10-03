import { useState } from "react";
import {
  Carousel,
  SwitchTabs,
  UseFetch,
  Wrapper
} from "../../index"
import './style.scss'

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day")

  const { data, loading } = UseFetch(`/trending/movie/${endpoint}`)

  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week")
  };

  return (
    <div className='carouselSection'>
      <Wrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs
          data={["Day", "Week"]}
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

export default Trending;
