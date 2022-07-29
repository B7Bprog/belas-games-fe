const OrderDropdown = ({ setSelectedOrder }) => {
  const orderOptions = ["asc", "desc"];

  function handleChange(e) {
    setSelectedOrder(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div>
      <form>
        <label>
          <select onChange={handleChange}>
            {orderOptions.map((orderOption) => {
              return (
                <option type="reset" value={orderOption} key={orderOption}>
                  {orderOption}
                </option>
              );
            })}
          </select>
        </label>
      </form>
    </div>
  );
};

export default OrderDropdown;
