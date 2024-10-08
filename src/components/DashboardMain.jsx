import { Card, CardBody, Image, CardHeader, CardFooter, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

import backgroundDashboard from "../assets/DashboardBG.jpg";
import LeftImage from "../assets/leftImage.jpg";
import MidImage from "../assets/midImage.jpg";
import RightImage from "../assets/rightImage.jpg";

const DashboardMain = () => {
  return (
    <div className="flex gap-5   w-screen justify-center items-center h-screen" style={{ backgroundImage: `url(${backgroundDashboard})`, backgroundPosition: "center", backgroundSize: "cover" }}>
      {/* ------------------card pertama--------------- */}
      <Card className="py-4 bg-black">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold text-white">Page Management Product</p>
          <small className=" text-white">Add/Edit/Delete</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image alt="Card background" className="object-cover rounded-xl" src={LeftImage} width={270} />
        </CardBody>
        <CardFooter>
          <Link to={"/dashboard/product"} style={{ width: "100%" }}>
            <Button color="warning" style={{ width: "100%" }}>
              Tambah Produk
            </Button>
          </Link>
        </CardFooter>
      </Card>
      {/* ------------------card kedua--------------- */}
      <Card className="py-4 bg-black">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold text-white">Customer Management Page</p>
          <small className=" text-white">Add/Edit/Delete</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image alt="Card background" className="object-cover rounded-xl" src={MidImage} width={270} />
        </CardBody>
        <CardFooter>
          <Link to={"/dashboard/customer"} style={{ width: "100%" }}>
            <Button color="warning" style={{ width: "100%" }}>
              Tambah Pelanggan
            </Button>
          </Link>
        </CardFooter>
      </Card>
      {/* ------------------card ketiga--------------- */}
      <Card className="py-4 bg-black">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold text-white">Transaction Page</p>
          <small className="text-white">Add/Check Bills</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image alt="Card background" className="object-cover rounded-xl" src={RightImage} width={270} />
        </CardBody>
        <CardFooter>
          <Link to={"/dashboard/transaction"} style={{ width: "100%" }}>
            <Button color="warning" style={{ width: "100%" }}>
              Tambah Transaksi
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardMain;
