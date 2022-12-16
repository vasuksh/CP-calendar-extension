import { React, Component } from "react";
import axios from "axios";
import List from "./Components/List/List";
import Dropdown1 from "./Components/Dropdown/Dropdown";
import Spinner from "./Components/Spinner/Spinner";

// dropdown items array
const optionsAr = [
  {
    key: "Platform",
    value: "Platform",
    text: "Platform",
  },
];

//resources map
let mp = new Map();

const set = new Set();
let date = "";
var today

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contests: [],
      search: "",
      currentItem: "today",
      loading: true,
      Network: true,
      resourceRes: [],
    };
  }

  componentDidMount() {
    today = new Date();
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "-" +
      (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
      "T" 

    const Link="https://fastidious-moonbeam-eb613e.netlify.app/.netlify/functions/app/contestData"
    axios
      .get(Link)
      .then((response) => {

        this.setState({
          contests: response.data.objects,
          
        });

    const link="https://fastidious-moonbeam-eb613e.netlify.app/.netlify/functions/app/resources"
      
    axios.get(link).then((res) => {
      this.setState({
        resourceRes: res.data.objects,
        contests: response.data.objects,
        loading: false
      });

      console.log(res)
    });
      })
      .catch((e) => {
        this.setState({
          loading: false,
          Network: false,
        });

        console.log(e)
      });

    
  }

  render() {
    this.state.resourceRes.map((link) => {
      mp.set(link.name, link.icon);
    });

    if (!this.state.Network) {
      return (
        <div>
          <h1
            style={{
              color: "#6a5acd",
              marginTop: "25%",
              textAlign: "center",
            }}
          >
            {" "}
            No Network ! <br /> Try Again
          </h1>
        </div>
      );
    }

    this.state.contests.map(({ duration, resource }) => {
      const res = JSON.stringify(resource).slice(1, -1);

      if (!set.has(res) && duration <= 86400) {
        const link = "https://clist.by" + mp.get(res);
        set.add(res);
        const obj = {
          key: res,
          value: res,
          text: res,
          image: {
            avatar: true,
            src: link,
          },
        };

        optionsAr.push(obj);
      }
    });

    const handler = (e, { value }) => {
      const res = '"' + value + '"';

      this.setState({ search: res });
    };
 
    let filtered = this.state.contests.filter(
      ({ resource, start, end, duration }) => {
        resource = JSON.stringify(resource);

        const st = '"' + "Platform" + '"';
        
        var tempTime =(today.getHours()<10?('0'+today.getHours()):today.getHours())+ ":" + 
                      (today.getMinutes()<10?('0'+today.getMinutes()):today.getMinutes() )+ ":" + 
                      (today.getSeconds()<10?('0'+today.getSeconds()):today.getSeconds());


        if (duration > 86400 ) return;


        start = JSON.stringify(start).split("T");

        const currdate = start[0].substr(1);

        const c = date.split("T");

        end = end.split("T");

        

        //filtering by date
        var x = Date.parse(c[0]);
        var y = Date.parse(currdate);

        if (this.state.currentItem === "today")
         {
          // console.log(end[1],tempTime)
            return this.state.search === st && end[1]>=tempTime
            ? y === x  && end[1]>=tempTime
            : resource.includes(this.state.search) && y === x  && end[1]>=tempTime;
          }

        return (
          (resource.includes(this.state.search) || this.state.search === st) &&
          y > x
        );
      }
    );

    const todayHandler = () => {
      this.setState({
        currentItem: "today",
      });
    };

    const upcomingHandler = () => {
      this.setState({
        currentItem: "upcoming",
      });
    };

    return (
      <div style={{ background: "#121212" }}>
        <Dropdown1
          options={optionsAr}
          defaultValue={"Platform"}
          onChange={handler}
          todayHandler={todayHandler}
          upcomingHandler={upcomingHandler}
          currentItem={this.state.currentItem}
        />
        {this.state.loading ? (
          <Spinner />
        ) : (
          <List mp={mp} filteredAr={filtered} />
        )}
      </div>
    );
  }
}

export default App;
