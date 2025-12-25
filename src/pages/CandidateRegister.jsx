import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const CandidateRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const register = async () => {
    if (!resume) {
      alert("Please upload your resume (PDF)");
      return;
    }

    try {
      setLoading(true); // 🔵 start loading

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(form)], { type: "application/json" })
      );
      formData.append("resume", resume);

      await api.post("/candidate/register", formData);

      alert("Registered successfully");
      navigate("/candidate/login");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    } finally {
      setLoading(false); // 🔵 stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Candidate Register
        </h2>
        <p className="text-sm text-center text-gray-500 mt-1">
          Create your TalentBridge profile
        </p>

        <div className="mt-6 space-y-4">
          <input
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <div>
            <label className="text-sm text-gray-600">Upload Resume (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full mt-1"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </div>

          <button
            onClick={register}
            disabled={loading}
            className={`w-full py-2 rounded transition cursor-pointer text-white cursor-pointer
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already registered?{" "}
          <Link to="/candidate/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CandidateRegister;
