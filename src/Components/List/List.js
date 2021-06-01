import {React,Component} from 'react'
import Contest from '../Contest/Contest'

class List extends Component{
    
render()
{   
    if(this.props.filteredAr.length===0)
    {

        return (
            <div>
              <h1 style={{
                  color:"#6a5acd",
                  marginTop:"25%",
                  textAlign:"center"
              }}>  No Contests!</h1>
            </div>
        )
    }
    

    const lists=this.props.filteredAr.map((contest,i) => {
        
            return (<Contest
            key={i}
            event={contest.event}
            link={contest.href}
            name={contest.resource}
            duration={contest.duration}
            startTime={JSON.stringify(contest.start).slice(1, -1)}
            mp={this.props.mp}
          />
    )
        })

    return (
        <div>
            {lists}
        </div> 
    )

}

}

export default List