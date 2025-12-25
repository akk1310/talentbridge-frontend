import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const EmployerRegister = () => {
  const [form, setForm] = useState({
    cname: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
    if (!form.cname || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/employer/login");
    } catch (err) {
      alert("Registration failed",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Employer Register
        </h2>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Company Name"
          onChange={e => setForm({ ...form, cname: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email"
          type="email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Password"
          type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={register}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition cursor-pointer"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4">
          Already registered?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/employer/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmployerRegister;
