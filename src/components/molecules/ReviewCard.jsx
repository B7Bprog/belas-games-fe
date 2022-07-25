import { useReviews } from "../../my-custom-hooks/useReviews";
import TextField from "../atoms/TextField";
import styles from "./styles/ReviewCard.module.css";
import { useState } from "react";

const ReviewCard = ({ selectedCategory }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(undefined);

  let reviews = useReviews(setIsLoading, setErrorState, selectedCategory);

  console.log(reviews, "<<<<reviews here in ReviewCard");
  if (selectedCategory) {
    reviews = reviews.filter((review) => review.category === selectedCategory);
  }

  return errorState ? (
    <TextField text="Something went wrong" />
  ) : isLoading ? (
    <TextField text="Loading data" />
  ) : (
    <div className={styles.allCards}>
      {reviews.map((review) => {
        return (
          <div key={review.review_id} className={styles.card}>
            <TextField text={`Title: ${review.title}`} />
            <TextField text={`Author: ${review.owner}`} />
            <TextField text={`Category: ${review.category}`} />
            <TextField text={`Written at: ${review.created_at}`} />
            <TextField text={`Number of comments: ${review.comment_count}`} />
          </div>
        );
      })}
    </div>
  );
};

export default ReviewCard;
