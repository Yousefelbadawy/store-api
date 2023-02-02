import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import * as userhandler from "./handlers/userhandler"
import * as productsController  from "./controllers/productsController";
import * as ordersController  from "./controllers/ordersControllers";
import * as usersController  from "./controllers/usersController";

dotenv.config();
const PORT = process.env.PORT || 3333;

// create an instance server
const app: Application = express();

app.use(express.json());

// HTTP request logger middleware
app.use(morgan("dev"));

// add routing for / path
app.get("/", (req: Request, res: Response): void => {
  res.json({
    message: "Welcome ",
  });
});
// start the  server
app.listen(PORT, (): void => {
  console.log(`Server is starting at port:${PORT}`);
});


//users

export default app;
app.get("/users",  usersController.index);
app.get("/users/:productId",usersController.read);
app.post("/handlers", userhandler.create);
app.put("/users/:userId", usersController.update);


//products
app.get("/products",  productsController.index);
app.get("/products/:productId",productsController.read);
app.post("/products",productsController.create);
app.put("/products/:productId", productsController.update);



//orders
app.get("/orders",  ordersController.index);
app.get("/orders/:productId",ordersController.read);
app.post("/orders",ordersController.create);
app.put("/orders/:ordersId", ordersController.update);


