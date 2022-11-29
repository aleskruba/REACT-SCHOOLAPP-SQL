import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import axios from 'axios'

export default function Navbar(props) {

  const {currentUser,logout,updatedProfile,setUpdatedProfile}= useContext(AuthContext)

  useEffect(()=>{
    setUpdatedProfile(currentUser)
  },[])

  useEffect(()=>{ 

    if(updatedProfile) {

    const fetchData = async () => {
      try{
        const res = await axios.get('/users')
       
       setUpdatedProfile(res.data[0])
      
      }catch(err){
        console.log(err)
      }
    }
    fetchData() }
  },[])
   


  return (
    <div className='navbar'>

      <div className="container">
        <div className="logo">
         <Link to="/"> <img className='image' src="https://www.freeiconspng.com/thumbs/classes-icon/classes-icon-17.png" alt="" /></Link>
          </div>
     

        <div className="links">
               <div className="greet">
         {currentUser && <h4 className='currentUser'>Welcome! {updatedProfile?.username ? updatedProfile?.username : currentUser.username}  </h4> }
         </div>
         <Link className='link' to="/grades">
         <div className="example">

    {!updatedProfile?.img || updatedProfile?.img == 'nothing' ?    <img src={`../upload/avatar.jpg`}  />
               :
         <img src={`../upload/${updatedProfile?.img}`} /> 
      } 
    
       {/*./upload/${currentUser?.img} */} 
      
          <div className="fadedbox">
    <div className="title text"><b>Your grades</b></div>
  </div></div></Link>
          
          <span className='comment'>
            <Link className='link' to="/comment">
             Comment</Link></span>
             
             {currentUser && 
             <Link className='link'  to={`/updateuser/${currentUser.id}`} state={updatedProfile} >
             <div className='update'>
               <span className='comment' >Profile</span> 
              </div></Link>}

         
             <div className="logout">
               <span className='comment' onClick={logout} >Logout</span> 
              </div>
            </div>
      </div>
    </div>
  )
}
