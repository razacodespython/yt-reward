import styles from "../styles/Home.module.css";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useTokenDrop,
} from "@thirdweb-dev/react";
import { useState } from "react";
import YouTube from "react-youtube";
import Modal from "react-modal";

export default function Home() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const tokenDrop = useTokenDrop("0xF938253A5D6773Ac9C3Dcd794dD9C45AE7F39d56");

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const mintToken = async () => {
    try {
      const minting = await tokenDrop.claim(1);
      console.log(minting);
      alert(minting.receipt.to + " received a reward!");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  // Render function for Prismic headless CMS pages

  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [videoUrl, setVideoUrl] = useState("");
  // let videoCode;
  // if (videoUrl) {
  //   videoCode = videoUrl.split("v=")[1].split("&")[0];
  // }

  const checkElapsedTime = (e) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    if (currentTime / duration > 0.95) {
      setModalIsOpen(true);
    }
  };

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
    },
  };

  return (
    <div>
      {address ? (
        <div>
          <div className={styles.head}>
            <button onClick={disconnectWallet} className={styles.btn}>
              Disconnect Wallet
            </button>
            <p>Hi 👋 {address}</p>
          </div>

          {/* <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            /> */}
          <div className={styles.main}>
            <h1>Watch, learn and earn a reward </h1>
            <YouTube
              //videoId={videoCode}
              videoId="OtusKafC9FM"
              controls={0}
              containerClassName="embed embed-youtube"
              onStateChange={(e) => checkElapsedTime(e)}
              opts={opts}
            />
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Exercise Completed"
            style={modalStyles}
          >
            <div>
              <h3>Congratulations</h3>
              <button className={styles.btn} onClick={mintToken}>
                Claim your reward here
              </button>
            </div>
          </Modal>
        </div>
      ) : (
        <div className={styles.main}>
          <button className={styles.btn} onClick={connectWithMetamask}>
            Connect with Metamask
          </button>
        </div>
      )}
    </div>
  );
}
