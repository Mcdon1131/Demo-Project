import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";
import HomePage from "../pages/HomePage";
import HostelPage from "../pages/HostelPage";
import SavedPage from "../pages/SavedPage";
import ListHostelPage from "../pages/ListHostelPage";
import LandingPage from "../pages/LandingPage";
// import hostels from "../data/hostels.js";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/hostels" element={<HomePage />} />
        <Route path="/hostel/:id" element={<HostelPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/list" element={<ListHostelPage />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
