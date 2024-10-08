import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  Input,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { axiosInstance } from "../../lib/axios";
import { useLaundryContext } from "../../context/LaundryContext";

const TransactionSection = () => {
  const [transactions, setTransactions] = useState([]);
  const [pilihanCustomer, setPilihanCustomer] = useState("");
  const [pilihanProduct, setPilihanProduct] = useState({ name: "Pilih Paket Produk", price: 0, id: "" });
  const [quantity, setQuantity] = useState("");
  const { products, setProducts, customers, setCustomers, fetchListOfProducts, fetchListOfCustomers } = useLaundryContext();

  const total = pilihanProduct.price * quantity;

  //--------------------------------------------
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //get ListingTransaction
  const fetchListOfTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.get("/bills", { headers });
      console.log(`ini kode token: ${token}`);
      // console.log(transactions);

      if (response.status === 200) {
        setTransactions(response.data.data || []);
      } else {
        toast.error("Failed to fetch transaction");
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
      toast.error(error.response?.data?.message || "Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchListOfTransaction();
  }, []);

  const handleCreateTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      const transactionData = {
        customerId: pilihanCustomer.id,
        billDetails: [
          {
            product: {
              id: pilihanProduct.id,
              name: pilihanProduct.name,
            },
            qty: quantity,
          },
        ],
      };

      console.log("Transaction Data yang dikirim:", transactionData);

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.post("/bills", transactionData, { headers });

      console.log("Response dari server:", response.data.data);
    } catch (error) {
      console.error("pesan error: ", error.response?.data || error.message);
    }
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
            Tambah Transaksi Baru
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="gap-2">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Tambah Transaksi</ModalHeader>
                  <ModalBody>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button>{pilihanCustomer.name || "Pilih Konsumen"}</Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        {customers.map((customer) => (
                          //mengambil pilihan customer dari event onClick
                          <DropdownItem key={customer.id} onClick={() => setPilihanCustomer(customer)}>
                            {customer.name}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button>{pilihanProduct.name}</Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        {products.map((product) => (
                          <DropdownItem key={product.id} onClick={() => setPilihanProduct({ name: product.name, price: product.price, id: product.id })} textValue={`${product.name} + ${product.price}`}>
                            {product.name} + {product.price}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>

                    <Input
                      label="Jumlah pesanan/quantity"
                      value={quantity}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Jika input kosong, set quantity menjadi 0, jika tidak, konversi ke float
                        setQuantity(value === "" ? 0 : parseFloat(value));
                      }}
                    />

                    <div label="Total Harga">
                      <p>{total}</p>
                    </div>

                    <Button type="submit" onClick={handleCreateTransaction} color="primary" className="w-full mt-4">
                      Tambah Transaksi
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
          <Link to={"/dashboard/customer"}>
            <Button style={{ width: "100%" }} className="font-bold" variant="faded" size="md">
              Customer Page
            </Button>
          </Link>
          <Link to={"/logout"}>
            <Button style={{ width: "100%" }} className="font-bold" variant="faded" size="md">
              Log out
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex justify-center items-center h-screen col-span-5">
        <div className="flex flex-wrap justify-center items-center gap-5 h-[100vh] w-[100vw]  rounded-[20px] bg-slate-200">
          <Table aria-label="Example static collection table" className="p-10 " fullWidth="false" shadow="lg">
            <TableHeader className="">
              <TableColumn>ID</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>TRANSACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.customer.id}</TableCell>
                  <TableCell>{transaction.customer.name}</TableCell>
                  <TableCell>
                    <Popover placement="left-start" showArrow>
                      <PopoverTrigger>
                        <Button>Lihat detail</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Table
                          aria-label="Example table inside Popover"
                          css={{
                            height: "auto",
                            minWidth: "100%",
                          }}
                        >
                          <TableHeader>
                            <TableColumn>CODE BILLS</TableColumn>
                            <TableColumn>DATES</TableColumn>
                            <TableColumn>PRODUCT</TableColumn>
                            <TableColumn>QUANTITY</TableColumn>
                            <TableColumn>TOTAL</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {transaction.billDetails.map((detail) => (
                              <TableRow key={detail.id}>
                                <TableCell>{transaction.id.slice(0, 8)}</TableCell>
                                <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{detail.product.name}</TableCell>
                                <TableCell>{detail.qty}</TableCell>
                                <TableCell>{detail.qty * detail.price}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default TransactionSection;
