import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles/Comments.module.css";

const Comments = ({ review_id }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://belas-games.herokuapp.com/api/reviews/${review_id}/comments`
      )
      .then((response) => {
        setComments(response.data.comments);
      });
  }, [review_id]);

  console.log(comments, "<<<comments");
  return (
    <div>
      <h3>Comments:</h3>
      <div>
        {comments.map((comment) => {
          return (
            <div className={styles.comments} key={comment.comment_id}>
              <h3>{comment.body}</h3>
              <h3 className={styles.commentCredentials}>
                Comment by: {comment.author}
              </h3>
              <h3 className={styles.commentCredentials}>
                Posted on: {new Date(comment.created_at).toDateString()}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
