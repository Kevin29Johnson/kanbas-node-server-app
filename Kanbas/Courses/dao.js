import Database from "../Database/index.js";
import model  from "./model.js";
import enrollmentModel from "../Enrollments/model.js"
export function findAllCourses() {
  return model.find();
}
export function createCourse(course) {
  delete course._id;
  return model.create(course);
 
  }
  
  export function deleteCourse(courseId) {
  //   const { courses, enrollments } = Database;
  //   Database.courses = courses.filter((course) => course._id !== courseId);
  //   Database.enrollments = enrollments.filter(
  //     (enrollment) => enrollment.course !== courseId
  // );
  return model.deleteOne({ _id: courseId });


}
  
  export function findCoursesForEnrolledUser(userId) {
    // const enrollments = await enrollmentModel.find({ user: userId }).populate("course");
    // const enrolledCourses = enrollments.map((enrollment) => enrollment.course);
    // return enrolledCourses;
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
  }

  export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, courseUpdates);

    // const { courses } = Database;
    // const course = courses.find((course) => course._id === courseId);
    // Object.assign(course, courseUpdates);
    // return course;
  }
  