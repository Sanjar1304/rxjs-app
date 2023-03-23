import { Course } from "./course";
import { Lesson } from "./lesson";

export interface CourseData{
    course: Course;
    lessons: Lesson[];
}