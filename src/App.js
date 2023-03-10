import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import React, { Component } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";

//backend url
//const BACKEND_BASE_URL = "https://smartbrain.cyclic.app";

// development backend url
const BACKEND_BASE_URL = "http://localhost:3000";
const PARTICLES_BG_PROPS = {
  type: "cobweb",
  bg: true,
  num: 200,
  color: "#ffffff",
};

window.process = {};

/////////////////////////// MAIN APP /////////////////////////////////////

const initialState = {
  input: "",
  imageUrl: "",
  box: [],
  route: "signin",
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    pet: "",
    age: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (boxdataArray) => {
    //console.log(boxdataArray)
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return boxdataArray.map((boxdata) => {
      return {
        leftCol: boxdata.left_col * width,
        topRow: boxdata.top_row * height,
        rightCol: width - boxdata.right_col * width,
        bottomRow: height - boxdata.bottom_row * height,
      };
    });
  };

  displayFaceBox = (box) => {
    //console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input }); // set imageUrl to input value
    // request to backend to handle clarifai api call
    fetch(`${BACKEND_BASE_URL}/imageurl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json()) // if response is ok, gives back boxdata to frame the face of the picture
      // check the response here, if it's an array of bounding boxes
      .then((boxdata) => {
        if (boxdata) {
          fetch(`${BACKEND_BASE_URL}/image`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count })); // store proper user data in state
            })
            .catch(console.log);
        }

        this.displayFaceBox(this.calculateFaceLocation(boxdata));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      return this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  };

  render() {
    const { isSignedIn, imageUrl, route, box, isProfileOpen, user } =
      this.state;
    return (
      <div className="App">
        <ParticlesBg {...PARTICLES_BG_PROPS} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
        />

        {isProfileOpen && (
          <Modal>
            <Profile
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
              user={user}
            />
          </Modal>
        )}
        {route === "home" ? (
          <div>
            <Logo />

            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}
export { BACKEND_BASE_URL };
export default App;
