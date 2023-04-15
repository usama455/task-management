import express, { json, urlencoded } from 'express';
import forceSSL from 'express-force-ssl';
import cors from 'cors';
import compression from 'compression';
import { env, frontendURL } from '../../config';
import passport from 'passport';
import { connectDatabase } from '../database';
import session from 'express-session';


export default (apiRoot, routes) => {
  const app = express();


  app.use(session({
    secret: process.env.MASTER_KEY,
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  if (env === 'production') {
    app.set('forceSSLOptions', {
      enable301Redirects: false,
      trustXFPHeader: true,
    });
    app.use(forceSSL);
  }

  if (env === 'production' || env === 'development') {
    app.use(compression());
  }
  app.use(
    cors({
      credentials: true,
      origin: frontendURL,
    })
  );

  connectDatabase();
  app.use(json());
  app.use(urlencoded({ extended: false }));

  app.use(apiRoot, routes);

  return app;
};
