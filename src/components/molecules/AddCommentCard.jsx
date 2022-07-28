import { useContext, useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import styles from "./styles/AddCommentCard.module.css";
import { userContext } from "../../contexts/userContext";
import axios from "axios";
import TextField from "../atoms/TextField";

const AddCommentCard = ({ review_id }) => {
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalComments, setFinalComments] = useState([]);
  const [errorState, setErrorState] = useState();

  const { user } = useContext(userContext);
  //----API Request-----////////////////////////////////////////////////////////////////////
  function postComment(comment) {
    axios
      .post(
        `https://belas-games.herokuapp.com/api/reviews/${review_id}/comments`,
        {
          username: user.username,
          body: comment,
        }
      )
      .catch((err) => {
        if (err) setErrorState(err);
      });
  }
  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setIsSubmitted(false);
  }, []);

  //----------handleSubmit-----------/////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();

    postComment(comment);

    setIsSubmitted(true);

    if (finalComments.length !== 0) {
      setFinalComments([...finalComments, comment]);
    } else {
      setFinalComments([comment]);
    }

    setComment("");
  };

  ////////////////////////////////////////////////////////////////////////
  return errorState ? (
    <TextField text="Something went wrong" />
  ) : Object.keys(user).length !== 0 ? (
    isSubmitted ? (
      <div>
        <div>
          {finalComments.map((comment) => {
            return (
              <div className={styles.comment} key={comment}>
                <h3>{comment}</h3>
                <h3 className={styles.commentCredentials}>
                  Comment by: {user.username}
                </h3>
              </div>
            );
          })}
        </div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <textarea
              type="text"
              name="comment"
              value={comment}
              placeholder="Type your comment here"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></textarea>
            <Button type="submit" text="Submit" />
          </form>
        </div>
      </div>
    ) : (
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea
            type="text"
            name="comment"
            value={comment}
            placeholder="Type your comment here"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <Button type="submit" text="Submit" />
        </form>
      </div>
    )
  ) : (
    <h3>Please log in to vote.</h3>
  );
};

export default AddCommentCard;
