import { Router }                      from "express";

import { AuthenticatedUserController } from "./controllers/AuthenticatedUserController";
import { CreateUserController }        from "./controllers/CreateUserController";
import { ListUsersController }         from "./controllers/ListUsersController";

import { ensureAuthenticated }         from "./middlewares/ensureAuthenticated";
import { ensureAuthenticatedKey }      from "./middlewares/ensureAuthenticatedKey";

export const router = Router();

router.post('/resgister',     new CreateUserController().handle);
router.post('/login',         new AuthenticatedUserController().handle);

router.get('/user/:key/:nameuser', ensureAuthenticated, ensureAuthenticatedKey, new ListUsersController().handle); 