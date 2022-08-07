import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSingleReview } from "../../my-custom-hooks/useSingleReview";
import TextField from "../atoms/TextField";
import AddCommentCard from "./AddCommentCard";
import Comments from "./Comments";
import styles from "./styles/SingleReviewCard.module.css";
import Votes from "./Votes";
const SingleReviewCard = () => {
  const { review_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const review = useSingleReview(setIsLoading, setErrorState, null, review_id);
  const originalNumOfVotes = review.votes;
  const [hasUpVoted, setHasUpVoted] = useState(false);

  useEffect(() => {}, [hasUpVoted, review]);
  return errorState ? (
    <TextField text="Something went wrong" />
  ) : isLoading ? (
    <TextField text="Loading data..." />
  ) : (
    <div className={styles.allCards}>
      <ul key={review.review_id} className={styles.card}>
        <li>
          <h2> {review.title}</h2>{" "}
        </li>
        <div className={styles.imageDiv}>
          <img
            className={styles.img}
            src={review.review_img_url}
            alt={`Image for review with title of: ${review.title}`}
          ></img>
        </div>
        <li>
          <h3>{`${review.review_body}`}</h3>
        </li>
        <li>
          <h3> {`Author: ${review.owner}`} </h3>
        </li>
        <li>
          <h3> {`Category: ${review.category}`} </h3>
        </li>
        <li>
          <h3>{`Written on: ${new Date(review.created_at).toDateString()}`}</h3>
        </li>
        <li>
          <h3> {`Number of comments: ${review.comment_count}`} </h3>
        </li>
      </ul>
      <Votes
        review={review}
        setHasUpVoted={setHasUpVoted}
        hasUpVoted={hasUpVoted}
        originalNumOfVotes={originalNumOfVotes}
      />
      <Comments review_id={review.review_id} />
      <AddCommentCard review_id={review.review_id} />
    </div>
  );
};

export default SingleReviewCard;
