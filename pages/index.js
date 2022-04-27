import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import config from "../config/config";
import Register from "./register";

// export default function Home({ token }) {
export default function Login({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const login = async (req, res) => {
    try {
      let result = await axios.post(
        `${config.URL}/login`,
        { username, password },
        { withCredentials: true }
      );
      console.log("result: ", result);
      console.log("result.data:  ", result.data);
      console.log("token:  ", token);
      setStatus(result.status + ": " + result.data.user.username);
    } catch (e) {
      console.log("error: ", JSON.stringify(e.response));
      setStatus(JSON.stringify(e.response).substring(0, 80) + "...");
    }
  };

  const loginForm = () => (
    <div className={styles.gridContainer}>
      <div>Username:</div>
      <div>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>Password:</div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );

  const copyText = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <Layout>
      <title>Login</title>
      <div>
        <Register />
      </div>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token"))
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
