import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import Loading from "./components/ui/Loading";

const App = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={AppRoutes} />
      </Suspense>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={true}
        theme="colored"
      />
    </>
  );
};

export default App;
