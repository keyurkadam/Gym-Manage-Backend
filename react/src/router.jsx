import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import MembershipPlan from "./views/MembershipPlan";
import MembershipPlanForm from "./views/MembershipPlanForm";
import Members from "./views/Members";
import MemberForm from "./views/MemberForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
      {
        path: "/membership-plans",
        element: <MembershipPlan />,
      },
      {
        path: "/membership-plans/new",
        element: <MembershipPlanForm key="membershipPlanCreate" />,
      },
      {
        path: "/membership-plans/:id",
        element: <MembershipPlanForm key="membershipPlanUpdate" />,
      },
      {
        path: "/members",
        element: <Members />,
      },
      {
        path: "/members/new",
        element: <MemberForm key="memberCreate" />,
      },
      {
        path: "/members/:id",
        element: <MemberForm key="memberUpdate" />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
