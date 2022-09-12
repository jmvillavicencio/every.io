import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { auth } from 'express-openid-connect';
import routes from './routes';

// Swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions";



const { PORT, BASE_URL, AUTH0_CLIENT_ID, AUTH0_SECRET, AUTH0_ISSUER_DOMAIN } = process.env;

const auth0Config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: `${BASE_URL}:${PORT}`,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_ISSUER_DOMAIN,
  secret: AUTH0_SECRET,
};

const specs = swaggerJsDoc(options);

const app = express();

app.use(auth(auth0Config));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

export default app;