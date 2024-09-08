import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { updateUserStart,updateUserSuccess,updateUserFailure
  ,deleteUserStart,deleteUserSuccess,deleteUserFailure,
  signOutUserStart,signOutUserSuccess,signOutUserFailure
 } from "../redux/user/userSlice.js";
// firebase storage
// allow read;
// allow write:if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch=useDispatch();
  const { currentUser,loading,error } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [fileperc, setFilePerc] = useState(0);
  
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formdata, setFormdata] = useState({});
 const [successUpdate,setSuccessUpdate] = useState(false);
 const [showListingError, setShowListingError] = useState(false);
 const [userListings, setUserListings] = useState([])
  console.log(formdata);

  console.log(file);
  console.log(fileUploadError);

  const changeHandler=(e)=>{
    
    setFormdata({...formdata,[e.target.id]:e.target.value})

  };


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is" + progress + "%done");
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) =>
          setFormdata({ ...formdata, avatar: downloadURL })
       
        );
 
      }
    );
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res=await fetch(`/api/user/update/${currentUser._id}`,{
      method:'POST',
      headers:{
      "Content-Type":"application/json"
      },
      // credentials: "include", 
      body:JSON.stringify(formdata),
      });

      const data=await res.json();
         console.log(data)
      if(!data.success){
      dispatch(updateUserFailure(data.message));
      return;
      }

      dispatch(updateUserSuccess(data));
   
      setSuccessUpdate(true);
      console.log("Update successful");
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }

  }
  // useEffect(() => {
  //   console.log("Update Success State Changed: ", successUpdate);
  // }, [successUpdate]);

  const handleDelete=async()=>{
      try {
        dispatch(deleteUserStart());

        const res=await fetch(`/api/user/delete/${currentUser._id}`,{
          method:'DELETE',
        })
        const data= await res.json();
      // console.log(data)
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
        }
        dispatch(deleteUserSuccess(data));
        console.log('user deleted successfully')
    } catch (error) {
      
      dispatch(deleteUserFailure(error.message))
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>No user data available</div>;
  }

  const handleSignOut=async()=>{

    try {
      dispatch(signOutUserStart());
      const res=await fetch('/api/auth/signout');
      const data=await res.json();
if(data.success === false){
  dispatch(signOutUserFailure(data.message));
return;
}

  dispatch(signOutUserSuccess(data));
    } catch (error) {
dispatch(signOutUserFailure(error.message))
      
    }
  
  }


  const handleShowListings=async()=>{
try {
  setShowListingError(false);
  const res=await fetch(`/api/user/listings/${currentUser._id}`);
  const data=await res.json();

  if(data.success){
    setShowListingError(true);
    return;
  }
  setUserListings(data)
  
} catch (error) {
  setShowListingError(true)
}
  }

  const handleListingDelete=async(listingId)=>{
    try {
      
      const res=await fetch(`/api/listing/delete/${listingId}`,{
        method:"DELETE",

      })
      const data=await res.json();
      if(data.success ===false){
        console.log(data.message);
        return;
      }

      setUserListings((prev)=>prev.filter((listing)=>listing._id !== listingId) )
    } catch (error) {
      console.log(error.message)
      
    }
  }

  

  return (
    <div className=" p-3 max-w-lg mx-auto  gap-4">
      <h1 className="text-center text-3xl  font-semibold my-7 ">Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-4 justify-center items-center">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        ></input>
        <img
          onClick={() => fileRef.current.click()}
          src={formdata.avatar || currentUser.avatar}
          className="rounded-full h-24 mx-auto w-24 object-cover cursor-pointer self-center mt-2"
     
         
           alt="profile"
        ></img>

         <p>
          {
            fileUploadError?(
            <span className="text-red-700">Error Image upload </span>
            )
            :
              fileperc>0 && fileperc < 100?(
              <span className="text-slate-700">
                {`uploading ${fileperc}%`}
              </span>)
              :fileperc===100?(
                <span className="text-green-700"> Image Successfully uploaded</span>
              )
              :
              
              (""
              )
            

          }
         </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 w-96 rounded-lg"
          defaultValue={currentUser.username}
          onChange={changeHandler}
        ></input>

        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 w-96 rounded-lg"
          defaultValue={currentUser.email} 
          onChange={changeHandler}
        ></input>

        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 w-96 rounded-lg"
          onChange={changeHandler}
        ></input>
        <button disabled={loading}
          className="p-3 bg-slate-700 w-96 text-white rounded-lg  uppercase
         hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'loading...' : 'Update'}
        </button>
        <Link 
        className="bg-green-700 text-white w-96 p-3 rounded-lg uppercase text-center hover:opacity-95"
         to={'/create-listing'}>Create Listing</Link>
      </form>
      <div className="flex justify-between mt-5 w-96 mx-auto ">
         <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete account</span>
       
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>

      <p className="text-red-700 mt-5">{error?error:''}</p>
     
      {/* {updateSuccess && <p className="text-green-700 mt-5">User is updated successfully</p>} */}
       <p className="text-green-700 mt-5"> {successUpdate ? 'User is updated successfully' : ''}</p>
      <button onClick={handleShowListings} className="text-green-700  w-full">Show Listing</button>
   <p>{showListingError?'error shoe listings':''}</p>
   
   {
    userListings && userListings.length>0&&
    <div className="flex flex-col gap-4">
      <h1 className="text-center mt-7 text-2xl font-semibold">Your Listing</h1>
      
  {
    userListings.map((listing)=>(
      <div key={listing._id} className="p-3 flex gap-4 justify-between items-center border rounded-lg  ">
    <Link to={`/listing/${listing._id}`}>
    <img className="w-16 h-16  object-contain" src={listing.imageUrls[0]} alt="listing cover"></img>
     </Link>
     <Link className=" flex-1 font-semibold  text-slate-700 hover:underline truncate" to={`/listing/${listing._id}`}>
    <p>{listing.name}</p>
     </Link>
     <div className="flex flex-col items-center">
      <button onClick={ ()=>handleListingDelete(listing._id)} className="text-red-700 uppercase">Delete</button>
      <Link to={`/update-listing/${listing._id}`}>
      <button className="text-green-700 uppercase">Edit</button>
      </Link>
      </div>
      </div>
    ))
  }
    </div>
   }
    </div>
  );
};

export default Profile;
