import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';


const styles = StyleSheet.create({
  
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
  inputContainerError: {
    backgroundColor:"#FFFFFF",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    shadowColor: theme.colors.error,
    elevation: 15,
  },
  errorText: {
    color:theme.colors.error,
    marginHorizontal: 20,
    marginBottom:10
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
    
    <View style={showError ? styles.inputContainerError :styles.inputContainer }>
      <TextInput 
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      </View>
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};
export default FormikTextInput;