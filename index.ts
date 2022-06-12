// this shim is required
import { createExpressServer } from "routing-controllers";
import { CasesController } from "./CasesControlller";
import { EventEmitter } from "events";
// creates express app, registers all controller routes and returns you express app instance

const emitter = new EventEmitter();
emitter.setMaxListeners(100);

const app = createExpressServer({
  cors: true,
  controllers: [CasesController], // we specify controllers we want to use
});

const PORT = process.env.PORT || 8000;

// run express application on port 8000
app.listen(PORT, () => {
  console.log("Running.... on port ", PORT);
});
