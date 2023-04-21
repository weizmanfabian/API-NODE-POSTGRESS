import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('projectsdb', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
})

