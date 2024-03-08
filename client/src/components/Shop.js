import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categoryActions";
import { getProductsByFilter } from "../redux/actions/filterActions";
import { getProducts } from "../redux/actions/productActions";
import Card from "./Card";

const Shop = () => {
  const [text, setText] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const resetState = () => {
    setText("");
    setCategoryIds([]);
  };
  const handleSearch = (e) => {
    resetState();
    setText(e.target.value);
    dispatch(getProductsByFilter({ type: "text", query: e.target.value }));
  };

  const handleCategory = (e) => {
    resetState();
    const currentCategoryChecked = e.target.value;
    const allCategoryChecked = [...categoryIds];
    const indexFound = allCategoryChecked.indexOf(currentCategoryChecked);

    let updatedCategoryIds;
    if (indexFound === -1) {
      updatedCategoryIds = [...categoryIds, currentCategoryChecked];
      setCategoryIds(updatedCategoryIds);
    } else {
      updatedCategoryIds = [...categoryIds];
      updatedCategoryIds.splice(indexFound, 1);
      setCategoryIds(updatedCategoryIds);
    }
    dispatch(
      getProductsByFilter({ type: "category", query: updatedCategoryIds })
    );
  };

  return (
    <section className="shop-page m-4">
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Shop</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 border-end">
          <div className="text-muted mb-3">
            Filters <span className="fas fa-sliders-h"></span>
          </div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-top">
            <div className="container-fluid">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  value={text}
                  onChange={handleSearch}
                ></input>
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  disabled={true}
                >
                  Search
                </button>
              </form>
            </div>
          </nav>
          <div className="border-top border-bottom bg-light p-3">
            {categories?.map((c) => (
              <div key={c._id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="category"
                  value={c._id}
                  checked={categoryIds.includes(c._id)}
                  id="flexCheckChecked"
                  onChange={handleCategory}
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  {c.category}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            {products?.map((product) => (
              <Card key={product._id} product={product} homePage={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
