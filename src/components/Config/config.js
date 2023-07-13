//SERVER API URL
export const BASE_URL = "https://api-mangoit-lms.mangoitsol.com";

// FRONTEND SERVER URL
export const FRONTEND_BASE_URL = "https://social-media-login-three.vercel.app";

// //FRONTEND LOCAL URL
// export const FRONTEND_BASE_URL = "http://localhost:3000";

// // LOCAL API URL
// export const BASE_URL = "http://localhost:6030";

export const API = {
  authToken: `${BASE_URL}/generatetoken`,
  register: `${BASE_URL}/registration`,
  login: `${BASE_URL}/loginuser`,
  userInfoById: `${BASE_URL}/getuser`,
//   forgotPassword: `${BASE_URL}/forgotPassword`,
//   resetPassword: `${BASE_URL}/resetpassword`,

};
