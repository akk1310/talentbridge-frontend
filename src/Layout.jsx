import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const employer = localStorage.getItem("employer");
  const candidate = localStorage.getItem("candidate");
  const navigate = useNavigate();

  const logoutEmployer = () => {
    localStorage.removeItem("employer");
    localStorage.removeItem("token");
    navigate("/employer/login");
  };

  const logoutCandidate = () => {
    localStorage.removeItem("candidate");
    navigate("/candidate/login");
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-lg shadow-sm border-b border-white/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            TalentBridge
          </Link>

          <nav className="flex gap-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>

            <Link to="/employee/feed" className="text-gray-700 hover:text-blue-600">
              Jobs
            </Link>

            {/* 🟢 Candidate logged in */}
            {candidate && !employer && (
              <>
                <span className="text-gray-700 font-medium">
                   {JSON.parse(candidate).name}
                </span>

                <button
                  onClick={logoutCandidate}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}

            {/* 🟢 Employer logged in */}
            {employer && (
              <>
                <Link
                  to="/employer/dashboard"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>

                <button
                  onClick={logoutEmployer}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}

            {/* 🔵 Nobody logged in */}
            {!employer && !candidate && (
              <>
                <Link
                  to="/candidate/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Candidate Login
                </Link>

                <Link
                  to="/employer/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Employer Login
                </Link>

                <Link
                  to="/employer/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Hire Talent
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-gray-500">
          <p className="font-semibold text-gray-700">TalentBridge</p>
          <p className="text-sm">Bridging Employers & Candidates</p>
          <p className="text-xs mt-2">
            © {new Date().getFullYear()} TalentBridge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
