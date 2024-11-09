import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
function Summary() {
  const [cartItems, setcartItems] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userinlocal = localStorage.getItem("id");
    if (userinlocal) {
      setUserId(userinlocal);
      getAll(userinlocal);
    } else {
      navigate(ROUTES.login.name);
    }
  }, []);
  function getAll(userid) {
    try {
      axios
        .get(`http://localhost:8085/cart?userId=${userid}`)
        .then((response) => {
          console.log(response.data.cartItems);
          setcartItems(response.data.cartItems);
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
        <ul className="list-group mb-3 col-6">
          <h4>Order Summary:</h4>
          {/* Render list items */}
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
                  alt="card-image cap"
                />
                <h6 className="my-0">{list.product.name}</h6>
                <small className="text-muted">Quantity: {list.count}</small>
              </div>
              <span className="text-muted">
                $ {list.count * list.product.price}
              </span>
            </li>
          ))}
          {/* Render total */}

          <li className="list-group-item d-flex justify-content-between bg-light">
            <small className="text-info">Total (USD)</small>
            <strong className="text-info">${orderTotal}</strong>
          </li>
        </ul>
      );
    };

    // const PickupDetails = ({ userdata }) => {
    //   // Define state for input values
    //   const [name, setName] = useState("");
    //   const [phoneNumber, setPhoneNumber] = useState("");
    //   const [email, setEmail] = useState("");
    //   const [streetadd, setStreetAdd] = useState("");
    //   const [city, setCity] = useState("");
    //   const [state, setState] = useState("");

    //   // Other input states...
    //   console.log(userdata);
    //   return (
    //     <div className="col-12 col-lg-6 pb-4">

    //       <h4>PickupDetails:</h4> {/* Render input fields */}
    //       Name
    //       <input
    //         value={name}
    //         //  onChange={(e) => setName(e.target.value)}
    //         type="text"
    //         className="form-control"
    //         placeholder="Name"
    //       />
    //       Email
    //       <input
    //         value={email}
    //        // onChange={(e) => setName(e.target.value)}
    //         type="text"
    //         className="form-control"
    //         placeholder="Email Address"
    //       />
    //       PhoneNumber
    //       <input
    //         value={phoneNumber}
    //         onChange={(e) => setName(e.target.value)}
    //         type="text"
    //         className="form-control"
    //         placeholder="Phone Number"
    //       />
    //       Street Address
    //       <input
    //         value={streetadd}
    //         onChange={(e) => setName(e.target.value)}
    //         type="text"
    //         className="form-control"
    //         placeholder="Street Address"
    //       />
    //       City
    //       <input
    //         value={city}
    //         onChange={(e) => setName(e.target.value)}
    //         type="text"
    //         className="form-control"
    //         placeholder="City"
    //       />
    //       State
    //       <input
    //         value={state}
    //         onChange={(e) => setName(e.target.value)}
    //         type="text"
    //         className="form-control"
    //         placeholder="State"
    //       />
    //       {/* Other input fields... */}
    //     </div>
    //   );
    // };
    const PickupDetails = ({ userdata, saveDetails }) => {
      // Define state for input values
      //   const [name, setName] = useState("");
      //  const [userId, setUserId] = useState("");
      const [phoneNumber, setPhoneNumber] = useState("");
      const [email, setEmail] = useState("");
      const [streetadd, setStreetAdd] = useState("");
      const [city, setCity] = useState("");
      const [state, setState] = useState("");
      const [orderTotal, setOrderTotal] = useState("");
      const [orderStatus, setOrderStatus] = useState("");
      const [paymentStatus, setPaymentStatus] = useState("");
      const [paymentDate, setPaymentData] = useState("");
      // const [form, setForm] = useState({
      //   email: "",
      //   phoneNumber:"",
      //   streetadd: "",
      //   city: "",
      //   state: "",
      //   orderTotal: "",
      //   orderStatus: "",
      //   paymentStatus: "",
      //   paymentDate: "",
      // });

      // Populate input fields with user data when it's available
      useEffect(() => {
        if (userdata && userdata.length > 0) {
          const user = userdata[0].user; // Assuming userdata is an array
          //  setName(user.name || "");
          setEmail(user.email || "");
          setPhoneNumber(user.phoneno || "");
          setStreetAdd(user.streetaddress || "");
          setCity(user.city || "");
          setState(user.state || "");
        }
      }, [userdata]);
      const handleSaveDetails = () => {
        saveDetails({
          email: email,
          phoneNumber: phoneNumber,
          streetaddress: streetadd,
          city: city,
          state: state,
          // Add other necessary data for the order summary
        });
      };

      return (
        <div className="col-12 col-lg-6 pb-4">
          <h4>PickupDetails:</h4>
          {/* Render input fields */}
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Email Address"
          />
          PhoneNumber
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Phone Number"
          />
          Street Address
          <input
            value={streetadd}
            onChange={(e) => setStreetAdd(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Street Address"
          />
          City
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            className="form-control"
            placeholder="City"
          />
          State
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            type="text"
            className="form-control"
            placeholder="State"
          />
          {/* <button onClick={handleSaveDetails}>test</button> */}
        </div>
      );
    };
    const saveDetails = (details) => {
      // You can perform any saving operation here, like sending to backend
      console.log("Details to be saved:", details);
      // Example: send details to backend
      axios
        .post("http://localhost:8085/summary", details)
        .then((response) => {
          console.log("Details saved successfully:", response.data);
          // Handle response or show success message to the user
        })
        .catch((error) => {
          console.error("Error saving details:", error);
          // Handle error scenario
        });
    };
    async function handlePlaceOrder() {
      try {
        console.log("Cart Items:", cartItems);
        // Log user data for each item
        cartItems.forEach((item, index) => {
          console.log(`User ${index + 1}:`, item.user);
        });

        // Assuming you're taking user data from the first item in cartItems
        const userData = cartItems.length > 0 ? cartItems[0].user : null;

        const response = await axios.post("http://localhost:8085/summary", {
          userId: userId,
          streetaddress: userData ? userData.streetaddress : "", // Assuming the user object has a property streetadd
          city: userData ? userData.city : "", // Assuming the user object has a property city
          state: userData ? userData.state : "", // Assuming the user object has a property state
          phoneno: userData ? userData.phoneno : "", // Assuming the user object has a property phoneNumber
          orderTotal: orderTotal,
          // Add other necessary data for the order summary
        });

        if (response.status === 200) {
          console.log("Order placed successfully!");
          // Redirect or show success message to the user
        } else {
          console.log("Failed to place order");
          // Handle error scenario
        }
      } catch (error) {
        console.error("Error placing order:", error);
        // Handle error scenario
      }
    }

    const PaymentSection = ({ data }) => {
      const paymentclick = async () => {
        const stripe = await loadStripe(
          "pk_test_51OWYPOJD4X8VwIlFwHvVdeFG7ssfH2jg7mMlYnTFwXmRrRrnlemBWXMf4lFOnJyqd106lorp8HzXbYhWNICzL4TS00lyAq1sQB"
        );
        const body = {};
        const headers = {
          "content-type": "application/json",
        };
        const response = await fetch("/create-checkout-session", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        });
        const session = await response.json();
        const result = stripe.redirectToCheckout({
          sessionId: session.id,
        });
      };
      return (
        <div className="col-12 col-md-4">
          {/* Stripe payment button */}
          <button
            type="submit"
            value="Place Order"
            className="btn btn-success form-control"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
          <button
            type="submit"
            value="Place Order"
            className="btn btn-success form-control"
            onClick={paymentclick}
          >
            Payment
          </button>
        </div>
      );
    };

    return (
      <div className="backgroundWhiteBorder">
        <div className="container">
          <div className="card">
            <div className="card-header bg-dark text-light ml-0 row container">
              Order Summary
            </div>

            <div className="card-body">
              <div className="container rounded p-2">
                <div className="row">
                  {/* Pickup Details */}
                  <PickupDetails
                    userdata={cartItems}
                    saveDetails={saveDetails}
                  />
                  {/* Order Summary */}
                  <OrderSummary listCart={cartItems} orderTotal={orderTotal} />
                </div>
              </div>
            </div>
            {/* Footer */}
              <div className="card-footer">
              {/* Footer content */}
              <PaymentSection data={cartItems} />
              {/* <handlePlaceOrder userdata={cartItems}/> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div>{renderSummary()}</div>
    </div>
  );
}

export default Summary;
