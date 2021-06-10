import './App.css';
import { Image } from './components/image';

const src = 'https://i.redd.it/2ghbw4ea28471.jpg';
const srcTwo = 'https://i.redd.it/ffzp868xud471.jpg';

function App() {
  return (
    <div className="App">
      {/* <img src={srcTwo} alt="logo" width="500" loading="eager" /> */}
      {/* <img src={src} alt="logo" width="500" loading="lazy" /> */}

      <Image src={srcTwo} alt="logo" width="500" />
    </div>
  );
}

export default App;
