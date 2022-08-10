import { useContext, useState } from "react";
import { userContext } from "../../contexts/userContext";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "../atoms/Button";
import styles from "./styles/Profiles.module.css";

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
    <div className={styles.profilesDiv}>
      {users.map((user) => {
        return (
          <div className={styles.singleProfileDiv}>
            <img
              src={user.avatar_url}
              alt='user"s avatar image'
              className={styles.img}
            ></img>
            <h3>Name: {user.name}</h3>
            <h3>Username: {user.username}</h3>
            <Button text={"Login"} onClick={() => handleLogin(user)} />
          </div>
        );
      })}
    </div>
  );
};

export default Profiles;
