import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ImHome } from "react-icons/im";
import { BiLogOut, BiUserPin } from "react-icons/bi";
import { IoGitNetwork } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import "./MobileNav.css";

function MobileNav() {
  //setting up states
  const [openNav, setOpenNav] = useState(false);

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
    <div className="MobileNav">
      <div
        className="NavIcon"
        onClick={() => setOpenNav(true)}
        style={{ backgroundColor: themeStatus ? "#ffdc02" : "#56ca94" }}
      >
        <span
          style={{
            marginBottom: "2px",
            backgroundColor: themeStatus ? "#302d2b" : "white"
          }}
        ></span>
        <span
          style={{
            backgroundColor: themeStatus ? "#302d2b" : "white"
          }}
        ></span>
        <span
          style={{
            marginTop: "2px",
            backgroundColor: themeStatus ? "#302d2b" : "white"
          }}
        ></span>
      </div>
      <div
        className={openNav ? "blurDiv" : "blurDivClose"}
        onClick={() => setOpenNav(false)}
      ></div>
      <div
        className={openNav ? "MobiNav" : "MobiNavClose"}
        style={{ backgroundColor: themeStatus ? "#ffdc02" : "#56ca94" }}
      >
        <div className="MobHeader">
          <span
            className="MobHeaderTxt"
            style={{ color: themeStatus ? "#302d2b" : "white" }}
          >
            eezql
          </span>
        </div>
        <div className="MobOptions">
          <div className="MobOption">
            <span
              className="MobOptionIcon"
              onClick={() => history.push("/")}
              style={{
                color: themeStatus ? "#302d2b" : "white",
                fontSize: "2.5em"
              }}
            >
              <ImHome />
            </span>
            <span
              className="MobOptionName"
              style={{
                color: themeStatus ? "#302d2b" : "white"
              }}
            >
              Home
            </span>
          </div>
          <div className="MobOption">
            <span
              className="MobOptionIcon"
              onClick={() => history.push("/workspace")}
              style={{
                color: themeStatus ? "#302d2b" : "white",
                fontSize: "2.5em"
              }}
            >
              <IoGitNetwork />
            </span>
            <span
              className="MobOptionName"
              style={{
                color: themeStatus ? "#302d2b" : "white"
              }}
            >
              WorkSpace
            </span>
          </div>
          <div className="MobOption">
            <span
              className="MobOptionIcon"
              style={{
                color: themeStatus ? "#302d2b" : "white",
                fontSize: "2.5em"
              }}
            >
              <BiUserPin />
            </span>
            <span
              className="MobOptionName"
              onClick={() => history.push("/avatar")}
              style={{
                color: themeStatus ? "#302d2b" : "white"
              }}
            >
              Avatar
            </span>
          </div>
          <div className="MobOption">
            <span
              onClick={LogOutHandler}
              className="MobOptionIcon"
              style={{
                color: themeStatus ? "#302d2b" : "white",
                fontSize: "2.5em"
              }}
            >
              <BiLogOut />
            </span>
            <span
              className="MobOptionName"
              style={{
                color: themeStatus ? "#302d2b" : "white"
              }}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
