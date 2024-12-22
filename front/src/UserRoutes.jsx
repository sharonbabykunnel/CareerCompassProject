import { lazy } from 'react';
import { Route } from 'react-router-dom';

const EducationSection = lazy(()=> import('./components/profile/EducationSection.jsx'));
const PrivatePages = lazy(() => import('./components/middlewares/PrivatePages.jsx'));
const HomeScreen = lazy(() => import('./screen/HomeScreen.jsx'));
const ProfileScreen = lazy(() => import('./screen/ProfileScreen.jsx'));
const ChatScreen = lazy(() => import('./screen/ChatScreen.jsx'));
const JobScreen = lazy(() => import('./screen/JobScreen.jsx'));
const NotificationScreen = lazy(() => import('./screen/NotificationScreen.jsx'));
const ConnectionScreen = lazy(() => import('./screen/ConnectionScreen.jsx'));
const GroupScreen = lazy(() => import('./screen/GroupScreen.jsx'));
const Connections = lazy(() => import('./components/Connections/Connections.jsx'))
const Requests = lazy(() => import('./components/Connections/Requests.jsx'))
const WorldWilde = lazy(() => import('./components/Connections/WorldWide.jsx'))
const Invitations = lazy(() => import('./components/Connections/Invitatiosn.jsx'))
const Mutuals = lazy(() => import('./components/Connections/Mutuals.jsx'))
const Educations = lazy(() => import('./components/profile/EducationSection.jsx'))
const PostsProfile = lazy(() => import('./components/profile/PostsProfile.jsx'))
const ResumeSection = lazy(() => import('./components/profile/ResumeSection.jsx'))
const ExperienceSection = lazy(()=> import('./components/profile/ExperienceSection.jsx'))
const SkillSection = lazy(()=> import('./components/profile/SkillSection.jsx'))
const PostedJob = lazy(()=> import('./components/job/PostedJob.jsx'))
const AppliedJobs = lazy(()=> import('./components/job/AppliedJobs.jsx'))
const MyJobs = lazy(()=> import('./components/job/MyJobs.jsx'))
const RepostSection = lazy(()=> import('./components/profile/RepostSection.jsx'))
const SavedSection = lazy(()=> import('./components/profile/SavedSection.jsx'))
const Applications = lazy(()=> import('./components/job/Applications.jsx'))
const CreateJob = lazy(()=> import('./components/job/CreateJob.jsx'))
const JobPreview = lazy(() => import( './components/job/JobPreview.jsx'))
const ArchiveSection = lazy(() => import( './components/profile/ArchiveSection.jsx'))

const UserRoutes = (
  <Route element={<PrivatePages isUser={true} />}>
    <Route path='home' element={<HomeScreen />} />
    <Route path='profile' element={<ProfileScreen />}>
            <Route path='Education' element={<EducationSection/>} />
            <Route path='Resume' element={<ResumeSection/>} />
            <Route index path='Post' element={<PostsProfile/>} />
            <Route path='Experience' element={<ExperienceSection/>} />
            <Route path='Projects' element={<Educations/>} />
            <Route path='Skill' element={<SkillSection/>} />
            <Route path='Saved' element={<SavedSection/>} />
            <Route path='Reposted' element={<RepostSection/>} />
            <Route path='Archive' element={<ArchiveSection/>} />
    </Route>
    <Route path='message' element={<ChatScreen />} />
    <Route path='job' element={<JobScreen />}>
    <Route index path='create-job' element={<CreateJob/>} />
          <Route  path='posted-jobs' element={<PostedJob/>} />
          <Route index path='' element={<MyJobs/>} />
          <Route  path='applied-jobs' element={<AppliedJobs/>} />
          <Route  path='applications' element={<Applications/>} />
          <Route  path='view-application/:uid' element={<JobPreview/>} />
    </Route>
    <Route path='notification' element={<NotificationScreen />} />
    <Route path='connection' element={<ConnectionScreen />}>
            <Route path='' index element={<Connections/>}/>
            <Route path='invitations'  element={<Invitations/>}/>
            <Route path='request'  element={<Requests/>}/>
            <Route path='mutuals'  element={<Mutuals/>}/>
            <Route path='worldwide'  element={<WorldWilde/>}/>
    </Route>
    {/* <Route path='group' element={<GroupScreen />} /> */}
  </Route>
);

export default UserRoutes;