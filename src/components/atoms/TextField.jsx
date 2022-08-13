import styles from "./styles/TextField.module.css";
const TextField = ({ text }) => {
  return <p className={styles.textField}>{text}</p>;
};

export default TextField;
