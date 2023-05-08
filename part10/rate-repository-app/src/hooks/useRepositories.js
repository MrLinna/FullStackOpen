import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState(null);

  const { error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      //console.log(data.repositories)
      setRepositories(data.repositories);
    },
  });
  return { repositories, loading, error };
};

export default useRepositories;
