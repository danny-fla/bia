import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Quicksnap from "./Quicksnap";


function QuicksnapPage() {
  const { id } = useParams();
  const [quicksnap, setQuicksnap] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: quicksnap }] = await Promise.all([
          axiosReq.get(`/quicksnap/${id}`),
        ]);
        setQuicksnap({ results: [quicksnap] });
        console.log(quicksnap);
      } catch (err) {
        console.log("this is the error:" ,err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Quicksnap {...quicksnap.results[0]} setQuicksnaps={setQuicksnap} quicksnapPage />
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default QuicksnapPage;
