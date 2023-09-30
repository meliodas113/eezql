import React, { useState, lazy, useEffect } from 'react';
import './DashBoard.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//calling theme action
import { themeActions } from '../../store/theme-slice';
import { motion } from 'framer-motion';
//calling custom toggle button
import DarkModeToggle from 'react-dark-mode-toggle';
//navbar for desktop
const SideNav = lazy(() => import('../../Components/SideNav/SideNav'));
//navbar for mobile
const MobileNav = lazy(() => import('../../Components/MobileNav/MobileNav'));

//convert to csv to object
const convertToJson = (files) => {
  const jsonEntries = files.fileContent.data[0];
  const jsonArr = [];
  for (var i = 1; i < files.fileContent.data.length; i++) {
    const json = {};
    if (!files.fileContent.data[i].includes('')) {
      for (var j = 0; j < jsonEntries.length; j++) {
        json[jsonEntries[j]] = files.fileContent.data[i][j];
      }
    } else {
      continue;
    }
    jsonArr.push(json);
  }
  return jsonArr;
};

function Dashboard() {
  //declaring states
  const [table, showTable] = useState(false);

  //get file from redux
  const files = useSelector((state) => state.file.fileUnderEdit);
  //setting up table entries from file
  const tableEntries = files.fileContent.data[0];
  //setting actual data to render in table
  const dataToRender = convertToJson(files);

  //get other respective states from redux
  const themeStatus = useSelector((state) => state.theme.darkTheme);
  const avatar = useSelector((state) => state.user.avatar);
  const isLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!isLoggedIn) {
      alert('Please login to continue');
      history.push('/avatar');
    }
  }, [isLoggedIn, history]);

  //theme status to redux
  const setDarkMode = () => {
    dispatch(
      themeActions.changeTheme({
        status: !themeStatus,
      })
    );
  };

  return (
    <div
      className='DashBoard'
      style={{ backgroundColor: themeStatus ? '#23201F' : 'transparent' }}
    >
      <SideNav />
      <div
        className='playgroundDiv'
        style={{ backgroundColor: themeStatus ? '#23201F' : 'transparent' }}
      >
        <div
          className='header'
          style={{ backgroundColor: themeStatus ? '#302D2B' : 'white' }}
        >
          <MobileNav />

          <span
            className='headerText'
            style={{ color: themeStatus ? '#ffdc02' : '#56ca94' }}
          >
            {files.name}
          </span>
          <div className='actionBtns'>
            <div
              className='avatar'
              style={{ backgroundImage: `url(${avatar})` }}
            ></div>{' '}
            <DarkModeToggle
              onChange={setDarkMode}
              checked={themeStatus}
              size={window.innerWidth < 700 ? 60 : 80}
            />
          </div>
        </div>
        <div className='TableDiv'>
          <div className='Editor'>
            <div
              className='actionsDiv'
              style={{ backgroundColor: themeStatus ? '#3f3c3a' : 'white' }}
            >
              <div
                className='runbtn'
                onClick={() => showTable(true)}
                style={{
                  color: themeStatus ? '#23201F' : 'white',
                  backgroundColor: themeStatus ? '#FFDC02' : '#56ca94',
                  boxShadow: themeStatus
                    ? 'none'
                    : '1px -4px 63px -27px rgba(90, 200, 149, 0.34)',
                }}
              >
                Run
              </div>
            </div>
            <div
              className='RealEditor'
              style={{ backgroundColor: themeStatus ? '#302d2b' : '#fcfcfc' }}
            >
              <div className='code'>
                <div
                  className='indexDiv'
                  style={{
                    backgroundColor: themeStatus ? '#494543' : '#f5f6fa',
                  }}
                >
                  <span
                    className='index'
                    style={{ color: themeStatus ? '#8159C2' : '#81838b' }}
                  >
                    1.
                  </span>
                </div>
                <div className='codebody'>
                  <span className='codetext'>
                    <span style={{ color: '#EE5B65' }}>SELECT</span>{' '}
                    <span style={{ color: '#F8C763' }}>*</span>{' '}
                    <span style={{ color: '#EE5B65' }}>FROM</span>{' '}
                    <span style={{ color: '#99C794' }}>
                      {files.name.replace('.csv', '')} ;
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {table ? (
            <motion.div
              className='TableContainer'
              style={{
                backgroundColor: themeStatus ? '#3f3c3a' : 'white',
                boxShadow: themeStatus
                  ? 'none'
                  : '1px -4px 63px -27px rgba(90, 200, 149, 0.34)',
              }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <motion.table
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <thead>
                  <tr>
                    {tableEntries.map((entry) => {
                      return (
                        <th
                          style={{
                            backgroundColor: themeStatus
                              ? '#302d2b'
                              : '#f5f6fa',
                            color: themeStatus ? '#FFDC02' : '#81838b',
                          }}
                          key={entry}
                        >
                          {entry}
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                {dataToRender.length > 10
                  ? dataToRender.slice(0, 10).map((data) => {
                      return (
                        <tr>
                          {tableEntries.map((entry) => {
                            return (
                              <td
                                style={{
                                  backgroundColor: themeStatus
                                    ? '#23201F'
                                    : '#fcfcfc',
                                  color: themeStatus ? '#FFDC02' : '#81838b',
                                }}
                              >
                                {data[entry]}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  : dataToRender.map((data) => {
                      return (
                        <tr>
                          {tableEntries.map((entry) => {
                            return (
                              <td
                                style={{
                                  backgroundColor: themeStatus
                                    ? '#23201F'
                                    : '#fcfcfc',
                                  color: themeStatus ? '#FFDC02' : '#81838b',
                                }}
                              >
                                {data[entry]}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
              </motion.table>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
