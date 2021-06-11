import './App.css';
import { Image, useImage } from './components/image';

const src = 'https://i.redd.it/2ghbw4ea28471.jpg';

function App() {
  return (
    <div className="App">
      <img src={src} alt="logo" width="200" />

      {/* <Image src={src} alt="logo" width="200" /> */}
      <Image />
    </div>
  );
}

export default App;
