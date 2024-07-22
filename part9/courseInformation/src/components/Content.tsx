import { Course } from '../types';

const Content = ({ courseParts }: { courseParts: Course[] }) => {
  return (
    <>
      {courseParts.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}{' '}
        </p>
      ))}
    </>
  );
};

export default Content;
