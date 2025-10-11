import { useEffect } from 'react';
import { backendAlive } from '../../Api/api_client';

function AdminDashboard() {
  useEffect(() => {
    const CheckBackend = async () => {
      try {
        const response = await backendAlive();
        console.log('Backend status:', response);
      } catch (error: any) {
        console.error('Backend check failed:', error.message);
      }
    };
    CheckBackend();
  }, []);

  return (
    <div>
      <div>Admin Home</div>
    </div>
  );
}

export default AdminDashboard;