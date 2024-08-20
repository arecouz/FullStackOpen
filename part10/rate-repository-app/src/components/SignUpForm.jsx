import { Pressable, View, Text, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphQl/mutation';
import { useNavigate } from 'react-router-native';
import { ActivityIndicator } from 'react-native';

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

const SignUpForm = () => {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    password: '',
    passwordConformation: '',
  };

  const onSubmit = async () => {
    try {
      const user = {
        username: formik.values.username,
        password: formik.values.password,
      };
      console.log(user);
      await createUser({ variables: { user } });
      await signIn(user);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
    console.log(data);
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, 'Username too short')
      .max(30, 'Username too long')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'Password too short')
      .max(30, 'Password too long')
      .required('Password is required'),
    passwordConformation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords do not match')
      .required('Password confirmation is required'),
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
      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConformation &&
            formik.errors.passwordConformation &&
            styles.inputError,
        ]}
        secureTextEntry
        autoCapitalize="none"
        placeholder="confirm password"
        value={formik.values.passwordConformation}
        onChangeText={formik.handleChange('passwordConformation')}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <View style={styles.error}>
        {formik.touched.username && formik.errors.username && (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        )}
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}
        {formik.touched.passwordConformation &&
          formik.errors.passwordConformation && (
            <Text style={styles.errorText}>
              {formik.errors.passwordConformation}
            </Text>
          )}
        {loading && <ActivityIndicator />}
        {error && formik.touched.username && (
          <Text style={styles.errorText}>{error.message}</Text>
        )}
      </View>
    </View>
  );
};

export default SignUpForm;
