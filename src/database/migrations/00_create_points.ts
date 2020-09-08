import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable('points', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('address').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.string('about').notNullable();
    table.string('website').notNullable();
    table.string('tipo').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('points');
}