import './style.scss'
import { Wrapper } from "../../pages/index"

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <Wrapper>
        <span className='bigText'>404</span>
        <span className='smallText'>Page not found!</span>
      </Wrapper>
    </div>
  )
};

export default PageNotFound;
