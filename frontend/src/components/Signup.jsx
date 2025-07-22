import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const titleOptions = ["Student", "Fresher", "Professional"];
const skillOptions = [
  { name: "ReactJs", logo: "/physics.png" },
  { name: "NodeJs", logo: "/nodejs.png" },
  { name: "MongoDB", logo: "/database-management.png" },
  { name: "HTML", logo: "/html.png" },
  { name: "CSS", logo: "/css-3.png" },
  { name: "JavaScript", logo: "/js.png" },
  { name: "Python", logo: "/python.png" },
  { name: "Express", logo: "/expressjs-icon.svg" },
  { name: "TypeScript", logo: "/typescript.png" },
];

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    photoURL: "",
    about: "",
    age: "",
    gender: "",
    city: "",
    country: "",
    title: "",
    skills: [],
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleSkill = (skill) => {
    const currentSkills = formData.skills;
    if (currentSkills.includes(skill)) {
      setFormData({
        ...formData,
        skills: currentSkills.filter((s) => s !== skill),
      });
    } else if (currentSkills.length < 10) {
      setFormData({ ...formData, skills: [...currentSkills, skill] });
    }
  };

  const validate = () => {
    if (!formData.firstName || formData.firstName.trim().length < 4)
      return "First name must be at least 4 characters.";
    if (!/\S+@\S+\.\S+/.test(formData.emailId)) return "Invalid email format.";
    if (
      !formData.password ||
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password) ||
      !/[\W_]/.test(formData.password) ||
      formData.password.length < 8
    )
      return "Password must be strong (min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 symbol).";
    if (
      !formData.age ||
      typeof Number(formData.age) !== "number" ||
      formData.age < 14 ||
      formData.age > 99
    )
      return "Age must be a number between 14 and 99.";
    if (!["Male", "Female"].includes(formData.gender))
      return "Gender must be 'Male' or 'Female'.";
    if (
      !formData.city ||
      formData.city.trim().length === 0 ||
      formData.city.length > 15
    )
      return "City must be provided and under 15 characters.";
    if (
      !formData.country ||
      formData.country.trim().length === 0 ||
      formData.country.length > 15
    )
      return "Country must be provided and under 15 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errorMsg = validate();
    if (errorMsg) return setError(errorMsg);

    try {
      await axios.post(BASE_URL + "/signup", formData, {
        withCredentials: true,
      });
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#dfe0e3] via-[#ffffff] to-[#c9ccd0] dark:from-[#020013] dark:via-gray-900/5 dark:to-[#020013] px-4 py-12 flex justify-center">
      <button
          onClick={() => navigate(-1)}
          className="cursor-pointer fixed top-6 left-6 z-20 px-4 py-2 text-md text-[#021431] dark:text-white rounded hover:bg-black/5 dark:hover:bg-white/10 transition hover:text-cyan-500 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full rounded-lg shadow-lg p-8 space-y-6 bg-[#E3E9F4] dark:bg-[#020013] text-gray-900 dark:text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="text-cyan-500">Create</span> a new account
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="input input-bordered w-full 
    bg-[#F2F7FE] text-[#021431] placeholder:text-[#555] 
    dark:bg-[#1a1a2e] dark:text-white dark:placeholder:text-gray-400"
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="input input-bordered w-full 
    bg-[#F2F7FE] text-[#021431] placeholder:text-[#555] 
    dark:bg-[#1a1a2e] dark:text-white dark:placeholder:text-gray-400"
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={formData.emailId}
          onChange={(e) =>
            setFormData({ ...formData, emailId: e.target.value })
          }
          className="input input-bordered w-full 
    bg-[#F2F7FE] text-[#021431] placeholder:text-[#555] 
    dark:bg-[#1a1a2e] dark:text-white dark:placeholder:text-gray-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="input input-bordered w-full 
    bg-[#F2F7FE] text-[#021431] placeholder:text-[#555] 
    dark:bg-[#1a1a2e] dark:text-white dark:placeholder:text-gray-400"
          required
        />

        <input
          type="text"
          placeholder="Photo URL"
          value={formData.photoURL}
          onChange={(e) =>
            setFormData({ ...formData, photoURL: e.target.value })
          }
          className="input input-bordered w-full 
    bg-[#F2F7FE] text-[#021431] placeholder:text-[#555] 
    dark:bg-[#1a1a2e] dark:text-white dark:placeholder:text-gray-400"
        />

        <textarea
          placeholder="About"
          rows={3}
          className="textarea textarea-bordered w-full 
    bg-[#F2F7FE] text-[#021431] placeholder:text-[#555] 
    dark:bg-[#1a1a2e] dark:text-white dark:placeholder:text-gray-400"
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          value={formData.about}
        />

        {/* Title */}
        <div>
          <p className="mb-1 text-gray-900 dark:text-white/70">
            Select Your Title
          </p>
          <div className="flex flex-wrap gap-2">
            {titleOptions.map((title) => (
              <button
                key={title}
                type="button"
                onClick={() => setFormData({ ...formData, title })}
                className={`px-3 py-1 rounded-full border ${
                  formData.title === title
                    ? "bg-cyan-500 text-[#23282b] border-cyan-500"
                    : "text-gray-900 dark:text-[#D9DFF2] border-gray-600 dark:border-white/20"
                } hover:bg-cyan-600 transition`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Age, Gender */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: Number(e.target.value) })
            }
            min={14}
            max={100}
            className="input input-bordered w-full 
      bg-[#F2F7FE] text-[#021431] placeholder:text-[#555] 
      dark:bg-[#1a1a2e] dark:text-white dark:placeholder:text-gray-400"
          />

          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className="select select-bordered w-full 
      bg-[#F2F7FE] text-[#021431] 
      dark:bg-[#1a1a2e] dark:text-white"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* City & Country */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="input input-bordered w-full 
      bg-[#F2F7FE] text-[#021431] placeholder:text-[#555] 
      dark:bg-[#1a1a2e] dark:text-white dark:placeholder:text-gray-400"
          />

          <input
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            className="input input-bordered w-full 
      bg-[#F2F7FE] text-[#021431] placeholder:text-[#555] 
      dark:bg-[#1a1a2e] dark:text-white dark:placeholder:text-gray-400"
          />
        </div>

        {/* Skills */}
        <div>
          <p className="mb-1 text-gray-900 dark:text-white/70">Select Skills</p>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map(({ name, logo }) => {
              const selected = formData.skills.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleSkill(name)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm border font-mono ${
                    selected
                      ? "bg-cyan-400 text-[#23282b] border-cyan-400 font-semibold"
                      : "text-gray-900 dark:text-[#D9DFF2] border-gray-600 dark:border-white/20"
                  } hover:bg-cyan-600 transition`}
                >
                  <img src={logo} alt={name} className="w-5 h-5 rounded" />
                  &lt;{name}&gt;
                </button>
              );
            })}
          </div>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary px-10 border-2 
      border-gray-400 hover:text-white 
      bg-gray-600 text-white hover:bg-blue-500 
      dark:bg-transparent dark:text-cyan-400 
      dark:hover:text-[#D9DFF2] dark:hover:bg-cyan-500/10 transition"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-sm mt-4 text-gray-900 dark:text-white/70">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 font-semibold dark:text-cyan-400 hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
