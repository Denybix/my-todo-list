import React, { useEffect } from "react";
import { useState } from "react";
import './todo.css'

const Todolist = () => 
{
    const [activity, setActivity] = useState("")
    const [displaydata, setDisplayData] = useState([])
    const [animateIndex, setAnimateIndex] = useState(null);
    const [animatedirection, setAnimateDirection] = useState(null);

    useEffect(()=>{
        const storedData = JSON.parse(localStorage.getItem('activitydata')) || []
        setDisplayData(storedData)
    },[])

    const handleSubmit = (e) => 
    {
        e.preventDefault()
        let existingactions = []
        try{
            existingactions = JSON.parse(localStorage.getItem('activitydata')) || []
            if(!Array.isArray(existingactions))
            {
                existingactions = []
            }
        }
        catch(error)
        {
            console.log("error parsing data:", error)
        }
        if(activity.trim() !=="")
        {
            const newaction = {activity}
            const updatedaction = [...existingactions, newaction]
            localStorage.setItem('activitydata',JSON.stringify(updatedaction))
            setDisplayData(updatedaction)
            setActivity("")
        }
    }   

    const itemup = (index) => 
    {   
        if(index>0)
        {
            setAnimateIndex(index);
            setAnimateDirection('up');
           
            setTimeout(() => {
                const updatedtasks = [...displaydata];
                [updatedtasks[index], updatedtasks[index - 1]] = [updatedtasks[index - 1], updatedtasks[index]];
                setDisplayData(updatedtasks);
                localStorage.setItem('activitydata',JSON.stringify(updatedtasks));
                setAnimateIndex(null);
                setAnimateDirection(null);
            },300);
        }
    } 

    const itemdown = (index) =>
    {
        if(index < displaydata.length - 1)
        {
            setAnimateIndex(index);
            setAnimateDirection('down');
           
            setTimeout(() => {
                const updatedtasks = [...displaydata];
                [updatedtasks[index], updatedtasks[index + 1]] = [updatedtasks[index + 1], updatedtasks[index]];
                setDisplayData(updatedtasks);
                localStorage.setItem('activitydata', JSON.stringify(updatedtasks));
                setAnimateIndex(null);
                setAnimateDirection(null);
            },300);
        }
    }

    const itemdelete = (index) =>
    {
        const updatedtasks = displaydata.filter((_,i) => i != index);
        setDisplayData(updatedtasks);
        localStorage.setItem('activitydata', JSON.stringify(updatedtasks)); 
    }
    
    return(
        <div className="todo-body">
            <form onSubmit={handleSubmit} className="todo-input">
                <label htmlFor="activity">Set your activities</label>
                <div className="form-input">
                    <input type="text" id="activity" placeholder="enter your activity" value={activity} onChange={(e)=>setActivity(e.target.value)}></input>
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>

            <div className="display-class">
                {displaydata.length > 0 ? (
                    displaydata.map((action,index)=>(
                        <div key={index} className={`activity-container ${animateIndex === index ? animatedirection === 'up' ? 'move-up':'move-down':''}`}>
                            <span className="text">{action.activity}</span>
                            <button className="up-button" onClick={()=>itemup(index)}>
                                <span className="material-symbols-outlined">arrow_upward</span>
                            </button>
                            <button className="down-button" onClick={()=>itemdown(index)}>
                                <span className="material-symbols-outlined">arrow_downward</span>
                            </button>
                            <button className="delete-button" onClick={()=>itemdelete(index)}>
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    ))
                    ):(
                        <p>No activities</p>
                    )   
                }
            </div>
        </div>
    )
}

export default Todolist;