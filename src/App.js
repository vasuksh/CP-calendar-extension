import { React, Component } from "react";
import axios from "axios";
import List  from './Components/List/List'
import Dropdown1 from './Components/Dropdown/Dropdown'
import links from './resources.json'
import Spinner from './Components/Spinner/Spinner'
import secondsToDhms from './Helper/Helper'

// dropdown items array
const optionsAr = [{
  key:  "ALL",
  value: "ALL",
  text: "ALL",
}];

//resources map
let mp =new Map()
links.map((link)=>{
  mp.set(link.name,link.icon)
})

const set = new Set();
let date=""

class App extends Component {
  state = {
    contests: [],
    Year: new Date().getFullYear(),
    Month: new Date().getMonth() + 1,
    Day: new Date().getDate(),
    search: '',
    currentItem:"today",
    loading:true,
    API:null
  };

  

  componentDidMount() {

    const m =this.state.Month > "9" ? this.state.Month : "0" + this.state.Month;
    const d = this.state.Day > "9" ? this.state.Day : "0" + this.state.Day;
    date = this.state.Year + "-" + m + "-" + d + "T00:00:00";

    // for production
    // axios.post("https://o08vs2mete.execute-api.ap-south-1.amazonaws.com/default/apiSecureKeys")
    // .then((response)=>{
    //   this.setState({API:response.data.message},()=>{
    //     axios
    //     .get(
    //       "https://clist.by/api/v2/contest/?username=vasuKsh&api_key="+this.state.API+"&limit=250&end__gt=" +
    //         date +
    //         "&order_by=start"
    //     )
    //     .then((response) => {
    //       this.setState({ contests: response.data.objects ,
    //         loading:false
    //       });
    //     });
    //   })
    // })


    //for development
     axios.get(
          "https://clist.by/api/v2/contest/?username=vasuKsh&api_key="+process.env.REACT_APP_CLIST+"&limit=250&end__gt=" +
            date +
            "&order_by=start"
        )
        .then((response) => {
          this.setState({ contests: response.data.objects ,
            loading:false
          });
        }); 
  
  
  }

  render() {


   this.state.contests.map(({resource}) => {

      const res = JSON.stringify(resource).slice(1, -1);

      if (!set.has(res)) {
        set.add(res);
        const obj = {
          key: res,
          value: res,
          text: res,
          image: {
            avatar: false,
          },
        };

        optionsAr.push(obj);
      }

    });

    const handler = (e, {value}) => {
   
      const res="\""+value+"\""

      this.setState({search:res})
      
      
    };

 
    let filtered = this.state.contests.filter(({resource,start,duration})=>{

       const res=JSON.stringify(resource)
       const st="\""+"ALL"+"\""
       const temp=JSON.stringify(start).split("T")
       const currdate=temp[0].substr(1)
       const c=date.split("T")

       duration=secondsToDhms(duration).split(",")

      //  var days=null
      //  if(duration[0].includes("days"))
      //  {
      //    const p=duration[0].split(" ")
      //    days=p[0]
      // }

      //filtering by date
      var x=Date.parse(c[0])
      var y=Date.parse(currdate)

        if(this.state.currentItem==="today")
        {
         return ((res.includes(this.state.search) || this.state.search===st) && x===y)
        }
      
        return (this.state.search!==st)?res.includes(this.state.search) && y>x :y>x 

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
           defaultValue={"ALL"}
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
