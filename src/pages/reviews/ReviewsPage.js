import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useLocation, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Review from "./Review";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";

import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Chef from "../chefs/Chef";

const ReviewsPage = ({ message }) => {
  const [reviews, setReviews] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const { id } = useParams();

  const [chefData, setChefData] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/?chef=${id}`);
        setReviews(data);
        setHasLoaded(true);
        console.log('data:', data)
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }

    };

    const fetchChef = async () => {
      try {
        const { data } = await axiosReq.get(`/chefs/${id}`);
        setChefData(data);
      } catch (err) {
        console.log('error fetching chefs:', err)
      }
    };

    setHasLoaded(false);
    fetchChef();
    fetchReviews();
  }, [pathname, currentUser, id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />

        <Chef {...chefData} isProfilePage={false} />

        {hasLoaded ? (
          <>

            {reviews.results.length ? (
              <InfiniteScroll
                children={reviews.results.map((chef) => (
                  <Review key={chef.id} {...chef} isProfilePage={false} />
                ))}
                dataLength={reviews.results.length}
                loader={<Asset spinner />}
                hasMore={!!reviews.next}
                next={() => fetchMoreData(reviews, setReviews)}
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

export default ReviewsPage;