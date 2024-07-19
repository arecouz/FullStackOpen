import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise, ExerciseValues } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({
      error:
        'use the following format: http://localhost:3003/bmi?height=180&weight=75',
    });
  } else {
    res.send({ height, weight, bmi: calculateBmi(height, weight) });
  }
});

app.post('/bmi', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { height, weight } = req.body;
  const bmi = calculateBmi(Number(height), Number(weight));
  res.send({ bmi });
});

app.post('/exercise', (req, res) => {
  const { target, dailyExercise } = req.body as ExerciseValues;
  console.log('target', target);
  console.log('daily exercise', dailyExercise);

  if (!target || !dailyExercise) {
    return res.status(400).json({
      error: 'parameters missing',
    });
  }
  if (isNaN(Number(target))) {
    return res.status(400).json({ error: 'target was not a number' });
  }
  if (
    !Array.isArray(dailyExercise) ||
    dailyExercise.some((item) => isNaN(Number(item)))
  ) {
    return res
      .status(400)
      .json({ error: 'daily_exercises need to be a list of numbers' });
  }

  return res.json(calculateExercise(target, dailyExercise));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const value: number = 1;

console.log(value);
