import express from 'express';
import { requiresAuth } from 'express-openid-connect';
import UserController from '../../controllers/user';

const router = express.Router();
const userController = UserController.getInstance();

// GET
/**
 * @swagger
 * openapi: 3.0.0
 * components:
 *  securitySchemes:
 *    OpenID:
 *     type: openIdConnect
 *     openIdConnectUrl: https://example.com/.well-known/openid-configuration
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        given_name:
 *          type: string
 *          description: the user given name
 *        family_name:
 *          type: string
 *          description: the user family name
 *        nickname:
 *          type: string
 *          description: the user nickname
 *        name:
 *          type: string
 *          description: the user name
 *        picture:
 *          type: string
 *          description: the picture url
 *        locale:
 *          type: string
 *          description: the user locale
 *        email:
 *          type: string
 *          description: the user email
 *        email_verified:
 *          type: boolean
 *          description: if the user email is verified
 *        sub:
 *          type: string
 *          description: auth0 user id
 *        sid:
 *          type: string
 *          description: user sid
 *        created_at:
 *          type: Date
 *          description: the date in where the user was created
 *        updated_at:
 *          type: Date
 *          description: the date in where the user was updated
 *
 * 
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User endpoint
 */

/**
 * @swagger
 * /user/profile:
 *  get:
 *    summary: Returns the user profile
 *    tags: [User]
 *    security:
 *      - OpenID: [admin]
 *    responses:
 *      200:
 *        description: the user profile
 *        content:
 *          application/json:
 *            schema:
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.get('/profile', requiresAuth(), userController.getProfile);

/**
 * @swagger
 * /user/login:
 *  get:
 *    summary: Opens the Auth0 login page or rdirects to the profile
 *    tags: [User]
 *    responses:
 *      200:
 *        description: the auth0 login page
 */
router.get('/login', userController.login);


export default router;