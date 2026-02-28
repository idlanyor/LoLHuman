import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-hidden bg-slate-950 relative">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
