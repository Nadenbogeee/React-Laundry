import { Image } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mager from "../assets/mager.jpeg";
import { toast } from "sonner";

const Logout = () => {
  const navigate = useNavigate();
  const click = () => {
    setTimeout(() => {
      navigate("/");
      toast.succes("Berhasil logout!!!!! (maybe)");
    }, 2500);
  };

  useEffect(() => {
    click();
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Image style={{ width: "100%", height: "100%" }} src={Mager} />
    </div>
  );
};
export default Logout;
