import React from "react";
import { useRef } from "react";
import { useState } from "react";
import RichTextEditor from "react-rte";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import styles from "../../styles/RecipeCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function RecipeCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    category: "",
    duration: "",
    image: "",
  });
  const { title, ingredients, instructions, category, duration, image } = recipeData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setRecipeData({
      ...recipeData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setRecipeData({
        ...recipeData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("category", category);
    formData.append("duration", duration);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/recipe/", formData);
      history.push(`/recipes/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // Inside the RecipeCreateForm component
  const [ingredientsValue, setIngredientsValue] = useState(
    RichTextEditor.createEmptyValue()
  );
  const [instructionsValue, setInstructionsValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  const handleIngredientsChange = (value) => {
    setIngredientsValue(value);
    setRecipeData({
      ...recipeData,
      ingredients: value.toString("html"), // Convert RichTextEditor value to HTML string
    });
  };

  const handleInstructionsChange = (value) => {
    setInstructionsValue(value);
    setRecipeData({
      ...recipeData,
      instructions: value.toString("html"), // Convert RichTextEditor value to HTML string
    });
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Ingredients</Form.Label>
        <RichTextEditor
          value={ingredientsValue}
          onChange={handleIngredientsChange}
        />
      </Form.Group>
      {errors?.ingredients?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Instructions</Form.Label>
        <RichTextEditor
          value={instructionsValue}
          onChange={handleInstructionsChange}
        />
      </Form.Group>
      {errors?.instructions?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
     <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
        >
          <option>Breakfast</option>
          <option>Snack</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Duration <small>(mins)</small></Form.Label>
        <Form.Control
          type="number"
          rows={1}
          name="duration"
          value={duration}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.duration?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Green}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Green}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={5} lg={8} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
        <Col className="py-2 p-0 p-md-2" md={7} lg={4}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Green} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default RecipeCreateForm;
