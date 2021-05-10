import React, { lazy } from "react";
import { useSelector } from "react-redux";
import "./Avatar.css";
//calling user actions
import { userActions } from "../../store/user-slice";
import { useDispatch } from "react-redux";

//importing framer motion
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

//calling particlejs
const ParticleBubble = lazy(() => import("../../Components/ParticleBubble"));

function Avatar() {
  //calling state from redux
  const themeStatus = useSelector(state => state.theme.darkTheme);
  const avatar = useSelector(state => state.user.avatar);
  const dispatch = useDispatch();
  const history = useHistory();

  //avatar images from online CDN
  const images = [
    "https://ik.imagekit.io/7yriydcici/child-6182914_1920_bKWxRBUJiG.png",
    "https://ik.imagekit.io/7yriydcici/woman-6064799_1920_k3MjnkUOM.jpg",
    "https://ik.imagekit.io/7yriydcici/avatar-1606916_1280_tTjv3UYuc.png",
    "https://ik.imagekit.io/7yriydcici/naruto-6204734_1920_0sIdEefcB.png",
    "https://ik.imagekit.io/7yriydcici/super-hero-6187555_1280_VPd8JKz-O.png",
    "https://ik.imagekit.io/7yriydcici/child-6190727_1920_26fyISjkf.jpg"
  ];

  //sending selected avatar to redux
  const sendAvatar = image => {
    dispatch(
      userActions.setAvatar({
        avatar: image
      })
    );
  };

  //setting login=true for a user
  const userLoggedInStatus = () => {
    dispatch(userActions.changeLogInStatus());
    history.push("/workspace");
  };

  return (
    <div className="Avatar">
      <div
        className="ParticlesDiv"
        style={{ backgroundColor: themeStatus ? "#23201F" : "transparent" }}
      >
        <ParticleBubble />
      </div>
      <motion.div
        initial={{ x: -250, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="AvatarSec"
        style={{
          backgroundColor: themeStatus ? "#302d2b" : "rgb(247, 247, 247)"
        }}
      >
        <div className="header">
          <span
            className="headerTxt"
            style={{ color: themeStatus ? "#FFDC02" : "#56ca94" }}
          >
            Choose your Avatar
          </span>
        </div>

        <div className="AvatarOptions">
          {images.map(image => (
            <div
              className="option"
              onClick={() => sendAvatar(image)}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 250, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="DetailsDiv"
        style={{
          backgroundColor: themeStatus ? "#302d2b" : "rgb(247, 247, 247)"
        }}
      >
        <div className="MainAvatar">
          <div
            className="Avatar"
            style={{ backgroundImage: `url(${avatar})` }}
          ></div>
        </div>
        <div className="btnDiv">
          <span
            className="btn"
            style={{
              backgroundColor: themeStatus ? "#ffdc02" : "#56ca94",
              color: themeStatus ? "#302d2b" : "white"
            }}
            onClick={userLoggedInStatus}
          >
            Next
          </span>
          <span
            className="btn"
            onClick={() => history.goBack()}
            style={{
              backgroundColor: themeStatus ? "#ffdc02" : "#56ca94",
              color: themeStatus ? "#302d2b" : "white"
            }}
          >
            Back
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default Avatar;
