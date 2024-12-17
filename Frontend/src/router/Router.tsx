
import { createBrowserRouter, Navigate } from "react-router";
import Main from "../layouts/Main";
import * as React from "react";
import { AltaReserva } from "../pages/ABMReservas/altaReserva/AltaReserva";

const Inicio = React.lazy(() => import('../pages/inicio/Inicio'));
const Reservas = React.lazy(() => import('../pages/consultas/reservasfechas/Reservas'));

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/Inicio" replace/>
      },
      {
        path: '/inicio',
        element: <Inicio/>,
      },
      {
        path: '/reservas',
        element: <Reservas/>,
      },
      {
        path: '/reservas/agregar',
        element: <AltaReserva/>,
      },
      { 
        path: '*', 
        element: <Navigate to= '/'/>,
      },
    ],
  },
])

export default Router