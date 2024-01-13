import express, { Application } from 'express';

import path from 'path';
import appRoute from '../routes/index';
import { errorHandler } from '../middleware/errorHandlerMiddleware';
import swaggerUI from 'swagger-ui-express';
import openspecification from '../swagger/swaggerconfig';
import cors from 'cors';
import helmet from 'helmet';
import config from '../config/env';
import rateLimiter from '../utils/rateLimiter';

export default async ({ app }: { app: Application }) => {
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(config.corsConfig));
  app.use(helmet(config.helmetConfig));

  //limit number of request for api/ endpoint
  app.use('/api', rateLimiter);

  // set view engine and its path
  const viewpath = path.join(__dirname, '..', 'public', 'html');
  app.set('views', viewpath);
  app.set('view engine', 'ejs');

  // serve static file
  const staticfile = path.join(__dirname, '..', 'public');
  app.use('/static', express.static(staticfile));

  //serve swagger documentation
  app.use('/api-docs', swaggerUI.serveFiles(openspecification), swaggerUI.setup());

  app.get('/', (req, res) => {
    const html = `<h1>${config.WEBSITE_NAME}</h1>
                <a href=${config.SWAGGER_LINK}>Click to visit documentation page</a>
    `;
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(html);
  });

  app.use('/api/v1', appRoute);

  //handle route not found error
  app.use((req, res) => {
    res.status(500).send(`<h1>Page Not Found</h1>
                             <a href=${config.HOME_DOMAIN_URL}>Please visit homepage </a>
       `);
  });

  app.use(errorHandler);

  return app;
};
