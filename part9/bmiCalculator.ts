export const calculateBmi = (height_cm: number, weight_kg: number): string => {
  const bmi: number = weight_kg / (height_cm / 100) ** 2;
  if (bmi < 18.5) {
    return 'underweight';
  } else if (bmi < 25) {
    return 'normal weight';
  } else if (bmi < 30) {
    return 'overweight';
  } else if (bmi >= 30) {
    return 'Obese';
  } else return 'some error';
};

const parseArgumentsBMI = (args: string[]) => {
  if (args.length !== 4) throw new Error('required arguments: 2');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight)) {
    return { height, weight };
  } else {
    throw new Error('provided values not numbers ');
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArgumentsBMI(process.argv);
    const result = calculateBmi(height, weight);
    console.log(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('unknown error: ', error);
    }
  }
}
