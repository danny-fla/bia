import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { useHistory, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import useRedirect from "../../hooks/useRedirect";

const ReviewCreateForm = () => {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const [reviewData, setReviewData] = useState({
    chefId: id,
    content: "",
  });
  const { chefId, content} = reviewData;

  const history = useHistory();

  const [rating, setRating] = useState(0); // initial rating value

   // Catch Rating value
   const handleRating = (rate) => {
    setRating(rate / 20);
  };

  const handleChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("chef", chefId);
    formData.append("rating", rating);
    formData.append("content", content);

    try {
      await axiosReq.post("/reviews/", formData);
      history.goBack();
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Rating</Form.Label>
        <Form.Control
          name="rating"
          value={rating}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Rating onClick={handleRating} /* Available Props */ />
      </Form.Group>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        {console.log('Save btn pressed:')}
        Save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      {console.log('rating:', rating)}
      <Container className={appStyles.Content}>{textFields}</Container>
    </Form>
  );
};

export default ReviewCreateForm;