import {create } from 'zustand'
import { toast} from 'react-hot-toast'
import axios from '../lib/axios.js'

const useUserState  = create((set,get)=>({
         user : null,
         loading: false,
         checkingAuth : true ,

         signup: async ({ name, email, password, confirmPassword }) => {
  set({ loading: true });

  if (password !== confirmPassword) {
    set({ loading: false });
    return toast.error("Passwords do not match");
  }

  try {
    const res = await axios.post("/auth/signUp", { name, email, password });
    console.log(res.data);

    set({ user: res.data, loading: false, checkingAuth: false });
    toast.success("Account created successfully!");
  } catch (error) {
    set({ loading: false });
    const message =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while signing up";
      console.log(message)
    toast.error(message);
  }
}



         
}))

export default useUserState