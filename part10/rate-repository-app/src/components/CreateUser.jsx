import React from "react";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import SignInTheme from "../SignInTheme";
import * as yup from "yup";
import useCreateUser from "../hooks/useCreateUser";
import { useNavigate } from "react-router-native";
export const ReviewForm = () => {
  const styles = StyleSheet.create({
    buttonContainer: SignInTheme.buttonContainer,
    buttonText: SignInTheme.buttonText,
    input: SignInTheme.input,
  });
  const [createUser] = useCreateUser();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await createUser({
        username: values.username,
        password: values.password,
      });
      if (response) {
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(1, "Username must be longer than 1 character")
      .max(30, "Max length is 30"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters long")
      .max(30, "Maximum length is 50"),
    passwordConfirmation: yup
      .string()

      .required("Password confirmation is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <View>
      <Formik
        initialValues={{ username: "", password: "", passwordConfirmation: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{ backgroundColor: "white" }}>
            <FormikTextInput
              style={styles.input}
              name="username"
              placeholder="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />

            <FormikTextInput
              style={styles.input}
              name="password"
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />

            <FormikTextInput
              style={styles.input}
              name="passwordConfirmation"
              placeholder="password confirmation"
              onChangeText={handleChange("passwordConfirmation")}
              onBlur={handleBlur("passwordConfirmation")}
              value={values.passwordConfirmation}
            />

            <Pressable
              onPress={() => handleSubmit(values)}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ReviewForm;
