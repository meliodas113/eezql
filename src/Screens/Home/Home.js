import React, { useState, lazy } from "react";
import Typist from "react-typist";
import { motion } from "framer-motion";
import "./Home.css";
import { useHistory } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import { useSelector } from "react-redux";
import { themeActions } from "../../store/theme-slice";
import { useDispatch } from "react-redux";
const ParticleBubble = lazy(() => import("../../Components/ParticleBubble"));

function Home() {
  //declaring states
  const [table, setTable] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => false);

  //getting theme status and avatar from redux
  const themeStatus = useSelector(state => state.theme.darkTheme);
  const avatar = useSelector(state => state.user.avatar);
  const userStatus = useSelector(state => state.user.userLoggedIn);

  const dispatch = useDispatch();
  const history = useHistory();

  //sample json to display in demo
  const sampleJSON = [
    {
      OrderID: 122,
      CustomerName: "Alan Walker",
      item: "Pizza",
      price: 400,
      date: "04-05-2021"
    },
    {
      OrderID: 123,
      CustomerName: "Afrojack",
      item: "Pizza",
      price: 400,
      date: "14-04-2021"
    },
    {
      OrderID: 112,
      CustomerName: "Bruno Mars",
      item: "Burger",
      price: 200,
      date: "03-05-2021"
    },
    {
      OrderID: 121,
      CustomerName: "Matt Damon",
      item: "Pasta",
      price: 200,
      date: "01-05-2021"
    },
    {
      OrderID: 100,
      CustomerName: "Eminem",
      item: "Pasta",
      price: 200,
      date: "03-05-2021"
    },
    {
      OrderID: 190,
      CustomerName: "Busta Rhymes",
      item: "Shake",
      price: 100,
      date: "01-05-2021"
    },
    {
      OrderID: 102,
      CustomerName: "Dr. DRE",
      item: "Pasta",
      price: 200,
      date: "04-05-2021"
    }
  ];

  //display demo table
  const displayTable = () => {
    setTable(true);
  };

  //change theme of application
  const setDarkMode = () => {
    dispatch(
      themeActions.changeTheme({
        status: !themeStatus
      })
    );
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className="Home"
      //   style={{ backgroundColor: themeStatus ? "#23201F" : "transparent" }}
    >
      <div
        className="ParticlesDiv"
        style={{ backgroundColor: themeStatus ? "#23201F" : "transparent" }}
      >
        <ParticleBubble />
      </div>{" "}
      <div className="headerDiv">
        <span
          className="header"
          style={{ color: themeStatus ? "white" : "#121633" }}
        >
          eezql
        </span>
        <div className="userContainer">
          {userStatus ? (
            <div
              className="avatar"
              style={{ backgroundImage: `url(${avatar})` }}
            ></div>
          ) : null}{" "}
          <DarkModeToggle
            onChange={setDarkMode}
            checked={themeStatus}
            size={window.innerWidth < 700 ? 60 : 80}
          />
        </div>
      </div>
      <div className="introDiv">
        <motion.span
          className="introTxt"
          style={{ color: themeStatus ? "white" : "#121633" }}
          initial={{ y: -250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          The modern data workspace for the data generation
        </motion.span>
        <span
          className="subtext"
          style={{ color: themeStatus ? "rgb(231, 228, 228)" : "#121633" }}
        >
          Tired of boring terminals?
        </span>
        {!userStatus ? (
          <motion.span
            className="startBtn"
            onClick={() => history.push("/avatar")}
            style={{
              color: themeStatus ? "#23201F" : "white",
              backgroundColor: themeStatus ? "#FFDC02" : "#5ac895",
              boxShadow: themeStatus
                ? "none"
                : "1px -4px 63px -27px rgba(90, 200, 149, 0.34)"
            }}
            whileHover={{
              opacity: 0.8,
              transition: { duration: 0.2 }
            }}
          >
            Get Started
          </motion.span>
        ) : (
          <motion.span
            className="startBtn"
            onClick={() => history.push("/workspace")}
            style={{
              color: themeStatus ? "#23201F" : "white",
              backgroundColor: themeStatus ? "#FFDC02" : "#5ac895",
              boxShadow: themeStatus
                ? "none"
                : "1px -4px 63px -27px rgba(90, 200, 149, 0.34)"
            }}
            whileHover={{
              opacity: 0.8,
              transition: { duration: 0.2 }
            }}
          >
            Go to WorkSpace
          </motion.span>
        )}
      </div>
      <div className="DemoDiv">
        <div
          className="DemoEditor"
          style={{
            boxShadow: !themeStatus
              ? "0px 2px 20px -3px rgba(233, 230, 230, 0.75)"
              : "none"
          }}
        >
          <div
            className="actionsDiv"
            style={{ backgroundColor: themeStatus ? "#3f3c3a" : "white" }}
          >
            <div
              className="runbtn"
              style={{
                color: themeStatus ? "#23201F" : "white",
                backgroundColor: themeStatus ? "#FFDC02" : "#56ca94",
                boxShadow: themeStatus
                  ? "none"
                  : "1px -4px 63px -27px rgba(90, 200, 149, 0.34)"
              }}
              onClick={displayTable}
            >
              Run
            </div>
          </div>
          <div
            className="Editor"
            style={{ backgroundColor: themeStatus ? "#302d2b" : "#fcfcfc" }}
          >
            <div className="code">
              <div
                className="indexDiv"
                style={{ backgroundColor: themeStatus ? "#494543" : "#f5f6fa" }}
              >
                <span
                  className="index"
                  style={{ color: themeStatus ? "#8159C2" : "#81838b" }}
                >
                  1.
                </span>
              </div>
              <div className="codebody">
                <span className="codetext">
                  <Typist>
                    <Typist.Delay ms={500} />
                    <span style={{ color: "#EE5B65" }}>SELECT</span>{" "}
                    <span style={{ color: "#F8C763" }}>*</span>{" "}
                    <span style={{ color: "#EE5B65" }}>FROM</span>{" "}
                    <span style={{ color: "#99C794" }}>ORDERS</span>;
                  </Typist>
                </span>
              </div>
            </div>
          </div>
        </div>
        {table ? (
          <motion.div
            className="DemoTable"
            style={{
              boxShadow: !themeStatus
                ? "0px 2px 20px -3px rgba(233, 230, 230, 0.75)"
                : "none"
            }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div
              className="tableHeading"
              style={{
                backgroundColor: themeStatus ? "#302d2b" : "#fcfcfc",
                color: themeStatus ? "#FFDC02" : "#5ac895"
              }}
            >
              Displaying ORDERS
            </div>
            <div
              className="tableContent"
              style={{ backgroundColor: themeStatus ? "#3f3c3a" : "white" }}
            >
              <motion.table
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        backgroundColor: themeStatus ? "#302d2b" : "#f5f6fa",
                        color: themeStatus ? "#FFDC02" : "#81838b"
                      }}
                    >
                      Order Id
                    </th>
                    <th
                      style={{
                        backgroundColor: themeStatus ? "#302d2b" : "#f5f6fa",
                        color: themeStatus ? "#FFDC02" : "#81838b"
                      }}
                    >
                      Customer Name
                    </th>
                    <th
                      style={{
                        backgroundColor: themeStatus ? "#302d2b" : "#f5f6fa",
                        color: themeStatus ? "#FFDC02" : "#81838b"
                      }}
                    >
                      Item
                    </th>
                    <th
                      style={{
                        backgroundColor: themeStatus ? "#302d2b" : "#f5f6fa",
                        color: themeStatus ? "#FFDC02" : "#81838b"
                      }}
                    >
                      Price
                    </th>
                    <th
                      style={{
                        backgroundColor: themeStatus ? "#302d2b" : "#f5f6fa",
                        color: themeStatus ? "#FFDC02" : "#81838b"
                      }}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sampleJSON.map(sample => (
                    <tr>
                      <td
                        style={{
                          backgroundColor: themeStatus ? "#23201F" : "#fcfcfc",
                          color: themeStatus ? "#FFDC02" : "#81838b"
                        }}
                      >
                        {sample.OrderID}
                      </td>
                      <td
                        style={{
                          backgroundColor: themeStatus ? "#23201F" : "#fcfcfc",
                          color: themeStatus ? "#FFDC02" : "#81838b"
                        }}
                      >
                        {sample.CustomerName}
                      </td>
                      <td
                        style={{
                          backgroundColor: themeStatus ? "#23201F" : "#fcfcfc",
                          color: themeStatus ? "#FFDC02" : "#81838b"
                        }}
                      >
                        {sample.item}
                      </td>
                      <td
                        style={{
                          backgroundColor: themeStatus ? "#23201F" : "#fcfcfc",
                          color: themeStatus ? "#FFDC02" : "#81838b"
                        }}
                      >
                        {sample.price}
                      </td>
                      <td
                        style={{
                          backgroundColor: themeStatus ? "#23201F" : "#fcfcfc",
                          color: themeStatus ? "#FFDC02" : "#81838b"
                        }}
                      >
                        {sample.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </motion.table>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;

//#494543
