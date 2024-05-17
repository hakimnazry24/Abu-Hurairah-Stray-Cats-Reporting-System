import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MakeReportPage from "./pages/MakeReportPage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage></LandingPage>
    },
    {
      path: "make-report",
      element: <MakeReportPage></MakeReportPage>
    }
  ])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}