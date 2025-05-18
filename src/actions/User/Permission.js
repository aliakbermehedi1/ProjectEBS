import {
  ALL_PERMISSION_FAILED_BY_USER,
  ALL_PERMISSION_REQUEST_BY_USER,
  ALL_PERMISSION_SUCCESS_BY_USER,
} from "../../constants/User/PermissionUser";
import { coreAxios } from "../../utilities/axios";

export const getPermissionByUser = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PERMISSION_REQUEST_BY_USER });

    const { data } = await coreAxios.get(
      `/api/User/GetPermissionsOfLoggedInUser`
    );
    const allData = {
      permissions: data.sort((a, b) => {
        if (a.pageName < b.pageName) {
          return -1;
        } else if (a.pageName > b.pageName) {
          return 1;
        } else {
          return 0;
        }
      }),
      inactiveApps: 0,
    };
    dispatch({
      type: ALL_PERMISSION_SUCCESS_BY_USER,
      payload: allData,
    });
    return allData;
  } catch (error) {
    dispatch({
      type: ALL_PERMISSION_FAILED_BY_USER,
      payload: error.response,
    });
  }
};
