// this shim is required
import { createExpressServer } from "routing-controllers";
import { UserController } from "./UserController";
import { CasesController } from "./CasesControlller";
import cors from "cors";
// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  cors: true,
  controllers: [UserController, CasesController], // we specify controllers we want to use
});

const PORT = process.env.PORT || 8000;

// run express application on port 8000
app.listen(PORT, () => {
  console.log("Running....");
});
