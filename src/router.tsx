import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import LoginView from "./views/auth/LoginView";
import NewPasswordView from "./views/auth/NewPasswordView";
import RegisterView from "./views/auth/RegisterView";
import RequestTokenView from "./views/auth/RequestTokenView";
import CreateProjectView from "./views/projects/CreateProjectView";
import DashboardView from "@/views/projects/DashboardView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import Profileview from "./views/profile/Profileview";
import ChangePassword from "./views/profile/ChangePassword";
import ProfileLayout from "./layouts/ProfileLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />
          <Route
            path="/projects/:projectId/team"
            element={<ProjectTeamView />}
          />
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<Profileview />} />
            <Route path="/profile/password" element={<ChangePassword />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/request-token" element={<RequestTokenView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
