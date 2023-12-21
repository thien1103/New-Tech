
import InstructorLayout from '../layout/InstructorLayout';
import InstructorPage from '../pages/instructor/InstructorPage';
import InstructorAccountManagement from '../components/instructor/InstructorAccountManagement';
import SelectThesis from '../components/instructor/SelectThesis';
import ManageThesis from '../components/instructor/ManageThesis';
import ThesisApprovement from '../components/instructor/ThesisApprovement';
import ScheduleInstructor from '../components/instructor/ScheduleInstructor';

// Xem cấu trúc routes ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <InstructorLayout />,
    // Element là AuthenLayout, các children muốn hiển thị được trong AuthenLayout thì trong Layout phải có outlet mới hiển thị được
    // outlet đóng vai trò tương tự children
    // Xem thêm ở https://reactrouter.com/en/main/components/outlet
    children: [
        {
          path: "instructor/",
          key: 1,
          element: <InstructorPage />,
          children: [
            {
              path: "account-management",
              element: <InstructorAccountManagement />,
            },
            {
                path: "select-thesis",
                element: <SelectThesis />,
              },
              {
                path: "thesis-approvement",
                element: <ThesisApprovement />,
            },
              {
                path: "thesis-management",
                element: <ManageThesis />,
              },
              {
                path: "schedule-instructor",
                element: <ScheduleInstructor />,
            },
          ],
        },
      ],
  };
  // push route
  routes.push(route);
}
