
import UserLayout from "../layout/UserLayout";
import UserPage from "../pages/user/UserPage";
import UserAccountManagement from "../components/user/UserAccountManagement";
import SelectThesis from "../components/user/SelectThesis";
import ManageThesis from "../components/user/ManageThesis";

// Xem cấu trúc routes ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <UserLayout />,
    // Element là AuthenLayout, các children muốn hiển thị được trong AuthenLayout thì trong Layout phải có outlet mới hiển thị được
    // outlet đóng vai trò tương tự children
    // Xem thêm ở https://reactrouter.com/en/main/components/outlet
    children: [
      {
        path: "user/",
        element: <UserPage />,
        children: [
          {
            path: "user-account",
            element: <UserAccountManagement />,
          },
          {
            path: "select-thesis",
            element: <SelectThesis />,
          },
          {
            path: "manage-thesis",
            element: <ManageThesis />,
          },
        ],
      },
    ],
  };
  // push route
  routes.push(route);
}
