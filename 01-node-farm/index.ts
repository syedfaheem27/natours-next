import { IncomingMessage, Server, ServerResponse } from "http";
import { placeholder } from "./types/placeholders";
import { fillTemplate } from "../utils/fill-template";
import { fruit } from "./types/fruit";

const fs = require("fs");
const http = require("http");
const url = require("url");

const basePath = `${__dirname}/../../01-node-farm`;

//Reading dev-data
export const data = fs.readFileSync(`${basePath}/dev-data/data.json`, "utf-8");
export const productCardTemplate = fs.readFileSync(
  `${basePath}/templates/product-card.template.html`,
  "utf-8"
);
export const overviewTemplate = fs.readFileSync(
  `${basePath}/templates/overview.template.html`,
  "utf-8"
);

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
  http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log(url.parse(req.url));

    const pathName = req.url;

    if (pathName === "/" || pathName === "/overview") {
      let fruits = JSON.parse(data) as fruit[];
      let cards = fruits
        .map((fruit) => fillTemplate(productCardTemplate, fruit))
        .join("");
      const overviewPage = overviewTemplate.replace("{%PRODUCT_CARDS%}", cards);

      res.writeHead(200, {
        "Content-type": "text/html",
      });
      res.end(overviewPage);
    } else if (pathName === "/products")
      res.end("Welcome to the products page");
    else if (pathName === "/api") {
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(data);
    } else {
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.end("<h1>Page not found!</h1>");
    }
  });

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is listening on port 8000");
});
