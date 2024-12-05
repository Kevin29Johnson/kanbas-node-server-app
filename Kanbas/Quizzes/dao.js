import model from "./model.js"

export function createQuiz(quiz) {
    delete quiz._id;  
    return model.create(quiz);
 }

 export function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
  }

  export function updateQuiz(quizId, quizUpdates) {
    return model.updateOne({ _id: quizId }, quizUpdates);
 }

 export function deleteQuiz(quizId){
    return model.deleteOne({ _id: quizId });
 }

 export function findAllQuizzes() {
    return model.find();
  }

  export function publishQuiz(quizId) {
   return model.updateOne({ _id: quizId }, { published: true });
 }
 
 export function unpublishQuiz(quizId) {
   return model.updateOne({ _id: quizId }, { published: false });
 }