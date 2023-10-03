import { Carousel, UseFetch } from "../../../pages/index"

const Similar = ({ mediaType, id }) => {
  const { data, loading, error } = UseFetch(`/${mediaType}/${id}/similar`)
  const title = mediaType === "tv" ? "Similar Tv Shows" : "Similar Movies"
  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  )
};

export default Similar;
