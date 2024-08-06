import { useState } from "react";

const User = (props) => {
  const [count, setCount] = useState(0);

  const { name, location } = props;
  return (
    <>
      
      <div>
        <button onClick={()=>{
            setCount(count+1)
        }}> Button

        </button>
      </div>
      <div className="user-card">
        <h1>{count}</h1>
        
        <h1>{name}</h1>
        <h2> {location}</h2>
        <h3>email@address</h3>
      </div>
    </>
  );
};

export default User;
