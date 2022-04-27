import Head from "next/head";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import withAuth from "../components/withAuth";
import config from "../config/config";

const Profile1 = ({ token }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    profileUser();
  }, []);

  const profileUser = async () => {
    try {
      // console.log('token: ', token)
      const users = await axios.get(`${config.URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log('user: ', users.data)
      setUser(users.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <h1 class = "text-4xl text-black underline-offset-auto">About LilFluttershy Store</h1>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Itim&display=swap"
          rel="stylesheet"
        ></link>
        <br />
        <div>
          <div class= "box p-2 bg-lime-200">
            <br></br>
            <p class ="text-xl text-sky-700">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              LilFluttershy Store เป็นร้านขายสินค้าเกี่ยวกับศิลปิน K-pop ต่างๆ
              ไม่ว่าจะเป็นอัลบั้ม, แท่งไฟ หรือ สินค้า official ต่างๆ
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หากลูกค้าต้องการสินค้าที่ไม่มีในหน้าเว็บ
              สามารถติดต่อทางร้านมาได้ ทางร้านยินดีตามหาสินค้าให้ลูกค้าได้เสมอ
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            </p>
            <br />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Itim&display=swap"
              rel="stylesheet"
            ></link>
          </div>
          <br></br>
          <div className={styles.content}>
            <div className={styles.custom}>
              <img
                src="https://i.pinimg.com/564x/5b/78/a6/5b78a6f44d4087987ff2c75121d43b14.jpg"
                alt="Trulli"
                width="250"
                height="250"
              />
            </div>
            <div className={styles.custom}>
              <img
                src="https://i.pinimg.com/564x/99/62/79/9962799562c1852c0a5841c0f187c02b.jpg"
                alt="Trulli"
                width="250"
                height="250"
              />
            </div>
            <div className={styles.custom}>
              <img
                src="https://i.pinimg.com/564x/34/2a/12/342a12f1940a4ae78721560f57d01b47.jpg"
                alt="Trulli"
                width="250"
                height="250"
              />
            </div>
            <div className={styles.custom}>
              <img
                src="https://i.pinimg.com/564x/fa/7d/0a/fa7d0a3f1572069a6f50533de6b1912f.jpg"
                alt="Trulli"
                width="250"
                height="250"
              />
            </div>
          </div>
          <div>
            <div class = "p-6 text-xl text-pink-600">
              Contract Us :<br></br>
              Tel : 090-9316505<br></br>
              Facebook : Jally Lalipat<br></br>
              Lind Id : @LilFluttershy1122<br></br>
            </div>
            <div className={styles.custom}>
              <div></div>
            </div>
          </div>
        </div>
        <style jsx>{`
          h1,
          h2,
          ul {
            font-family: "Itim", cursive;
          }
        `}</style>
        <div></div>
      </div>
    </Layout>
  );
};

export default withAuth(Profile1);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
