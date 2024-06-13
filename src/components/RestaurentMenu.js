// import { useState } from "react";
import Shimmer from "./Shimmer";

import { useParams } from "react-router-dom";
import useRestaurentMenu from "../utils/useRestaurentMenu";
import RestaurentCatogories from "./RestaurentCatogories";

const RestaurentMenu = () => {
  // const [showIndex, setShowIndex] = useState(0);
  const { resId } = useParams();
  const resInfo = useRestaurentMenu(resId);

  if (resInfo === null) return <Shimmer />;
  const { name, cuisines } = resInfo?.cards[2]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
  // console.log(
  //   "itemCards",
  //   resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
  // );

  const catogories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // console.log(catogories);

  return (
    <div className="menu text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">{cuisines.join(", ")}</p>

      {catogories.map((catogory, index) => (
        <RestaurentCatogories
          data={catogory?.card?.card}
          // showItems={index === showIndex ? true : false}
          // setShowIndex={() => setShowIndex(index)}
        />
      ))}

      {/* <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name}- {"Rs."}
            {item.card.info.defaultPrice / 100 || item.card.info.price / 100}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default RestaurentMenu;
