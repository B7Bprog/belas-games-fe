import { useReviews } from "../../my-custom-hooks/useReviews";
import TextField from "../atoms/TextField";
import styles from "./styles/ReviewCard.module.css";
import { useState } from "react";

const ReviewCard = ({ selectedCategory, categoryParam }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(undefined);

  let reviews = useReviews(setIsLoading, setErrorState, selectedCategory);

  console.log(reviews, "<<<<reviews here in ReviewCard");
  if (categoryParam) {
    reviews = reviews.filter((review) => review.category === categoryParam);
  }

  return errorState ? (
    <TextField text="Something went wrong" />
  ) : isLoading ? (
    <TextField text="Loading data" />
  ) : (
    <div className={styles.allCards}>
      {reviews.map((review) => {
        console.log(review.review_img_url, "<<<imageURL");
        return (
          <div key={review.review_id} className={styles.card}>
            <TextField text={`Title: ${review.title}`} />
            <img
              src={review.review_img_url}
              alt={`Image for review with title of: ${review.title}`}
            ></img>
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
