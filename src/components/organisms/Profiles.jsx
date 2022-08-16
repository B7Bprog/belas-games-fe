import { useContext, useState } from "react";
import { userContext } from "../../contexts/userContext";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "../atoms/Button";
import styles from "./styles/Profiles.module.css";
import TextField from "../atoms/TextField";

const Profiles = () => {
  const [users, setUsers] = useState(["none"]);
  const [errorState, setErrorState] = useState(undefined);
  const { user, setUser } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  console.log(Object.keys(user), "<<<< user in profile");
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://belas-games.herokuapp.com/api/users`)
      .then((fatchedUsers) => {
        setUsers(fatchedUsers.data.users);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorState({ err });
      });
  }, []);

  function handleLogin(user) {
    console.log(user, "user - logging in");
    setUser(user);
  }

  return errorState ? (
    <TextField text="Something went wrong" />
  ) : isLoading ? (
    <TextField text="Loading data..." />
  ) : Object.keys(user).length !== 0 ? (
    <div className={styles.profilesDiv}>
      <div className={styles.singleProfileDiv}>
        <img
          src={user.avatar_url}
          alt='user"s avatar'
          className={styles.img}
        ></img>
        <h3>Name: {user.name}</h3>
        <h3>Username: {user.username}</h3>
      </div>
    </div>
  ) : (
    <div className={styles.profilesDiv}>
      {users.map((user) => {
        return (
          <div className={styles.singleProfileDiv}>
            <img
              src={user.avatar_url}
              alt='user"s avatar'
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
