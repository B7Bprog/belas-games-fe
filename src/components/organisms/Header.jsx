import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../contexts/userContext";
import { Button } from "../atoms/Button";
import NavBar from "../molecules/NavBar";
import styles from "./styles/Header.module.css";

const Header = () => {
  const { user, setUser } = useContext(userContext);
  function handleLogout() {
    setUser({});
  }
  return (
    <div>
      {Object.keys(user).length === 0 ? (
        <div className={styles.login}>
          <Link to="/profile">
            <Button text={"Login"}></Button>
          </Link>
        </div>
      ) : (
        <div className={styles.login}>
          <h3>{`Logged in as: ${user.username}`}</h3>
          <Button text={"Logout"} onClick={handleLogout}></Button>
        </div>
      )}
      <NavBar />
    </div>
  );
};

export default Header;
