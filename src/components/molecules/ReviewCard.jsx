import styles from "./styles/ReviewCard.module.css";
import { useReviews } from "../../my-custom-hooks/useReviews";
import TextField from "../atoms/TextField";
import { useState } from "react";
import { Link } from "react-router-dom";

const ReviewCard = ({
  selectedCategory,
  categoryParam,
  selectedSort,
  selectedOrder,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(undefined);

  let reviews = useReviews(
    setIsLoading,
    setErrorState,
    selectedCategory,
    selectedSort,
    selectedOrder
  );

  if (categoryParam) {
    reviews = reviews.filter((review) => review.category === categoryParam);
  }

  return errorState ? (
    <TextField text="Something went wrong" />
  ) : isLoading ? (
    <TextField text="Loading data..." />
  ) : (
    <div className={styles.allCards}>
      {reviews.map((review) => {
        return (
          <Link
            key={review.review_id}
            to={`/reviews/${review.review_id}`}
            className={styles.Link}
          >
            <ul key={review.review_id} className={styles.card}>
              <div className={styles.imageDiv}>
                <img
                  className={styles.img}
                  src={review.review_img_url}
                  alt={`review with title of: ${review.title}`}
                ></img>
              </div>
              <li id={styles.title}>
                <h4>{`${review.title}`}</h4>
              </li>
              <li>
                <h3 className={styles.h3}> {`Author: ${review.owner}`} </h3>
              </li>
              <li>
                {" "}
                <h3 className={styles.h3}>{`Category: ${review.category}`} </h3>
              </li>
              <li>
                {" "}
                <h3 className={styles.h3}>
                  {`Written at: ${new Date(review.created_at).toDateString()}`}
                </h3>
              </li>
              <li>
                <h3 className={styles.h3}>
                  {`Number of comments: ${review.comment_count}`}{" "}
                </h3>{" "}
              </li>
            </ul>
          </Link>
        );
      })}
    </div>
  );
};

export default ReviewCard;
