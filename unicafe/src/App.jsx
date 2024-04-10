import { useState } from "react";

const StatsLine = ({ text, value }) => {
  return (
    <div>
      {text}: {value}
    </div>
  );
};

const Stats = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const averageScore = (good - bad) / totalFeedback || 0;
  const positivePercentage = (good / totalFeedback) * 100 || 0;

  if (totalFeedback === 0) {
    return <>give some feedback ^</>;
  }
  return (
    <>
      <h3>stats: </h3>
      <StatsLine text="good" value={good}></StatsLine>
      <StatsLine text="neutral" value={neutral}></StatsLine>
      <StatsLine text="bad" value={bad}></StatsLine>
      <div style={{ marginBottom: "10px" }}></div>
      <StatsLine text="total feedback" value={totalFeedback}></StatsLine>
      <StatsLine text="average score" value={averageScore.toFixed(2)}></StatsLine>
      <StatsLine text="positive percentage" value={positivePercentage.toFixed(1)}></StatsLine>

    </>
  );
};
const Button = ({ handleClick, label }) => {
  return <button onClick={handleClick}>{label}</button>;
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback:</h1>
      <Button handleClick={() => setGood(good + 1)} label="good"></Button>
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        label="neutral"
      ></Button>
      <Button handleClick={() => setBad(bad + 1)} label="bad"></Button>
      <div style={{ marginBottom: "50px" }}></div>
      <Stats good={good} neutral={neutral} bad={bad}></Stats>
    </div>
  );
};

export default App;
