import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "../Auth/auth";
import { LoginHeader } from "../../../common/authTokens";
import { API } from "../../Config/config";

export const HandleProfile = async (userId) => {
    return await axios({
      method: "GET",
      url: `${API.userInfoById}/${userId}`,
      headers: LoginHeader(),
    })
      .then((request) => {
        return request;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          HandleLogout();
        } else {
          toast.error("Something went wrong");
        }
        return error;
      });
  };