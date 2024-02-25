import React, { useEffect, useState } from 'react'
import { getLeaderboard } from '../common/API'
import './Leaderboard.css'
import { Link } from 'react-router-dom'

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] =  useState([])

  useEffect(()=>{
    const handleLeaderboard = async()=>{
     const response = await getLeaderboard()
     if(response.status === 200){
       const sortedData = response.data.sort((a,b)=>b.wins - a.wins)
       console.log(sortedData);
        setLeaderboard(response.data)
     }
    }
    handleLeaderboard();
  }
  ,[])
  return (
    <div className='leaderboard-container'>
       <div className="leaderboard">
        <div className='gameboard-btn'><Link className='link' to="/">Back to Gameboard</Link></div>
       {
       leaderboard.length > 0 ?(
        leaderboard.map((user, i)=>(
            <div className='leaderboard-data'><span>{user.username}</span>
            <span style={{marginLeft:10}}>{user.wins}</span></div>
        ))
       ):(<h1>No UserFound</h1>)
        }
       </div>
    </div>
  )
}

export default Leaderboard