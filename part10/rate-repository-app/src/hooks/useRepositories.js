import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (filter) => {
  let variables;
  switch (filter) {
    case "lastest":
      variables = { orderBy: "CREATED_AT", orderDirection: "DESC" };
      break;
    case "DESC":
      variables = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      break;
    case "ASC":
      variables = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      break;
    default:
      variables = {};
  }

  const { data } = useQuery(GET_REPOSITORIES, {
    variables: variables,
    fetchPolicy: "cache-and-network",
  });
  return {
    repositories: data ? data.repositories : undefined,
  };
};

export default useRepositories;
