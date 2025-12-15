import { useEffect, useState } from "react";
import { api } from "../../../api/Axios";
import Layout from "../../Components/Layout";
import "./AdminFeedback.css";

const AdminFeedback = () => {

  const [feedbacks,setFeedbacks] = useState([])

  useEffect(()=>{
    api.get("/feedbacks")
    .then(res=>setFeedbacks(res.data))
    .catch(err=>console.log(err))
  },[])
const approve= async(id)=>{
  await api.patch(`/feedbacks${id}`,{feed:"approved"})
  setFeedbacks((prev)=>(
    prev((item)=>(
      item.id===id?{...item,feed:"approved"}:item
    ))
  ))
}

  const deleteFeed = async(id)=>{
    const sure=Window.prompt("Are u sure want to delete this ?")
    if(!sure) return;

    await api.delete(`/feedbacks/${id}`)
    setFeedbacks((prev)=>(
      prev.filter((item)=>item.id !== id)
    ))
  }
  return (
    <div>
      <Layout>
        <div className="admin-feed-pg">
          <h2>User Feedbacks</h2>
          {feedbacks.length===0 ?(
            <p>No feedbacks given</p>
          ):(
            <table className="feed-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Feedback</th>
                  <th>Rating</th>
                  <th>Show</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((item)=>(
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.review}</td>
                    <td>{item.rating} ★</td>
                    <td>
                      <button className="ys-btn" onClick={()=>approve(item.id)} disabled={item.feed == "approved"}>{item.feed=="approved" ? "approved":""}</button>
                      <button className="dlt-btn" onClick={()=>deleteFeed(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default AdminFeedback