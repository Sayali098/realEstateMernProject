import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import OAuth from "../Components/OAuth";

const SignUp = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3">
      <h1 className="text-center text-3xl font-semibold my-7">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full justify-center items-center"
      >
        <input
          className="border w-96   p-3 rounded-lg"
          type="text"
          name="username"
         
          placeholder="Username"
          id='username'
          onChange={handleChange}
        ></input>

        <input
          className="border w-96  p-3 rounded-lg"
          type="email"
          name="email"
        
          placeholder="email"
          id='email'
          onChange={handleChange}

        ></input>

        <input
          className="border w-96  p-3 rounded-lg"
          type="password"
          name="password"
       
          placeholder="password"
          id='password'
          onChange={handleChange}

        ></input>
        <button
          disabled={loading}
          className="bg-slate-700 rounded-lg
            text-white p-3 w-96 uppercase hover:opacity-95  disabled:opacity-80"
        >
          {loading ? "Loading..." : "SignUp"}
        </button>
        <OAuth></OAuth>
      </form>
      <div className="flex justify-center items-center mt-5 gap-2 ">
        <p> Have an Account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-400 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
