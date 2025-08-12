import { Route, Routes, Navigate } from "react-router";
import Home from "../pages/Home/Home";
import Main from "../layout/Main";
import SignUpFlow from "../pages/Auth/SignUpFlow";
import SignIn from "../pages/Auth/SignIn";
import DashboardLayout from "../layout/DashboardLayout";
import ProfilePage from "../pages/Profile/ProfilePage";
import JobPostForm from "../pages/Employer/JobPostForm";
import EmployerJobsList from "../pages/Employer/EmployerJobsList";
import AboutPage from "../pages/AboutPage/AboutPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import CompaniesPage from "../pages/CompaniesPage/CompaniesPage";
import AdminDashboardJobs from "../pages/Admin/AdminDashboardJobs";
import JobList from "../pages/JobList/JobList";
import AdminUsersDashboard from "../pages/Admin/AdminUsersDashboard";
// import ProtectedRoute from "./ProtectedRoute";

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Main />}>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUpFlow />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/jobsAll" element={<JobList />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="post-job" element={<JobPostForm />} />
        <Route path="jobs" element={<EmployerJobsList />} />

        {/* Admins  */}
        <Route path="allJobs" element={<AdminDashboardJobs />} />
        <Route path="allUsers" element={<AdminUsersDashboard />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
