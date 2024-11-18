import "./index.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import TitlePage from "./pages/TitlePage";

import Game from './pages/Game/Game'
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { index: true, 
        element: <TitlePage /> 
      },
      {
        path: "/selectBoard",
        element: <></>//<selectBoard />
      },
      {
        path: "/game",
        element: <Game/>,
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
