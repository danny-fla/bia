import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Chef from "./Chef";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/RecipesPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const ChefsPage = ({ message, filter = "" }) => {
  const [chefs, setChefs] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const { data } = await axiosReq.get(`/chefs/?${filter}search=${query}`);
        setChefs(data);
        setHasLoaded(true);
      } catch (err){}
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchChefs();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p className="text-center">Most followed people.</p>
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search bia for chef by name, location or speciality"
          />
        </Form>

        {hasLoaded ? (
          <>
            {chefs.results.length ? (
              <InfiniteScroll
                children={chefs.results.map((chef) => (
                  <Chef key={chef.id} {...chef} showAll />
                ))}
                dataLength={chefs.results.length}
                loader={<Asset spinner />}
                hasMore={!!chefs.next}
                next={() => fetchMoreData(chefs, setChefs)}
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
};

export default ChefsPage;