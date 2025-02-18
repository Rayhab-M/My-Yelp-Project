
import React, { useState } from "react";

const RestaurantList = ({ restaurants, addRestaurant, setSelectedRestaurant }) => {
  const [newRestaurant, setNewRestaurant] = useState("");

  const handleAddRestaurant = () => {
    if (newRestaurant.trim()) {
      addRestaurant(newRestaurant);
      setNewRestaurant("");
    }
  };

  return (
    <div>
      <h2>Add New Restaurants</h2>
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="New Restaurant Name"
          value={newRestaurant}
          onChange={(e) => setNewRestaurant(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddRestaurant}>
          Add
        </button>
      </div>

      <h3>Restaurants List:</h3>
      <ul className="list-group">
        {restaurants.map((restaurant, index) => (
          <li
            key={index}
            className="list-group-item list-group-item-action"
            onClick={() => setSelectedRestaurant(restaurant)}
            style={{ cursor: "pointer" }}
          >
            {restaurant.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
