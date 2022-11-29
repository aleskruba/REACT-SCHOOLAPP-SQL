
import {db} from "../db.js" 


export const getReplies = (req,res) => {

    
    const q =   "SELECT r.id, r.uiduser,  r.reply, r.uidcomment,  `username`, `title`, `comment`, `img` FROM users u JOIN comments c  JOIN replies r ON c.id = r.uidcomment AND u.id = r.uiduser ";

    db.query(q,(err,data)=>{
        if(err) return res.send(err)
        return res.status(200).json(data)
    })

}

export const addReply = (req,res)=>{

}


export const deleteReply = (req, res) => {
    
      const q = "DELETE FROM replies WHERE `id` = ? ";
      const values = [req.body.replyID]
      console.log(req.body.replyID)
      db.query(q,[values] , (err, data) => {
        if (err) return res.status(403).json("You can delete only your post!");
  
        return res.json("Reply has been deleted!");
      });
 };
