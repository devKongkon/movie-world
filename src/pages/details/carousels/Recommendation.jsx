import { Carousel, UseFetch } from "../../../pages/index"

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = UseFetch(
    `/${mediaType}/${id}/recommendations`
  );
  return (
    <Carousel
      title="Recommendation"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
    
  )
}
export default Recommendation;
