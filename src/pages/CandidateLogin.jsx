import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const CandidateLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      localStorage.removeItem("candidate");
       localStorage.removeItem("token");
      const res = await api.post("/candidate/login", { email, password });

      localStorage.setItem(
        "candidate",
        JSON.stringify(res.data.candidate)
      );
      localStorage.setItem("token", res.data.token);

      navigate("/employee/feed");
    } catch (e) {
      alert("Invalid email or password",e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-blue-600">
          Candidate Login
        </h2>
        <p className="text-sm text-center text-gray-500 mt-1">
          Welcome back to TalentBridge
        </p>

        <div className="mt-6 space-y-4">
          <input
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/candidate/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CandidateLogin;
