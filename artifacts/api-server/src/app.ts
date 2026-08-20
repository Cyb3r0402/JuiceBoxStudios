import express, { type Express } from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const studioDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../juice-box-studios/dist/public");
app.use(express.static(studioDist));
app.get(/^(?!\/api(?:\/|$)).*/, (_req, res) => {
  res.sendFile(path.join(studioDist, "index.html"), (error) => {
    if (error && !res.headersSent) {
      res.status(404).send("Studio preview is not built yet.");
    }
  });
});

export default app;
