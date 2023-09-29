import { useState } from "react";
import {
  Carousel,
  SwitchTabs,
  UseFetch,
  Wrapper
} from "../../index"

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie")

  const { data, loading } = UseFetch(`/${endpoint}/popular`)

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv")
  };

  return (
    <div className='carouselSection'>
      <Wrapper>
        <span className="carouselTitle">{ "What's Popular"}</span>
        <SwitchTabs
          data={["Movies", "TV Shows"]}
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

export default Popular;
