import { useReviews } from "../../my-custom-hooks/useReviews";
import TextField from "../atoms/TextField";
import styles from "./styles/ReviewCard.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

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
          <Link to={`/reviews/${review.review_id}`} className={styles.Link}>
            <ul key={review.review_id} className={styles.card}>
              <li>
                <h2>{`Title: ${review.title}`}</h2>
              </li>
              <img
                src={review.review_img_url}
                alt={`Image for review with title of: ${review.title}`}
              ></img>
              <li>
                <h3> {`Author: ${review.owner}`} </h3>
              </li>
              <li>
                {" "}
                <h3>{`Category: ${review.category}`} </h3>
              </li>
              <li>
                {" "}
                <h3>
                  {`Written at: ${new Date(review.created_at).toDateString()}`}
                </h3>
              </li>
              <li>
                <h3>{`Number of comments: ${review.comment_count}`} </h3>{" "}
              </li>
            </ul>
          </Link>
        );
      })}
    </div>
  );
};

export default ReviewCard;

/* 

<Link to={`/reviews/${review.review_id}`}>
<div key={review.review_id} className={styles.card}>
  <TextField text={`Title: ${review.title}`} />
  <img
    src={review.review_img_url}
    alt={`Image for review with title of: ${review.title}`}
  ></img>
  <TextField text={`Author: ${review.owner}`} />
  <TextField text={`Category: ${review.category}`} />
  <TextField
    text={`Written at: ${new Date(
      review.created_at
    ).toDateString()}`}
  />
  <TextField text={`Number of comments: ${review.comment_count}`} />
</div>
</Link> */
