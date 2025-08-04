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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://belas-games.vercel.app/api/users`)
      .then((fatchedUsers) => {
        setUsers(fatchedUsers.data.users);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorState({ err });
      });
  }, []);

  function handleLogin(user) {
    setUser(user);
  }

  return errorState ? (
    <TextField text="Something went wrong" />
  ) : isLoading ? (
    <TextField text="Loading data..." />
  ) : Object.keys(user).length !== 0 ? (
    <div className={styles.profilesDiv2} key={user.username}>
      <div className={styles.singleProfileDiv}>
        <div className={styles.imageDiv}>
          <img
            src={user.avatar_url}
            alt='user"s avatar'
            className={styles.img}
          ></img>
        </div>
        <h3>Name: {user.name}</h3>
        <h3>Username: {user.username}</h3>
      </div>
    </div>
  ) : (
    <div className={styles.profilesDiv}>
      {users.map((user) => {
        return (
          <div className={styles.singleProfileDiv} key={user.namename}>
            <img
              src={user.avatar_url}
              alt='user"s avatar'
              className={styles.img}
            ></img>
            <h3>Name: {user.name}</h3>
            <h3>Username: {user.username}</h3>
            <Button
              text={"Login"}
              style={{ style: "buttonSmall" }}
              onClick={() => handleLogin(user)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Profiles;
