import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const EmployerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("employer", JSON.stringify(res.data.employer));
      localStorage.setItem("token", res.data.token);

      navigate("/employer/dashboard");
    } catch (err) {
      alert("Invalid email or password",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <button 
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/")}>
            &lt;  Home
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">
          Employer Login
        </h2>

        

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline "
            onClick={() => navigate("/employer/register")}
          >
            Register
          </span>
        </p>
       
      </div>
    </div>
  );
};

export default EmployerLogin;
