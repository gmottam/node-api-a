import express, { request, response } from 'express';
import knex from './database/connection';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import CommentsController from './controllers/CommentsController';
import UsersController from './controllers/UsersController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();
const commentsController = new CommentsController();
const usersController = new UsersController();


routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.get('/pointsAll', pointsController.indexAll);
routes.get('/pointsName', pointsController.indexName);
routes.get('/pointsNameType', pointsController.indexNameType)
routes.get('/pointsPrice', pointsController.indexPrice)
routes.get('/pointsPriceType', pointsController.indexPriceType)

routes.post('/comments', commentsController.create);

routes.post('/users', usersController.create);
routes.get('/users', usersController.index);

export default routes;