
import { Navigate } from 'react-router-dom';

const Index = () => {
  // This page will simply redirect to the Appointments page
  return <Navigate to="/" replace />;
};

export default Index;
