import '@/assets/styles/globals.css';
import Favicon from '/public/favicon.ico';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/Auth/AuthProvider';

export const metadata = {
  title: 'PropertyListing | Find A Rental Property',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, find properties',
  icons: [{ rel: 'icon', url: Favicon.src }],
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang='en'>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
