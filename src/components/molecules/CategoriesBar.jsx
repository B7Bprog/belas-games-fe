import { useState } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../my-custom-hooks/useCategories";
import TextField from "../atoms/TextField";
import styles from "./styles/CategoriesBar.module.css";

const CategoriesBar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const categories = useCategories(setIsLoading, setErrorState);

  return errorState ? (
    <TextField text="Something went wrong" />
  ) : isLoading ? (
    <TextField text="Loading data..." />
  ) : (
    <div>
      <h3 id={styles.categoriesTitle}>Categories:</h3>
      <div className={styles.CategoriesBar}>
        {categories.map((category) => {
          return (
            <Link
              to={`/reviews/categories/${category.slug}`}
              className={styles.Link}
            >
              <div key={category.slug} className={styles.linkContainer}>
                <div className={styles.linkWrapper}>{category.slug}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesBar;
