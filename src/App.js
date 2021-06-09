import logo from './logo.svg';
import './App.css';

import Image from './Image';

const src = 'https://i.redd.it/2ghbw4ea28471.jpg';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      <Image src={src} alt="image" height="200px" placeholderSrc={logo} />
    </div>
  );
}

export default App;
