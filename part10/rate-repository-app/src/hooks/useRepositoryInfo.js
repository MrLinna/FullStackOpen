import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
  const { loading, error, data, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const repository = data?.repository;
  const reviews = data?.repository.reviews.edges;

  return {
    repository,
    reviews,
    error,
    loading,
    ...result,
  };
};

export default useRepository;
