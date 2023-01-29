import React from "react";

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: "",
    };
  }
  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  // need this hook, because the component is only changing the state at mount. but if the user adds a new photo, and the rank changes, it wouldn't reflect on the screen. this is why we need the update hook

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.entries === this.state.entries &&
      prevProps.name === this.props.name
    ) {
      return null;
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    console.log(entries);
    fetch(
      `https://cr6mmat6p5.execute-api.us-east-1.amazonaws.com/rank?rank=${entries}`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ emoji: data.input }));
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.entries === this.props.entries) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <div className="white f3">
          {`${this.props.name}, Your current entry count is...`}
        </div>
        <div className="white f1">{`#${this.props.entries}`}</div>
        <div className="white f3">{`Rank Badge: ${this.state.emoji}`}</div>
      </div>
    );
  }
}

export default Rank;
