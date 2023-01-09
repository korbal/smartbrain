import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';

const PARTICLES_BG_PROPS = {
  type: "cobweb",
  bg: true,
  num: 200,
  color:"#ffffff",
}


function App() {
  return (
    <div className="App">
      {/* <ParticlesBg type="cobweb" bg={true} /> */}
      <ParticlesBg {...PARTICLES_BG_PROPS} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
