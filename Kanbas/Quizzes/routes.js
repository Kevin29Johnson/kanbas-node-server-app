import * as quizDao from "./dao.js";
export default function QuizRoutes(app){
    app.delete("/api/quizzes/:quizId",async (req, res) => {
        const { quizId } = req.params;
        console.log(quizId);
        
        const status = await quizDao.deleteQuiz(quizId);
        res.send(status);
      });
     
      app.put("/api/quizzes/:quizId", async (req, res) => {
         const { quizId } = req.params;
         const quizUpdates = req.body;
         const status=await quizDao.updateQuiz(quizId, quizUpdates);
         res.send(status);
       });


        // Publish a quiz
  app.put("/api/quizzes/:quizId/publish", async (req, res) => {
    const { quizId } = req.params;
      const status = await quizDao.publishQuiz(quizId);
      res.send(status);
   
  });

  // Unpublish a quiz
  app.put("/api/quizzes/:quizId/unpublish", async (req, res) => {
    const { quizId } = req.params;
      const status = await quizDao.unpublishQuiz(quizId);
      res.send(status);
  });
}