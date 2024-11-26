import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constant";
import { addItem } from "../utils/cartSlice";

const ItemCards = ({ items }) => {

  const dispatch = useDispatch()
  const handleAddItem = (item) =>{
    //dispatch an action
    dispatch(addItem(item))    
  }

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className=" flex justify-between text-left border-gray-200 border-b-4 p-1 m-1"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span className="font-bold">{item.card.info.name}</span>
              <span> - ₹ {item.card.info.price / 100}</span>
            </div>
            <p className="text-s">{item.card.info.description}</p>
          </div>

          <div className="w-3/12 p-2">
            <div className="absolute bg-white text-green-700 text-lg font-semibold my-16 mx-8 p-2 rounded-lg">
              <button onClick={()=> handleAddItem(item)}>Add+</button>
            </div>
            <img
              src={CDN_URL + item.card.info.imageId}
              className="w-32 rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemCards;
