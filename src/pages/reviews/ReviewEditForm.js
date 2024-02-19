import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { axiosRes } from "../../api/axiosDefaults";

function ReviewEditForm(props) {
  const { id, setReviews, setShowEditForm, chefId, content } = props;
  const [editedReview, setEditedReview] = useState(content); // Initialize with empty string
  // const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   // Set the initial value of editedReview when the review prop changes
  //   setEditedReview(review);
  // }, [review]);

  const handleChange = (event) => {
    setEditedReview(event.target.value);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("Submitting edited review:", editedReview);
  //   try {
  //     const response = await axiosRes.put(`/reviews/${id}/`, {
  //       chef: chefId, // Assuming you have access to chefId or another identifier for the chef
  //       content: editedReview,
  //     });
  //     // Update the review in the parent component's state
  //     console.log("Update response:", response.data);
  //     setReviews((prevReviews) =>
  //       prevReviews.map((r) => (r.id === id ? { ...r, content: response.data.content } : r))
  //     );
  //     setShowEditForm(false); // Hide the edit form after successful submission
  //   } catch (error) {
  //     setErrors(error.response?.data?.detail || ["An error occurred. Please try again."]);
  //     console.log('ERROR: ', error)
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/reviews/${id}/`, {
        content: editedReview.trim(),
      });
      console.log('CONTENT: ', editedReview)
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((r) => {
          return r.id === id
            ? {
                ...r,
                content: editedReview.trim(),
                updated_at: "now",
              }
            : r;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control as="textarea" name="review" value={editedReview} onChange={handleChange} />
      </Form.Group>
      {/* {errors.map((error, index) => (
        <Alert key={index} variant="danger">
          {error}
        </Alert>
      ))} */}
      <Button type="submit">Save Changes</Button>
    </Form>
  );
};

export default ReviewEditForm;
