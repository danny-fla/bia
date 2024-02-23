import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function ReviewEditForm(props) {
  const { id, setReviews, setShowEditForm, content } = props;
  const [editedReview, setEditedReview] = useState(content); // Initialize with empty string

  const handleChange = (event) => {
    setEditedReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/reviews/${id}/`, {
        content: editedReview.trim(),
      });
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
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control as="textarea" name="review" value={editedReview} onChange={handleChange} />
      </Form.Group>
      <Button 
        className={`${btnStyles.Button} ${btnStyles.Green}`}
        type="submit">Save Changes
      </Button>
    </Form>
  );
};

export default ReviewEditForm;
