import { Request, Response } from 'express';
import knex from '../database/connection';

class CommentsController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      review,
      pointId
    } = request.body;

    const trx = await knex.transaction();

    const comment = {
      name,
      email,
      review,
      date: Date.now().toString(),
      point_id: pointId
    };

    const insertedIds = await trx('point_comments').insert(comment);

    await trx.commit();

    return response.json(comment);
  }
}

export default CommentsController;