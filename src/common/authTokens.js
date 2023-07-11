export function authHeader() {
    const getToken = localStorage.getItem("authToken");
    if (getToken) {
      return { Authorization: `Bearer ${getToken}` };
    } else {
      return {};
    }
  }
  
  export function LoginHeader() {
    const getToken = localStorage.getItem("loginToken");
    const authToken = localStorage.getItem("authToken");
  
    if (getToken) {
      return { logintoken: `${getToken}`, Authorization: `Bearer ${authToken}` };
    } else {
      return {};
    }
  }
  
  const AUTHORIZATION_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODY1NTIxMjB9.IkWVV8BFh6V6hm-gZLIqVMuw5GkIn6J7B4LiqkgqG7U";
  export default AUTHORIZATION_TOKEN;