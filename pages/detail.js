import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar";

const detail = () => {
  return (
    <Layout>
      <Navbar />
      <div className={styles.container}>
        <br></br>
        <br></br>
        <br></br>
        <h2>รายละเอียดสินค้าและราคา</h2>
        <br></br>
        <div className={styles.content} >
          <div className={styles.custom}>
          BTS - Map Of The Soul: Persona <br></br><br></br>
            <a href="https://www.lazada.co.th/products/bts-map-of-the-soul-persona-ver1-i1421370222-s3663330198.html?promotionId=900000005198493">
              <img
                src="https://i.pinimg.com/564x/1a/e5/1d/1ae51de49c5ab33e68f97ecbd330c903.jpg"
                width="250"
                height="250"
              ></img>
            </a>
            <br></br>
          </div>
          <div className={styles.custom}>
          TXT (TOMORROW X TOGETHER) - <br></br>
          The Chaos Chapter : Fight or Escape <br></br>
            <a href="https://www.lazada.co.th/products/txt-tomorrow-x-together-the-chaos-chapter-fight-or-escape-ver-escape-i2608180383-s9343927381.html?promotionId=900000005198493">
              <img
                src="https://i.pinimg.com/564x/ab/c6/6e/abc66e62f6766590a616191790eee2c0.jpg"
                width="250"
                height="250"
              ></img>
            </a>
            <br></br>
          </div>
          <div className={styles.custom}>
          ENHYPEN - [DIMENSION : ANSWER]  <br></br>
          + Folded Poster <br></br>
            <a href="https://www.lazada.co.th/products/enhypen-album-dimension-answer-folded-poster-i3111565151-s11528910250.html?promotionId=900000005198493">
              <img
                src="https://i.pinimg.com/564x/d3/5c/43/d35c43b3c669f37014497ed96f8b1d8b.jpg"
                width="250"
                height="250"
              ></img>
            </a>
            <br></br>
          </div>
          <div className={styles.custom}>
          EXO Official Lightstick Ver.3 <br></br><br></br>
            <a href="https://www.lazada.co.th/products/exo-official-lightstick-ver3-i1421106628-s3662434024.html?promotionId=900000005198493">
              <img
                src="https://i.pinimg.com/564x/65/f9/7c/65f97c1f1c431d3ee81ab4490f6a248d.jpg"
                width="250"
                height="250"
              ></img>
            </a>
            <br></br>
          </div>
          <div className={styles.custom}>
          BT21 - Turntable Bluetooth Speaker <br></br><br></br>
            <a href="https://www.lazada.co.th/products/bt21-turntable-bluetooth-speaker-i3404730020-s12589181026.html?promotionId=900000005198493">
              <img
                src="https://i.pinimg.com/564x/c8/ac/69/c8ac695053c670b17d604f23ab7a301c.jpg"
                width="250"
                height="250"
              ></img>
            </a>
            <br></br>
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
    </Layout>
  );
};

export default detail;
