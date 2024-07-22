import { Course } from '../types';

const Content = ({ courseParts }: { courseParts: Course[] }) => {
  return (
    <div>
      {courseParts.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}{' '}
        </p>
      ))}
    </div>
  );
};

export default Content;


// TODO: 

// Exercise 9.15
