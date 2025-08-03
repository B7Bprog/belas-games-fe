import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCategories } from "../../my-custom-hooks/useCategories";
import TextField from "../atoms/TextField";
import styles from "./styles/CategoriesBar.module.css";

const CategoriesBar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const categories = useCategories(setIsLoading, setErrorState);
  const [activeCategorySlug, setActiveCategorySlug] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const categorySlug = pathParts[pathParts.length - 1];

    if (categories.some((cat) => cat.slug === categorySlug)) {
      setActiveCategorySlug(categorySlug);
    } else {
      setActiveCategorySlug(null);
    }
  }, [location.pathname, categories]);

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
              className={`${styles.Link} ${
                activeCategorySlug === category.slug ? styles.activeLink : ""
              }`}
            >
              <div key={category.slug} className={styles.linkContainer}>
                <div className={styles.linkWrapper}>
                  {category.slug[0].toUpperCase() + category.slug.slice(1)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesBar;
