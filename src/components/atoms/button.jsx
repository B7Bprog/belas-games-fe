import styles from "./styles/button.module.css";

export const Button = ({ style, text }) => {
  return (
    <button className={styles.button} type="button" style={{ ...style }}>
      {text}
    </button>
  );
};
