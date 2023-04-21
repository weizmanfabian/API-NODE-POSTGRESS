import app from "./app.js";
import { sequelize } from './database/db.js'
import { Project } from "./models/Project.js";
import { Task } from "./models/Task.js";

const PORT = 5000;

//relations ship start -----------------------------------------------------
Project.hasMany(Task, {
  foreinkey: "projectId",
  sourceKey: "id",
});

Task.belongsTo(Project, { foreinkey: "projectId", targetKey: "id" });
//relations ship end -----------------------------------------------------

const main = async () => {
  try {
    //test database conecction 
    await sequelize.authenticate()
    console.log('Connection has been established successfully.');

    //Hace una sincronización con la base de datos
    await sequelize.sync({ force: false });
    app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`))
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

main();

//https://www.youtube.com/watch?v=3xiIOgYdbiE
//23:00