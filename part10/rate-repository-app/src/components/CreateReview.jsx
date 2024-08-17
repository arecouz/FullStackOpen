import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import { useFormik } from 'formik';

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
  review: {},
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

const CreateReview = () => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: 0,
    text: '',
  };

  const onSubmit = () => {
    console.log(formik.values);
  };

  const validationSchema = yup.object().shape({
    owner: yup
      .string()
      .min(3, 'Repository Owner name must be equal or greater than 3')
      .required('Repository Owner name is required'),
    name: yup
      .string()
      .min(3, 'Repository Name must be greater than or equal to 3')
      .required('Repository Name is required'),
    rating: yup
      .number()
      .min(0, 'Repository Rating must be 0-100')
      .max(100, 'Repository Rating must be 0-100')
      .required('Repository Rating is required'),
    review: yup
      .string()
      .min(3, 'Repository Review must be greater than or equal to 3'),
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
          formik.touched.ownerName && formik.errors.ownerName && styles.inputError,
        ]}
        autoCapitalize="none"
        placeholder="Repository Owner's Name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('owner')}
      />
      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryName && formik.errors.repositoryName && styles.inputError,
        ]}
        autoCapitalize="none"
        placeholder="Repository Name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('name')}
      />
      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating && styles.inputError,
        ]}
        keyboardType="numeric"
        placeholder="Rating 0-100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      <TextInput
        style={[
          styles.input,
          formik.touched.text && formik.errors.text && styles.inputError,
        ]}
        autoCapitalize="none"
        placeholder="Review"
        value={formik.values.text}
        multiline
        onChangeText={formik.handleChange('review')}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
      <View style={styles.error}>
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
        )}
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
        )}
        {formik.touched.rating && formik.errors.rating && (
          <Text style={styles.errorText}>{formik.errors.rating}</Text>
        )}
        {formik.touched.text && formik.errors.text && (
          <Text style={styles.errorText}>{formik.errors.text}</Text>
        )}
      </View>
    </View>
  );
};

// How do the handle submit even work?

export default CreateReview;
