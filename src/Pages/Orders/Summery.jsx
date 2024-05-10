import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCookie } from '../../Routers/ProtectedRoute';

function Summary() {
  const cartItems = useSelector((state) => state.cart.cart.items);

  const [billingData, setBillingData] = useState({
    id: getCookie('id'),
    items: [],
    deliveryMethodId: 0,
    shippingPrice: 0,
    paymentIntentId: '',
    clientSecret: 'sk_test_51PCvbyCUzw0yD3H36zz6hsWefmw9xsfvN7wQ2AWpXV0vZBHKLb6Nc7BIBhbR7fYOPjvs3njsRqF1cv1Q0AM4ewOu007hrAyCy5',
  });

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);

    setBillingData(prevData => ({
      ...prevData,
      items: cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    }));
  }, [cartItems]);

  const shippingCost = 80; // Define the shipping cost

  const increaseQuantity = (itemId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1,
    }));

    const updatedBillingData = {
      ...billingData,
      items: billingData.items.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity + 1,
            price: item.price * (item.quantity + 1),
          };
        }
        return item;
      }),
    };
    setBillingData(updatedBillingData);

    console.log("Updated billingData after increasing quantity:", updatedBillingData);
  };

  const decreaseQuantity = (itemId) => {
    if (quantities[itemId] > 1) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));

      const updatedBillingData = {
        ...billingData,
        items: billingData.items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity: item.quantity - 1,
              price: item.price * (item.quantity - 1),
            };
          }
          return item;
        }),
      };
      setBillingData(updatedBillingData);

      console.log("Updated billingData after decreasing quantity:", updatedBillingData);
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    billingData.items.forEach((item) => {
      if (quantities[item.id] > 0) {
        total += item.price * quantities[item.id];
      }
    });
    total += shippingCost; 
    return total;
  };

  return (
    <div>
      <div className="card-body shadow-md">
        <div className="card ">
          <div className="card-header border-1 border-green-500 bg-green-100">
            Order Summary
          </div>
          {cartItems.length === 0 && (
            <div className="alert alert-warning" role="alert">
              There are no items in the cart. Please add some items.
            </div>
          )}
          <ul className="list-group">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      marginRight: '10px',
                    }}
                  />
                  <div>
                    <p className="mb-0">{item.name}</p>
                    <span className="text-green-600 font-semibold">
                      {item.price} EGP
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => decreaseQuantity(item.id)}>
                    -
                  </button>
                  <span className="badge bg-primary rounded-pill">
                    {quantities[item.id]}
                  </span>
                  <button
                    className="btn btn-sm btn-primary ms-2"
                    onClick={() => increaseQuantity(item.id)}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between px-4">
            <p>Shipping:</p>
            <p>{shippingCost} EGP</p>
          </div>
          <div className="d-flex justify-content-between mt-4 px-4">
            <p>Sub total:</p>
            <p>{calculateTotalPrice()} EGP</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between px-4">
            <p>Total:</p>
            <p>{calculateTotalPrice()} EGP</p>
          </div>
        </div>
      </div>
      <button className="btn btn-success mt-4 w-full">Checkout</button>
    </div>
  );
}

export default Summary;
