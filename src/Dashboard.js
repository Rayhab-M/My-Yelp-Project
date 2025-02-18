import React, { useState } from "react";
import RestaurantList from "./RestaurantList";

const Dashboard = ({ handleSignOut }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Predefined restaurants
  const predefinedRestaurants = [
    { name: "Mama's Kitchen", description: "Home-made cooked meals with love." },
    { name: "Italian Bistro", description: "Authentic Italian pasta and pizza, located in Italy." },
    { name: "Sushi World", description: "Fresh sushi and Japanese cuisine, very yummy." },
    { name: "Steakhouse", description: "Juicy steaks and BBQ specials made for you." },
    { name: "Vegan Paradise", description: "Plant-based meals for a healthy lifestyle, enjoy your meal!!!!." },
  ];

  const addRestaurant = (name) => {
    const newRestaurant = { name, description: "User-added restaurant" };
    setRestaurants([...restaurants, newRestaurant]);
  };

  return (
    <div className="row vh-100">
      {/* Sidebar */}
      <nav className="col-md-3 bg-dark text-white p-3 d-flex flex-column">
        <h3>Restaurants</h3>
        <ul className="list-group">
          {predefinedRestaurants.map((restaurant, index) => (
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
        <button className="btn btn-danger mt-auto w-100" onClick={handleSignOut}>
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <main className="col-md-6 p-4">
        <RestaurantList restaurants={restaurants} addRestaurant={addRestaurant} setSelectedRestaurant={setSelectedRestaurant} />
      </main>

      {/* Restaurant Details Section */}
      <aside className="col-md-3 bg-light p-4">
        {selectedRestaurant ? (
          <>
            <h2>{selectedRestaurant.name}</h2>
            <p>{selectedRestaurant.description}</p>
          </>
        ) : (
          <h4>Select a restaurant to see details</h4>
        )}
      </aside>
    </div>
  );
};

export default Dashboard;
