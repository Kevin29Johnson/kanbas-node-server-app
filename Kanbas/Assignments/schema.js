import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    due_date:String,
    available_date:String,
    points:Number,
    description: String
  },
  { collection: "assignments" }
);
export default schema;