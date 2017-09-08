import { enableProdMode } from '@angular/core'
import { renderModuleFactory } from '@angular/platform-server'

import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as express from 'express';

import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app.server.module.ngfactory'
import { environment } from './environments/environment.prod';

const PORT = environment.port;

enableProdMode();

const app = express();
app.engine('html', (_, options, callback) => {
  renderModuleFactory(
    AppServerModuleNgFactory,
    {
      document: readFileSync(join(__dirname, '..', 'dist', 'index.html'), 'utf8').toString(),
      url: options.req.url
    }
  ).then(html => callback(null, html));
});

app.set('view engine', 'html');
app.set('views', 'src');

app.get('*.*', express.static(join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
