import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  console.log(items);
  return (
    <div>
      {items.map((item) => (
        <div className="p-2 m-2 border-gray-500 border-b-2 text-left ">
          <div className="flex justify-between">
            <div>
              <span className="text-lg font-semibold">
                {item.card.info.name} -
              </span>
              <span>
                ₹
                {Math.floor(item.card.info.price / 100) ||
                  Math.floor(item.card.info.defaultPrice / 100)}
              </span>
            </div>
            <div>
              <button
                onClick={() => handleAddItem(item)}
                className=" bg-white w-20 h-10 font-black text-green-500 rounded-lg shadow hover:shadow-black "
              >
                ADD
              </button>
            </div>
          </div>
          <p className="text-sm">{item.card.info.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
