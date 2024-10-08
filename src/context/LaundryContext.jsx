import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

//Buat context untuk berbagi data yang akan disimpan saat fetch data dari api menggunakan method get
const LaundryContext = createContext();

//Membuat custom Hooks(seperti: useState, useEffect) untuk mempermudah akses data dari page yang berbeda
export const useLaundryContext = () => {
  return useContext(LaundryContext);
};
//LaundryProvider merupakan komponen untuk membagi data dan fungsi kepada komponen lainnya
export const LaundryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  //get ListProduct
  const fetchListOfProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.get("/products", { headers });
      console.log(`ini kode token: ${token}`);

      if (response.status === 200) {
        setProducts(response.data.data || []);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
    }
  };
  //get CustomerList

  const fetchListOfCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.get("/customers", { headers });
      console.log(`ini kode token: ${token}`);

      if (response.status === 200) {
        // setCustomers(response.data.data);
        const data = response.data.data;
        const validCustomers = data.filter((customer) => customer.name.trim() !== "" || customer.phoneNumber.trim() !== "" || customer.address.trim() !== "");
        setCustomers(validCustomers);
        console.log(response.status);
      } else {
        toast.error("Failed to fetch customers");
        console.log(response.status);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error(error.response?.data?.message || "Failed to fetch customers");
    }
  };
  useEffect(() => {
    fetchListOfProduct();
    fetchListOfCustomers();
  }, []);
  //   --------------------------------

  const value = {
    products,
    setProducts,
    customers,
    setCustomers,
    fetchListOfCustomers,
    fetchListOfProduct,
  };

  return <LaundryContext.Provider value={value}>{children}</LaundryContext.Provider>;
};
