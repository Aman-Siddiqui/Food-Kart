import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCatagory from "./RestaurantCatagory";
import { useState } from "react";

const RestrauntsMenu = () => {

  const [showIndex, setShowIndex] = useState()
 // console.log("ShowIndex", showIndex)
  
  const {resId} = useParams()


  const resInfo = useRestaurantMenu(resId);



  if (resInfo === null) return <Shimmer />;

  const { name, id, city, cuisines, costForTwoMessage } =
    resInfo.cards[2].card.card.info;
  const { itemCards } =
    resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card;

 // console.log("ItemsCards", resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards)

    const catagories = resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter((c)=>
      c.card?.["card"]?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

 //  console.log("Catagories",catagories)

  return (
    <div className="text-center">
      <h1 className="font-bold text-2xl my-6">{name}</h1>
      <p className="text-lg font-bold">{cuisines.join(", ")}- {costForTwoMessage}</p>

      {catagories.map((catagory, index)=>
        <RestaurantCatagory
         key={catagory?.card?.card.title} 
         data={catagory?.card?.card}
         showItems={index=== showIndex ? true: false}
         
         setShowIndex={()=>setShowIndex(index)}    
          />   
         
      )}

           
    </div>
  );
};

export default RestrauntsMenu;




  
          {/* <h3>
        <ul>
          {itemCards.map((item) => (
            <li key={item.card.info.id}>
              {item.card.info.name} - Rs.
              {item.card.info.defaultPrice / 100 || item.card.info.price / 100}
            </li>
          ))}
        </ul>
      </h3> */}