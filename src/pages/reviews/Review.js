// react imports
import React, {useState} from "react";
// bootstrap imports
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { Rating } from "react-simple-star-rating";

import { MoreDropdown } from "../../components/MoreDropdown";
import ReviewEditForm from "./ReviewEditForm";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { axiosRes } from "../../api/axiosDefaults";

const Review = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    rating,
    review,
    id,
    setReviews,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/reviews/${id}/`);

      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.filter((review) => review.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at} </span>
          <p>
            <Rating readonly initialValue={rating} size={20}/* Available Props */ />
          </p>
          <p>
            {content}
          </p>

          {showEditForm ? (
            <ReviewEditForm
            id={id}
            profile_id={profile_id}
            review={review}
            rating={rating}
            profileImage={profile_image}
            content={content}
            setReviews={setReviews}
            setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>
      
              <br />
              {review}
            </p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Review;