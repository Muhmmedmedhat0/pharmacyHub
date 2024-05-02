// ProductDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Redux/Slice/CartSlice";
import "./ProductDetail.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarsCustom from "../../Components/StarsCustom/StarsCustom";
import Helmet from "../../Components/Helmet/Helmet";
import MedicineAlternative from "../Medicine/MedicineAlternative";
import MedicineSimilar from "../Medicine/MedicineSimilar";

const ProductDetail = () => {
  const [userRating, setUserRating] = useState(0);
  // const [tab, setTab] = useState("desc");

  const dispatch = useDispatch();
  const { id } = useParams(); // استخدم category المستلمة من useParams()
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://e-pharmacy.runasp.net/api/product/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
        // console.log("Product fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    dispatch(
      addItemToCart({
        id: product.id,
        productName: product.name,
        image: product.pictureUrl,
        price: product.price,
        quantities: product.quantities,
        pharmacy: product.pharmacies,
      })
    );
    toast.success("Product added Successfully");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // const defaultDescription =
  //   "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut aliquam sunt veritatis dignissimos reprehenderit voluptatem perspiciatis nesciunt sequi nam eligendi. Dolor quos nostrum nam tempora dicta! Nemo laborum temporibus id?";
  // const defaultReviews = ["this product is good"];

  return (
    <Helmet title={product.name}>
      <section className="pt-0 pb-3">
        <div style={{ marginTop: "30px" }} className="container">
          <Row>
            <Col lg="6">
              <div
                style={{
                  marginTop: "30px",
                  height: "auto",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={product.pictureUrl}
                  alt={product.name}
                  style={{
                    maxWidth: "300px",
                  }}
                />
              </div>
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{product.name}</h2>
                <div className="product__rating">
                  <StarsCustom
                    totalStars={5}
                    initialRating={userRating}
                    onChange={(rating) => setUserRating(rating)}
                  />
                </div>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {product.price} EGY
                </span>
                <h4 className="mt-3">Available in:</h4>
                <div className="available">
                  {product.pharmacies?.map((pharmacy, index) => (
                    <span key={index}>⚕ {pharmacy}</span>
                  ))}
                </div>

                <button
                  style={{
                    outline: "none",
                    border: "1px solid #48d760",
                    background: "#48d760",
                    color: "#ffffff",
                    fontWeight: "600",
                    borderRadius: "6px",
                    textAlign: "center",
                    width: "130px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>
            </Col>
            {/* <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5 mt-5">
                <h5
                  onClick={() => setTab("desc")}
                  className={`${tab === "desc" ? "active__tap" : ""}`}
                >
                  Description
                </h5>
                <h5
                  onClick={() => setTab("rev")}
                  className={`${tab === "rev" ? "active__tap" : ""}`}
                >
                  Review ({defaultReviews.length})
                </h5>
              </div>
              {tab === "desc" ? (
                <div className="tap__content mt-3">
                  <p>{product.description || defaultDescription}</p>
                </div>
              ) : (
                <div className="product__review">
                  <div className="review__wrapper">
                    <ul>
                      <li>
                        <span>
                          <Stars
                            initialRating={userRating}
                            onChange={(rating) => setUserRating(rating)}
                          />
                        </span>
                        <p>{defaultReviews}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </Col> */}
          </Row>
          <Row
            style={{
              marginTop: "50px",
            }}
          >
            <Col>
              <MedicineAlternative id={id} category="Medicine" />
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "50px",
            }}
          >
            <Col>
              <MedicineSimilar id={id} category="Medicine" />
            </Col>
          </Row>
        </div>
      </section>
    </Helmet>
  );
};

export default ProductDetail;
