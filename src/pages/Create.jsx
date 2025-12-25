import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const initial = { profile: "", exp: 0, techs: [], desc: "",location: "" };

const Create = () => {
  const skillSet = [
    {
      name: "Javascript",
    },
    {
      name: "Java",
    },
    {
      name: "Python",
    },
    {
      name: "Django",
    },
    {
      name: "Rust",
    },
  ];
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const { profile, exp, desc,location } = form;
   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    navigate("/employee/feed");
  } catch (err) {
    console.error(err);
  }
};

  const handleChange = (e) => {
    setForm({...form , techs : [...form.techs, e.target.value]});
  };
  return (
    <div>
      Create New Post
      <form onSubmit={handleSubmit}>
        <label for="profile"> Profile</label>
        <input
          id="profile"
          name="profile"
          type="text"
          onChange={(e) => setForm({ ...form, profile: e.target.value })}
          value={profile}
          required
        />

        <label for="exp"> Years of Experience</label>
        <input
          id="exp"
          name="exp"
          min="0"
          required
          type="number"
          onChange={(e) => setForm({ ...form, exp: e.target.value })}
          value={exp}
        />

         <label for="loc"> Location </label>
        <input
          id="loc"
          name="loc"
          type="text"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          value={location}
          required
        />

        <label for="desc"> Job-Description </label>
        <textarea
          id="desc"
          name="desc"
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          value={desc}
          rows={4}
          required
        />

       

        <h3>Please mention required skills</h3>
        <ul>
          {skillSet.map(({ name }, index) => {
            return (
              <li key={index}>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      onChange={handleChange}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Create;
