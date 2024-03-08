const UserDashboard = () => {
  const showHeader = () => (
    <div className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>
              <i className="fas fa-home"> Dashboard</i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section>{showHeader()}</section>
      <h2 className="m-4">Inside User Dashboard</h2>
    </>
  );
};
export default UserDashboard;
