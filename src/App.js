import './App.css';
import { Image } from './components/image';

const src = 'https://i.redd.it/2ghbw4ea28471.jpg';

function App() {
  return (
    <div className="App">
      {/* <img src={src} alt="logo" width="200" /> */}

      <Image
        src={src}
        height="200"
        width="200"
        placeholderSrc="https://via.placeholder.com/150"
        onError={(e) => {
          console.log('error');
        }}
        onLoad={(e) => {
          console.log(e);
          console.log('hello 1');
        }}
      />
    </div>
  );
}

export default App;
