import express, { Router } from 'express';
import * as controller from '../controllers/task.controller'
import * as TaskValidate from "../../validates/task.validate";

const router: Router = express.Router();

router.get('/', controller.index)

router.get('/detail/:id', controller.detail)

router.patch("/change-status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)

router.post("/create", TaskValidate.createPost, controller.create) 

router.patch("/edit/:id", TaskValidate.createPost ,controller.edit) 

router.patch("/delete/:id" ,controller.deleteTask) 

router.patch("/delete-multi" ,controller.deleteMulti) 

export const taskRoutes: Router = router;