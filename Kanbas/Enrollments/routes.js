import * as enrollmentDao from "./dao.js";
export default function EnrollmentsRoutes(app) {

    app.get("/api/enrollments",(req,res)=>{
        const enrollments = enrollmentDao.fetchEnrollments();
        res.send(enrollments);
    })
  
}