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
    console.log("inside useEffect in useReviews");

    setIsLoading(true);
    axios
      // .get("https://belas-games.herokuapp.com/api/reviews", {
      .get("https://belas-games.vercel.app/api/reviews", {
        params: {
          sort_by: selectedSort,
          order: selectedOrder,
        },
      })
      .then((response) => {
        console.log(response, "response here in useReviews");

        setReviews(response.data.reviews);
        console.log(response.data.reviews, "reviews here");

        setIsLoading(false);
      })
      .catch((err) => {
        setErrorState({ err });
      });
  }, [selectedCategory, selectedSort, selectedOrder]);
  return reviews;
};
