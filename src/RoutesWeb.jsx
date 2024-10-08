import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Logout from "./context/Logout";

const RoutesWeb = () => {
  //Pages
  const HomePage = lazy(() => import("./pages/HomePage"));
  const LoginPage = lazy(() => import("./pages/LoginPage"));
  const LogoutPage = lazy(() => import("./context/Logout"));
  const MainPage = lazy(() => import("./pages/MainPage"));
  //Sections
  const ProductPage = lazy(() => import("./components/products/ProductSection"));
  const CustomerPage = lazy(() => import("./components/customers/CustomerSection"));
  const TransactionPage = lazy(() => import("./components/transactions/TransactionSection"));

  return (
    <>
      <Routes>
        <Route
          element={
            <Suspense fallback={"Loading sabar ...."}>
              <HomePage />
            </Suspense>
          }
          path="/"
        />
        {/* Homepage */}
        <Route
          element={
            <Suspense fallback={"Loading sabar ...."}>
              <LoginPage />
            </Suspense>
          }
          path="/auth/login"
        />
        {/* Loginpage */}
        <Route
          element={
            <Suspense fallback={"Loading sabar ...."}>
              <MainPage />
            </Suspense>
          }
          path="/dashboard"
        />
        {/* dashboard/mainpage */}
        <Route
          element={
            <Suspense fallback={"Loading sabar ...."}>
              <ProductPage />
            </Suspense>
          }
          path="/dashboard/product"
        />
        {/* ProductPage */}
        <Route
          element={
            <Suspense fallback={"Loading sabar ...."}>
              <CustomerPage />
            </Suspense>
          }
          path="/dashboard/customer"
        />
        {/* CUstomerPage */}
        <Route
          element={
            <Suspense fallback={"Loading sabar ...."}>
              <TransactionPage />
            </Suspense>
          }
          path="/dashboard/transaction"
        />
        {/* TransactionPage */}
        <Route
          element={
            <Suspense fallback={"Loading sabar ...."}>
              <Logout />
            </Suspense>
          }
          path="/logout"
        />
      </Routes>
    </>
  );
};

export default RoutesWeb;
