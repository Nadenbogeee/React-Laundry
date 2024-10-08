import { Button, Image, Card, CardFooter } from "@nextui-org/react";
import { Link } from "react-router-dom";
import potoSatu from "../assets/backgroundSatu.jpg";
import left from "../assets/HomeInfoLeft.jpg";
import middle from "../assets/HomeInfoMiddle.jpg";
import right from "../assets/HomeInfoRight.jpg";
import bgHome from "../assets/HomeInfoBG.jpg";

const HomeSection = () => {
  return (
    <section
      className="relative w-full h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(${bgHome})`,
      }}
    >
      {/* --------- hero section ---------- */}
      <div className="flex justify-center items-center   flex-col gap-5 h-screen">
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: "4rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            textShadow: `
      0 0 5px rgba(255, 255, 255, 0.5), 
      0 0 10px rgba(255, 0, 255, 0.7), 
      0 0 20px rgba(0, 255, 255, 0.7),
      0 0 30px rgba(255, 0, 255, 0.7)
    `,
          }}
        >
          ENIGMA LAUNDRY
        </h1>

        {/* <h1 className="font-bold text-5xl ">Enigma Laundry</h1> */}
        {/* -----------------card section ------------ */}
        <div className="flex justify-center items-center gap-10 ">
          <Card isFooterBlurred radius="lg" className="border-none">
            <Image alt="Woman listing to music" className="object-cover" height={200} src={left} width={300} />
            <CardFooter
              className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 mb-1 "
              style={{ height: "40px" }}
            >
              <p className="font-medium text-white/80 ">Setrika</p>
              {/* <Link to="/product-page">
              <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                Go
              </Button>
            </Link> */}
            </CardFooter>
          </Card>

          {/* --------------------------------- */}
          <Card isFooterBlurred radius="lg" className="border-none">
            <Image alt="Woman listing to music" className="object-cover" height={300} src={middle} width={300} />
            <CardFooter
              className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 mb-1"
              style={{ height: "40px" }}
            >
              <p className="font-medium text-white/80">Menyediakan Cuci Baju</p>
              {/* <Link to="/customer-page">
              <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
              Go
              </Button>
              </Link> */}
            </CardFooter>
          </Card>

          {/* --------------------------------- */}

          <Card isFooterBlurred radius="lg" className="border-none">
            <Image alt="Woman listing to music" className="object-cover" height={170} src={right} width={300} />
            <CardFooter
              className=" justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 mb-1"
              style={{ height: "40px" }}
            >
              <p className=" font-medium text-white">Keringin Baju</p>
              {/* <Link to="/transaction-page">
              <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                Go
              </Button>
            </Link> */}
            </CardFooter>
          </Card>
        </div>
        {/* -----------------end card section ------------ */}
        <br />
        <Link to={"/auth/login"}>
          <Button size="lg" color="danger">
            Mulai
          </Button>
        </Link>
      </div>
      {/* --------- end hero section ---------- */}
    </section>
  );
};

export default HomeSection;
