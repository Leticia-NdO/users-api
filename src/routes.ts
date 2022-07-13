import { Router, Request, Response } from "express";
import UserController from "./controllers/UserController";
import User from "./entities/User";

import Bundle from "./helpers/bundle";
import passport from "passport";
import TokenController from "./helpers/TokenController";
import AccessControl from "./helpers/accessControl";
import { upload } from "./helpers/multer";

// Rotas

// Rotas de usuário

const routes = Router();

routes.get(
  "/",
  TokenController.authenticateToken,
  (request: any, response: Response) => {
    const user = Bundle.getBundle(request, null);

    return response.json({ user: request.user[0], token: request.user[1] });
  }
);

routes.get(
  "/users",
  TokenController.authenticateToken,
  AccessControl.isAdmin,
  UserController.findAll
);

routes.post("/users", UserController.create);


routes.get(
  "/users/:userId",
  TokenController.authenticateToken,
  AccessControl.isAdmin,
  UserController.findById
);


routes.get(
  "/users/email/:userEmail",
  TokenController.authenticateToken,
  AccessControl.isAdmin,
  UserController.findById
);

routes.put(
  "/users/:userId",
  TokenController.authenticateToken,
  AccessControl.isUserOrAdmin,
  upload.single("avatar"),
  UserController.update
);

routes.delete(
  "/users/:userId",
  TokenController.authenticateToken,
  AccessControl.isUserOrAdmin,
  UserController.destroy
);

routes.get("/auth/logout", (req: Request, res: Response) => {
  if (req.user) {
    req.logout();
    res.send("done");
  }
});

routes.get("/login", (request: any, response) => {
  response.json({ message: "página de login" });
});


// Login local e reset password
routes.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (request: any, response: any) => {
    response.redirect("/");
  }
);

routes.post("/logout", UserController.logout);

routes.post("/forgot-password", UserController.resetLinkGenerator);

routes.get(
  "/reset-password/:id/:token",
  TokenController.resetPasswordAuthentication,
  (request: Request, response: Response) => {
    response.send("Página de recuperação de senha");
  }
);

routes.post(
  "/reset-password/:id/:token",
  TokenController.resetPasswordAuthentication,
  UserController.resetPassword
);

export { routes };
