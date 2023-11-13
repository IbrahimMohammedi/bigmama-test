import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";


function App({ Component, pageProps }) {
  return (
      <div className="App">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      </div>
  );
}

export default App;

