import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import Request from '../../utils/requestHandler';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {
        emailAddress: null,
        password: null,
        name: null,
        squareId: null,
        paypalId: null,
      },
      error: '',
    };

    this.submitSignupForm = this.submitSignupForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // Send the user away if they're already logged in
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('piddleToken')) {
      this.props.router.push('/');
    }
  }

  handleInputChange(event) {
    const stateObj = this.state.inputs;
    stateObj[event.target.name] = event.target.value;
    this.setState({ inputs: stateObj });
  }

  submitSignupForm(event) {
    event.preventDefault();
    let toSend = this.state.inputs;
    toSend.emailAddress = toSend.emailAddress.toLowerCase();
    Request.postSignup(toSend, (res) => {
      if (res.status === 201) {
        // eslint-disable-next-line no-undef
        localStorage.setItem('piddleToken', res.body.data.token);
        this.props.router.push('/');
      } else {
        this.setState({ error: res.body.error.message });
      }
    });
  }

  render() {
    return (
      <div className="signupPage">
        <p className="Signup-intro">
          Welcome to the signup page
        </p>
        <form id="signupForm">
          <label htmlFor="emailAddress">Email</label>
          <input
            type="text"
            className="loginInput"
            id="emailAddress"
            name="emailAddress"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="loginInput"
            id="password"
            name="password"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="loginInput"
            id="name"
            name="name"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">square Id</label>
          <input
            type="text"
            className="loginInput"
            id="squareId"
            name="squareId"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">paypal Id</label>
          <input
            type="text"
            className="loginInput"
            id="paypalId"
            name="paypalId"
            onChange={event => this.handleInputChange(event)}
          />
          <input
            type="submit"
            className="submitSignup"
            id="submitSignup"
            value="Signup"
            onClick={event => this.submitSignupForm(event)}
          />
        </form>
        <div className="signupError">{this.state.error}</div>
        <img src='//www.paypalobjects.com/webstatic/en_US/developer/docs/lipp/loginwithpaypalbutton.png' />
        <span> Have an account? </span>
          <Link to="/login">Log in</Link>
      </div>
    );
  }
}

Signup.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};

export default withRouter(Signup);
