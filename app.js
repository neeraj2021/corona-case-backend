"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this shim is required
const routing_controllers_1 = require("routing-controllers");
const UserController_1 = require("./UserController");
const CasesControlller_1 = require("./CasesControlller");
const events_1 = require("events");
// creates express app, registers all controller routes and returns you express app instance
const emitter = new events_1.EventEmitter();
emitter.setMaxListeners(100);
const app = (0, routing_controllers_1.createExpressServer)({
    cors: true,
    controllers: [UserController_1.UserController, CasesControlller_1.CasesController], // we specify controllers we want to use
});
const PORT = process.env.PORT || 8000;
// run express application on port 8000
app.listen(PORT, () => {
    console.log("Running.... on port ", PORT);
});
