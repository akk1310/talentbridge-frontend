import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CandidateApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadApplications = async () => {
    try {
      const res = await api.get("/candidate/applications");
      setApplications(res.data);
    } catch (err) {
      console.error("Failed to load applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Applications</h2>
        <button
          onClick={() => navigate("/employee/feed")}
          className="text-blue-600 hover:underline"
        >
          ← Back to Jobs
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading applications...</p>}

      {!loading && applications.length === 0 && (
        <p className="text-gray-500">You have not applied to any jobs yet.</p>
      )}

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id?.timestamp}
            className="border rounded-lg p-4 bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {app.jobProfile || "Job"}
              </h3>

              <p className="text-sm text-gray-600">
                Applied on{" "}
                {new Date(app.appliedAt).toLocaleDateString()}
              </p>

              <p className="text-sm text-green-600 mt-1">
                Status: Applied
              </p>
            </div>

            <a
              href={app.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Resume
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateApplications;
