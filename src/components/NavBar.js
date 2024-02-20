import React from "react";
import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/bia-logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
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
  const [toggleNavBar, setToggleNavBar] = useState(false);
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      setToggleNavBar(!toggleNavBar);
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
    </>
  );

  const loggedInDropdownIcons = (
    <>
      <NavDropdown.Item 
        id={styles.dropdownItem}
        as={Link}
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavDropdown.Item>
      <NavDropdown.Item 
        id={styles.dropdownItem}
        as={Link} 
        to="/signin" 
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt"></i>Logout
      </NavDropdown.Item>
    </>
  );
  
  const loggedOutDropdownIcons = (
    <>
      <NavDropdown.Item 
        id={styles.dropdownItem}
        as={Link} 
        to="/signin"
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-sign-in-alt"></i>Login
      </NavDropdown.Item>
      <NavDropdown.Item 
        id={styles.dropdownItem}
        as={Link} 
        to="/signup"
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-user-plus"></i>Register
      </NavDropdown.Item>
    </>
  );
  

  return (
    <>
      <Navbar
        expanded={toggleNavBar || expanded}
        className={`${styles.NavBar} `}
        expand="md"
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
              setToggleNavBar(!toggleNavBar);
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
                onClick={() => {
                  setToggleNavBar(!toggleNavBar);
                }}
              >
                <i className="fas fa-home"></i>Home
              </NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
              <NavDropdown 
              title={
                <span>
                    <i className="fas fa-user-alt ml-5"></i>
                </span>
              }

              id="basic-nav-dropdown" 
            >
              {currentUser ? loggedInDropdownIcons : loggedOutDropdownIcons}
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
