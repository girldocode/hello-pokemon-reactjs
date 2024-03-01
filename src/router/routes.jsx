import Home from "../Pages/Home";
import Pokemon from "../Pages/Pokemon";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/pokemon/:name", element: <Pokemon /> },
];
