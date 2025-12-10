import {
  post,
  get,
  put
} from "../api.js";


	
export const getPng=()=>{
	return get(`/userInfo/checkCode`)
}

export const sendEmailCode=(params)=>{
	return post(`/userInfo/sendEmailCode?`+params)
}

export const userRegister=(params)=>{
	return post(`/userInfo/register?`+params)
}

export const userLogin=(params)=>{
	return post(`/userInfo/login?`+params)
}

export const emailLogin=(params)=>{
	return post(`/userInfo/EmailLogin?`+params)
}

export const resetPassword=(params)=>{
	return put(`/userInfo/resetPwd?`+params)
}

export const pushAvatar=(params)=>{
	return put(`/userInfo/uploadAvatar?`+params)
}
// export const wxMiNiLogin = (params, data) => {
//   return get(`/v2/user/wx_mini_login?${params}`, data);
// };

// export const sendUserPhone = (params, data) => {
//   return post(`/v2/user/wx_mini_register?${params}`, data);
// };

// export const authToken = (params) => {
//   return get(`/v2/admin/other/token_p?${params}`);
// };