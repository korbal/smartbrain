import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import { render } from '@testing-library/react';
import React, {Component} from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
//import Clarifai from 'clarifai';

//this is needed in order to use Clarifai API fuck knows why
window.process = { };

/////////////////////////// Clarifai API /////////////////////////////////////
const USER_ID = 'balint';
const PAT = process.env.REACT_APP_CLARIFAI_PAT;
const APP_ID = 'ztmsmartbrain';
const MODEL_ID = 'face-detection'
const IMAGE_URL = 'https://rare-gallery.com/uploads/posts/4576378-adrianne-palicki-bare-shoulders-women-celebrity-portrait.jpg';

/////////////////////////// Particle background params /////////////////////////////////////
const PARTICLES_BG_PROPS = {
  type: "cobweb",
  bg: true,
  num: 200,
  color:"#ffffff",
}
/////////////////////////// MAIN APP /////////////////////////////////////

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }
  
  calculateFaceLocation = (boxdata) => {
    // const clarifaiFace = boxdata.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: boxdata.left_col * width,
      topRow: boxdata.top_row * height,
      rightCol: width - (boxdata.right_col * width),
      bottomRow: height - (boxdata.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
          "data": {
              "image": {
                  "url": this.state.input
              }
          }
      }
    ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    
    
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => (result.outputs[0].data.regions[0].region_info.bounding_box))
        .then(boxdata => this.displayFaceBox( this.calculateFaceLocation(boxdata)))
        .catch(error => console.log('error', error));

  }

  render() {
    return (
      <div className="App">
        {/* <ParticlesBg type="cobweb" bg={true} /> */}
        <ParticlesBg {...PARTICLES_BG_PROPS} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}  />
        <FaceRecognition box={this.state.box}  imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
