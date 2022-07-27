import { useState } from "react";
import { useParams } from "react-router-dom";
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
      <ul key={review.review_id} className={styles.card}>
        <ul>
          <h2> {`Title: ${review.title}`}</h2>{" "}
        </ul>
        <img
          src={review.review_img_url}
          alt={`Image for review with title of: ${review.title}`}
        ></img>
        <ul>
          <h3> {`Author: ${review.owner}`} </h3>
        </ul>
        <ul>
          <h3> {`Category: ${review.category}`} </h3>
        </ul>
        <ul>
          <h3>{`Written at: ${new Date(review.created_at).toDateString()}`}</h3>
        </ul>
        <ul>
          <h3> {`Number of comments: ${review.comment_count}`} </h3>
        </ul>
      </ul>
    </div>
  );
};

export default SingleReviewCard;
