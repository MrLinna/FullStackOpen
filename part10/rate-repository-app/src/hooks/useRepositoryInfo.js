// import { useQuery } from "@apollo/client";
// import { REPO_REVIEWS } from "../graphql/queries";

// const useRepositoryInfo = () => {
//   const [query, result] = useQuery(REPO_REVIEWS, {
//     variables: { id: ID },
//     fetchPolicy: "cache-and-network",
//   });

//   const getData = async ({ ID }) => {
//     const testi = await query({ variables: { id: ID } });
//     console.log("testi", testi);
//   };
//   // const repository = data?.repository;
//   // const reviews = data?.repository.reviews.edges;
//   // console.log("repository in use", repository);
//   // console.log("reviews in use", reviews);
//   // console.log("data in use", data);

//   return [getData, result];
// };

// export default useRepositoryInfo;

import { useQuery } from "@apollo/client";

import { GET_REPOSITORY, REPO_REVIEWS } from "../graphql/queries";

const useRepository = (variables) => {
  const { loading, error, data, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const repository = data?.repository;
  const reviews = data?.repository.reviews.edges;
  console.log("queryssä", repository);

  return {
    repository,
    reviews,
    error,
    loading,
    ...result,
  };
};

export default useRepository;
