import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/userContext";
import styles from "./styles/Comments.module.css";

const Comments = ({ review_id }) => {
  const [comments, setComments] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useContext(userContext);

  console.log(user, "<<<user");
  useEffect(() => {
    axios
      .get(
        `https://belas-games.herokuapp.com/api/reviews/${review_id}/comments`
      )
      .then((response) => {
        setComments(response.data.comments);
      });
  }, [review_id, isDeleting]);

  function handleDelete(e, comment_id) {
    setIsDeleting(true);
    axios
      .delete(`https://belas-games.herokuapp.com/api/comments/${comment_id}`)
      .then((response) => {
        console.log(response, "response");
        setIsDeleting(false);
      });
    //delete here
    console.log("deleted comment");
  }

  console.log(comments[4], "comment no. 4");

  return isDeleting ? (
    <h2>Deleting comment</h2>
  ) : (
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
              {user.username === comment.author ? (
                <div>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, comment.comment_id)}
                  >
                    Delete comment
                  </button>
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
