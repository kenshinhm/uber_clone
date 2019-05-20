import app from "./app";
import { Options } from "graphql-yoga";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND,
  endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = () =>
  console.log(`Server runnig on http://localhost:${PORT}/playground`);

app.start(appOptions, handleAppStart);
