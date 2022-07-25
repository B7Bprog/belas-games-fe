import { useState } from "react";
import CategoryDropdown from "../atoms/CategoryDropdown";
import ReviewCard from "../molecules/ReviewCard";

const AllReviewsList = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <CategoryDropdown
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ReviewCard selectedCategory={selectedCategory} />
    </div>
  );
};

export default AllReviewsList;
