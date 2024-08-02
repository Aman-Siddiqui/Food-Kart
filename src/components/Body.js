import RestaurantCards from "./RestaurantCards";
import resList from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";


// https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=393840&catalog_qa=undefined&submitAction=ENTER

const Body = () => {

    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const jsonData = await data.json()

        setRestaurants(jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setFilteredRestaurants(jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)

    }
    // Conditional Rendering

    return restaurants.length === 0 ? <Shimmer /> : (
        <div className="body">

            <div className="Filter">
                <div className="search-
                btn">
                    <input className="search-box" type="text" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
                    <button onClick={() => {
                        const filteredList = restaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()))
                        setFilteredRestaurants(filteredList)
                    }} >Search</button>
                </div>
                <button className="filter-btn" onClick={() => {
                    const filterdList = restaurants.filter((res) => res.info.avgRating > 4);
                    setRestaurants(filterdList)
                }}
                >
                    Top rated restaurants
                </button>
            </div>


            <div className="res-container">
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantCards key={restaurant.info.id} resData={restaurant} />
                ))}

            </div>


        </div>
    )
}

export default Body;