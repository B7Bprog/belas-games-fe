import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useReviews } from "../../my-custom-hooks/useReviews";
import { useSingleReview } from "../../my-custom-hooks/useSingleReview";
import TextField from "../atoms/TextField";
import styles from "./styles/SingleReviewCard.module.css";
const SingleReviewCard = () => {
  const { review_id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const review = useSingleReview(setIsLoading, setErrorState, null, review_id);

  return errorState ? (
    <TextField text="Something went wrong" />
  ) : isLoading ? (
    <TextField text="Loading data" />
  ) : (
    <div className={styles.allCards}>
      <div key={review.review_id} className={styles.card}>
        <TextField text={`Title: ${review.title}`} />
        <img
          src={review.review_img_url}
          alt={`Image for review with title of: ${review.title}`}
        ></img>
        <TextField text={`Author: ${review.owner}`} />
        <TextField text={`Category: ${review.category}`} />
        <TextField
          text={`Written at: ${new Date(review.created_at).toDateString()}`}
        />
        <TextField text={`Number of comments: ${review.comment_count}`} />
      </div>
    </div>
  );
};

export default SingleReviewCard;
