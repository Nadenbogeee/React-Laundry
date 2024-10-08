import "./App.css";
import { Toaster } from "sonner";
import RoutesWeb from "./RoutesWeb";

function App() {
  return (
    <>
      <Toaster theme="dark" position="top-right" duration={3000} />
      <RoutesWeb />
    </>
  );
}

export default App;
