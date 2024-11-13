"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fill_template_1 = require("../utils/fill-template");
const fs = require("fs");
const http = require("http");
const url = require("url");
const path = require("path");
const basePath = path.join(__dirname, "../../01-node-farm");
//Reading dev-data
const data = fs.readFileSync(path.join(basePath, "dev-data", "data.json"), "utf-8");
const fruits = JSON.parse(data);
const productCardTemplate = fs.readFileSync(path.join(basePath, "templates/product-card.template.html"), "utf-8");
const overviewTemplate = fs.readFileSync(path.join(basePath, "templates/overview.template.html"), "utf-8");
const productsTemplate = fs.readFileSync(path.join(basePath, "templates/product.template.html"), "utf-8");
const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    //OVERVIEW PAGE
    if (pathname === "/" || pathname === "/overview") {
        let cards = fruits
            .map((fruit) => (0, fill_template_1.fillTemplate)(productCardTemplate, fruit))
            .join("");
        const overviewPage = overviewTemplate.replace("{%PRODUCT_CARDS%}", cards);
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        res.end(overviewPage);
        //PRODUCTS
    }
    else if (pathname === "/product") {
        const fruit = fruits.find((f) => {
            return f.id === Number(query.id);
        });
        if (fruit && fruit.id !== undefined) {
            const html = (0, fill_template_1.fillTemplate)(productsTemplate, fruit);
            res.writeHead(200, {
                "content-type": "text/html",
            });
            res.end(html);
        }
        else {
            res.writeHead(404, {
                "content-type": "text/html",
            });
            res.end("<h1>No Product found!</h1>");
        }
    }
    //API
    else if (pathname === "/api") {
        res.writeHead(200, {
            "content-type": "application/json",
        });
        res.end(data);
    }
    //NOT FOUND
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
