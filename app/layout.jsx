import '@/assets/styles/globals.css';
import Favicon from '/public/favicon.ico';
import { GlobalProvider } from '@/context/GlobalContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/Auth/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'PropertyListing | Find A Rental Property',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, find properties',
  icons: [{ rel: 'icon', url: Favicon.src }],
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang='en'>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
