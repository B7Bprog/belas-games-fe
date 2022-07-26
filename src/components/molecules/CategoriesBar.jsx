import { useState } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../my-custom-hooks/useCategories";
import TextField from "../atoms/TextField";

const CategoriesBar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const categories = useCategories(setIsLoading, setErrorState);
  console.log(categories, "<<<< categories");
  return errorState ? (
    <TextField text="Something went wrong" />
  ) : isLoading ? (
    <TextField text="Loading data" />
  ) : (
    <div>
      {categories.map((category) => {
        return (
          <div>
            <Link to={`/reviews/${category.slug}`}>{category.slug}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesBar;
