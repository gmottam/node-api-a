import Knex from 'knex';
export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Wifi', image: 'wifi.svg' },
    { title: 'Estacionamento', image: 'parking.svg' },
    { title: 'Área Fumante', image: 'smoking.svg' },
    { title: 'Massagem', image: 'massage.svg' },
    { title: 'Café', image: 'coffee.svg' },
    { title: 'Espaço Familia', image: 'family.svg' },
  ]);
}