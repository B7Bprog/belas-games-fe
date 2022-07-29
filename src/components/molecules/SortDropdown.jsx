const SortDropdown = ({ setSelectedSort }) => {
  const sortOptions = ["title", "created_at", "comment_count", "votes"];

  function handleChange(e) {
    setSelectedSort(e.target.value);
    console.log(e.target.value);
  }
  return (
    <div>
      <form>
        <label>
          <select onChange={handleChange}>
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
