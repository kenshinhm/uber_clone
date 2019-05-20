import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "nuber",
  synchronize: true,
  logging: true,
  entities: ["entities/**/*.*"],
  host: process.env.DB_ENDPONT || "localhost",
  port: 5432,
  username: process.env.DB_USERNAME || "jake",
  password: process.env.DB_PASSWORD || "jake"
};

export default connectionOptions;
