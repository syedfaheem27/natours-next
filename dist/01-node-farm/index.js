"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overviewTemplate = exports.productCardTemplate = exports.data = void 0;
const fill_template_1 = require("../utils/fill-template");
const fs = require("fs");
const http = require("http");
const url = require("url");
const basePath = `${__dirname}/../../01-node-farm`;
//Reading dev-data
exports.data = fs.readFileSync(`${basePath}/dev-data/data.json`, "utf-8");
exports.productCardTemplate = fs.readFileSync(`${basePath}/templates/product-card.template.html`, "utf-8");
exports.overviewTemplate = fs.readFileSync(`${basePath}/templates/overview.template.html`, "utf-8");
const server = http.createServer((req, res) => {
    console.log(url.parse(req.url));
    const pathName = req.url;
    if (pathName === "/" || pathName === "/overview") {
        let fruits = JSON.parse(exports.data);
        let cards = fruits
            .map((fruit) => (0, fill_template_1.fillTemplate)(exports.productCardTemplate, fruit))
            .join("");
        const overviewPage = exports.overviewTemplate.replace("{%PRODUCT_CARDS%}", cards);
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        res.end(overviewPage);
    }
    else if (pathName === "/products")
        res.end("Welcome to the products page");
    else if (pathName === "/api") {
        res.writeHead(200, {
            "content-type": "application/json",
        });
        res.end(exports.data);
    }
    else {
        res.writeHead(404, {
            "Content-Type": "text/html",
        });
        res.end("<h1>Page not found!</h1>");
    }
});
server.listen(8000, "127.0.0.1", () => {
    console.log("Server is listening on port 8000");
});
