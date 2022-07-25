import axios from "axios";
import { useState, useEffect } from "react";
import { useCategories } from "../../my-custom-hooks/useCategories";
import { Button } from "./Button";
import TextField from "./TextField";

const CategoryDropdown = ({ setSelectedCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]); // selects categories for select tag
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    if (categories.length === 0) {
      setIsLoading(true);
      axios
        .get(`https://belas-games.herokuapp.com/api/categories`)
        .then((res) => {
          setCategories(res.data.categories);

          setIsLoading(false);
        })
        .catch((err) => {
          setErrorState({ err });
        });
    }
  }, [categories]);

  function handleChange(e) {
    if (e.target.value !== null) {
      setSelectedCategory(e.target.value);
    }
    if (e.target.value === null) {
      setSelectedCategory(null);
    }
  }

  console.log(categories, "<<<Categories");

  function handleClear(e) {
    e.preventDefault();
    setSelectedCategory(null);
    setCategories([]);
  }

  return errorState ? (
    <TextField text="Something went wrong" />
  ) : isLoading ? (
    <TextField text="Loading data" />
  ) : (
    <form className="category-dropdown">
      <label>
        <TextField text="Filter by category:" />
        <select name="category" id="categories" onChange={handleChange}>
          <option> -- select category -- </option>

          {categories.map((category) => {
            return (
              <option
                key={category.slug}
                type="reset"
                value={`${category.slug}`}
              >
                {category.slug}
              </option>
            );
          })}
        </select>
        <Button type="reset" onClick={handleClear} text="Clear" />
      </label>
    </form>
  );
};

export default CategoryDropdown;
