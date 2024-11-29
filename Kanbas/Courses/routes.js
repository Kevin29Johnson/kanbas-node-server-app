import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentDao from "../Assignments/dao.js"
import * as enrollmentDao from "../Enrollments/dao.js"
import assignments from "../Database/assignments.js";


export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    dao.deleteCourse(courseId);
    res.sendStatus(204);
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    dao.updateCourse(courseId, courseUpdates);
    res.sendStatus(204);
  });

  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });


  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentDao.findAssignmentsForCourse(courseId);
    console.log("assignments:"+assignments);
    
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = assignmentDao.createAssignment(assignment);
    res.send(newAssignment);
  });

  //unenroll
  app.delete("/api/users/:userId/courses/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
  
    try {
      enrollmentDao.unEnrollUserFromCourse(userId, courseId);
      res.sendStatus(204); // Successfully processed, no content to return
    } catch (error) {
      console.error("Error unenrolling user:", error);
      res.status(500).send("Failed to unenroll user.");
    }
  });
  //enroll
  app.post("/api/users/:userId/courses/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    console.log("ids:"+userId,courseId)
    try {
      enrollmentDao.enrollUserInCourse(userId, courseId);
      res.sendStatus(201); // Successfully created
    } catch (error) {
      console.error("Error enrolling user:", error);
      res.status(500).send("Failed to enroll user.");
    }
  });
  
}

export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database;
  const course = courses.find((course) => course._id === courseId);
  Object.assign(course, courseUpdates);
  return course;
}


export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
  }
  
  