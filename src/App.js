import { React, Component } from "react";
import axios from "axios";
import List  from './Components/List/List'
import Dropdown1 from './Components/Dropdown/Dropdown'
import links from './resources.json'
import Spinner from './Components/Spinner/Spinner'


// dropdown items array
const optionsAr = [{
  key:  "Platform",
  value: "Platform",
  text: "Platform",
}];

//resources map
let mp =new Map()

function init(){
  console.log("hi1")
links.map((link)=>{
  mp.set(link.name,link.icon)
})
}

const set = new Set();
let date=""


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      contests: [],
      Year: new Date().getFullYear(),
      Month: new Date().getMonth() + 1,
      Day: new Date().getDate(),
      search: '',
      currentItem:"today",
      loading:true,
      Network:true
    };
  
    init()
  }

 
  componentDidMount() {

    const m =this.state.Month > "9" ? this.state.Month : "0" + this.state.Month;
    const d = this.state.Day > "9" ? this.state.Day : "0" + this.state.Day;
    date = this.state.Year + "-" + m + "-" + d + "T00:00:00";

    const Link="https://shrouded-shore-92504.herokuapp.com/https://clist.by/api/v2/contest/?username=vasuKsh&api_key="+process.env.REACT_APP_CLIST+"&limit=150&end__gt="+date+"&order_by=start"

     axios.get(Link)
        .then((response) => {
          this.setState({ contests: response.data.objects ,
            loading:false
          });
        }).catch((e)=>{
          this.setState({ 
            loading:false,
            Network:false
          })
        }); 
  
  }

  render() {

    if(!this.state.Network)
    {
      return (
        <div>
          <h1 style={{
              color:"#6a5acd",
              marginTop:"25%",
              textAlign:"center"
          }}> No Network !  <br/> Try Again</h1>
        </div>
    )
    }


   this.state.contests.map(({resource,duration}) => {

      const res = JSON.stringify(resource).slice(1, -1);

      if (!set.has(res) && duration<=86400) {
      const link="https://clist.by"+mp.get(res)
        set.add(res);
        const obj = {
          key: res, 
          value: res,
          text: res,
          image: {
            avatar: true,
            src:link
          },
        };

        optionsAr.push(obj);
      }

    });

    const handler = (e, {value}) => {
   
      const res="\""+value+"\""

      this.setState({search:res})
      
      
    };

 
    let filtered = this.state.contests.filter(({resource,start,end,duration})=>{

       resource=JSON.stringify(resource)
       
       const st="\""+"Platform"+"\""

       const lim=86400;

       if(duration>lim) return

       start=JSON.stringify(start).split("T")

       const currdate=start[0].substr(1)

       const c=date.split("T")
      
        end=end.split("T")
      
        //filtering by date
        var x=Date.parse(c[0])
        var y=Date.parse(currdate)

        if(this.state.currentItem==="today")
        return (this.state.search===st)? (y==x) :(resource.includes(this.state.search)  && y===x)
        
        return (resource.includes(this.state.search) || this.state.search===st) && y>x

    })

    const todayHandler=()=>{
      this.setState({
              currentItem:"today"                
      })
    }

    const upcomingHandler=()=>{
      this.setState({
        currentItem:"upcoming" 
      })
    }
  
  
    return (
      <div
      style={{background:"#121212"}}
      >
       
        <Dropdown1
           options={optionsAr}
           defaultValue={"Platform"}
           onChange={handler}
           todayHandler={todayHandler}
           upcomingHandler={upcomingHandler}
           currentItem={this.state.currentItem}

        />
        {(this.state.loading)?<Spinner/>: <List 
          mp={mp}
          filteredAr={filtered}
        />}
      </div>
    );
  }
}

export default App;
