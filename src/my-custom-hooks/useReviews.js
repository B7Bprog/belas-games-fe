import axios from "axios";
import { useEffect, useState } from "react";

export const useReviews = (
  setIsLoading,
  setErrorState,
  selectedCategory,
  selectedSort,
  selectedOrder
) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://belas-games.herokuapp.com/api/reviews", {
        params: {
          sort_by: selectedSort,
          order: selectedOrder,
        },
      })
      .then((response) => {
        setReviews(response.data.reviews);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorState({ err });
      });
  }, [selectedCategory, selectedSort, selectedOrder]);
  return reviews;
};
