import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('usuario').notNullable();
    table.string('senha').notNullable();
    table.string('email').notNullable();
    table.string('cpf_cnpj').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}