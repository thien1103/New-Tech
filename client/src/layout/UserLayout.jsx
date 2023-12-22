import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div className="absolute h-full w-full">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
