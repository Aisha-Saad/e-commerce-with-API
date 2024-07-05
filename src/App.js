

import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppFooter from './component/Footer';
import AppHeader from './component/Header';
import PageContent from './component/PageContent';



function App() {
  return (
    <div className='App' >
      <BrowserRouter>
      <AppHeader/>
      <PageContent/>
      <AppFooter/>
      </BrowserRouter>
    </div>
  );
}






export default App;
