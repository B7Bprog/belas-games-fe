import styles from "./styles/SortDropdown.module.css";
const SortDropdown = ({ setSelectedSort }) => {
  const sortOptions = ["title", "created_at", "comment_count", "votes"];
  function handleChange(e) {
    setSelectedSort(e.target.value);
    console.log(e.target.value);
  }
  return (
    <div>
      <form className={styles.sortForm}>
        <label id={styles.sortLabel}>
          Sort by:
          <select onChange={handleChange} id={styles.sortSelect}>
            {sortOptions.map((sortOption) => {
              return (
                <option type="reset" value={sortOption} key={sortOption}>
                  {sortOption}
                </option>
              );
            })}
          </select>
        </label>
      </form>
    </div>
  );
};

export default SortDropdown;
