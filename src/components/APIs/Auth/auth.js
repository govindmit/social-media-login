import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { googleLogout } from "@react-oauth/google";
import { authHeader } from "../../../common/authTokens";
import { API } from "../../Config/config";

export const GenerateToken = async() =>{
  return await axios({
        method: "GET",
        url: `${API.authToken}`,
      }).then((request) => {
        localStorage.setItem("authToken", request.data.authToken)
      }).catch((error) => {
        return error;
      })
}

export const HandleRegister = async(reqData) =>{
  return await axios({
    method: "POST",
    url: `${API.register}`,
    data: reqData,
    headers: authHeader(),
  }).then((request) => {
    // toast.success("User added")
    // console.log(request,"3333333333333")
    if(request.data?.loggedin_by === ''){
      toast.success("Registration Successfully")
    }
      return request;
    }).catch((error) => {
      if(error.response.status === 400){
        toast.error("Email already exists")
      }else if(error.response.status === 401){
        HandleLogout()
      }else{
        toast.error("User added failed")
      }
      return error;
    })
}

export const HandleLogin = async(reqData) =>{
  return await axios({
    method: "POST",
    url: `${API.login}`,
    data: reqData,
    headers: authHeader(),
  }).then((request) => {
      return request;
    }).catch((error) => {
      if(error.response.status === 400){
        toast.error(error.response.data)
      }else if(error.response.status === 404){
        toast.error(error.response.data)
      }else if(error.response.status === 401){
        HandleLogout()
      }else{
        toast.error("User added failed")
      }
      return error;
    })
}

export const HandleLoginByGoogle = async(reqData) =>{
  return await axios({
    method: "GET",
    url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${reqData.access_token}`,
    data: reqData,
    headers: {
      Authorization: `Bearer ${reqData.access_token}`,
      Accept: 'application/json'
  },
  }).then((request) => {
      return request;
    }).catch((error) => {
      if(error.response.status === 400){
        toast.error(error.response.data)
      }else if(error.response.status === 404){
        toast.error(error.response.data)
      }else{
        toast.error("Google login failed")
      }
      return error;
    })
}

export const HandleLogout = () => {
  googleLogout()
  localStorage.clear()
  window.location.replace("/login");
  GenerateToken() 

};

