import React from 'react';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const SignInForm = () => {
  const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: theme.colors.signInBtn ,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      marginTop: 10,
      marginBottom: 20,
      shadowColor: theme.colors.shadow ,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      color: theme.colors.appBarText,
      fontWeight: theme.fontWeights.bold,
      fontSize: theme.fontSizes.body,
      textAlign: 'center',
    },
    input:{
      fontSize:20
    }
  });
  const [signIn, data] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    await signIn({ username, password });
   
    console.log(data.data.authenticate.accessToken)
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  return (
    <Formik initialValues={{ username: '', password: '' }} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={{ backgroundColor: 'white' }}>
            <FormikTextInput 
              style={styles.input}
              name='username'
              placeholder='Username'
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}/>

            <FormikTextInput 
              style={styles.input}
              name='password'
              placeholder='Password'
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
          
          <Pressable onPress={handleSubmit} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;