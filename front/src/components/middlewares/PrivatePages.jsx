import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivatePages = () => {
    const user = useSelector((state) => state.presisted?.user);

    if (user) {
        return <Outlet />;
    } else {
        return <Navigate to='/auth/signin' replace />;
    }
}

export default PrivatePages;