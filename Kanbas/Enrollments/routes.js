import * as enrollmentDao from "./dao.js";
import * as courseDao from "../Courses/dao.js"
export default function EnrollmentsRoutes(app) {

    app.get("/api/enrollments",async (req,res)=>{
        const enrollments = await enrollmentDao.fetchEnrollments();
        res.send(enrollments);
    })

 
}