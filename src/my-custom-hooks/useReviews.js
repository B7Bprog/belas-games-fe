import axios from "axios";
import { useEffect, useState } from "react";

export const useReviews = (setIsLoading, setErrorState) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://belas-games.herokuapp.com/api/reviews")
      .then((response) => {
        setReviews(response.data.reviews);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorState({ err });
      });
  }, []);
  return reviews;
};
