import express from 'express';
import mongoose from 'mongoose';
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import session from "express-session";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import EnrollmentsRoutes from './Kanbas/Enrollments/routes.js';
import "dotenv/config";

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/kanbas-cs5610-fa24"
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(
    cors({
      credentials: true,
      origin: process.env.NETLIFY_URL || "http://localhost:3000",
      
    })
   );
   
app.use(express.json());

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.NODE_SERVER_DOMAIN,
    };
  }
  //for each request that comes in check to see if there is a cookie {cookie:sessionObject} during time of request
  //if there is a cookie check to see if already instantiated an session object because for every cookie there is a session object created
  // if it doesnt exist add the new object to the request by the time u get to the req u have a bew session
  //used to remember current user
  app.use(
    session(sessionOptions)
  );
  
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);

Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running');
});

