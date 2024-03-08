import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../redux/actions/categoryActions";
import { getProducts } from "../redux/actions/productActions";
import AdminActionBtns from "./AdminActionBtns";
import AdminCategoryModal from "./AdminCategoryModal";
import AdminHeader from "./AdminHeader";
import AdminProductModal from "./AdminProductModal";
import AdminBody from "./AdminBody";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch])
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])
  return (
    <section>
      <AdminHeader />
      <AdminActionBtns />
      <AdminCategoryModal />
      <AdminProductModal />
      <AdminBody />
    </section>
  );
};
export default AdminDashboard;
