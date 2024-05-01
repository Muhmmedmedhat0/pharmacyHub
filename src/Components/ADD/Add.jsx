// Add.js
import React from "react";
import { toast } from "react-toastify";

const Add = (props) => {
  const addToCart = () => {
    props.addToCart({
      id: props.id,
      productName: props.productName,
      image: props.image,
      price: props.price,
      quantities: props.quantities,
      pharmacy: props.pharmacy,
    });
    toast.success("Product added Successfully");
  };

  return (
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
  );
};

export default Add;
