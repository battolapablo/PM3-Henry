import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize().then((res) => {
  console.log("Conexion a la base de datos realizada con éxito!");
  server.listen(PORT, () => {
    console.log(`Server Listen on ${PORT}`);
  });
});

/* server.listen(PORT, () => {
  console.log(`Server Listen on ${PORT}`);
});
 */
