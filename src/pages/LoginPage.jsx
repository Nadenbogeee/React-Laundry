import Login from "../components/LoginSection";
import Side from "../components/SideLoginSection";

const LoginPage = () => {
  return (
    <div className="grid grid-cols-6 h-screen">
      <div className="col-span-2">
        <Login />
      </div>
      <div className="col-span-4">
        <Side />
      </div>
    </div>
  );
};

export default LoginPage;
