import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/userContext";
import { Button } from "../atoms/Button";
import TextField from "../atoms/TextField";
import styles from "./styles/Votes.module.css";

const Votes = ({ review, setHasUpVoted, hasUpVoted, originalNumOfVotes }) => {
  const [errorState, setErrorState] = useState(null);
  const originalVotes = review.votes;
  const [tempVotes, setTempVotes] = useState(originalVotes);
  let incrementVotes = 0;

  const { user } = useContext(userContext);

  function patchReview() {
    axios
      .patch(
        `https://belas-games.herokuapp.com/api/reviews/${review.review_id}`,
        { inc_votes: `${incrementVotes}` }
      )
      .then(() => {})
      .catch((err) => {
        setErrorState({ err });
      });
  }

  const handleThumbsUp = () => {
    if (tempVotes - originalVotes >= 1) {
      setHasUpVoted(true);
    } else {
      setHasUpVoted(false);
      setTempVotes(tempVotes + 1);
      incrementVotes = 1;
    }
    if (!hasUpVoted && tempVotes - originalVotes < 1) {
      setTempVotes(tempVotes + 1);

      incrementVotes = 1;
    }
    patchReview();
  };

  const handleThumbsDown = () => {
    if (tempVotes - originalVotes <= -1) {
      setHasUpVoted(true);
    } else {
      setHasUpVoted(false);
      setTempVotes(tempVotes - 1);
      incrementVotes = -1;
    }
    if (!hasUpVoted && tempVotes - originalVotes > -1) {
      setTempVotes(tempVotes - 1);
      incrementVotes = -1;
    }

    patchReview();
  };

  useEffect(() => {}, [tempVotes, errorState]);

  let buttonTextColor = "red";
  if (tempVotes === originalVotes) {
    buttonTextColor = "black";
  }

  return errorState ? (
    <TextField text="Something went wrong" />
  ) : Object.keys(user).length !== 0 ? (
    <div>
      {hasUpVoted ? (
        <div>
          <p id={styles.hasVoted}>You have voted already.</p>
          <div className={styles.thumbs}>
            <Button text="👍" onClick={handleThumbsUp} />
            <Button text="👎" onClick={handleThumbsDown} />{" "}
          </div>
        </div>
      ) : (
        <div className={styles.thumbs}>
          <Button text="👍" onClick={handleThumbsUp} />
          <Button text="👎" onClick={handleThumbsDown} />
        </div>
      )}
      <div id={styles.votes}>
        <h3
          style={{ color: `${buttonTextColor}`, fontSize: "1.8rem" }}
        >{`Votes: ${tempVotes}`}</h3>
      </div>
    </div>
  ) : (
    <h3 id={styles.loginToVote}>Please log in to vote.</h3>
  );
};

export default Votes;
