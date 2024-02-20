import React from 'react';
import NoResults from '../assets/no-results.png';
import styles from '../styles/NoResults.module.css';
import Asset from './Asset';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

const NotFound = () => {
  return (
    <div className={`${styles.NotResults} mt-3 text-center`}>
      <NavDropdown title="Why did the HTTP request go to therapy?">
        <NavDropdown.Item>
          <Link to="/">Because it had a 404 error and couldn't find itself </Link>
        </NavDropdown.Item>
      </NavDropdown>
      <br></br>
      <Asset src={NoResults} />
    </div>
  );
};

export default NotFound;
