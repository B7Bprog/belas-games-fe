import { useContext, useState } from "react";
import { userContext } from "../../contexts/userContext";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "../atoms/Button";

const Profiles = () => {
  const [users, setUsers] = useState(["none"]);
  const { setUser } = useContext(userContext);
  useEffect(() => {
    axios
      .get(`https://belas-games.herokuapp.com/api/users`)
      .then((fatchedUsers) => {
        setUsers(fatchedUsers.data.users);
      })
      .then(() => {
        console.log(users, "<<<users here");
      });
  }, []);
  function handleLogin(user) {
    console.log(user, "user - logging in");
    setUser(user);
  }
  return (
    <div>
      {users.map((user) => {
        return (
          <div>
            <img src={user.avatar_url} alt='user"s avatar image'></img>
            <h3>{user.name}</h3>
            <h3>{user.username}</h3>
            <Button text={"Login"} onClick={() => handleLogin(user)} />
          </div>
        );
      })}
    </div>
  );
};

export default Profiles;
