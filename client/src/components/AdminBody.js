import { useSelector } from "react-redux";
import Card from "./Card";

const AdminBody = () => {
  const { products } = useSelector((state) => state.products);
  return (
    <div className="container">
      <div className="row">
        {products?.map((product) => (
          <Card key={product._id} product={product} adminPage={true} />
        ))}
      </div>
    </div>
  );
};

export default AdminBody;
