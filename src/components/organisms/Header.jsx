import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";
import NavBar from "../molecules/NavBar";

const Header = () => {
  return (
    <div>
      <Link to="/profile">
        <Button text={"Login"}></Button>
      </Link>
      <NavBar />
    </div>
  );
};

export default Header;
