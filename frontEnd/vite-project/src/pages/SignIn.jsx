import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../Components/OAuth';

const  SignIn=()=> {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default SignIn;


// import React, { useState } from "react";
// import { Link ,useNavigate} from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";
// import OAuth from "../Components/OAuth";

// const SignIn= () => {

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const {loading,error}=useSelector((state)=>state.user);
//   // const [error, setError] = useState(null);
//   // const [loading, setLoading] = useState(false);

//   const navigate=useNavigate();
//   const dispatch=useDispatch();

//   const changeHandler = (e) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const config = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//        dispatch(signInStart());

//       const res = await fetch("/api/auth/signin", config);
//       const data = await res.json();
//       console.log(data);
//       setFormData({
//        email: "",
//         password: "",
//       });
//       if (data.success === false) {
//        dispatch(signInFailure(data.message))

//         return;
//       }
//     dispatch(signInSuccess(data))
//       navigate('/')
//     } catch (error) {
//       dispatch(signInFailure(error.message))
//     }
//   };

//   return (
//     <div className="p-3">
//       <h1 className="text-center text-3xl font-semibold my-7">Sign In</h1>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-4 w-full justify-center items-center"
//       >
//         <input
//           className="border w-96  p-3 rounded-lg"
//           type="email"
//           name="email"
//           value={formData.email}
//           placeholder="email"
//           onChange={changeHandler}
//         ></input>

//         <input
//           className="border w-96  p-3 rounded-lg"
//           type="password"
//           name="password"
//           value={formData.password}
//           placeholder="password"
//           onChange={changeHandler}
//         ></input>
//         <button
//           disabled={loading}
//           className="bg-slate-700 rounded-lg
//             text-white p-3 w-96 uppercase hover:opacity-95  disabled:opacity-80"
//         >
//           {loading ? "Loading..." : "SignIn"}
//         </button>
//        <OAuth></OAuth>
//       </form>
//       <div className="flex justify-center items-center mt-5 gap-2 ">
//         <p> Dont Have an Account?</p>
//         <Link to="/sign-up">
//           <span className="text-blue-700">Sign Up</span>
//         </Link>
//       </div>
//       {error && <p className="text-red-400 mt-5">{error}</p>}
//     </div>
//   );
// };

// export default SignIn;
