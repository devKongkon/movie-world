import { useParams } from 'react-router-dom';
import { Cast, DetailsBanner, Recommendation, Similar, UseFetch, VideoSection } from '../../pages/index'
import './style.scss'


const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = UseFetch(`/${mediaType}/${id}/videos`);
  const {data: credits, loading : creditsLoading} = UseFetch(`/${mediaType}/${id}/credits`);

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={loading} />
      <VideoSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
      
    </div>
  )
};

export default Details;
