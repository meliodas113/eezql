import React, { useState, useRef, lazy, useEffect } from 'react';
import './WorkSpace.css';
import { Link } from 'react-router-dom';

//import react-icons
import { RiDragDropFill } from 'react-icons/ri';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { ImHome } from 'react-icons/im';

//import DarkMode Toggle Button
import DarkModeToggle from 'react-dark-mode-toggle';

//import redux actions and operators
import { useSelector } from 'react-redux';
import { themeActions } from '../../store/theme-slice';
import { fileActions } from '../../store/file-slice';
import { useDispatch } from 'react-redux';

//import custom component to patse csv -> JSON
import { parse } from 'papaparse';

//import framer-motion library
import { motion } from 'framer-motion';

//import useHistory to detect location of route
import { useHistory } from 'react-router-dom';

//import Particle.js
const ParticleBubble = lazy(() => import('../../Components/ParticleBubble'));

function WorkSpace() {
  const history = useHistory();

  //declaring states
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const [highlighted, setHighlighted] = React.useState(false);

  //states from redux
  const themeStatus = useSelector((state) => state.theme.darkTheme);
  const avatar = useSelector((state) => state.user.avatar);
  const files = useSelector((state) => state.file.files);
  const isLoggedIn = useSelector((state) => state.user.userLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      alert('Please login to continue');
      history.push('/avatar');
    }
  }, [isLoggedIn, history]);

  const dispatch = useDispatch();

  //setting ref to file input
  const inputFile = useRef(null);

  const setDarkMode = () => {
    dispatch(
      themeActions.changeTheme({
        status: !themeStatus,
      })
    );
    setIsDarkMode(!isDarkMode);
  };

  //function to upload file
  const onChangeFile = (e) => {
    e.stopPropagation();
    e.preventDefault();
    Array.from(e.target.files)
      .filter((file) => file.type === 'text/csv')
      .forEach(async (file) => {
        const text = await file.text();
        const result = parse(text);
        dispatch(
          fileActions.addFile({
            name: file.name,
            content: result,
            actualFile: file,
          })
        );
      });
  };

  //get date on which file is being uploaded
  const getTodayDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var finalDate = dd + '/' + mm + '/' + yyyy;
    return finalDate;
  };

  return (
    <div className='WorkSpace'>
      <input
        type='file'
        id='file'
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={onChangeFile}
      />
      <div
        className='ParticlesDiv'
        style={{ backgroundColor: themeStatus ? '#23201F' : 'transparent' }}
      >
        <ParticleBubble />
      </div>
      <div className='headerDiv'>
        <span
          className='header'
          style={{ color: themeStatus ? 'white' : '#121633' }}
        >
          eezql
        </span>
        <div className='userDiv'>
          <motion.span
            className='homeBtn'
            whileHover={{
              opacity: 0.5,
              transition: { duration: 0.2 },
            }}
            onClick={() => history.push('/')}
          >
            <ImHome
              style={{
                color: themeStatus ? '#FFDC02' : '#56ca94',
                cursor: 'pointer',
              }}
            />
          </motion.span>
          <div
            className='avatar'
            style={{ backgroundImage: `url(${avatar})` }}
          ></div>
          <DarkModeToggle
            onChange={setDarkMode}
            checked={themeStatus}
            size={window.innerWidth < 700 ? 60 : 80}
          />
        </div>
      </div>
      <div className='WorkArea'>
        <motion.div
          initial={{ y: 250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className='UploadArea'
          style={{
            boxShadow: themeStatus
              ? 'none'
              : '0px 2px 20px -3px rgba(245, 242, 242, 0.75)',
          }}
        >
          <div
            className='headerDiv'
            style={{
              backgroundColor: themeStatus ? '#3f3c3a' : 'rgb(250, 248, 248)',
            }}
          >
            <span
              className='headerText'
              style={{ color: themeStatus ? '#FFDC02' : '#56ca94' }}
            >
              Upload your files
            </span>
          </div>
          <div
            className='uploadDiv'
            style={{
              backgroundColor: themeStatus ? '#302d2b' : 'white',
            }}
          >
            <div
              className='DragDrop'
              style={{
                backgroundColor: themeStatus ? '#3f3c3a' : 'rgb(247, 247, 247)',
                opacity: highlighted ? 0.1 : 1,
              }}
              onDragEnter={() => {
                setHighlighted(true);
              }}
              onDragLeave={() => {
                setHighlighted(false);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                setHighlighted(false);
                Array.from(e.dataTransfer.files)
                  .filter((file) => file.type === 'text/csv')
                  .forEach(async (file) => {
                    const text = await file.text();
                    const result = parse(text);
                    dispatch(
                      fileActions.addFile({
                        name: file.name,
                        content: result,
                        actualFile: file,
                      })
                    );
                  });
              }}
            >
              <span
                className='DragDropIcon'
                style={{ color: themeStatus ? '#64605d' : '#c7c9d3' }}
                onClick={() => {
                  inputFile.current.click();
                }}
              >
                {' '}
                <RiDragDropFill />
              </span>
              <span
                className='dndText'
                style={{ color: themeStatus ? '#64605d' : '#c7c9d3' }}
              >
                Drag and Drop your files here or Click on the icon
              </span>
            </div>
            <div
              className='TableDiv'
              style={{
                backgroundColor: themeStatus ? '#3f3c3a' : 'white',
                boxShadow: themeStatus
                  ? 'none'
                  : '0px 2px 20px -3px rgba(245, 242, 242, 0.75)',
              }}
            >
              {files && files.length > 0 ? (
                <motion.table
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  style={{ width: '95%' }}
                >
                  <tr>
                    <th
                      style={{
                        backgroundColor: themeStatus ? '#302d2b' : '#f5f6fa',
                        color: themeStatus ? '#FFDC02' : '#81838b',
                      }}
                    >
                      File name
                    </th>
                    <th
                      style={{
                        backgroundColor: themeStatus ? '#302d2b' : '#f5f6fa',
                        color: themeStatus ? '#FFDC02' : '#81838b',
                      }}
                    >
                      Rows
                    </th>
                    <th
                      style={{
                        backgroundColor: themeStatus ? '#302d2b' : '#f5f6fa',
                        color: themeStatus ? '#FFDC02' : '#81838b',
                      }}
                    >
                      Columns
                    </th>
                    <th
                      style={{
                        backgroundColor: themeStatus ? '#302d2b' : '#f5f6fa',
                        color: themeStatus ? '#FFDC02' : '#81838b',
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        backgroundColor: themeStatus ? '#302d2b' : '#f5f6fa',
                        color: themeStatus ? '#FFDC02' : '#81838b',
                      }}
                    >
                      Edit
                    </th>
                    <th
                      style={{
                        backgroundColor: themeStatus ? '#302d2b' : '#f5f6fa',
                        color: themeStatus ? '#FFDC02' : '#81838b',
                      }}
                    >
                      Delete
                    </th>
                  </tr>
                  {files && files.length > 0
                    ? files.map((file) => {
                        return (
                          <motion.tr
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <td
                              style={{
                                color: themeStatus ? '#FFDC02' : '#56ca94',
                                backgroundColor: themeStatus
                                  ? '#23201F'
                                  : '#fcfcfc',
                                fontFamily: 'Poppins-Medium',
                              }}
                            >
                              {file.fileName}
                            </td>
                            <td
                              style={{
                                color: themeStatus ? '#FFDC02' : '#81838b',
                                backgroundColor: themeStatus
                                  ? '#23201F'
                                  : '#fcfcfc',
                              }}
                            >
                              {file.fileContent.data.length}
                            </td>
                            <td
                              style={{
                                color: themeStatus ? '#FFDC02' : '#81838b',
                                backgroundColor: themeStatus
                                  ? '#23201F'
                                  : '#fcfcfc',
                              }}
                            >
                              {file.fileContent.data[0].length}
                            </td>
                            <td
                              style={{
                                color: themeStatus ? '#FFDC02' : '#81838b',
                                backgroundColor: themeStatus
                                  ? '#23201F'
                                  : '#fcfcfc',
                              }}
                            >
                              {getTodayDate()}
                            </td>
                            <td
                              style={{
                                backgroundColor: themeStatus
                                  ? '#23201F'
                                  : '#fcfcfc',
                                color: themeStatus ? '#FFDC02' : '#81838b',
                                fontFamily: 'Poppins-Medium',
                                fontSize: '1.5vw',
                              }}
                            >
                              <Link
                                to={{
                                  pathname: 'dashboard',
                                }}
                                onClick={() => {
                                  const fileName = file.fileName;
                                  dispatch(
                                    fileActions.setFileUnderEdit({
                                      name: fileName,
                                      fileContent: file.fileContent,
                                      file: file.actualFile,
                                    })
                                  );
                                }}
                                style={{
                                  color: themeStatus ? '#FFDC02' : '#81838b',
                                }}
                              >
                                <AiFillEdit style={{ cursor: 'pointer' }} />
                              </Link>
                            </td>
                            <td
                              style={{
                                backgroundColor: themeStatus
                                  ? '#23201F'
                                  : '#fcfcfc',
                                color: themeStatus ? '#FFDC02' : '#81838b',
                                fontFamily: 'Poppins-Medium',
                                fontSize: '1.5vw',
                              }}
                            >
                              <AiFillDelete
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  const fileName = file.fileName;
                                  dispatch(
                                    fileActions.deleteFile({
                                      name: fileName,
                                    })
                                  );
                                }}
                              />
                            </td>
                          </motion.tr>
                        );
                      })
                    : null}
                </motion.table>
              ) : null}
              {files && files.length > 0
                ? files.map((file) => (
                    <div className='fileCard'>
                      <div
                        className='fileHeading'
                        style={{
                          backgroundColor: themeStatus ? '#302d2b' : '#f5f6fa',
                          color: themeStatus ? '#FFDC02' : '#81838b',
                        }}
                      >
                        <span className='fileName'> {file.fileName}</span>
                        <div className='fileActions'>
                          <span className='edit'>
                            <Link
                              to={{
                                pathname: 'dashboard',
                              }}
                              onClick={() => {
                                const fileName = file.fileName;
                                dispatch(
                                  fileActions.setFileUnderEdit({
                                    name: fileName,
                                    fileContent: file.fileContent,
                                    file: file.actualFile,
                                  })
                                );
                              }}
                              style={{
                                color: themeStatus ? '#FFDC02' : '#81838b',
                              }}
                            >
                              <AiFillEdit style={{ cursor: 'pointer' }} />
                            </Link>{' '}
                          </span>
                          <span
                            className='delete'
                            onClick={() => {
                              const fileName = file.fileName;
                              dispatch(
                                fileActions.deleteFile({
                                  name: fileName,
                                })
                              );
                            }}
                          >
                            {' '}
                            <AiFillDelete />
                          </span>
                        </div>
                      </div>
                      <div
                        className='fileDetails'
                        style={{
                          backgroundColor: themeStatus ? '#23201F' : '#fcfcfc',
                          color: themeStatus ? '#FFDC02' : '#81838b',
                          fontFamily: 'Poppins-Medium',
                        }}
                      >
                        <span className='rows'>
                          Rows : {file.fileContent.data.length}
                        </span>{' '}
                        <span className='columns'>
                          Columns : {file.fileContent.data[0].length}
                        </span>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default WorkSpace;

//#64605d
