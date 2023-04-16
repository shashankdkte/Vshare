import routes from "./routes";

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "VShare";
  res.locals.routes = routes;

  next();
};
