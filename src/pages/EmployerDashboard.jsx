import { useEffect, useState } from "react";
import api from "../api/axios"; // ✅ axios instance with JWT

const EmployerDashboard = () => {
  const rawEmployer = localStorage.getItem("employer");
  const [applications, setApplications] = useState([]);

  let employer = null;
  try {
    if (rawEmployer && rawEmployer !== "undefined") {
      employer = JSON.parse(rawEmployer);
    }
  } catch (e) {
    console.error("Invalid employer in localStorage", e);
    localStorage.removeItem("employer");
    localStorage.removeItem("token");
  }
  if (!employer) {
    window.location.href = "/employer/login";
    return null;
  }

  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({
    profile: "",
    desc: "",
    exp: "",
    location: "",
    techs: "",
  });

  /* ---------------- LOAD JOBS ---------------- */

  const loadJobs = async () => {
    const res = await api.get("/employer/jobs");
    setJobs(res.data);
  };
  const loadApplications = async () => {
    const res = await api.get("/employer/applications");

    console.log(res);

    setApplications(res.data);
  };

  useEffect(() => {
    loadJobs();
    loadApplications(); // 👈 add this
  }, []);

  /* ---------------- CREATE JOB ---------------- */

  const submitJob = async () => {
    const payload = {
      ...job,
      exp: Number(job.exp),
      techs: job.techs.split(",").map((t) => t.trim()),
    };

    await api.post("/employer/job", payload);

    setJob({
      profile: "",
      desc: "",
      exp: "",
      location: "",
      techs: "",
    });

    loadJobs();
    alert("Job posted successfully");
  };

  /* ---------------- DELETE JOB ---------------- */

  const deleteJob = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;

    await api.delete(`/employer/job/${jobId}`);
    loadJobs();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Employer Dashboard</h2>
          <p className="text-gray-600">{employer.cname}</p>
        </div>
        {/* <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button> */}
      </div>

      {/* Create Job */}
      <div className="bg-white shadow p-4 rounded mb-8">
        <h3 className="text-xl font-semibold mb-4">Post New Job</h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Profile"
            value={job.profile}
            onChange={(e) => setJob({ ...job, profile: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Location"
            value={job.location}
            onChange={(e) => setJob({ ...job, location: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Experience"
            value={job.exp}
            onChange={(e) => setJob({ ...job, exp: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Techs (comma separated)"
            value={job.techs}
            onChange={(e) => setJob({ ...job, techs: e.target.value })}
          />
        </div>

        <textarea
          className="border p-2 rounded w-full mt-4"
          placeholder="Job Description"
          value={job.desc}
          onChange={(e) => setJob({ ...job, desc: e.target.value })}
        />

        <button
          onClick={submitJob}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post Job
        </button>
      </div>

      {/* Job List */}
      <h3 className="text-xl font-semibold mb-4">Your Jobs ({jobs.length})</h3>

      {jobs.length === 0 && <p className="text-gray-500">No jobs posted yet</p>}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border p-4 rounded shadow-sm flex justify-between"
          >
            <div>
              <h4 className="font-bold">{job.profile}</h4>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm">Experience: {job.exp} years</p>
              <p className="text-sm mt-1">{job.desc}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {job.techs?.map((t, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-2 py-1 text-sm rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => deleteJob(job.id)}
              className="bg-red-500 text-white px-3 py-1 rounded h-fit"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ================= Applications Received ================= */}
      <h3 className="text-xl font-semibold mt-10 mb-4">
        Applications Received ({applications.length})
      </h3>

      {applications.length === 0 && (
        <p className="text-gray-500">No applications yet</p>
      )}

      <div className="space-y-4">
        {applications.map((app, i) => (
          <div
            key={i}
            className="border rounded p-4 flex justify-between items-center bg-white shadow-sm"
          >
            <div>
              <p className="font-semibold">{app.candidateName}</p>

              <p className="text-sm text-gray-600">
                Applied for: {app.jobProfile}
              </p>

              <p className="text-xs text-gray-500">
                Applied on: {new Date(app.appliedAt).toLocaleDateString()}
              </p>
            </div>

            <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Download Resume
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;
