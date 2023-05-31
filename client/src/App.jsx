import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";
import PageNotFound from "./components/PageNotFound";

//Middlewaes
import { Protected } from "./middlewares/ProtectedRoutes";
import { AuthenticationRoutes } from "./middlewares/AuthenticationRoutes";
import Update from "./components/Update";

//Routes
const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        //AUTHENTICATION ROUTES
        element: <AuthenticationRoutes />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },

      {
        // PROTECTED ROUTES
        element: <Protected />,
        children: [
          {
            path: "/user",
            element: <User />,
          },
          {
            path: "/update",
            element: <Update />
          }
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <div className="min-h-screen">
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </div>
  );
}
