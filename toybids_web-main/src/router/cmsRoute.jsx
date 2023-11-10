import AccountManagement from "../components/admin/AccountManagement";
import ProductsManagement from "../components/admin/ProductsManagement";
import ReportManagement from "../components/admin/ReportManagement";
import CouncilManagement from "../components/admin/CouncilManagement";
import CmsLayout from "../layout/CmsLayout";
import CmsPage from "../pages/admin/CmsPage";
import CreateCouncil from "../pages/admin/other/CreateCouncil";
import UserProfile from "../components/admin/UserProfile";

// Xem cấu trúc routes ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <CmsLayout />,
    // Element là AuthenLayout, các children muốn hiển thị được trong AuthenLayout thì trong Layout phải có outlet mới hiển thị được
    // outlet đóng vai trò tương tự children
    // Xem thêm ở https://reactrouter.com/en/main/components/outlet
    children: [
      {
        path: "admin/",
        element: <CmsPage />,
        children: [
          {
            path: "account",
            element: <AccountManagement />,
          },
          {
            path: "product",
            element: <ProductsManagement />,
          },
          {
            path: "report",
            element: <ReportManagement />,
          },
          {
            path: "council-management",
            element: <CouncilManagement />,
          },
          {
            path: "create-council",
            element: <CreateCouncil />,
          },
          {
            path: "user-profile",
            element: <UserProfile />,
          },
        ],
      },
    ],
  };
  // push route
  routes.push(route);
}
