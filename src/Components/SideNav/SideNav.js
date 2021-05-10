import React from "react";
import "./SideNav.css";
import { ImHome } from "react-icons/im";
import { BiLogOut, BiUserPin } from "react-icons/bi";
import { IoGitNetwork } from "react-icons/io5";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

function SideNav() {
  //states from redux
  const themeStatus = useSelector(state => state.theme.darkTheme);
  const history = useHistory();
  const dispatch = useDispatch();

  //logout function
  const LogOutHandler = () => {
    dispatch(userActions.logOut());
    history.push("/");
  };

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      className="SideNav"
      style={{ backgroundColor: themeStatus ? "#ffdc02" : "#56ca94" }}
    >
      <div className="heading">
        <span
          className="headingText"
          style={{ color: themeStatus ? "#302d2b" : "white" }}
        >
          eezql
        </span>
      </div>
      <div className="sideNavOptions">
        <div className="option">
          <span
            onClick={() => history.push("/")}
            className="optionIcon"
            style={{
              color: themeStatus ? "#302d2b" : "white",
              fontSize: "2.5vw"
            }}
          >
            <ImHome />
          </span>
          <span
            className="optionName"
            style={{
              color: themeStatus ? "#302d2b" : "white",
              fontSize: "1vw"
            }}
          >
            Home
          </span>
        </div>
        <div className="option">
          <span
            onClick={() => history.push("/workspace")}
            className="optionIcon"
            style={{
              color: themeStatus ? "#302d2b" : "white",
              fontSize: "2.5vw"
            }}
          >
            <IoGitNetwork />
          </span>
          <span
            className="optionName"
            style={{
              color: themeStatus ? "#302d2b" : "white",
              fontSize: "1vw"
            }}
          >
            Workspace
          </span>
        </div>
        <div className="option">
          <span
            onClick={() => history.push("/avatar")}
            className="optionIcon"
            style={{
              color: themeStatus ? "#302d2b" : "white",
              fontSize: "2.5vw"
            }}
          >
            <BiUserPin />
          </span>
          <span
            className="optionName"
            style={{
              color: themeStatus ? "#302d2b" : "white",
              fontSize: "1vw"
            }}
          >
            Avatar
          </span>
        </div>
        <div className="option">
          <span
            onClick={LogOutHandler}
            className="optionIcon"
            style={{
              color: themeStatus ? "#302d2b" : "white",
              fontSize: "2.5vw"
            }}
          >
            <BiLogOut />
          </span>
          <span
            className="optionName"
            style={{
              color: themeStatus ? "#302d2b" : "white",
              fontSize: "1vw"
            }}
          >
            Logout
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default SideNav;
