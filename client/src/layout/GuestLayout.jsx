import { Outlet } from "react-router-dom";
const GuestLayout = () => {
  return (
    <div className="absolute h-full w-full">
      <Outlet />
    </div>
  );
};

export default GuestLayout;
