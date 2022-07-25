import styles from "./styles/button.module.css";

export const Button = ({ type = "button", style, text, onClick = null }) => {
  return (
    <button
      className={styles.button}
      type={type}
      style={{ ...style }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
