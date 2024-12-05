import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true },
    title: { type: String },
    instructions:{type: String},
    accessCode:{type: String},
    quizType: { type: String, enum: ["Graded Quiz", "Practice Quiz", "Survey","Ungraded Survey"] },
    availableDate: { type: Date },
    dueDate: { type: Date },
    availableUntilDate: { type: Date },
    points: { type: Number },
    isMultipleAvailableDates: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    isShuffleAnswers: { type: Boolean, default: false },
    timeLimit: { type: Number, required: true },
    isMultipleAttempts: { type: Boolean, default: false },
    showCorrectAnswersDate: { type: Date},
    isOneQuestionAtATime: { type: Boolean, default: false },
    isWebcamRequired: { type: Boolean, default: false },
    isLockQuestionsAfterAnswering: { type: Boolean, default: false },
    assignmentGroup: { type: String,enum: ["Quizzes", "Exams", "Assignments","Project"], default: "Quizzes" },
    viewResponses: { type: String, enum: ["ALWAYS", "NEVER", "AFTER_DUE_DATE"], default: "ALWAYS" },
    requireRespondusLockDownBrowser: { type: Boolean, default: false },
    requiredToViewQuizResults: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    published: { type: Boolean, default: false }
  },
  { collection: "quizzes" }
);

export default quizSchema;
