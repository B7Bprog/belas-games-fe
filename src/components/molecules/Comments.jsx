import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/userContext";
import { Button } from "../atoms/Button";
import styles from "./styles/Comments.module.css";

const Comments = ({ review_id }) => {
  const [comments, setComments] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useContext(userContext);

  console.log(user, "<<<user");
  useEffect(() => {
    axios
      .get(`https://belas-games.vercel.app/api/reviews/${review_id}/comments`)
      .then((response) => {
        setComments(response.data.comments);
      });
  }, [review_id, isDeleting]);

  function handleDelete(e, comment_id) {
    setIsDeleting(true);
    axios
      .delete(`https://belas-games.vercel.app/api/comments/${comment_id}`)
      .then((response) => {
        setIsDeleting(false);
      });
  }

  return isDeleting ? (
    <h2 className={styles.commentsTitle}>Deleting comment</h2>
  ) : (
    <div>
      <h3 className={styles.commentsTitle}>Comments:</h3>
      <div>
        {comments.map((comment) => {
          return (
            <div className={styles.comments} key={comment.comment_id}>
              <h3>{comment.body}</h3>
              <div className={styles.commentCredentials}>
                <h3>Comment by: {comment.author}</h3>
                <h3>
                  Posted on: {new Date(comment.created_at).toDateString()}
                </h3>
              </div>
              {user.username === comment.author ? (
                <div className={styles.deleteButtonDiv}>
                  <Button
                    text="Delete comment"
                    type="button"
                    onClick={(e) => handleDelete(e, comment.comment_id)}
                  ></Button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
