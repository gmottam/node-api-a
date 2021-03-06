import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

  async create(request: Request, response: Response) {
    const {
      image,
      name,
      email,
      whatsapp,
      address,
      city,
      uf,
      items,
      about,
      website,
      tipo,
      preco
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image,
      name,
      email,
      whatsapp,
      address,
      city,
      uf,
      about,
      website,
      tipo,
      preco
    };

    console.log(point);

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id
      }
    });

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({
        messsage: 'Point not found.'
      });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `https://raw.githubusercontent.com/gmottam/node-api-a/master/uploads/${item.image}`
      };
    })

    const comments = await knex('point_comments').where('point_id', id);

    return response.json({ point, serializedItems, comments });
  }

  async index(request: Request, response: Response) {
    const { city, uf, items, tipo } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .where('tipo', String(tipo))
      .distinct()
      .select('points.*');

    console.log(city, uf, items, tipo);

    return response.json(points)
  }

  async indexAll(request: Request, response: Response) {
    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .distinct()
      .select('points.*');
    return response.json(points)
  }

  async indexName(request: Request, response: Response) {
    const { name } = request.query;

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .where('name', 'like', `%${name}%`)
      .distinct()
      .select('points.*');
    return response.json(points)
  }

  async indexNameType(request: Request, response: Response) {
    const { name, tipo } = request.query;

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .where('tipo', String(tipo))
      .where('name', 'like', `%${name}%`)
      .distinct()
      .select('points.*');
    return response.json(points)
  }

  async indexPrice(request: Request, response: Response) {
    const { priceMin, priceMax } = request.query;

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereBetween('preco', [Number(priceMin), Number(priceMax)])
      .distinct()
      .select('points.*');
    return response.json(points)
  }

  async indexPriceType(request: Request, response: Response) {
    const { priceMin, priceMax, tipo } = request.query;

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .where('tipo', String(tipo))
      .whereBetween('preco', [Number(priceMin), Number(priceMax)])
      .distinct()
      .select('points.*');
    return response.json(points)
  }

}

export default PointsController;