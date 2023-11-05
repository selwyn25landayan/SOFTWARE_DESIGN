import React, { useState, useEffect } from "react";
import { useOrderDetailsContext } from "../hooks/useOrderDetailsContext";

const OrderDetailForm = () => {
  const { dispatch } = useOrderDetailsContext()
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [service_options, setServiceOptions] = useState("");
  const [weight, setWeight] = useState("");
  const [laundry_services, setLaundryServices] = useState([]);
  const [payment, setPayment] = useState("");
  const [delivery_options, setDelivery] = useState("");
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    let newTotal = 0;
  
    newTotal += laundry_services.reduce((total, service) => {
      if (service === "Wash" || service === "Dry") {
        return total + 80; // Assign the value 80 for "Wash" and "Dry"
      } else if (service === "Fold") {
        return total + 30; // Assign the value 30 for "Fold"
      }
      return total;
    }, 0);
  
    if (delivery_options === "Deliver") newTotal += 80;
  
    setTotal(newTotal);
  }, [laundry_services, delivery_options]);  

  const handleServiceOptionClick = (option) => {
    setServiceOptions(option);
  };

  const handleLaundryServiceClick = (option) => {
    if (option === "Wash") {
      // Ensure wash is selected before the others
      setLaundryServices([option]);
    } else if (option === "Dry") {
      if (laundry_services.includes("Wash")) {
        setLaundryServices([...laundry_services, option]);
      }
    } else if (option === "Fold") {
      if (laundry_services.includes("Wash") && laundry_services.includes("Dry")) {
        setLaundryServices([...laundry_services, option]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderdetail = {
      name,
      address,
      mobile_number,
      service_options,
      weight,
      laundry_services,
      payment,
      delivery_options,
      total,
    };

    const response = await fetch("/api/orderDetails", {
      method: "POST",
      body: JSON.stringify(orderdetail),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setAddress("");
      setMobileNumber("");
      setServiceOptions("");
      setWeight("");
      setLaundryServices([]);
      setPayment("");
      setDelivery("");
      setTotal(0);
      setError(null);
      console.log("New Order Detail Added", json);
      dispatch({type: 'CREATE_ORDERDETAILS', payload: json})
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Fill Out this Order Form</h3>

      <label>Name: </label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Address: </label>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />

      <label>Mobile Number: </label>
      <input
        type="text"
        onChange={(e) => setMobileNumber(e.target.value)}
        value={mobile_number}
      />

      <label>Service Options: </label>
      <div>
        <button
          onClick={() => handleServiceOptionClick("Self Service")}
          className={service_options === "Self Service" ? "selected" : ""}
        >
          Self Service
        </button>
        <button
          onClick={() => handleServiceOptionClick("Full Service")}
          className={service_options === "Full Service" ? "selected" : ""}
        >
          Full Service
        </button>
      </div>

      <label>Weight: </label>
      <div>
        <button
          onClick={() => setWeight("8")}
          className={weight === "8" ? "selected" : ""}
        >
          8 kg
        </button>
        <button
          onClick={() => setWeight("12")}
          className={weight === "12" ? "selected" : ""}
        >
          12 kg
        </button>
      </div>

      <label>Laundry Services: </label>
      <div>
        <button
          onClick={() => handleLaundryServiceClick("Wash")}
          className={laundry_services.includes("Wash") ? "selected" : ""}
        >
          Wash
        </button>
        <button
          onClick={() => handleLaundryServiceClick("Dry")}
          className={laundry_services.includes("Dry") ? "selected" : ""}
        >
          Dry
        </button>
        <button
          onClick={() => handleLaundryServiceClick("Fold")}
          className={laundry_services.includes("Fold") ? "selected" : ""}
        >
          Fold
        </button>
      </div>

      <label>Mode of Payment: </label>
      <select onChange={(e) => setPayment(e.target.value)} value={payment}>
        <option value="">Select payment</option>
        <option value="Cash">Cash</option>
        <option value="Gcash">Gcash</option>
      </select>

      <label>Delivery Options: </label>
      <select onChange={(e) => setDelivery(e.target.value)} value={delivery_options}>
        <option value="">Select delivery</option>
        <option value="Pick Up">Pick Up</option>
        <option value="Deliver">Deliver</option>
      </select>

      <label>Total: </label>
      <input type="text" value={total} readOnly />

      <button>Place Order</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default OrderDetailForm;
