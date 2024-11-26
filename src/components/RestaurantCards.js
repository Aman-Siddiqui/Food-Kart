import { CDN_URL } from "../utils/constant";

const RestaurantCards = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    deliveryTime,
  } = resData?.info;

  return (
    <div className="p-4 m-4 w-72 rounded-lg shadow-lg hover:scale-90 transition-transform">
      <img
        className="res-logo"
        alt="res-logo"
        src={CDN_URL + resData.info.cloudinaryImageId}
      />
      <h3 className="py-4 font-semibold text-xl">{name}</h3>
      <h4 className="text-xl text-gray-500 font-semibold">{cuisines.join(", ")}</h4>
      <h4>{"⭐"+ " "+avgRating}</h4>
      <h4>{deliveryTime}</h4>
    </div>
  );
};

export const withLabel = (RestaurantCards) => {
  return (props) => {
    const { resData } = props;

    return (
      <div>
        <label
          style={{
            background: "linear-gradient(to top, black, transparent)",
            color: "white",
            position: "absolute",
            padding: "4px", 
          }}
        >
          {resData.info.aggregatedDiscountInfoV3.header +" "+resData.info.aggregatedDiscountInfoV3.subHeader}
        </label>
        <RestaurantCards {...props} />
      </div>
    );
  };
};

export default RestaurantCards;
