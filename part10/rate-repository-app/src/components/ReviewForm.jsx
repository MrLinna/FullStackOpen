import React from "react";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import SignInTheme from "../SignInTheme";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

export const ReviewForm = () => {
  const styles = StyleSheet.create({
    buttonContainer: SignInTheme.buttonContainer,
    buttonText: SignInTheme.buttonText,
    input: SignInTheme.input,
  });
  const [createReview] = useCreateReview();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const response = await createReview(values);
      if (response) {
        //const id = response.createReview.id;

        navigate(`/`);
        // navigate(`/repositoryinfo/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.object().shape({
    UserName: yup.string().required("Repository owner name is required"),
    RepoName: yup.string().required("Repository name is required"),
    Rating: yup
      .number()
      .typeError("Rating should be a number between 0 and 100")
      .required("Rating is required")
      .min(0)
      .max(100),
    Review: yup.string(),
  });

  return (
    <View>
      <Formik
        initialValues={{ UserName: "", RepoName: "", Rating: "", Review: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{ backgroundColor: "white" }}>
            <FormikTextInput
              style={styles.input}
              name="UserName"
              placeholder="Repository owner name"
              onChangeText={handleChange("UserName")}
              onBlur={handleBlur("UserName")}
              value={values.UserName}
            />

            <FormikTextInput
              style={styles.input}
              name="RepoName"
              placeholder="Repository name"
              onChangeText={handleChange("RepoName")}
              onBlur={handleBlur("RepoName")}
              value={values.RepoName}
            />

            <FormikTextInput
              style={styles.input}
              name="Rating"
              placeholder="Rating between 0 and 100"
              onChangeText={handleChange("Rating")}
              onBlur={handleBlur("Rating")}
              value={values.Rating}
            />

            <FormikTextInput
              style={styles.input}
              name="Review"
              placeholder="Review"
              onChangeText={handleChange("Review")}
              onBlur={handleBlur("Review")}
              value={values.Review}
            />

            <Pressable
              onPress={() => handleSubmit(values)}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ReviewForm;
