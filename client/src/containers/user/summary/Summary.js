import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
import axios from "axios";
import Header from "../../../components/Header";
import Swal from "sweetalert2";

function Summary() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    phoneno: "",
    city: "",
    state: "",
    streetaddress: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedItems = queryParams.get("items")?.split(",") || [];

  useEffect(() => {
    const localUserId = localStorage.getItem("id");
    if (localUserId) {
      getAll(localUserId);
    } else {
      navigate(ROUTES.login.name);
    }
  }, []);

  function getAll(userid) {
    try {
      axios
        .get(`http://localhost:8085/cart?userId=${userid}`)
        .then((response) => {
          const filteredItems = response.data.cartItems.filter((item) =>
            selectedItems.includes(item._id)
          );
          setCartItems(filteredItems);
        });
    } catch (e) {
      console.log(e);
    }
  }

  function renderSummary() {
    let orderTotal = 0;
    cartItems.forEach((item) => {
      orderTotal += item.product.price * item.count;
    });

    const OrderSummary = ({ listCart, orderTotal }) => {
      return (
        <ul className="list-group mb-2 col-6">
          <h4>Cart Items:</h4>
          {listCart.map((list, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
            >
              <div>
                <img
                  src={"http://localhost:8085/" + list.product.images[0]}
                  className="rounded"
                  width="70"
                  height="70"
                  alt="Loading Images"
                />
                <h6 className="my-0">{list.product.name}</h6>
                <small className="text-muted">Quantity: {list.count}</small>
              </div>
              <span className="text-muted">
                $ {list.count * list.product.price}
              </span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between bg-light">
            <small className="text-info">Total (USD)</small>
            <strong className="text-info">${orderTotal}</strong>
          </li>
        </ul>
      );
    };

    const PickupDetails = ({ userData }) => {
    //  useEffect(() => {
        if (userData && userData.length > 0) {
          const user = userData[0].user;
          setFormData({
            email: user.email || "",
            phoneno: user.phoneno || "",
            city: user.city || "",
            state: user.state || "",
            streetaddress: user.streetaddress || "",
          });
        }
     // }, [userData[0].user]);

      return (
        <div className="col-12 col-lg-6 pb-4">
          <h4>PickupDetails:</h4>
          Email:
          <input
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="form-control"
            placeholder="Enter your email address"
          />
          Phone Number
          <input
            type="text"
            value={formData.phoneno}
            onChange={(e) =>
              setFormData({ ...formData, phoneno: e.target.value })
            }
            className="form-control"
            placeholder="Enter your email address"
          />
          Street Address
          <input
            type="text"
            value={formData.streetaddress}
            onChange={(e) =>
              setFormData({ ...formData, streetaddress: e.target.value })
            }
            className="form-control"
            placeholder="Enter your street address"
          />
          City
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="form-control"
            placeholder="Enter your City"
          />
          State
          <input
            type="text"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            className="form-control"
            placeholder="Enter your State"
          />
        </div>
      );
    };
    // const handlePlaceOrder = async () => {
    //   setPaymentLoading(true);
    //   try {
    //     // Call backend to create Payment Intent
    //     const response = await axios.post('/create-checkout-session', {
    //       cartItems,
    //       orderTotal,
    //     });
    //     const sessionId = response.data.id;
  
    //     const stripe = await stripePromise;
    //     // Redirect to Stripe checkout page
    //     await stripe.redirectToCheckout({
    //       sessionId,
    //     });
    //   } catch (error) {
    //     console.error('Error while creating Payment Intent:', error);
    //     setPaymentLoading(false);
    //   }
    // };

    const saveUserDetails = () => {
      try {
        axios
          .post("http://localhost:8085/summary", formData)
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "success",
              title: "Success",
              text: message,
            });
            navigate(ROUTES.home.name);
          });
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <div className="backgroundWhiteBorder">
        <div className="container">
          <div className="card">
            <div className="card-header bg-dark text-light ml-0 row container">
              OrderSummary
            </div>
            <div className="card-body">
              <div className="container rounded p-2">
                <div className="row">
                  <PickupDetails userData={cartItems} />
                  <OrderSummary listCart={cartItems} orderTotal={orderTotal} />
                </div>
              </div>
            </div>
            <button className="btn btn-success" onClick={saveUserDetails}>
              Place Order
            </button>
            {/* <Elements stripe={stripePromise}>
        <button className="btn btn-success" onClick={handlePlaceOrder} disabled={paymentLoading}>
          {paymentLoading ? 'Processing...' : 'Place Order'}
        </button>
      </Elements> */}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header />
      {renderSummary()}
    </div>
  );
}

export default Summary;
