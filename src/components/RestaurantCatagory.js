import { useState } from "react";
import ItemCards from "./ItemCards";

const RestaurantCatagory = ({ data,showItems, setShowIndex }) => {



  const handleClick = () =>{
    
    setShowIndex()
  }
  
  return (
    <div>

      {/* Header  */}
      <div className="w-6/12 bg-slate-100 shadow-lg mx-auto my-4 p-4 ">
        <div className="flex justify-between cursor-pointer" onClick={handleClick}>
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>↓</span>
        </div>

        {/* Accordian Body */}

      { showItems && <ItemCards items={data.itemCards} />}
      </div>

    </div>
  );
};

export default RestaurantCatagory;
