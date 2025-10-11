import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function AdminLayout() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="border-border border-b p-4">
          <Header />
        </div>
        <div className="flex flex-1">
          <div className="bg-secondary w-full max-w-[15.25rem]">
            <Sidebar />
          </div>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
