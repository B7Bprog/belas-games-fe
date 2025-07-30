import styles from "./styles/button.module.css";

export const Button = ({ type = "button", style, text, onClick = null }) => {
  let buttonStyle = style ? style.style : "button";
  
  console.log('buttonStyle here:',buttonStyle);
  
  return (
    <button
      className={styles[buttonStyle]}
      type={type}
      style={{ ...style}}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
