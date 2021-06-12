import './App.css';
// import { Image } from './components/image';
import { Image } from 'react-img-placeholder';

const src = 'https://i.redd.it/2ghbw4ea28471.jpg';

function App() {
  return (
    <div className="App">
      {/* <img src={src} alt="logo" width="200" /> */}

      <Image src={src} height="200" width="200" />
    </div>
  );
}

export default App;
