import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";

const Body = () => {
  const [listOfRestaurent, setListOfRestaurent] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurentCardPromoted = withPromotedLabel(RestaurantCard);

  console.log("Body Rendered", listOfRestaurent);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.568955437027267&lng=77.28514369948566&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    setListOfRestaurent(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRes(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  if (listOfRestaurent === 0) {
    return <Shimmer />;
  }

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return <h1>Sorry you are offline</h1>;

  return (
    <div className="body">
      <div className="flex justify-center">
        <div className="search m-4 p-4 flex-wrap">
          <input
            type="text"
            placeholder="Domino's"
            className=" px-4 py-2 border border-solid border-black rounded-lg"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 m-2 bg-gray-600 rounded-lg text-cyan-50"
            onClick={() => {
              const filteredRestaurent = listOfRestaurent.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRes(filteredRestaurent);
            }}
          >
            Search
          </button>
        </div>
        <div className=" m-4 p-4 flex items-center ">
          <button
            className="px-4 py-2 bg-green-200 rounded-lg font-bold"
            onClick={() => {
              const filteredRes = listOfRestaurent.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRes(filteredRes);
            }}
          >
            Top Rated Restaurent
          </button>
        </div>
      </div>
      <div className="justify-center w-full h-full flex flex-wrap rounded-lg items-stretch">
        {filteredRes.map((restaurent) => (
          <Link
            to={"/restaurants/" + restaurent.info.id}
            key={restaurent.info.id}
          >
            {/* if the restaurent is open then show open labe' */}

            {restaurent.info.isOpen ? (
              <RestaurentCardPromoted resData={restaurent} />
            ) : (
              <RestaurantCard resData={restaurent} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
