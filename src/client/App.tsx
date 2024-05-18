import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MakeReportPage from "./pages/MakeReportPage";
import SuccessfulMakeReport from "./pages/SuccessfulMakeReport";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage></LandingPage>
    },
    {
      path: "make-report",
      element: <MakeReportPage></MakeReportPage>
    },
    {
      path: "successful",
      element: <SuccessfulMakeReport></SuccessfulMakeReport>
    },
    {
      path: "admin",
      element: <AdminPage></AdminPage>
    }
  ])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}