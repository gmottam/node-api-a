import { Request, Response } from 'express';
import knex from '../database/connection';

class UsersController {
  async create(request: Request, response: Response) {
    const {
      usuario,
      senha,
      email,
      cpf_cnpj
    } = request.body;

    const trx = await knex.transaction();

    const user = {
      usuario,
      senha,
      email,
      cpf_cnpj
    };

    const insertedIds = await trx('users').insert(user);

    await trx.commit();

    return response.json(user);
  }

  async index(request: Request, response: Response) {
    const { cpf_cnpj, senha } = request.query;

    const user = await knex('users')
      .where('cpf_cnpj', String(cpf_cnpj))
      .where('senha', String(senha))
      .distinct()
      .select('users.*');

    return response.json(user)
  }
}

export default UsersController;