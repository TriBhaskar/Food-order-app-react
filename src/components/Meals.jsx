import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import MealItem from "./MealItem";
export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await axios.get("http://localhost:3000/meals");
      console.log(response.data);
      if (response.status === 200) {
        console.log("OK response");
      }
      const meals = await response.data;
      setLoadedMeals(meals);
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
