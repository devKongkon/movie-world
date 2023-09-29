
import { HeroBanner, Popular, TopRated, Trending } from '../index'
import './style.scss'

function Home() {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular/>
      <TopRated/>

    </div>
  )
}

export default Home;
