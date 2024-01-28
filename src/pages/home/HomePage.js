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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function HomePage({ message, filter = "" }) {
  const [recipes, setRecipes] = useState({ results: [] });
  const [quicksnaps, setQuicksnaps] = useState({ results: [] });
  const [combinedData, setCombinedData] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recipes
        const recipeResponse = await axiosReq.get(
          `/recipe/?${filter}search=${query}`
        );
        setRecipes(recipeResponse.data);
        console.log("recipeRespone.data.results:", recipeResponse.data.results);
        

        // Fetch quicksnaps
        const quicksnapResponse = await axiosReq.get(
          `/quicksnap/?${filter}search=${query}`
        );
        const quicksnapsData = quicksnapResponse.data.results;
        console.log(
          "quicksnapResponse.data.results",
          quicksnapResponse.data.results
        );
        
        // Filter out quicksnaps with duplicate ids in recipes
        const filteredQuicksnaps = quicksnapsData.filter(
          (quicksnap) =>
            !recipeResponse.data.results.some(
              (recipe) => recipe.id === quicksnap.id
            )
        );
        console.log("filteredQuicksnaps:", filteredQuicksnaps);
        
        // Combine recipes with filteredQuicksnaps
        const combinedData = [
          ...recipeResponse.data.results,
          ...filteredQuicksnaps,
        ];
        console.log('combinedData', combinedData )

        // Set the combined data into state
        // setQuicksnaps({ results: [...filteredQuicksnaps] });
        setCombinedData(combinedData);
        console.log('setCombinedData', setCombinedData )
        

        setHasLoaded(true);

        console.log("Combined Data:", combinedData.data);
      } catch (err) {
        console.log("Data fetching error:", err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
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
            placeholder="Search Bia"
          />
        </Form>
        {hasLoaded ? (
          <>
            {/* {combinedData.results.length ?  (
              combinedData.results.map((combinedData) => ( */}
                {combinedData.length ?  (
                  combinedData.map((combinedData) => (
                <React.Fragment key={combinedData.id}>
                  <Quicksnap {...combinedData} setCombinedData={setCombinedData} />
                  <Recipe {...combinedData} setCombinedData={setCombinedData} />
                </React.Fragment>
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
    </Row>
  );
}

export default HomePage;
