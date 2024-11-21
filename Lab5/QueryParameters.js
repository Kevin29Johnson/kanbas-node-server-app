export default function QueryParameters(app) {
    app.get("/lab5/calculator", (req, res) => {
      const { a, b, operation } = req.query;
      const numA = parseInt(a);
      const numB = parseInt(b);
  
      let result;
      switch (operation) {
        case "add":
          result = numA + numB;
          break;
        case "subtract":
          result = numA - numB;
          break;
        case "multiply":
          result = numA * numB;
          break;
        case "divide":
          if (numB === 0) {
            return res.status(400).send("Cannot divide by zero.");
          }
          result = numA / numB;
          break;
        default:
          return res.status(400).send("Invalid operation. Use add, subtract, multiply, or divide.");
      }
  
      res.send(result.toString());
    });
  }
  
