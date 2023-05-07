import React from 'react';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';

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
    inputContainer: {
      backgroundColor: theme.colors.appBarText,
      borderRadius: 10,
      marginVertical: 10,
      marginHorizontal: 20,
      padding: 10,
      shadowColor: theme.colors.shadow ,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    input: {
      height: 50,
      color: theme.colors.shadow ,
    }
  });

  const onSubmit = (values) => {
    console.log("Username:", values.username);
    console.log("Password:", values.password);
  };

  return (
    <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={{ backgroundColor: 'white' }}>
          <View style={styles.inputContainer}>
            <FormikTextInput 
              style={styles.input}
              name='username'
              placeholder='Username'
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}/>
          </View>

          <View style={styles.inputContainer}>
            <FormikTextInput 
              style={styles.input}
              name='password'
              placeholder='Password'
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}/>
          </View>

          <Pressable onPress={handleSubmit} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;
