import { Link, useLocation } from "react-router-dom";
import { Button } from "../atoms/Button";
import style from "./styles/NavBar.module.css";
import { useContext } from "react";
import { userContext } from "../../contexts/userContext";
import navBackground from "../../assets/images/main-background.png";

const NavBar = () => {
  const { user, setUser } = useContext(userContext);
  function handleLogout() {
    setUser({});
  }

  const location = useLocation();
  console.log("rendering location:", location);

  return (
    <div id={style.navbar}>
      <img
        className={style.navBackground}
        src={navBackground}
        alt="red cubes and dust"
      ></img>
      <div id={style.loginButton}>
        {Object.keys(user).length === 0 ? (
          <div className={style.login}>
            <Link to="/profile">
              <Button text={"Login"} style={{ style: "buttonSmall" }}></Button>
            </Link>
          </div>
        ) : (
          <div className={style.login}>
            <Button
              text={"Logout"}
              style={{ style: "buttonSmall" }}
              onClick={handleLogout}
            ></Button>
            <h4
              className={style.loggedInText}
            >{`Logged in as: ${user.username}`}</h4>
          </div>
        )}
      </div>
      <div>
        <h1 id={style.mainTitle}>DiceRoll Reviews</h1>
      </div>
      <div className={style.menuButtons}>
        <Link to="/">
          <Button
            style={
              location.pathname === "/" || location.pathname !== "/profile"
                ? { style: "buttonActive" }
                : undefined
            }
            text={"Home"}
          ></Button>
        </Link>

        <Link to="/profile">
          <Button
            style={
              location.pathname === "/profile"
                ? { style: "buttonActive" }
                : undefined
            }
            text={"Profile"}
          ></Button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
