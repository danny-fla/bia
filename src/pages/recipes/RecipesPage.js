import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Recipe from "./Recipe";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/RecipesPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles"
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function RecipesPage({ message, filter = "" }) {
  const [recipes, setRecipes] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get(`/recipe/?${filter}search=${query}&category=${category}`);
        setRecipes(data);
        setHasLoaded(true);
      } catch (err) {
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
        fetchRecipes();
    }, 1000)
    return () => {
        clearTimeout(timer)
    }
  }, [filter, query, pathname, category, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            size="sm"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search bia"
          />
           <Form.Control
                size="sm"
                as="select"
                placeholder="Choose..."
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option key="blankChoice" hidden value>
                  {" "}
                  Category{" "}
                </option>
                <option>Breakfast</option>
                <option>Snack</option>
                <option>Lunch</option>
                <option>Dinner</option>
              </Form.Control>
              <br></br>
        </Form>
        {hasLoaded ? (
          <>
            {recipes.results.length ? (
              <InfiniteScroll
              children={recipes.results.map((recipe) => (
                <Recipe key={recipe.id} {...recipe} setRecipes={setRecipes} />
              ))}
              dataLength={recipes.results.length}
              loader={<Asset spinner />}
              hasMore={!!recipes.next}
              next={() => fetchMoreData(recipes, setRecipes)}
            />
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
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default RecipesPage;