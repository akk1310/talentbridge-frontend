import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      
      {/* Brand */}
      <h1 className="text-4xl font-bold text-blue-600 mb-2">
        TalentBridge
      </h1>

      <p className="text-gray-600 text-lg mb-8 text-center">
        Bridging Employers & Candidates — Hire or Get Hired for Free
      </p>

      {/* Actions */}
      <div className="flex gap-6">
        <Link to="/employer/register">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
            Hire Talent
          </button>
        </Link>

        <Link to="/employee/feed">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition">
            Find Jobs
          </button>
        </Link>
      </div>

      {/* Footer note */}
      <p className="text-sm text-gray-400 mt-10">
        © {new Date().getFullYear()} TalentBridge
      </p>
    </div>
  );
};

export default Home;
