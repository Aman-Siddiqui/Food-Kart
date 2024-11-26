import RestaurantCards, {withLabel} from "./RestaurantCards";
import resList from "../utils/mockData";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  const {SetUserName, loggedIn}=useContext(UserContext)

  const LabelledRestaurantCard = withLabel(RestaurantCards);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );


    const jsonData = await data.json();

    setRestaurants(
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredRestaurants(
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <h1>Looks like you're offline!! Please check you internet Connection.</h1>
    );
  }

  // Conditional Rendering
  return restaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="w-11/12 mx-44">

      <div className=" flex">
        <div className="search m-4 p-4">
          <input
            className=" border border-solid border-blue-950 shadow-lg"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 m-4 bg-green-100 rounded-lg shadow-lg"
            onClick={() => {
              const filteredList = restaurants.filter((res) =>res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Search
          </button>
        </div>

        <div className="m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg shadow-lg"
            onClick={() => {
              const filterdList = restaurants.filter(
                (res) => res.info.avgRating>4
              );
              setFilteredRestaurants(filterdList);
            }}
          >
            Top rated restaurants
          </button>
        </div>
        
        <div className="m-4 p-4 flex items-center">
          <label>User name :</label>
          <input className= " m-2 p-2 border border-black" value={loggedIn} onChange={(e)=>
            SetUserName(e.target.value)
          }></input>
        </div>
      </div>

      <div className=" flex flex-wrap">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/Restaurant/" + restaurant.info.id}
          >
            {
              restaurant.info.hasOwnProperty('aggregatedDiscountInfoV3') ?(<LabelledRestaurantCard resData={restaurant}/>) : (<RestaurantCards resData={restaurant} />)
            
            
          }
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
