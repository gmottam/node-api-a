import Knex from 'knex';
export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Ambientes Climatizados', image: 'Ambientes_climatizados.svg' },
    { title: 'Area Fumantes', image: 'Area_Fumantes.svg' },
    { title: 'Aulas Especializadas', image: 'Aulas_Especializadas.svg' },
    { title: 'Deficientes Fisicos', image: 'Deficientes_Fisicos.svg' },
    { title: 'Esatcionamento', image: 'Esatcionamento.svg' },
    { title: 'Guarda Volumes', image: 'Guarda_Volumes.svg' },
    { title: 'Lanchonete', image: 'Lanchonete.svg' },
    { title: 'Nutricionista', image: 'Nutricionista.svg' },
    { title: 'Personal Trainner', image: 'Personal_Trainner.svg' },
    { title: 'Piscina', image: 'Piscina.svg' },
    { title: 'Quadra', image: 'Quadra.svg' },
    { title: 'Vestiarios', image: 'Vestiarios.svg' },
    { title: 'Wifi', image: 'Wifi.svg' },
    { title: 'Workshop', image: 'Workshop.svg' }
  ]);
}