import { CDN_URL } from "../utils/constant";

const RestaurantCard = ({ resData }) => {
  const { name, cuisines, avgRating, cloudinaryImageId, areaName } =
    resData.info;
  return (
    <div className="m-2 w-[270px] bg-gray-300 rounded-lg">
      <img
        className="rounded-lg w-full m-0 h-[250px] object-cover object-center"
        src={CDN_URL + cloudinaryImageId}
        alt="biryani"
      />
      <h2 className="m-2 font-bold py-2 text-xl">{name}</h2>
      <h4 className="m-2">{cuisines.join(", ")}</h4>
      <h4 className="m-2">{avgRating} stars</h4>
      <h4 className="m-2">{areaName} </h4>
    </div>
  );
};

// Higher Order Components

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-green-800 text-white rounded-lg">
          Open
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
