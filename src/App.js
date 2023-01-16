import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import React, {Component} from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

window.process = { };

/////////////////////////// Clarifai API /////////////////////////////////////
const USER_ID = 'balint';
const PAT = process.env.REACT_APP_CLARIFAI_PAT;
const APP_ID = 'ztmsmartbrain';
const MODEL_ID = 'face-detection'


/////////////////////////// Particle background params /////////////////////////////////////
const PARTICLES_BG_PROPS = {
  type: "cobweb",
  bg: true,
  num: 200,
  color:"#ffffff",
}
/////////////////////////// MAIN APP /////////////////////////////////////

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '', 
    
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

 
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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
        .then(boxdata => {
           if(boxdata) {
            fetch('http://localhost:3000/image',{
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
              })
              .then(response => response.json())
              .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
              })
              .catch(console.log)
           }
           this.displayFaceBox(this.calculateFaceLocation(boxdata))
           })
        .catch(error => console.log('error', error));

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
    this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }
  render() {
   const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        {/* <ParticlesBg type="cobweb" bg={true} /> */}
        <ParticlesBg {...PARTICLES_BG_PROPS} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
        ? <div>
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries} />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}  />
        <FaceRecognition box={box}  imageUrl={imageUrl}/>
      </div> 
        : (
          route === 'signin' 
          ? <Signin loadUser={this.loadUser}  onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser}  onRouteChange={this.onRouteChange} />
        )
        
         
        }
      </div>
    );
  }
}
export default App;
