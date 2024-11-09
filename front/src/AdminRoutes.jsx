import { lazy } from 'react';
import { Route } from 'react-router-dom';

const AdminPrivatePages = lazy(() => import('./components/middlewares/AdminPrivatePages.jsx'));
const AdminScreens = lazy(() => import('./screen/admin/AdminScreens.jsx'));
const DashBoard = lazy(() => import('./components/admin/dashBoard/DashBoard.jsx'));
const UsersList = lazy(() => import('./components/admin/user/UsersList.jsx'));
const UniqueUser = lazy(() => import('./components/admin/user/UniqueUser.jsx'));
const Posts = lazy(() => import('./components/admin/posts/Posts.jsx'));
const AdminPostDetail = lazy(() => import('./components/admin/posts/SinglePost.jsx'));
const JobBody = lazy(() => import('./components/admin/job/JobBody.jsx'));
const UniqueJob = lazy(() => import('./components/admin/job/UniqueJob.jsx'));

const AdminRoutes = (
  <Route element={<AdminPrivatePages />}>
    <Route path='admin' element={<AdminScreens />}>
      <Route index element={<DashBoard />} />
      <Route path='users' element={<UsersList />} />
      <Route path='user' element={<UniqueUser />} />
      <Route path='posts' element={<Posts />} />
      <Route path='post' element={<AdminPostDetail />} />
      <Route path='jobs' element={<JobBody />} />
      <Route path='job' element={<UniqueJob />} />
    </Route>
  </Route>
);

export default AdminRoutes;