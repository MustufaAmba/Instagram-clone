import logo from "./instagramlogo.png";
import "./header.css";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { auth } from "./firebase";
import HomeIcon from "@material-ui/icons/Home";
import messenger from "./messenger.png";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

//here all the navigation links login and sign up modals are defined with instagram logo
const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  logo1: {
    height: "80px",
    width: "200px",
    marginLeft: "200px",
    marginTop: "80px",
    backgroundColor: "white",
    marginBottom: "20px",
  },
  input: {
    width: "300px",
    marginLeft: "200px",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openlogin, setOpenlogin] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setuser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // here on every new user login we are storing the name of user into session storage to achieve different purpose
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //console.log(authUser);
        setuser(authUser);
        sessionStorage.setItem("currentuser", user?.displayName);
      } else {
        setuser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  //here we are creating a new user using firebase inbuilt function createUserWithEmailAndPassword() 
  const handlesignup = (event) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  //here we are validating the login using firebase inbuilt function signInWithEmailAndPassword() 
  const handlesignin = (event) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenlogin(false);
    //window.location.reload();
    sessionStorage.setItem("currentuser", user?.displayName);
  };
  return (
    <div className="header">
      <Link to="/Home">
        <img className="logo" src={logo} alt="instagram logo" />
      </Link>
      <div className="nav_bar">
        <h2 className="menu">
          {" "}
          <Link to="/Home">
            <HomeIcon fontSize="large" />
          </Link>
        </h2>

        <h2 className="menu">
          <Link to="/Chat" >
            <img
              className="menu1"
              src={messenger}
              alt="chat icon"
              height="30"
            />
          </Link>
        </h2>
        <h2 className="menu">
          <AccountCircle fontSize="large" onClick={handleClick} />{" "}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>
              {user ? (
                <input
                  className="logoutbtn"
                  type="button"
                  onClick={() => {
                    auth.signOut();
                    sessionStorage.setItem("currentuser", "");
                    window.location.reload();
                  }}
                  value="Logout"
                />
              ) : (
                <input
                  className="logoutbtn"
                  type="button"
                  onClick={() => setOpen(true)}
                  value="Sign Up"
                />
              )}
            </MenuItem>
          </Menu>
        </h2>
      </div>

      {/*sign up modal*/}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="formstyle">
            <img
              style={modalStyle}
              className={classes.logo1}
              src={logo}
              alt="instagram logo"
            />
            <input
              style={modalStyle}
              className={classes.input}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <input
              style={modalStyle}
              className={classes.input}
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              style={modalStyle}
              className={classes.input}
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="submitbtn"
              type="submit"
              value="sign Up"
              onClick={handlesignup}
            />
            <p className="ortext">Or</p>
            <input
              className="submitbtn"
              type="button"
              value="log In"
              onClick={() => {
                setOpenlogin(true);
                setOpen(false);
              }}
            />
          </form>
        </div>
      </Modal>

      {/*sign in modal*/}
      <Modal
        open={openlogin}
        onClose={() => {
          setOpenlogin(false);
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="formstyle">
            <img
              style={modalStyle}
              className={classes.logo1}
              src={logo}
              alt="instagram logo"
            />

            <input
              style={modalStyle}
              className={classes.input}
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              style={modalStyle}
              className={classes.input}
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="submitbtn"
              type="submit"
              value="log In"
              onClick={handlesignin}
            />
            <p className="ortext">Or</p>
            <input
              className="submitbtn"
              type="button"
              value="sign Up"
              onClick={() => setOpen(true)}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};
export default Header;
