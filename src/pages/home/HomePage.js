import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Recipe from "../recipes/Recipe";
import Quicksnap from "../quicksnaps/Quicksnap";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/HomePage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";

function HomePage({ message, filter = "" }) {
  const [recipes, setRecipes] = useState({ results: [] });
  const [quicksnaps, setQuicksnaps] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get(`/recipe/?${filter}`);
        setRecipes(data);
        setHasLoaded(true);
      } catch (err) {
        console.log('fetchRecipes error:', err);
        
      }
    };

    setHasLoaded(false);
    fetchRecipes();
  }, [filter, pathname]);

  useEffect(() => {
    const fetchQuicksnaps = async () => {
      try {
        const { data } = await axiosReq.get(`/quicksnap/?${filter}`);
        setQuicksnaps(data);
        setHasLoaded(true);
      } catch (err) {
        console.log('fetchQuicksnaps error:', err);
      }
    };

    setHasLoaded(false);
    fetchQuicksnaps();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {hasLoaded ? (
          <>
            {recipes.results.length ? (
              recipes.results.map((recipe) => (
                <Recipe key={recipe.id} {...recipe} setRecipes={setRecipes} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {hasLoaded ? (
          <>
            {quicksnaps.results.length ? (
              quicksnaps.results.map((quicksnap) => (
                <Quicksnap key={quicksnap.id} {...quicksnap} setQuicksnaps={setQuicksnaps} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default HomePage;