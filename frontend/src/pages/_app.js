import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import Navbar from '../components/Navbar';

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
    
  );
}

