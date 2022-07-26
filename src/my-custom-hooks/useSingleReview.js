import axios from "axios";
import { useEffect, useState } from "react";

export const useSingleReview = (
  setIsLoading,
  setErrorState,
  selectedCategory,
  id = ""
) => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://belas-games.herokuapp.com/api/reviews/${id}`)
      .then((response) => {
        setReview(response.data.review);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorState({ err });
      });
  }, [selectedCategory]);

  return review;
};
