import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export  function unEnrollUserFromCourse(userId, courseId){
  Database.enrollments=Database.enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
}
export function fetchEnrollments(){
  return Database.enrollments;
}