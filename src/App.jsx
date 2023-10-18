import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import Main from "./pages/public/Main";
import AddNote from "./pages/private/AddNote";
import EditNote from "./pages/private/EditNote";
import Login from "./pages/public/Login";
import PrivateRoutes from "./utils/PrivateRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route index element={<Main />} />

      <Route element={<PrivateRoutes />}>
        <Route path="add" element={<AddNote />} />
        <Route path="edit/:id" element={<EditNote />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
