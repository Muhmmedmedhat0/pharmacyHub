import React, { useEffect, useState } from "react";
// import Search from "../../Components/Search/Search";
import { Fragment } from "react";
import { Row } from "react-bootstrap";
import "../../css/Cares.css";

const CategoryView = ({ categoryId, categoryName, ViewComponent }) => {
  useEffect(() => {
    fetchDataHandler();
  }, [categoryId]);

  const [products, setProducts] = useState([]);

  async function fetchDataHandler() {
    const response = await fetch(
      `https://e-pharmacy.runasp.net/api/product?CategoryId=${categoryId}`
    );
    const Product = await response.json();
    // console.log(Product.data);
    const ProductData = Product.data.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        pictureUrl: product.pictureUrl,
        category: product.category,
        pharmacies: product.pharmacies,
        quantity: product.quantity,
      };
    });
    setProducts(ProductData);
    // console.log(ProductData);
  }

  return (
    <Fragment>
      {/* <Search id="custom-search" /> */}
      <div className="container">
        <Row id="Cares">
          <h2>{categoryName}</h2>
        </Row>
      </div>
      <ViewComponent myProduct={products} />
    </Fragment>
  );
};

export default CategoryView;
