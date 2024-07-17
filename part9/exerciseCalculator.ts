interface ExerciseValues {
  target: number;
  dailyExercise: number[];
}

interface TrainingDescription {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateRating = (average: number): 1 | 2 | 3 => {
  if (average < 1) {
    return 1;
  } else if (average < 2) {
    return 2;
  } else return 3;
};

const calculateRatingDescription = (rating: number) => {
  switch (rating) {
    case 1:
      return 'bad';
    case 2:
      return 'good';
    case 3:
      return 'great!';
  }
};

const calculateExercise = (
  goal: number,
  weeklyExercise: number[]
): TrainingDescription => {
  const periodLength = weeklyExercise.length;
  const totalHours = weeklyExercise.reduce((acc, curr) => acc + curr, 0);
  const average = totalHours / periodLength;
  const trainingDays = weeklyExercise.filter((n) => n != 0).length;
  const success = average >= goal;
  const rating = calculateRating(average);
  const ratingDescription = calculateRatingDescription(rating);
  const target = goal;
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('not enough arguments');

  const areAllNumbers = (arr: string[]): boolean =>
    arr.every((item) => !isNaN(Number(item)));

  if (!areAllNumbers(args.slice(2)))
    throw new Error('arguments need to be all numbers');

  return {
    target: Number(args[2]),
    dailyExercise: args.slice(3).map(Number),
  };
};

try {
  console.log('Exercise Calculation \n');
  let values: ExerciseValues = parseArguments(process.argv);
  console.log(calculateExercise(values.target, values.dailyExercise));
} catch (error: unknown) {
  let errorMessage = 'ERROR \n';
  if (error instanceof Error) {
    errorMessage +=  error.message;
  }
  console.log(errorMessage);
}
