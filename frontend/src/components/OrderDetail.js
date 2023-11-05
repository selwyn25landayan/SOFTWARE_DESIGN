const OrderDetails = ({ orderdetail }) => {
  const formattedCreatedAt = new Date(orderdetail.createdAt).toLocaleString(); 
  return (
    <div className="order-details">
      <h4>Sunday | 6:00 PM</h4>
      <p><strong>Name: </strong>{orderdetail.name}</p>
      <p><strong>Address: </strong>{orderdetail.address}</p>
      <p><strong>Mobile Number: </strong>{orderdetail.mobile_number}</p>
      <p><strong>Service Options: </strong>{orderdetail.service_options}</p>
      <p><strong>Weight (kg): </strong>{orderdetail.weight}</p>
      <p><strong>Laundry Services: </strong>{orderdetail.laundry_services}</p>
      <p><strong>Mode of Payment: </strong>{orderdetail.payment}</p>
      <p><strong>Delivery Options: </strong>{orderdetail.delivery_options}</p>
      <p><strong>Total: </strong>{orderdetail.total}</p>
      <p><strong>Created At: </strong>{formattedCreatedAt}</p> {}
    </div>
  );
}

export default OrderDetails;
