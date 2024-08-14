import { Pressable, View, Text, TextInput, StyleSheet} from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 25,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    margin: 3,
  },
  inputError: { borderColor: 'red' },
  button: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    marginTop: 17,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: theme.fontSizes.body,
  },
  error: { margin: 5 },
  errorText: { color: 'red', fontSize: theme.fontSizes.body },
});

const SignInContainer = ({onSubmit}) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, 'username must be equal or greater than 3')
      .required('username is required'),
    password: yup
      .string()
      .min(3, 'password must be greater than or equal to 3')
      .required('password required'),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username &&
            formik.errors.username &&
            styles.inputError,
        ]}
        autoCapitalize="none"
        placeholder="username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={[
          styles.input,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
        ]}
        secureTextEntry
        autoCapitalize="none"
        placeholder="password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
      <View style={styles.error}>
        {formik.touched.username && formik.errors.username && (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        )}
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}
      </View>
    </View>
  );
};

export default SignInContainer;
