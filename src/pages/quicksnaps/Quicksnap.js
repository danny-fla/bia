import React from "react";
import styles from "../../styles/Quicksnap.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

const Quicksnap = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    quicksnap_comments_count,
    quicksnap_likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    quicksnapPage,
    setQuicksnaps,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/quicksnaplikes/", { quicksnap: id });
      setQuicksnaps((prevQuicksnaps) => ({
        ...prevQuicksnaps,
        results: prevQuicksnaps.results.map((quicksnap) => {
          return quicksnap.id === id
            ? { ...quicksnap, quicksnaps_likes_count: quicksnap.quicksnaps_likes_count + 1, like_id: data.id }
            : quicksnap;
        }),
      }));
    } catch (err) {
      console.log( "LIKE ERROR:", err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/quicksnaplikes/${like_id}/`);
      setQuicksnaps((prevQuicksnaps) => ({
        ...prevQuicksnaps,
        results: prevQuicksnaps.results.map((quicksnap) => {
          return quicksnap.id === id
            ? { ...quicksnap, quicksnaps_likes_count: quicksnap.quicksnaps_likes_count - 1, like_id: null }
            : quicksnap;
        }),
      }));
    } catch (err) {
      console.log('UNLIKE ERROR:', err);
    }
  };

  return (
    <Card className={styles.Quicksnap}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            <strong>QuickSnap</strong> from {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && quicksnapPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/quicksnaps/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.QuicksnapBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own photo!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like photos!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {quicksnap_likes_count}
          <Link to={`/quicksnaps/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {quicksnap_comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Quicksnap;