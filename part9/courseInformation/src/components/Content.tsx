import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((course) => (
        <div key={course.name}>
          <Part course={course}></Part>
        </div>
      ))}
    </div>
  );
};

export default Content;


