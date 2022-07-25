import { useCategories } from "../../my-custom-hooks/useCategories";

const CategoryDropdown = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(undefined);
  const categories = useCategories(setIsLoading, setErrorState);

  return errorState ? (
    <TextField text="Something went wrong" />
  ) : isLoading ? (
    <TextField text="Loading data" />
  ) : (
    <form className="category-dropdown">
      <label id={styles.category_label}>
        Filter by category:
        <select
          name="category"
          id="categories"
          className={styles.dropdown_box}
          onChange={handleChange}
        >
          <option> -- select category -- </option>

          {categories.map((category) => {
            return (
              <option type="reset" value={`${category.category_name}`}>
                {category.category_name}
              </option>
            );
          })}
        </select>
        <button type="reset" onClick={handleClear}>
          Clear
        </button>
      </label>
    </form>
  );
};

export default CategoryDropdown;
