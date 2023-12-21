import GuestLayout from "../layout/GuestLayout";
import HomePage from "../pages/guest/HomePage";
import GuestPage from "../pages/guest/GuestPage";
import ContactInformation from "../components/guest/ContactInformation";
import ReferenceTopic from "../components/guest/ReferenceTopic";
import HelpPage from "../components/guest/HelpPage";
import NotificationPage from "../components/guest/NotificationPage";
// Xem cấu trúc routes ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <GuestLayout />,
    // Element là AuthenLayout, các children muốn hiển thị được trong AuthenLayout thì trong Layout phải có outlet mới hiển thị được
    // outlet đóng vai trò tương tự children
    // Xem thêm ở https://reactrouter.com/en/main/components/outlet
    children: [
      {
        path: "home/",
        element: <HomePage />,
        children: [
          {
            path: "notification",
            element: "<NotificationPage/>",
          },
        ],
      },
      {
        path: "guest/",
        element: <GuestPage />,
        children: [
          {
            path: "notification",
            element: <NotificationPage/>,
          },
          {
            path: "help",
            element: <HelpPage/>,
          },
          {
            path: "reference-topic",
            element: <ReferenceTopic/>,
          },
          {
            path: "contact-info",
            element: <ContactInformation />,
          },
        ],
      },
    ],
  };
  // push route
  routes.push(route);
}
