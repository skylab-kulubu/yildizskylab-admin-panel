import LoginRegisterPage from "./pages/LoginRegisterPage";
import App from "./App";

import Users from "./pages/Users";
import Teams from "./pages/Teams";
import TeamMembers from "./pages/TeamMembers";
import TeamLeads from "./pages/TeamLeads";
import TeamProjects from "./pages/TeamProjects";
import Projects from "./pages/Projects";
import ProjectMembers from "./pages/ProjectMembers";
import NewsEditor from "./pages/NewsEditor";
import PrivateRoute from "./components/PrivateRoute";

import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "/users", element: <Users /> },
      { path: "/teams", element: <Teams /> },
      { path: "/teams/members", element: <TeamMembers /> },
      { path: "/teams/leads", element: <TeamLeads /> },
      { path: "/teams/projects", element: <TeamProjects /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/members", element: <ProjectMembers /> },
      { path: "/newseditor", element: <NewsEditor /> },
    ],
  },
  {
    path: "/sign-in",
    element: <LoginRegisterPage />,
  },
];

export default routes;
