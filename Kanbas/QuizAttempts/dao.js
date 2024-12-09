import Attempt from './model.js';
import Quiz from '../Quizzes/model.js';
import * as  userDao from "../Users/dao.js"
const calculateScore = (quiz, userAnswers) => {
  let score = 0;
  const questionsMap = {};
 console.log("USER ANSWERS"+JSON.stringify(userAnswers))
  quiz.questions.forEach((q) => {
    questionsMap[q._id.toString()] = q;
  });

  userAnswers.forEach((userAns) => {
    const question = questionsMap[userAns.questionId];
    if (!question) return;

    let correct = false;
    switch (question.type) {
      case 'Multiple Choice':
        const correctChoice = question.choices.find(ch => ch.isCorrect);
        if (correctChoice && userAns.answer === correctChoice.text) {
          correct = true;
        }
        break;
      case 'TrueFalse':
        console.log("USER ANSWER"+userAns.answer);
        const userBool = (userAns.answer.toLowerCase() === 'true');
        if (userBool === question.correctAnswer) {
            console.log("in case of TRue of false");
            
          correct = true;
        }
        break;
      case 'Fill in the Blanks':
        if (question.correctAnswers.includes(userAns.answer)) {
          correct = true;
        }
        break;
    }

    if (correct) {
      score += question.points;
    }
  });

  return score;
};

export const createOrUpdateAttempt = async (userId, quizId, answers) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new Error('Quiz not found');
  }

  // Fetch the current attempt if any
  const existingAttempt = await Attempt.findOne({ userId, quizId });
  let attemptCount = 1;

  if (existingAttempt) {
    attemptCount = existingAttempt.attemptCount + 1;
  }

  const currentUser=await userDao.findUserById(userId)
  console.log("user"+currentUser.role);
  
  if(currentUser.role=="STUDENT")
{ // Check if user is allowed to attempt again
    if (attemptCount > quiz.allowedAttempts) {
      // User has exceeded the allowed attempts
      const error = new Error('No more attempts allowed. You have reached the maximum of ${quiz.allowedAttempts} attempt(s).');
      error.name = 'MaxAttemptsExceededError';
      throw error;
    }
 }
  
  const score = calculateScore(quiz, answers);

  return await Attempt.findOneAndUpdate(
    { userId, quizId },
    { userId, quizId, answers, score, timestamp: new Date(), attemptCount },
    { new: true, upsert: true }
  );
};

export const findAttemptByUserAndQuiz = async (userId, quizId) => {
  return await Attempt.findOne({ userId, quizId });
};

export const findAttemptScore = async (userId, quizId) => {
  const attempt = await Attempt.findOne({ userId, quizId });
  if (!attempt) {
    throw new Error('Attempt not found');
  }
  return attempt.score;
};