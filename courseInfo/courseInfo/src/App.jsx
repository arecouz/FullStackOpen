const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Content = ({ parts }) => {
  console.log(parts);
  return parts.map((part) => (
    <p key={part.id}>
      {part.name}: {part.exercises}
    </p>
  ));
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <h5>total excercises: {total}</h5>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
      <p> ---------------------------------- </p>
    </>
  );
};

const AllCourses = ({ courses }) => {
  console.log(courses);
  return courses.map((course) => (
    <Course key={course.id} course={course}></Course>
  ));
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <AllCourses courses={courses} />
    </div>
  );
};

export default App;
