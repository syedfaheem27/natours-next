import { IncomingMessage, Server, ServerResponse } from 'http';
import slugify from 'slugify';
import { fruit } from './types/fruit';

const fillTemplate = require('../utils/fill-template');

const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');

const basePath = path.join(__dirname, '../../01-node-farm');

//Reading dev-data
const data = fs.readFileSync(
  path.join(basePath, 'dev-data', 'data.json'),
  'utf-8'
);
const fruits = JSON.parse(data) as fruit[];
export const slugs: {
  slug: string;
  id: number;
}[] = fruits.map((el) => {
  return {
    slug: slugify(el.productName, {
      lower: true,
      replacement: '-',
    }),
    id: el.id,
  };
});

const productCardTemplate = fs.readFileSync(
  path.join(basePath, 'templates/product-card.template.html'),
  'utf-8'
);
const overviewTemplate = fs.readFileSync(
  path.join(basePath, 'templates/overview.template.html'),
  'utf-8'
);

const productsTemplate = fs.readFileSync(
  path.join(basePath, 'templates/product.template.html'),
  'utf-8'
);

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
  http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const { pathname, query } = url.parse(req.url, true);

    //OVERVIEW PAGE
    if (pathname === '/' || pathname === '/overview') {
      let cards = fruits
        .map((fruit) => fillTemplate(productCardTemplate, fruit))
        .join('');
      const overviewPage = overviewTemplate.replace(
        '{%PRODUCT_CARDS%}',
        cards
      );

      res.writeHead(200, {
        'Content-type': 'text/html',
      });
      res.end(overviewPage);

      //PRODUCTS
    } else if (pathname === '/product') {
      const { id } = slugs.find((el) => el.slug === query.name)!;

      const fruit = fruits.find((f) => {
        return f.id === id;
      });

      if (fruit && fruit.id !== undefined) {
        const html = fillTemplate(productsTemplate, fruit);
        res.writeHead(200, {
          'content-type': 'text/html',
        });
        res.end(html);
      } else {
        res.writeHead(404, {
          'content-type': 'text/html',
        });
        res.end('<h1>No Product found!</h1>');
      }
    }
    //API
    else if (pathname === '/api') {
      res.writeHead(200, {
        'content-type': 'application/json',
      });
      res.end(data);
    }

    //NOT FOUND
    else {
      res.writeHead(404, {
        'Content-Type': 'text/html',
      });
      res.end('<h1>Page not found!</h1>');
    }
  });

server.listen(8000, '127.0.0.1', () => {
  console.log('Server is listening on port 8000');
});
