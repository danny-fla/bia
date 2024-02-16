import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import useRedirect from "../../hooks/useRedirect";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

const ReviewEditForm = () => { 
  const { id } = useParams();
  
  const [errors, setErrors] = useState({});
  const [reviewData, setReviewData] = useState({
    chefId: "",
    content: "",
  });
 
  const history = useHistory();

  useEffect(() => {
    // Fetch existing review data for editing
    const fetchReviewData = async () => {
      try {
        const response = await axiosReq.get(`/reviews/${id}/`);
        const { chef, content } = response.data;
        setReviewData({ chefId: chef, content });
        console.log(chef)
      } catch (err) {
        console.error("Error fetching review data:", err);
      }
    };

    fetchReviewData(); // Call the function to fetch review data
  }, [history, id]);

  const handleChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
    console.log("Review Data: ", reviewData)
  };

  const chefId = reviewData.chefId;
  const content = reviewData.content;


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("chef", chefId);
    formData.append("content", content);
    console.log(formData)

    try {
      await axiosReq.put(`/reviews/${id}/`, formData);
      history.goBack();
      console.log("after submit form data: ", formData)
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        console.log(err.response)
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={appStyles.Content}>
        <div className="text-center">
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="content"
              value={reviewData.content}
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
          <Button
            className={`${btnStyles.Button} ${btnStyles.Blue}`}
            type="submit"
          >
            Save
          </Button>
        </div>
      </Container>
    </Form>
  );
};

export default ReviewEditForm;
