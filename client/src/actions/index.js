import axios from "axios";
import { FETCH_USER } from "./types";

/*redux thunk is passed to create store as a middleware. 
here we are returning a function insted of the normal action object.
with redux thnunk we have a direct access to the dispatch function 
*/
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data }); // dispatching the action directly from here - to the reducer
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
