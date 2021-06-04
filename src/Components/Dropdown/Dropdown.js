import { Dropdown } from "semantic-ui-react";
import React from 'react'
import classes from './Dropdown.module.css'


const Dropdown1=(props)=>{


    return(
        <div>
          <nav style={{
            display:"flex",
            listStyle:"none",
            justifyContent:"space-evenly",
            marginBottom:"5%"
          }}
          className={classes.navbar}
          >

  
        <li  
        style={
          {
            marginTop:"4%",
           backgroundColor:"#181818",
           paddingBottom:"15px",
           paddingLeft:"10px",
           paddingRight:"10px",
           boxSizing:"fit",
           borderRadius:"13.6165px",
          }}>
         <span style={{color:"#6a5acd"}}>         
          <br />
          <Dropdown
            inline
            // placeholder={"Select Platform"}
            defaultValue={props.defaultValue}
            options={props.options}
            onChange={props.onChange}
            scrolling={true}
            
          />
          <br />
        </span>
        </li>
   
         
        <li 
          className={(props.currentItem==="today")?classes.list2:classes.list}
          onClick={props.todayHandler}
        >Today</li>
        
        <li  
           className={(props.currentItem==="upcoming")?classes.list2:classes.list}
          onClick={props.upcomingHandler}
          >Upcoming</li>
      </nav>
        </div>
    )
}

export default Dropdown1