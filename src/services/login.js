import { coreAxios } from "../utilities/axios";
import { establishConnection } from "../actions/SignalR/SignalRAction";
import { getPermissionByUser } from "../actions/User/Permission";
import { LOGIN_FAILED, LOGIN_SUCCESS } from "../constants/User/authConstants";

export const getUser = () => {
  const userStr = localStorage.getItem("loginID");
  if (userStr !== undefined) return JSON.parse(userStr);
  else return null;
};

export const userInfo = () => {
  const userRole = JSON.parse(localStorage?.getItem("roleID"));
  const userDepId = JSON.parse(localStorage?.getItem("departmentID"));
  const EmpID = JSON.parse(localStorage?.getItem("empID"));
  const comapanyID = JSON.parse(localStorage?.getItem("comapanyID"));

  const roleID = JSON.parse(localStorage?.getItem("roleID"));
  const empSeatingLocationID = JSON.parse(
    localStorage?.getItem("empSeatingLocationID")
  );
  const functionRoleID = JSON.parse(localStorage?.getItem("functionRoleID"));
  const userName = localStorage?.getItem("userName");
  const isCorporateEmployee = localStorage?.getItem("isCorporateEmployee");
  // const designationName = JSON.parse(localStorage?.getItem("designationName"));
  const companyName = JSON.parse(localStorage?.getItem("companyName"));

  console.log("companyName----", companyName);
  return {
    userRole,
    userDepId,
    EmpID,
    comapanyID,

    empSeatingLocationID,
    roleID,
    functionRoleID,
    userName,
    isCorporateEmployee,
    companyName,
    // designationName,
  };
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const setUserSession = (
  token,
  loginID,
  empID,
  comapanyID,
  departmentID,
  departmentName,
  designationID,
  designationName,
  lastLogin,
  lastLoginIP,
  lastLoginTime,
  roleID,
  roleName,
  userID,
  userName,
  isDeptHead,
  isManagement,
  isSectionHead,
  userImagePath,
  empSeatingLocationID,
  functionID,
  functionMgmtID,
  isCorporateEmployee,
  companyName
) => {
  token && localStorage.setItem("token", token);
  loginID && localStorage.setItem("loginID", JSON.stringify(loginID));
  empID && localStorage.setItem("empID", JSON.stringify(empID));
  comapanyID && localStorage.setItem("comapanyID", JSON.stringify(comapanyID));

  departmentID &&
    localStorage.setItem("departmentID", JSON.stringify(departmentID));
  departmentName && localStorage.setItem("departmentName", departmentName);
  designationID &&
    localStorage.setItem("designationID", JSON.stringify(designationID));
  designationName && localStorage.setItem("designationName", designationName);
  lastLogin && localStorage.setItem("lastLogin", JSON.stringify(lastLogin));
  lastLoginIP &&
    localStorage.setItem("lastLoginIP", JSON.stringify(lastLoginIP));
  lastLoginTime &&
    localStorage.setItem("lastLoginTime", JSON.stringify(lastLoginTime));
  roleID && localStorage.setItem("roleID", JSON.stringify(roleID));
  roleName && localStorage.setItem("roleName", roleName);
  userID && localStorage.setItem("userID", JSON.stringify(userID));
  userName && localStorage.setItem("userName", userName?.trim());
  isDeptHead && localStorage.setItem("isDeptHead", isDeptHead);
  isSectionHead && localStorage.setItem("isSectionHead", isSectionHead);
  isManagement && localStorage.setItem("isManagement", isManagement);
  userImagePath && localStorage.setItem("userImagePath", userImagePath);
  empSeatingLocationID &&
    localStorage.setItem("empSeatingLocationID", empSeatingLocationID);
  localStorage.setItem("functionRoleID", functionID || 0);
  localStorage.setItem("functionMgmtID", functionMgmtID || 0);
  localStorage.setItem("isCorporateEmployee", isCorporateEmployee || 0);
  companyName &&
    localStorage.setItem("companyName", JSON.stringify(companyName));
};

export const removeUserSession = () => {
  localStorage.clear();
};

export const loadUser = () => {
  return (dispatch) => {
    coreAxios
      .get("/api/User/GetPermissionsOfLoggedInUser", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(async (res) => {
        const sortedData = {
          ...res.data,
          permissionDetail: res.data.permissionDetail?.sort((a, b) =>
            a.pageName.localeCompare(b.pageName)
          ),
        };
        await dispatch({ type: LOGIN_SUCCESS, payload: sortedData });
        await dispatch(getPermissionByUser());
        await dispatch(establishConnection(localStorage.getItem("token")));
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILED, payload: err?.response?.data });
      });
  };
};
