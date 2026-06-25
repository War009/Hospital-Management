import API from "./api";

export const login = async (username,password)=>{
  const res = await API.post("/auth/login",{username,password});
  localStorage.setItem("token",res.data.token);
  localStorage.setItem("role",res.data.role);
  return res.data;
};

export const logout = ()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const getToken = ()=> localStorage.getItem("token");
export const getRole = ()=> localStorage.getItem("role");
