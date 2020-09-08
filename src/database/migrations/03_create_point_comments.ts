import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable('point_comments', table => {
    table.increments('id').primary();

    table.integer('point_id')
      .notNullable()
      .references('id')
      .inTable('points');

    table.string('date').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('review').notNullable();

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('point_comments');
}