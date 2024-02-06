import React from "react";
import styles from "../../styles/Recipe.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import { MoreDropdown } from "../../components/MoreDropdown";


const Recipe = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    recipe_comments_count,
    recipes_likes_count,
    like_id,
    title,
    ingredients,
    instructions,
    duration,
    image,
    updated_at,
    recipePage,
    setRecipes,
    reviews_count,
    average_rating,
    isProfilePage,
    showAll,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/recipe/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/recipe/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/recipelike/", { recipe: id });
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: prevRecipes.results.map((recipe) => {
          return recipe.id === id
            ? {
                ...recipe,
                recipes_likes_count: recipe.recipes_likes_count + 1,
                like_id: data.id,
              }
            : recipe;
        }),
      }));
    } catch (err) {
      console.log("LIKE ERROR:", err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/recipelike/${like_id}/`);
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: prevRecipes.results.map((recipe) => {
          return recipe.id === id
            ? {
                ...recipe,
                recipes_likes_count: recipe.recipes_likes_count - 1,
                like_id: null,
              }
            : recipe;
        }),
      }));
    } catch (err) {
      console.log("UNLIKE ERROR:", err);
    }
  };

  return (
    <Card className={styles.Recipe}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            <strong>Recipe</strong> from {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && recipePage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/recipes/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {ingredients && (
          <Card.Text>
            <em>Ingredients</em> - {ingredients}
          </Card.Text>
        )}
        {instructions && (
          <Card.Text>
            <em>Instructions</em> - {instructions}
          </Card.Text>
        )}
        {duration && (
          <Card.Text>
            <em>Duration</em> - {duration}
          </Card.Text>
        )}
        <div className={styles.RecipeBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own recipe!</Tooltip>}
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
              overlay={<Tooltip>Log in to like recipes!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {recipes_likes_count}
          <Link to={`/recipes/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {recipe_comments_count}
        </div>
      </Card.Body>
      <Card.Body>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Basil}`}
            onClick={() => history.push(`/reviews/${id}/create`)}
            aria-label="create-review"
          >
            Leave a review
          </Button>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Basil}`}
            onClick={() => history.push(`/reviews/${id}`)}
            aria-label="view-reviews"
          >
            Recipe Reviews
          </Button>
      </Card.Body>
    </Card>
  );
};

export default Recipe;
