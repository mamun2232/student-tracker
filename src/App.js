import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
   <div className='bg-[#FFA8A8] pb-20'>
    <Home/>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
   </div>
  );
}

export default App;
