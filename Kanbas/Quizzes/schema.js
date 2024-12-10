import mongoose from "mongoose";
// Question Schema
const questionSchema = new mongoose.Schema({
  type: { type: String, enum: ["Multiple Choice", "TrueFalse", "Fill in the Blanks"],  default:"Multiple Choice" },
  title: { type: String, default:""},
  points: { type: Number,default:0},
  text: { type: String,default:""},
  choices: { type: [Object], default: [] },
  correctAnswer: { type: mongoose.Schema.Types.Mixed, default:""},
  isEditing: { type: Boolean, default: false },
});

const quizSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true },
    title: { type: String },
    instructions:{type: String},
    description:{type:String,default:""},
    accessCode:{type: String},
    quizType: { type: String, enum: ["Graded Quiz", "Practice Quiz", "Survey","Ungraded Survey"] },
    availableDate: { type: Date },
    dueDate: { type: Date },
    availableUntil: { type: Date },
    points: { type: Number },
    isMultipleAvailableDates: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    isShuffleAnswers: { type: Boolean, default: false },
    timeLimit: { type: Number, required: true },
    isMultipleAttempts: { type: Boolean, default: false },
    allowedAttempts:{type:Number,default:1},
    showCorrectAnswersDate: { type: Date},
    isOneQuestionAtATime: { type: Boolean, default: false },
    isWebcamRequired: { type: Boolean, default: false },
    isLockQuestionsAfterAnswering: { type: Boolean, default: false },
    assignmentGroup: { type: String,enum: ["Quizzes", "Exams", "Assignments","Project"], default: "Quizzes" },
    viewResponses: { type: String, enum: ["ALWAYS", "NEVER", "AFTER_DUE_DATE"], default: "ALWAYS" },
    requireRespondusLockDownBrowser: { type: Boolean, default: false },
    requiredToViewQuizResults: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    questions: [questionSchema],
  },
  { collection: "quizzes" }
);

export default quizSchema;
