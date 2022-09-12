import { Request, Response} from 'express';

export default class UserController {

  /**
   * UserController instance for singleton.
   */
  private static userController: UserController;

  /**
   * Returns an instance of UserController. It creates a new one if there is none.
   */
  static getInstance(): UserController {
    if (!this.userController) {
      this.userController = new UserController();
    }

    return this.userController;
  }

  /**
   * Calls Auth0 login
   */
  login(req: Request, res: Response) {
    res.oidc.login({ returnTo: '/user/profile' });
  }

  /**
   * Calls Auth0 login
   */
  logout(req: Request, res: Response) {
    res.oidc.login({ returnTo: '/user/profile' });
  }

  /**
   * Returns the Auth0 profile.
   */
  getProfile(req: Request, res: Response) {
    res.send(req.oidc.user);
  }
}