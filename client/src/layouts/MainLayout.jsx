import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header className="p-4 bg-black text-white">My App</header>
      <main className="p-4 min-h-screen">
        <Outlet />
      </main>
      <footer className="p-4 bg-black text-white mt-8 text-center">
        © 2025 My App
      </footer>
    </div>
  );
};

export default MainLayout;
