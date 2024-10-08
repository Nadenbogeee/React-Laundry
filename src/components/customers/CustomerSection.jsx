import { Modal, ModalHeader, ModalBody, ModalContent, Input, Button, Card, CardHeader, CardBody, CardFooter, useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { axiosInstance } from "../../lib/axios";
import { address } from "framer-motion/client";
import { color } from "framer-motion";

const CustomerSection = () => {
  //simpan hasil dari get ke API
  const [customers, setCustomers] = useState([]);

  const [newCustomers, setNewCustomers] = useState({ name: "", phoneNumber: "", address: "" });
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [editingCustomerData, setEditingCustomerData] = useState({ name: "", phoneNumber: "", address: "" });
  //--------------------------------------------
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //get ListingCustomers
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
    fetchListOfCustomers();
  }, []);

  //post AddCustomers
  const handleCreateCustomer = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const headers = { Authorization: `Bearer ${token}` };
      // const customerData = {
      //   name: newCustomers.name,
      //   phoneNumber: parseFloat(newCustomers.phoneNumber),
      //   address: newCustomers.address,
      // };

      const response = await axiosInstance.post("/customers", newCustomers, { headers });

      if (response.status === 201) {
        toast.success("Customer Berhasil di Tambahkan");
        setNewCustomers({ name: "", phoneNumber: "", address: "" });
        fetchListOfCustomers();
      } else {
        toast.error("Failed to create customer");
      }
    } catch (error) {
      console.error("Error creating Customers:", error);
      toast.error(error.response?.data?.message || "Failed to create customer");
    }
  };

  //del DeletsCustomers
  const handleDeleteCustomer = async (customerId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axiosInstance.delete(`customers/${customerId}`, { headers });

      setCustomers((prevCustomer) => prevCustomer.filter((customer) => customer.id !== customerId));
      toast.success("Customer berhasil di hapus");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else {
        toast.error(error.message);
      }
    }
  };

  //put UpdateCustomers
  const handleUpdateCustomer = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ada");
      }

      const headers = { Authorization: `Bearer ${token}` };
      const customerData = {
        id: editingCustomerId,
        name: editingCustomerData.name,
        phoneNumber: editingCustomerData.phoneNumber,
        address: editingCustomerData.address,
      };
      const response = await axiosInstance.put("/customers", customerData, { headers });
      if (response.status === 200) {
        setCustomers((prevCustomers) => prevCustomers.map((customer) => (customer.id === editingCustomerId ? { ...customer, ...customerData } : customer)));
        setEditingCustomerId(null);
        setEditingCustomerData({ name: "", phoneNumber: "", address: "" });
        toast.success("Berhasil Update Customer");
      } else {
        toast.error("Gagal update Customer");
      }
    } catch (error) {
      console.error("Error update customer: ", error);
      toast.error(error.response?.data?.message || "Gagal update Customer");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-6">
      <header className="flex justify-center items-center   bg-gray-900 col-span-1 h-screen">
        <div className="flex gap-5 w-full p-10 flex-col  h-screen">
          <Link to={"/dashboard"}>
            <Button className="font-bold w-full" variant="faded" size="md">
              Kembali
            </Button>
          </Link>
          <Button onPress={onOpen} className="font-bold text-white h-20" color="secondary">
            Tambah Customer Baru
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="gap-2">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Tambah Customer</ModalHeader>
                  <ModalBody>
                    <Input label="Nama Pelanggan" value={newCustomers.name} onChange={(e) => setNewCustomers({ ...newCustomers, name: e.target.value })} />
                    <Input label="Phone Number" value={newCustomers.phoneNumber} onChange={(e) => setNewCustomers({ ...newCustomers, phoneNumber: e.target.value })} />
                    <Input label="Address" value={newCustomers.address} onChange={(e) => setNewCustomers({ ...newCustomers, address: e.target.value })} />

                    <Button type="submit" onClick={handleCreateCustomer} color="primary" className="w-full mt-4">
                      Tambah Customer
                    </Button>
                    <br />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
          <Link to={"/dashboard/product"}>
            <Button style={{ width: "100%" }} className="font-bold" variant="faded" size="md">
              Product Page
            </Button>
          </Link>
          <Link to={"/dashboard/transaction"}>
            <Button style={{ width: "100%" }} className="font-bold" variant="faded" size="md">
              Transaction Page
            </Button>
          </Link>
          <Link to={"/logout"}>
            <Button style={{ width: "100%" }} className="font-bold" variant="faded" size="md">
              Log out
            </Button>
          </Link>
        </div>
      </header>

      {/* customer list */}
      <div className="flex justify-center items-center h-screen col-span-5">
        <div className="flex flex-wrap justify-center items-center gap-5 h-[100vh] w-[100vw]  rounded-[20px] bg-slate-200">
          {customers.map((customer) => (
            <Card className="h-60 shadow-purple-300 shadow-2xl border-solid border-1 border-purple-200" key={customer.id}>
              <CardHeader className="bg-purple-200 text-sky-800 font-medium">{editingCustomerId === customer.id ? <Input name="name" value={editingCustomerData.name} onChange={handleEditChange} /> : customer.name}</CardHeader>
              <CardBody className="flex justify-evenly items-start gap-2">
                <span>{editingCustomerId === customer.id ? <Input name="phoneNumber" value={editingCustomerData.phoneNumber} onChange={handleEditChange} /> : `Tipe: ${customer.phoneNumber}`}</span>
                <span>{editingCustomerId === customer.id ? <Input name="address" value={editingCustomerData.address} onChange={handleEditChange} /> : `Address: ${customer.address}`}</span>
              </CardBody>
              <CardFooter className=" gap-5">
                {editingCustomerId === customer.id ? (
                  <>
                    <Button
                      onClick={() => {
                        setEditingCustomerId(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button color="success" className="text-white" onClick={handleUpdateCustomer}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="primary"
                      variant="bordered"
                      onClick={() => {
                        setEditingCustomerId(customer.id);
                        setEditingCustomerData({ name: customer.name, phoneNumber: customer.phoneNumber, address: customer.address });
                      }}
                    >
                      Edit
                    </Button>
                    <Button color="danger" onClick={() => handleDeleteCustomer(customer.id)}>
                      Delete
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}

          {/* ---------------------------------------- */}
        </div>
      </div>
    </div>
  );
};
export default CustomerSection;
