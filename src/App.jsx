import { useEffect } from "react"
import { fetDataFromApi } from "./utils/api"
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from "./features/home/homeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Details,
  Explore,
  Footer,
  Header,
  Home,
  PageNotFound,
  SearchResult
} from "./pages";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home)
  console.log(url)

  useEffect(() => {
    fetchApiConfig();
    genresCall()
  }, [])

  const fetchApiConfig = () => {
    fetDataFromApi("/configuration")
      .then((res) => {

        const url = {
          backdrop : res.images.secure_base_url +  "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original"
        }

        dispatch(getApiConfiguration(url))
      })
  }

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};

    endpoints.forEach((url) => {
      promises.push(fetDataFromApi(`/genre/${url}/list`)
      )
    });

    const data = await Promise.all(promises);
    console.log(data)
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item))
    });

    dispatch(getGenres(allGenres))
  }


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
