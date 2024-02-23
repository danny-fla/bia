import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/bia-logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp()
    } catch (err) {
    }
  };

  const addRecipeIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/recipes/create"
    >
      <i className="fa-solid fa-list-check"></i>Add recipe
    </NavLink>
  );

  const loggedInIcons = (
    <>
       <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/chefs"
      >
       <i className="fa-solid fa-fire-burner"/>
        Chefs
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/contact/create"
      >
        <i className="fa-solid fa-file-signature" />
        Contact
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt" />
        Logout
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
    <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/contact/create"
      >
        <i className="fa-solid fa-file-signature" />
        Contact
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt" />
        Login
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus" />
        Register
      </NavLink>
    </>
  );


  return (
    <>
      <Navbar
        expanded={expanded}
        className={`${styles.NavBar} `}
        expand="lg"
        fixed="top"
        collapseOnSelect
      >
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" height="60" />
            </Navbar.Brand>
          </NavLink>
          {currentUser && (
            <>
              {addRecipeIcon}
            </>
          )}
          <Navbar.Toggle
            ref={ref}
            onClick={() => {
              setExpanded(!expanded);
            }}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
              <NavLink
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/"
                aria-label="Home"
              >
                <i className="fas fa-home"></i>Home
              </NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
