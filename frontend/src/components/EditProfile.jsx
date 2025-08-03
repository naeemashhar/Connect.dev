import { useState } from "react";
import PreviewCard from "./PreviewCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  { name: "Java", logo: "/java.png" },
  { name: "C++", logo: "/c-.png" },
  { name: "C#", logo: "/c-sharp.png" },
  { name: "PHP", logo: "/php.png" },
];

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [about, setAbout] = useState(user.about || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [city, setCity] = useState(user.city || "");
  const [country, setCountry] = useState(user.country || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [title, setTitle] = useState(user.title || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPremium, setIsPremium] = useState(user.isPremium || false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSkill = (skill) => {
    if (skills.length >= 10 && !skills.includes(skill)) {
      toast.warning("You can only select up to 10 skills.");
      return;
    }
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const validateFields = () => {
    if (firstName.trim().length < 4)
      return "First name must be at least 4 characters.";
    if (age < 14 || age > 100) return "Age must be between 14 and 100.";
    if (!["Male", "Female", "Other"].includes(gender))
      return "Please select a valid gender.";
    if (!city.trim()) return "City is required.";
    if (!country.trim()) return "Country is required.";
    if (photoURL && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(photoURL))
      return "Invalid photo URL.";
    const uniqueSkills = new Set(skills.map((s) => s.toLowerCase()));
    if (uniqueSkills.size !== skills.length) return "Skills must be unique.";
    return null;
  };

  const saveProfile = async () => {
    setError("");
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          title,
          about,
          gender,
          age,
          city,
          country,
          skills,
          isPremium
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      toast.success("Profile Updated Successfully");
    } catch (error) {
      setError(error.response?.data || "Something went wrong.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(BASE_URL + "/profile/delete", {
        withCredentials: true,
      });
      dispatch(removeUser());
      toast.success("Your profile has been deleted.");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to delete: " + (err.response?.data || err.message));
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 flex flex-col lg:flex-row items-start justify-center gap-10 relative bg-gradient-to-br from-[#F2F7FE] via-[#E3E9F4] to-[#F2F7FE] dark:from-[#020013] dark:via-cyan-900/2 dark:to-[#020013]">
      <button
        onClick={() => navigate("/feed")}
        className="cursor-pointer fixed top-6 left-6 z-20 px-4 py-2 text-md text-[#021431] dark:text-white rounded hover:bg-black/5 dark:hover:bg-white/10 transition hover:text-cyan-500 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <form className="w-full max-w-2xl bg-white/40 dark:bg-transparent backdrop-blur-sm p-8 rounded-3xl border border-[#C9D6F2] dark:border-white/10 shadow-lg space-y-6 text-[#021431] dark:text-white mt-12 lg:mt-0">
        <h2 className="text-2xl font-semibold text-center">
          Edit Your Profile
        </h2>

        {/* Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full bg-white dark:bg-transparent dark:text-white"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full bg-white dark:bg-transparent dark:text-white"
          />
        </div>

        {/* Title */}
        <div>
          <p className="mb-1 text-gray-600 dark:text-white/70">
            Select Your Title
          </p>
          <div className="flex flex-wrap gap-2">
            {titleOptions.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setTitle(role)}
                className={`px-3 py-1 rounded-full border transition font-medium ${
                  title === role
                    ? "bg-cyan-500 text-white border-cyan-500"
                    : "text-[#23282b] dark:text-[#D9DFF2] border-gray-300 dark:border-white/20"
                } hover:bg-cyan-600 hover:text-white`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* About */}
        <textarea
          rows={4}
          placeholder="Tell us about yourself..."
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="textarea textarea-bordered w-full bg-white dark:bg-transparent dark:text-white"
        />

        {/* Age & Gender */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            min={14}
            max={100}
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="input input-bordered w-full bg-white dark:bg-transparent dark:text-white"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select select-bordered w-full bg-white dark:bg-transparent dark:text-white"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Photo URL */}
        <input
          type="text"
          placeholder="Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="input input-bordered w-full bg-white dark:bg-transparent dark:text-white"
        />

        {/* Skills */}
        <div>
          <p className="mb-1 text-gray-600 dark:text-white/50">Select Skills</p>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map(({ name, logo }) => {
              const selected = skills.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleSkill(name)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm border font-mono transition ${
                    selected
                      ? "bg-cyan-400 text-white dark:text-gray-900 border-cyan-400 font-semibold"
                      : "text-[#23282b] dark:text-[#bbc0d1] border-gray-300 dark:border-white/20"
                  } hover:bg-cyan-600 hover:text-white`}
                >
                  <img src={logo} alt={name} className="w-5 h-5 rounded" />
                  &lt;{name}&gt;
                </button>
              );
            })}
          </div>
        </div>

        {/* City & Country */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input input-bordered w-full bg-white dark:bg-transparent dark:text-white"
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input input-bordered w-full bg-white dark:bg-transparent dark:text-white"
          />
        </div>

        {/* Save + Delete Buttons */}
        <div className="text-center flex flex-col md:flex-row justify-center items-center gap-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              saveProfile();
            }}
            className="btn btn-primary px-10 border-2 border-cyan-400 bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            Save Profile
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault(); // just in case
              setShowConfirm(true);
            }}
            className="btn px-10 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            Delete Profile
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1a1a2e] text-[#021431] dark:text-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
              <h2 className="text-lg font-semibold">Delete Profile</h2>
              <p className="text-sm">
                Are you sure you want to delete your profile permanently? This
                action cannot be undone.
              </p>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault(); // block default form action
                    handleDelete(); // perform delete
                  }}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>

      {/* Live Preview */}
      <PreviewCard
        user={{
          firstName,
          lastName,
          photoURL,
          title,
          about,
          gender,
          age,
          city,
          country,
          skills,
          isPremium
        }}
      />
    </div>
  );
};

export default EditProfile;