import {
  CLEAR_ERRORS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  PREV_PASSWORD,
} from "constants/Users/authConstants";
import { coreAxios } from "utilities/axios";

// Signal R Connection Class

// Login

export const login =
  (loginID, password, pcName, publicIP, privateIP) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const config = {
        headers: {},
      };
      const { data } = await coreAxios.post(
        "/api/User/Login",
        { loginID, password, pcName, publicIP, privateIP },
        config
      );
      dispatch({ type: PREV_PASSWORD, payload: password });
      // dispatch(establishConnection());
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      // Signal R Success
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error.response.data,
      });
    }
  };

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
