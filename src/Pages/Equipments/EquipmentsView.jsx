import React, { useState } from "react";
import EquipmentsProduct from "./EquipmentsProduct";
import { Row, Col } from "react-bootstrap";
import Helmet from "../../Components/Helmet/Helmet";
const EquipmentsView = (product) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of products per page

  // Calculate index of the first and last items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the products array to get the products for the current page
  const currentProducts = product.myProduct.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Function to handle pagination
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate product items for the current page
  const productItems = currentProducts.map((product) => {
    return (
      <EquipmentsProduct
      key={product.id} // Use idProduct as the unique key
      id={product.id}
      name={product.name}
      price={product.price}
      pictureUrl={product.pictureUrl}
      category={product.category}
      pharmacies={product.pharmacies}
      quantity={product.quantity}
      />
    );
  });

  // Calculate total number of pages
  const totalPages = Math.ceil(product.myProduct.length / itemsPerPage);

  // Generate pagination buttons
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button key={i} onClick={() => handlePaginationClick(i)}>
        {i}
      </button>
    );
  }

  return (
    <Helmet title="Cares">
      <div>
        <div className="container">
          <Row className="content">
            <Col className="cards">{productItems}</Col>
          </Row>
          <div className="pagination">{paginationButtons}</div>
        </div>
      </div>
    </Helmet>
  );
};

export default EquipmentsView;
