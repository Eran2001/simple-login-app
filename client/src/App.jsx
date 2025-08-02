import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <RouterProvider router={AppRoutes} />
    </Suspense>
  );
};

export default App;
