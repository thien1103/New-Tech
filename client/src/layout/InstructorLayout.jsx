import { Outlet } from "react-router-dom";
const InstructorLayout = () => {
  return (
    <div className="absolute h-full w-full">
      <Outlet />
    </div>
  );
};

export default InstructorLayout;
