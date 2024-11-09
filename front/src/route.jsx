import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.jsx';
import AdminRoutes from './AdminRoutes.jsx';
import UserRoutes from './UserRoutes.jsx';
import PublicRoutes from './PublicRoutes.jsx';
import ErrorScreen from './screen/ErrorScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorScreen />}>
      {PublicRoutes}
      {UserRoutes}
      {AdminRoutes}
    </Route>
  )
);

export default router;