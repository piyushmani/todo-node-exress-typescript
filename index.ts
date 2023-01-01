import express, { Express } from 'express';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import { DataSource } from 'typeorm';
import { Task } from './src/tasks/task.entity';
import { taskRouter } from './src/tasks/task.router';

const app: Express = express();
dotenv.config()
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [Task],
    synchronize: true,
  });

AppDataSource.initialize()
  .then(() => {
    // Start listenting to the requests on the defined port
    app.listen(port);
    console.log('Data Source has been initialized!');
    console.log(`App is running on port ${port} !`);
  })
  .catch((err) => {
    console.error(
      'Error during Data Source initialization',
      err,
    );
  });

app.use("/", taskRouter)  
 



