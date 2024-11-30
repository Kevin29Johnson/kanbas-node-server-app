import Database from "../Database/index.js";
import model from "./model.js"
export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
  // const { enrollments } = Database;
  // enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export  function unEnrollUserFromCourse(userId, courseId){
  return model.deleteOne({ user:userId, course:courseId });

  // Database.enrollments=Database.enrollments.filter(
  //   (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  // );
}
export function fetchEnrollments(){
  return model.find();
  // return Database.enrollments;
}

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
 }
 export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
 }
 