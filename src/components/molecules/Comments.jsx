import axios from "axios";
import { useEffect, useState } from "react";

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
      {comments.map((comment) => {
        return <p>{comment.body}</p>;
      })}
    </div>
  );
};

export default Comments;
