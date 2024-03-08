const AdminActionBtns = () => {
  return (
    <div className="bg-light my-2">
      <div className="container">
        <div className="row pb-3">
          <div className="col-md-4 my-1">
            <button
              className="btn btn-outline-info btn-block"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addCategoryModal"
              aria-expanded="false"
              aria-controls="#addCategoryModal"
            >
              <i className="fas fa-plus"> Add Category</i>
            </button>
          </div>
          <div className="col-md-4 my-1">
            <button
              className="btn btn-outline-warning btn-block"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addFoodModal"
              aria-expanded="false"
              aria-controls="#addFoosModal"
            >
              <i className="fas fa-plus"> Add Food</i>
            </button>
          </div>
          <div className="col-md-4 my-1">
            <button className="btn btn-outline-success btn-block">
              <i className="fas fa-money-check-alt"> View Orders</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminActionBtns;
