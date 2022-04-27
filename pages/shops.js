import React, { useState, useEffect } from "react";
import axios from "axios";
//import useSWR, { mutate } from 'swr'
import Head from "next/head";
import styles from "../styles/shops.module.css";
import Navbar from "../components/navbar";
import Link from "next/link";

const URL = "http://localhost/api/shops";
const URL2 = "http://localhost/api/purchase";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const SWR2 = () => {
  const [shops, setshops] = useState({});
  const [shop, setshop] = useState({});
  const [id, setId] = useState(0);
  const [name, setname] = useState("");
  const [price, setPrice] = useState(0);
  const [Deliverycost, setDeliverycost] = useState("");
  const [Delivery, setDelivery] = useState(0);
  const [imageurl, setimageurl] = useState("");
  //  const { data } = useSWR(URL, fetcher)
  //const { data } = useSWR(URL2, fetcher)

  useEffect(() => {
    getshops();
  }, []);

  const getshops = async () => {
    let shops = await axios.get(URL);
    setshops(shops.data);
    //console.log('shop:', shops.data)
  };
  const buyshop = async (id) => {
    const result = await axios.delete(`${URL2}/${id}`);
    console.log(result.data);
    getshops();
  };

  const printshops = () => {
    if (shops && shops.length) {
      return shops.map((shop, index) => (
        <li className={styles.listItem} key={index}>
          <div className={styles.box}>
            <h6>Id:{shop ? shop.id : 0}</h6>
            <img src={shop.imageurl} width="200" height="200"></img>
            <h6>name:{shop ? shop.name : 0}</h6>
            <h6>Price:{shop ? shop.price : 0}</h6>
            <h6>Deliverycost:{shop ? shop.Deliverycost : 0}</h6>
            <h6>Delivery:{shop ? shop.Delivery : 0}</h6>
          </div>
          <button
            onClick={() => buyshop(shop.id)}
            className={styles.buttonBuy}
          >
            Buy
          </button>
        </li>
      ));
    } else return <li> ไม่มีสินค้า </li>;
  };
  return (
    <div>
    <Navbar />
    <div className={styles.container}>
      <h1>LilFluttershy Store</h1>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Itim&display=swap"
        rel="stylesheet"
      ></link>
      <ul className={styles.list}>{printshops()}</ul>

      <style jsx>{`
        h1,
        h2,
        ul {
          font-family: "Itim", cursive;
        }
      `}</style>
    </div>
    </div>
  );
};

export default SWR2;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
