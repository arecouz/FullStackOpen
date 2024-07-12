const calculateBmi = (height_cm: number, weight_kg: number): string => {
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

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
