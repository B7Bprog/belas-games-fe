import axios from "axios";
import { useEffect, useState } from "react";

export const useCategories = (setIsLoading, setErrorState) => {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      // .get("https://belas-games.herokuapp.com/api/categories")
       .get("https://belas-games.vercel.app/api/categories")
      .then((response) => {
        setcategories(response.data.categories);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorState({ err });
      });
  }, []);
  return categories;
};
