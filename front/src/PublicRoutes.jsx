import { lazy } from 'react';
import { Route } from 'react-router-dom';

const PublicPages = lazy(() => import('./components/middlewares/PublicPages.jsx'));
const Wellcom = lazy(() => import('./screen/Wellcome.jsx'));
const SignUp = lazy(() => import('./screen/SignUp.jsx'));
const SignIn = lazy(() => import('./screen/SignIn.jsx'));
const VerifyScreen = lazy(() => import('./screen/VerifyScreen.jsx'));
const ProfileDetails = lazy(() => import('./screen/ProfileDetails.jsx'));
const Education = lazy(() => import('./components/useDetails/Education.jsx'));
const Login = lazy(() => import('./screen/admin/Login.jsx'));
const NotFound = lazy(() => import('./screen/NotFound.jsx'));

const PublicRoutes = (
  <>
    <Route index element={<Wellcom />} />
    <Route path='auth' element={<PublicPages />}>
      <Route path='signup' element={<SignUp />} />
      <Route path='signin' element={<SignIn />} />
    </Route>
    <Route path='verify' element={<VerifyScreen />} />
    <Route path='addProfilePhoto' element={<ProfileDetails />} />
    <Route path='addEducation' element={<Education />} />
    <Route path='admin/login' element={<Login />} />
    <Route path='*' element={<NotFound />} />
  </>
);

export default PublicRoutes;