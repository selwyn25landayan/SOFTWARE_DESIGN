import { useEffect } from "react";
import { useOrderDetailsContext } from "../hooks/useOrderDetailsContext";
import OrderDetails from "../components/OrderDetail";
import WorkoutForm from "../components/OrderDetailForm";

const Home = () => {
  const { orderdetails, dispatch } = useOrderDetailsContext();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await fetch('/api/orderDetails/');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_ORDERDETAILS', payload: json });
      }
    };
    fetchOrderDetails();
  }, [dispatch]); // Add 'dispatch' to the dependency array

  return (
    <div className="home">
      <div className="orderdetails-container">
        <WorkoutForm />
      </div>
      <div className="orderdetails">
        {orderdetails && orderdetails.map((orderdetail) => (
          <OrderDetails orderdetail={orderdetail} key={orderdetail._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
