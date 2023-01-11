import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import { render } from '@testing-library/react';
import React, {Component} from 'react';
import Clarifai from 'clarifai';

//this is needed in order to use Clarifai API fuck knows why
window.process = { };

const PARTICLES_BG_PROPS = {
  type: "cobweb",
  bg: true,
  num: 200,
  color:"#ffffff",
}

const app = new Clarifai.App({
 apiKey: process.env.REACT_APP_CLARIFAI_API_KEY
});



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }
  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
  }

  render() {
    return (
      
      <div className="App">
        {/* <ParticlesBg type="cobweb" bg={true} /> */}
        <ParticlesBg {...PARTICLES_BG_PROPS} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
