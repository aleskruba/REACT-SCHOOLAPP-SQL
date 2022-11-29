import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactQuill from 'react-quill'
import { AuthContext } from '../context/authContext'
import { useContext } from 'react'
import moment from 'moment'
const Moment = require('moment')


export default function Home() {

  const [comments,setComments] = useState([])




  useEffect(()=>{
    const fetchData = async () => {
      try{
     
        const res = await axios.get('/comments')
        setComments(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[])
  

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html") 
    return doc.body.textContent
  } 

  return (
 
    <div className='home'>
  

        {comments.sort((a,b)=>{
    return new Date(b.date) - new Date(a.date);
    }).map(comment=>(
        <div className="box" key={comment.id}
        >
            <Link className='link'  to={`/post/${comment.id}`}>
            <div className="comment-profil" >
          
                
                <div className="comment-items">
                    
                    <div className="img">               
                 {!comment?.img  || comment?.img == 'nothing' ? <img src={`../upload/avatar.jpg`} alt="" />   : <img src={`../upload/${comment.img}`} alt="" /> }
                    </div>
                    
                      <div className='item1'>
                            <span><b>{comment?.username}</b></span>           
                      </div>
                      <div className='item2'>
                          <i>{moment(comment?.date).format('DD.MM HH:m')}</i> 
                      </div>
                  </div>
            
            <div className="content">

                  
                <div className='title'>
                   <b> <ReactQuill
                      
                      value={'Title: '+comment.title}
                      readOnly={true}
                      theme={"bubble"}
                       /></b>  
                </div>
     
                <div className="text">
                   <ReactQuill value={comment.comment} readOnly={true} theme={"bubble"}/>
               
                </div>
               
                </div>
            </div>
            </Link>
            </div>
        ))}
       </div>

  )
}
