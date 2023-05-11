import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (values) => {
    const userName = values.UserName;
    const repositoryName = values.RepoName;
    const rating = +values.Rating;
    const review = values.Review;

    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName: userName,
            repositoryName: repositoryName,
            rating: rating,
            text: review,
          },
        },
      });
      return data;
    } catch (error) {
      console.log("usecreatereview.js", error.graphQLErrors[0].message);
    }
  };
  return [createReview, result];
};
export default useCreateReview;
