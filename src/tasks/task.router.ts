import { Router } from "express";

import {createValidator,updateValidator,} from './tasks.validator';
import { taskController } from './task.controller';

export const taskRouter : Router = Router(); 


// Create a default route.
taskRouter.get('/tasks', taskController.getAll);

taskRouter.post(
  '/tasks',
  createValidator,
  taskController.create,
);

taskRouter.put(
  '/tasks',
  updateValidator,
  taskController.update,
);

taskRouter.delete(
    '/tasks',
    taskController.delete,
  );