import { Outlet, useRoutes } from "react-router-dom";
import { lazy } from "react";
import Dashboard from "~/pages/Dashboard";
import SidebarLayout from "~/layouts/SidebarLayout";

const Settings = lazy(() => import("~/pages/Settings"));
const Reports = lazy(() => import("~/pages/Reports"));
const Searcher = lazy(() => import("~/pages/Searcher"));

function Wrapper() {
  const routes = useRoutes([
    {
      element: (
        <SidebarLayout>
          <Outlet />
        </SidebarLayout>
      ),
      children: [
        { element: <Dashboard />, path: "/" },
        { element: <Searcher />, path: "/searcher" },
        { element: <Settings />, path: "/settings" },
        { element: <Reports />, path: "/reports" },
      ],
    },
  ]);

  return routes;
}

export default Wrapper;
