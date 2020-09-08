import { Request, Response } from 'express';
import knex from '../database/connection';

class UsersController {
  async create(request: Request, response: Response) {
    const {
      usuario,
      senha,
      email
    } = request.body;

    const trx = await knex.transaction();

    const user = {
      usuario,
      senha,
      email
    };

    const insertedIds = await trx('users').insert(user);

    await trx.commit();

    return response.json(user);
  }

  async index(request: Request, response: Response) {
    const { usuario, senha } = request.query;

    const user = await knex('users')
      .where('usuario', String(usuario))
      .where('senha', String(senha))
      .distinct()
      .select('users.*');

    return response.json(user)
  }
}

export default UsersController;