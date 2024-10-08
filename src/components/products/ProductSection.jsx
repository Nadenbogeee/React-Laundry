import { Modal, ModalHeader, ModalBody, ModalContent, Input, Button, Card, CardHeader, CardBody, CardFooter, useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import bgProduct from "../../assets/background-product.jpg";
import { toast } from "sonner";
import { axiosInstance } from "../../lib/axios";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  //newProduct sebagai penyimpan dari <Input/>
  const handleTypeChange = (type) => {
    setNewProduct({ ...newProduct, type });
  };
  const [newProduct, setNewProduct] = useState({ name: "", price: "", type: "" });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductData, setEditingProductData] = useState({ name: "", price: "", type: "" });
  //--------------------------------------------
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //get ListingProducts
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

  useEffect(() => {
    fetchListOfProduct();
  }, []);

  //post AddProducts
  const handleCreateProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const headers = { Authorization: `Bearer ${token}` };
      const productData = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        type: newProduct.type,
      };

      const response = await axiosInstance.post("/products", productData, { headers });

      if (response.status === 201) {
        toast.success("Produk Berhasil di Tambahkan");
        setNewProduct({ name: "", price: "", type: "" });
        fetchListOfProduct();
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(error.response?.data?.message || "Failed to create product");
    }
  };

  //del DeletProducts
  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axiosInstance.delete(`products/${productId}`, { headers });

      setProducts((prevProduct) => prevProduct.filter((product) => product.id !== productId));
      toast.success("Produk berhasil di hapus");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else {
        toast.error(error.message);
      }
    }
  };

  //put UpdateProducts
  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem("nilai token");
      if (!token) {
        throw new Error("No token found");
      }

      const headers = { Authorization: `Bearer ${token}` };
      const productData = {
        id: editingProductId,
        name: editingProductData.name,
        price: parseFloat(editingProductData.price),
        type: editingProductData.type,
      };

      const response = await axiosInstance.put("products/", productData, { headers });

      if (response.status === 200) {
        setProducts((prevProducts) => prevProducts.map((product) => (product.id === editingProductId ? { ...product, ...productData } : product)));
        setEditingProductId(null);
        setEditingProductData({ name: "", price: "", type: "" });
        toast.success("Produk Berhasil di Update");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    }
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //-----------------------
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
            Tambah Produk Baru
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="gap-2">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Tambah Produk</ModalHeader>
                  <ModalBody>
                    <Input label="Nama Produk" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                    <Input label="Harga Produk" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                    <Dropdown className=" w-96 ">
                      <DropdownTrigger>
                        {/* <Input label="Input Tipe dari Produk, Kg/Pcs" /> */}
                        <Button> {newProduct.type || "Pilih Tipe Produk"}</Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Pilih Tipe Produk" onAction={(key) => handleTypeChange(key)}>
                        <DropdownItem showDivider key="Kg">
                          Kg
                        </DropdownItem>
                        <DropdownItem key="Pcs">Pcs</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Button color="primary" className="w-full mt-4" onClick={handleCreateProduct} onPress={onClose}>
                      Tambah Produk
                    </Button>
                    <br />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
          <Link to={"/dashboard/customer"}>
            <Button className="font-bold" variant="faded" size="md" style={{ width: "100%" }}>
              Customer Page
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

      {/* //product list */}
      <div className="flex justify-center items-center h-screen col-span-5" style={{ backgroundImage: `url(${bgProduct})`, backgroundPosition: "center", backgroundSize: "cover" }}>
        <div className="flex flex-wrap justify-center items-center gap-5 h-[100vh] w-[100vw]  rounded-[20px] bg-slate-200">
          {products.map((product) => (
            <Card className="h-60 shadow-purple-300 shadow-2xl border-solid border-1 border-purple-200" key={product.id}>
              <CardHeader className="bg-purple-200 text-sky-800 font-medium">{editingProductId === product.id ? <Input name="name" value={editingProductData.name} onChange={handleEditChange} /> : product.name}</CardHeader>
              <CardBody className="flex justify-evenly items-start gap-2">
                <span>{editingProductId === product.id ? <Input name="price" value={editingProductData.type} onChange={handleEditChange} /> : `Tipe: ${product.type}`}</span>
                <span>{editingProductId === product.id ? <Input name="type" value={editingProductData.price} onChange={handleEditChange} /> : ` Rp ${product.price.toLocaleString("id-ID")}`}</span>
              </CardBody>
              <CardFooter className=" gap-5">
                {editingProductId === product.id ? (
                  <>
                    <Button
                      onClick={() => {
                        setEditingProductId(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button color="success" className="text-white" onClick={handleUpdateProduct}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="primary"
                      variant="bordered"
                      onClick={() => {
                        setEditingProductId(product.id);
                        setEditingProductData({ name: product.name, price: product.price, type: product.type });
                      }}
                    >
                      Edit
                    </Button>
                    <Button color="danger" onClick={() => handleDeleteProduct(product.id)}>
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
export default ProductSection;
