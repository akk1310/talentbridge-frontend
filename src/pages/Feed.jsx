import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../api/axios";
import CandidateApplications from "./CandidateApplications";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  const navigate = useNavigate();

  const size = 10;

  const [filters, setFilters] = useState({
    profile: "",
    minExp: "",
    maxExp: "",
    location: "",
    tech: "",
  });

  const applyFilters = async (newPage = 0) => {
    setLoading(true);

    const payload = {
      profile: filters.profile || null,
      location: filters.location || null,
      tech: filters.tech || null,
      minExp: filters.minExp === "" ? null : Number(filters.minExp),
      maxExp: filters.maxExp === "" ? null : Number(filters.maxExp),
      page: newPage,
      size,
    };

    const res = await api.post("/posts/filter", payload);


    setPosts(res.data.posts);
    setPage(res.data.page);
    setTotalPosts(res.data.total);
    setTotalPages(Math.ceil(res.data.total / size));
    setLoading(false);
  };

  // useEffect(() => {
  //   applyFilters(0);
  // }, []);

  const candidate = localStorage.getItem("candidate");
  const candidateData = candidate ? JSON.parse(candidate) : null;

  const candidatePresent = JSON.parse(localStorage.getItem("candidate"));

  const applyJob = async (jobId) => {
    try {
      await api.post(`/candidate/apply/${jobId}`);

      // ✅ mark job as applied locally
      setAppliedJobs((prev) => new Set(prev).add(jobId));

      alert("Applied successfully");
    } catch (e) {
      alert(e.response?.data || "Already applied");

      // if backend says already applied, still disable it
      setAppliedJobs((prev) => new Set(prev).add(jobId));
    }
  };
  const loadAppliedJobs = async () => {
  try {
    const res = await api.get("/candidate/applications");

    // extract jobIds
    const jobIds = res.data.map(app => app.jobId);

    setAppliedJobs(new Set(jobIds));
  } catch (e) {
    console.error("Failed to load applied jobs", e);
  }
};
useEffect(() => {
  applyFilters(0);
  loadAppliedJobs();   // 👈 THIS is the missing piece
}, []);


  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Job Opportunities</h2>
      </div>

      {/* ===== Filters ===== */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Profile"
            onChange={(e) =>
              setFilters({ ...filters, profile: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Location"
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />

          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Min Exp"
            onChange={(e) => setFilters({ ...filters, minExp: e.target.value })}
          />

          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Max Exp"
            onChange={(e) => setFilters({ ...filters, maxExp: e.target.value })}
          />

          <button
            onClick={() => applyFilters(0)}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
      <div>
        {candidateData && (
          <div className="mb-4 text-gray-700">
            Welcome back, <strong>{candidateData.name}</strong> 👋
          </div>
        )}
      </div>
      <div>
        <button
          className="border px-2 p-1 rounded-sm cursor-pointer bg-blue-100"
          onClick={() => navigate("/candidate/applications")}
        >
          Your Applications
        </button>
        {/* <CandidateApplications /> */}
      </div>

      {/* ===== Meta Info ===== */}
      <div className="mb-4 text-gray-600">
        Total jobs found: <strong>{totalPosts}</strong>
      </div>

      {/* ===== Job List ===== */}
      {loading && <p className="text-gray-500">Loading jobs...</p>}

      {!loading && posts.length === 0 && (
        <p className="text-gray-500">No jobs found</p>
      )}

      <div className="space-y-4">
        {posts.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">{p.profile}</h3>

            <p className="text-sm text-gray-500">
              {p.location} • {p.exp} years experience
            </p>

            <p className="mt-2 text-gray-700">{p.desc}</p>

            {/* Skills */}
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2 mt-3">
                {p.techs?.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div>
                {candidate && (
                  <button
                    onClick={() => applyJob(p.id)}
                    disabled={appliedJobs.has(p.id)}
                    className={`mt-3 px-4 py-2 rounded text-white ${
                      appliedJobs.has(p.id)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {appliedJobs.has(p.id) ? "Applied" : "Apply"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Pagination ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page === 0}
            onClick={() => applyFilters(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-40 cursor-pointer"
          >
            Previous
          </button>

          <span className="text-gray-600">
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => applyFilters(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-40 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Feed;
