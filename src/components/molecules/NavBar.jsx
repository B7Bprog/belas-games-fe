import { Link } from "react-router-dom";
import { Button } from "../atoms/button";

const NavBar = () => {
  return (
    <div>
      <div>
        <h1>Bela's Games</h1>
        <Link to="/profile">
          <Button text={"Login"}></Button>
        </Link>
      </div>
      <Link to="/">
        <Button text={"Home"}></Button>
      </Link>
      <Link to="/reviews">
        <Button text={"Reviews"}></Button>
      </Link>
      <Link to="/profile">
        <Button text={"Profile"}></Button>
      </Link>
    </div>
  );
};

export default NavBar;
