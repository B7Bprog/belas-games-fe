import { useParams } from "react-router-dom";
import CategoriesBar from "../molecules/CategoriesBar";
import ReviewCard from "../molecules/ReviewCard";

const AllReviewsList = () => {
  const { category } = useParams();

  return (
    <div>
      <CategoriesBar />
      <ReviewCard categoryParam={category} />
    </div>
  );
};

export default AllReviewsList;
