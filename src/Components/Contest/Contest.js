import React from 'react'
import classes from './Contest.module.css'
import secondsToDhms from '../../Helper/Helper'


const Contest=(props)=>{

const Link="https://clist.by"+props.mp.get(props.name)

const contestDuration=secondsToDhms(props.duration).slice(0,-2)

const startTime=props.startTime.split("T")

const StartingDate=new Date(startTime[0]+" "+startTime[1]+" GMT").toLocaleString()
const date=StartingDate.split(",")
 return (
        <div className={classes.main}>
            <div className={classes.img1}>
            <a href={props.link} target="_blank"  rel="noreferrer" >
            <img 
                src={Link}
            />
            </a>
            </div>
            <div className={classes.sub} >
            <a href={props.link} target="_blank"  rel="noreferrer" >
            
            <h1>{props.event}</h1> 
            
            <p>Starting Date : { date[0]} <br/>
             Starting Time : {date[1]}<br/>
             Duration : {contestDuration} </p>
           </a>
            </div>
        </div>
    )

}

export default Contest