import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";
import style from "./styles/NavBar.module.css";

const NavBar = () => {
  return (
    <div>
      <div id={style.mainTitle}>
        <h1>Bela's Games</h1>
      </div>
      <div className={style.menuButtons}>
        <Link to="/">
          <Button text={"Home"}></Button>
        </Link>

        <Link to="/profile">
          <Button text={"Profile"}></Button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
