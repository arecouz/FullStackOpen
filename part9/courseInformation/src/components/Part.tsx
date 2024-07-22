import { CoursePart } from "../types";
const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case "background":
      return (
        <>
          <hr></hr>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <p>{course.description}</p>
          <p>{course.backgroundMaterial}</p>
        </>
      );
    case "basic":
      return (
        <>
          <hr></hr>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <p>{course.description}</p>
        </>
      );
    case "group":
      return (
        <>
          <hr></hr>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <p>group project count: {course.groupProjectCount}</p>
        </>
      );
    default:
      console.log("ERRRRROR");
  }
};

export default Part;
