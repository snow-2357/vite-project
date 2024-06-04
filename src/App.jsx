import { useState } from "react";

function App() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    let newErrors = { ...errors };

    if (id === "name") {
      if (/\d/.test(value)) {
        newErrors.name = "Name error";
      } else {
        newErrors.name = "";
      }
    }

    if (id === "phone") {
      if (!/^\+\d{10,13}$/.test(value)) {
        newErrors.phone =
          "Phone number error add + sign max 13 digit min 10 digit ";
      } else {
        newErrors.phone = "";
      }
    }

    if (id === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Email error";
      } else {
        newErrors.email = "";
      }
    }

    if (id === "password") {
      const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
      const specialCharCount = (value.match(specialChars) || []).length;

      if (!/[A-Z]/.test(value[0])) {
        newErrors.password = "uppercase";
      } else if (specialCharCount < 3) {
        newErrors.password = "need 3 special";
      } else if (value.length < 8 || value.length > 13) {
        newErrors.password = "Password should be 8 13 ";
      } else {
        newErrors.password = "";
      }
    }

    setErrors(newErrors);
    setData({ ...data, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        valid = false;
        setErrors((prev) => ({ ...prev, [key]: `${key} is required.` }));
      }
    });

    if (valid && !Object.values(errors).some((error) => error !== "")) {
      console.log("Form submitted successfully", data);
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Name</label>
      <input
        id="name"
        onChange={handleChange}
        style={{ padding: 10 }}
        type="text"
        value={data.name}
      />
      {errors.name && <span>{errors.name}</span>}

      <label>Phone</label>
      <input
        id="phone"
        onChange={handleChange}
        style={{ padding: 10 }}
        type="text"
        value={data.phone}
      />
      {errors.phone && <span>{errors.phone}</span>}

      <label>Email</label>
      <input
        id="email"
        onChange={handleChange}
        style={{ padding: 10 }}
        type="text"
        value={data.email}
      />
      {errors.email && <span>{errors.email}</span>}

      <label>Password</label>
      <input
        id="password"
        onChange={handleChange}
        style={{ padding: 10 }}
        type="text"
        value={data.password}
      />
      {errors.password && <span>{errors.password}</span>}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
