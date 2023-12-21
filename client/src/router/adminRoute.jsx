import AccountManagement from "../components/admin/AccountManagement";
import AdminLayout from "../layout/AdminLayout";
import AdminPage from "../pages/admin/AdminPage";
import ThesisManagement from "../components/admin/ThesisManagement";
import CourseManagement from "../components/admin/CourseManagement";
import MajorManagement from "../components/admin/MajorManagement";

// Xem cấu trúc routes ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <AdminLayout />,
    // Element là AuthenLayout, các children muốn hiển thị được trong AuthenLayout thì trong Layout phải có outlet mới hiển thị được
    // outlet đóng vai trò tương tự children
    // Xem thêm ở https://reactrouter.com/en/main/components/outlet
    children: [
      {
        path: "admin/",
        element: <AdminPage />,
        children: [
          {
            path: "account-management",
            element: <AccountManagement />,
          },
          {
            path: "thesis-management",
            element: <ThesisManagement />,
          },
          {
            path: "course-management",
            element: <CourseManagement />,
          },
          
          {
            path: "major-management",
            element: <MajorManagement />,
          },
        ],
      },
    ],
  };
  // push route
  routes.push(route);
}
