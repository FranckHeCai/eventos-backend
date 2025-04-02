import userRoutes from "./user/adapters/http";
// import userSockets from './user/adapters/socket';
import authRoutes from "./auth/adapters/http";
import eventRoutes from "./events/adapters/http"
import userEventRoute from "./userEvent/adapters/http"
import ingredientsRouter from "./ingredients/adapters/http"
import eventIngredientRoute from "./eventIngredient/adapters/http"

export const Routes = (app) => {
  userRoutes(app, "/user");
  eventRoutes(app, "/events")
  authRoutes(app);
  userEventRoute(app, "/userEvents")
  ingredientsRouter(app, "/ingredients")
  eventIngredientRoute(app, "/eventIngredients")
};

export const Sockets = (io, socket) => {
  // userSockets(io, socket);
};
