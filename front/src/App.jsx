import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import VideoCallPopup from './components/helpers/VideoCallPopup';
import { VideoCallProvider,useVideoCall } from './context/videoCallContext';

Modal.setAppElement('#root');

function AppContent() {
  const { showVideoCall } = useVideoCall();

  return (
    <div className="relative min-h-screen">
      <ToastContainer />
      {showVideoCall && <VideoCallPopup />}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
      <AppContent />
  );
}

export default App;