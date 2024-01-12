import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import MealItem from "./MealItem";
import Error from "./Error";
export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await axios.get("http://localhost:3000/meals");
        if (response.status === 200) {
          console.log("OK response");
        }
        const meals = await response.data;
        setLoadedMeals(meals);
      } catch (error) {
        setError(error);
      }
    }
    fetchMeals();
  }, []);

  if (error) {
    return <Error title={"Failed to fetch meals"} message={error.message} />;
  }
  if (loadedMeals.length === 0) {
    return <p className="center">Fetching Meals </p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
