export interface Course {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBasic extends Course {
  description: string;
  kind: 'basic';
}

export interface CoursePartGroup extends Course {
  groupProjectCount: number;
  kind: 'group';
}

export interface CoursePartBackground extends Course {
  description: string;
  backgroundMaterial: string;
  kind: 'background';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground;
