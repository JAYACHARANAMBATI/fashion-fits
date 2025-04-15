import React from "react";
import { Link } from "react-router-dom";
import { CardContainer, CardBody, CardItem } from "./3d-card";
import "./3d-card.css";

const TrendingCard = ({ product }) => {
  return (
    <CardContainer className="card-container">
      <CardBody className="card-body trending-3d-card">
        <CardItem className="trending-3d-img-container" translateZ="40">
          <img
            src={product.image}
            alt={product.name}
            className="trending-3d-img"
          />
          <CardItem
            className="trending-3d-badge"
            translateZ="60"
            translateX="5"
            translateY="-5"
          >
            Trending
          </CardItem>
        </CardItem>

        <div className="trending-3d-content">
          <CardItem className="trending-3d-title" translateZ="50">
            {product.name}
          </CardItem>

          <CardItem className="trending-3d-price" translateZ="60">
            ${product.price.toFixed(2)}
          </CardItem>

          <CardItem className="trending-3d-btn-container" translateZ="70">
            <Link
              to={`/product/${product.id}`}
              className="view-trending-3d-btn"
            >
              Shop Now
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default TrendingCard;
