import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/userContext";
import { Button } from "../atoms/Button";
import TextField from "../atoms/TextField";

const Votes = ({ review, setHasUpVoted, hasUpVoted, originalNumOfVotes }) => {
  const [errorState, setErrorState] = useState(null);
  const originalVotes = review.votes;
  const [tempVotes, setTempVotes] = useState(originalVotes);
  let incrementVotes = 0;

  const { user } = useContext(userContext);

  function patchReview() {
    console.log("Patching with:", incrementVotes);
    axios
      .patch(
        `https://belas-games.herokuapp.com/api/reviews/${review.review_id}`,
        { inc_votes: `${incrementVotes}` }
      )
      .then(() => {})
      .catch((err) => {
        console.log(err);
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
          {" "}
          <p>You have voted already.</p>
          <Button text="👍" onClick={handleThumbsUp} />
          <Button text="👎" onClick={handleThumbsDown} />{" "}
        </div>
      ) : (
        <div>
          <Button text="👍" onClick={handleThumbsUp} />
          <Button text="👎" onClick={handleThumbsDown} />
        </div>
      )}
      <h3 style={{ color: `${buttonTextColor}` }}>{`Votes: ${tempVotes}`}</h3>
    </div>
  ) : (
    <p>Please log in to vote.</p>
  );
};

export default Votes;
