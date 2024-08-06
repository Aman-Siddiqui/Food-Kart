import React from "react";

class UserClass extends React.Component {

    constructor(props){
        super(props)

        this.state={
          count :0

        }
    } 
  render() { 
    const {name, location} = this.props  
    return (
      <div className="user-card">
        <h1>{this.state.count}</h1>
        <button onClick={()=>{
          this.setState({
            count : this.state.count +1
          })
        }
          
        }>
          Count Increase
        </button>
        <h1>{name}</h1>
        <h2> {location}</h2>
        <h3>email@address</h3>
      </div>
    );
  }
}

export default UserClass;
