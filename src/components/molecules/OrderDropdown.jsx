import styles from "./styles/OrderDropdown.module.css";

const OrderDropdown = ({ setSelectedOrder }) => {
  const orderOptions = ["asc", "desc"];

  function handleChange(e) {
    setSelectedOrder(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div>
      <form className={styles.orderForm}>
        <label id={styles.orderLabel}>
          Order by:
          <select onChange={handleChange} id={styles.orderSelect}>
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
