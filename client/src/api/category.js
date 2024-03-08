import axios from "axios";

export const createCategory = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const response = await axios.post("/api/category", formData, config);

  return response;
};

/* //////////////////////////////////////////////////////////
This part is no longer needed after the introduction of Redux
//////////////////////////////////////////////////////////////*/
export const getCategories = async () => {
  const response = await axios.get("/api/category");

  return response;
};
/* //////////////////////////////////////////////////////////*/


// API setup instruction: Video 31

/* Connection frontend - backend explained in Video 39 (
AdminDashboard.js in components ->
categories.js in api -> 
server.js in client -> 
categories.js in routes -> 
categories.js in controllers
*/
