//ini backup dashboard mian -------------

import { Card, CardBody, Image, CardHeader, CardFooter, Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const DashboardMain = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  //   const navigate = useNavigate();

  // fetching
  useEffect(() => {
    //fetch customer
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get("/customers");
        setCustomers(response.data.data);
      } catch (error) {
        console.error("Cant get customer response", error);
      }
    };
    //fetch transaction
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get("/bills");
        setTransactions(response.data.data);
      } catch (error) {
        console.error("cant get transaction information from server", error);
      }
    };

    fetchCustomers();
    fetchTransactions();
  }, []);

  //total
  //   const totalProducts = products.length;
  const totalCustomers = customers.length;
  const totalTransactions = transactions.length;
  const totalTransactionAmount = transactions.length;

  //bagian modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //end bagian modal

  //handle add

  //   -------------------------------------------------------------------------
  return (
    <div className="flex gap-5   w-screen justify-center items-center h-screen">
      {/* ------------------card pertama--------------- */}
      <Card className="py-4 ">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Jumlah Produk</p>
          <small className="text-default-500">12 Tracks</small>
          {/* <h4 className="font-bold text-large">Frontend Radio</h4> */}
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image alt="Card background" className="object-cover rounded-xl" src="https://nextui.org/images/hero-card-complete.jpeg" width={270} />
        </CardBody>
        <CardFooter>
          {/* bagian modal awal */}
          <Link to={"/dashboard/product"} style={{ width: "100%" }}>
            <Button style={{ width: "100%" }}>Tambah Produk</Button>
          </Link>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          {/* bagian modal akhir */}
        </CardFooter>
      </Card>
      {/* ------------------card kedua--------------- */}
      <Card className="py-4 ">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Jumlah Pelanggan</p>
          <small className="text-default-500">12 Tracks</small>
          {/* <h4 className="font-bold text-large">Frontend Radio</h4> */}
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image alt="Card background" className="object-cover rounded-xl" src="https://nextui.org/images/hero-card-complete.jpeg" width={270} />
        </CardBody>
        <CardFooter>
          {/* bagian modal awal */}
          <Button style={{ width: "100%" }} onPress={onOpen}>
            Tambah Pelanggan
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          {/* bagian modal akhir */}
        </CardFooter>
      </Card>
      {/* ------------------card ketiga--------------- */}
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Jumlah Transaksi</p>
          <small className="text-default-500">12 Tracks</small>
          {/* <h4 className="font-bold text-large">Frontend Radio</h4> */}
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image alt="Card background" className="object-cover rounded-xl" src="https://nextui.org/images/hero-card-complete.jpeg" width={270} />
        </CardBody>
        <CardFooter>
          {/* bagian modal awal */}
          <Button style={{ width: "100%" }} onPress={onOpen}>
            Tambah Transaksi
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          {/* bagian modal akhir */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardMain;

// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

// export default function App() {
//   const {isOpen, onOpen, onOpenChange} = useDisclosure();

//   return (
//     <>
//       <Button onPress={onOpen}>Open Modal</Button>
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
//               <ModalBody>
//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Nullam pulvinar risus non risus hendrerit venenatis.
//                   Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                 </p>
//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Nullam pulvinar risus non risus hendrerit venenatis.
//                   Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                 </p>
//                 <p>
//                   Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
//                   dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
//                   Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
//                   Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
//                   proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
//                 </p>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onPress={onClose}>
//                   Action
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

<>
      {/* <header className="w-screen flex justify-center items-center h-24 bg-gray-900">
        <div className="flex justify-around w-screen items-center">
          <Link to={"/dashboard"}>
            <Button className="font-bold" color="primary" variant="faded" size="sm">
              Kembali
            </Button>
          </Link>
          <Button onPress={onOpen} color="primary" variant="ghost" className="font-bold" size="md">
            Tambah Produk Baru
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="gap-2">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <label className="block mb-1">Nama Produk</label>
                        <Controller name="name" control={control} defaultValue="" render={({ field }) => <Input {...field} className="input-field" />} />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block mb-1">Harga</label>
                        <Controller name="price" control={control} defaultValue="" render={({ field }) => <Input type="number" {...field} className="input-field" />} />
                        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                      </div>
                      <div>
                        <label className="block mb-1">Tipe Produk</label>
                        <Controller name="type" control={control} defaultValue="" render={({ field }) => <Input {...field} className="input-field" />} />
                        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                      </div>
                      <br />
                      <Button type="submit" color="primary" className="w-full mt-4">
                        Tambah Produk
                      </Button>
                      <br />
                      <br />
                    </form>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
          <Button className="font-bold" color="danger" variant="faded" size="sm">
            Log out
          </Button>
        </div>
      </header>

      {/* //product list */}
      <div className="flex justify-center items-center h-screen" style={{ backgroundImage: `url(${bgProduct})`, backgroundPosition: "center", backgroundSize: "cover" }}>
        <div className="flex flex-wrap justify-center items-center gap-5 h-[95vh] w-[80vw]  rounded-[20px] bg-white">
          {products.map((product) => (
            <Card className="h-52 shadow-sky-900 shadow-2xl border-solid border-1 border-sky-500" key={product.id}>
              <CardHeader className="bg-sky-200 text-sky-800 font-medium">{product.name}</CardHeader>
              <CardBody className=" gap-2">
                <span>Tipe: {product.type}</span>
                <span>Rp {product.price.toLocaleString("id-ID")}</span>
              </CardBody>
              <CardFooter className=" gap-5">
                <Button color="primary" variant="bordered">
                  Edit
                </Button>
                <Button color="danger">Delete</Button>
              </CardFooter>
            </Card>
          ))}

          {/* ---------------------------------------- */}
        </div>
      </div>
    </> */}