import React from "react";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";

import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Recipe.module.css";

// component renders chef information and statistics
const Chef = (props) => {
  const {
    owner,
    id,
    profile_id,
    profile_image,
    is_available,
    experience,
    location,
    email,
    phone,
    average_rating,
    reviews_count,
    isProfilePage,
    showAll,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  return (
    <Card className={styles.Recipe}>
      <Card.Body>
       <h3>{owner}</h3>
        {!isProfilePage && (
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={100} />
            </Link>
          </Media>
        )}
        <p className="text-center">
          Looking for work: <strong>{is_available ? "Yes" : "No"}</strong>
        </p>
        <p className="text-center">
          Location: {"    "}
          <strong>{location}</strong>
        </p>
        <p className="text-center">
          Years of Experience: {"    "}
          <strong>{experience}</strong>
        </p>
        <p className="text-center">
          Email: {"    "}
          <strong>{email}</strong>
        </p>
        <p className="text-center">
          Phone: 
          <strong>{phone}</strong>
        </p>
        <p className="text-center">
          Rating:
          {" "}
          <Rating readonly initialValue={average_rating} size={25} />
        </p>
        <p className="text-center">
          Reviews: {"    "}
          <strong>{reviews_count}</strong>
        </p>
        {!is_owner && (
          <Button
            className={`${btnStyles.Button} ${btnStyles.Basil}`}
            onClick={() => history.push(`/reviews/${id}/create`)}
            aria-label="create-review"
          >
            Leave a review
          </Button>
        )}
        {showAll && (
          <Button
            className={`${btnStyles.Button} ${btnStyles.Basil}`}
            onClick={() => history.push(`/reviews/${id}`)}
            aria-label="view-reviews"
          >
            Chef Reviews
          </Button>
        )}
        <br></br>
        <br></br>
      </Card.Body>
    </Card>
  );
};

export default Chef;
