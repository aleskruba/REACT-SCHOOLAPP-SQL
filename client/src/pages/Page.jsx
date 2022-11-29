import React,{Component, useContext, useState} from 'react'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import axios from 'axios'
import moment from 'moment'
import ReactQuill from 'react-quill'
import { Fragment } from 'react'

export default function Page() {

  const [comment,setComment] = useState({})
  const [replies,setReplies] = useState([])


  const {currentUser,updatedProfile} = useContext(AuthContext)
 
  
  const navigate = useNavigate()

  const location =   useLocation()

  const commentID = location.pathname.split("/")[2]


  useEffect(()=>{
    const fetchData = async () => {
      try{
        const res = await axios.get(`/comments/${commentID}`)
        setComment(res.data)
  
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[commentID])

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await axios.get('/replies')
        setReplies(response.data)

      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[])

  const handleDelete = async () => {
    if(window.confirm("Are you sure that you want to delete this comment ?")) {
    try{
     await axios.delete(`/comments/${commentID}`)
      navigate('/')

    }catch(err){
      console.log(err)
    }
  }
  }

  
  const handleDeleteReply = async (replyID) => {
    if(window.confirm("Are you sure that you want to delete this reply ?")) {
 

    const data = {
      replyID: replyID
    }
    try{
     await axios.delete(`/replies/${replyID}`,{data})
      
      navigate('/')

    }catch(err){
      console.log(err)
    }
   }
  }






  return (
    <div className='single'>
        <div className="message">
          <div className="content">
          {!comment?.img  || comment?.img == 'nothing' ? <img src={`../upload/avatar.jpg`} alt="" />   : <img src={`../upload/${comment.img}`} alt="" /> }


             <div className='name'> <span><b>{comment?.username}</b></span></div>
             <div className='date'><p><i>Posted {moment(comment?.date).fromNow()} </i></p></div>
          </div>    
          <div className='comment'> 
                <div className='title1'>  <h3>{comment?.title}</h3></div>
                 <div className='p'> 
                 <ReactQuill value={comment?.comment} readOnly={true} theme={"bubble"}/>
                 </div>      
        
   
                 {comment?.cID   == updatedProfile?.id ?
                    <div className="replyDelete">

                    <div className="deleteText" onClick={handleDelete}> delete</div>
                    </div> : <div className="reply">
             <div className="replyText"> reply</div>
          </div>

                }
                 


       
       
        </div>
        </div >

        
        {replies.map(r=>(  
         
          <Fragment key={r.id}>
     
            
        {comment?.id == r?.uidcomment ?
        <div className="answer" >
           <div className='info'> 

           {!r?.img  || r?.img == 'nothing' ? <img src={`../upload/avatar.jpg`} alt="" />   : <img src={`../upload/${r?.img}`} alt="" /> }

             
                <div >
                 <span><b>{r.username}</b></span>
                 <p><i>{moment(comment?.date).fromNow()}</i> </p>
              </div>    
            </div>
                <div className='comment'><h3>RE : {r?.title}</h3>
                <p>{r?.reply}</p>
          
 
        {r.uiduser == currentUser?.id  ? 
              <div className="delete" onClick={()=>handleDeleteReply(r.id)}>
 

            delete
          </div> 
          : null }
        
        
          </div>

        </div>
        : null } 
        </Fragment>
      
        ))}

    </div>
  )
}
