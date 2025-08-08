import { AuthContextProvider } from './common/contexts/AuthContext';
import Header from './common/components/Header';
import Main from './common/components/Main';
import Footer from './common/components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
