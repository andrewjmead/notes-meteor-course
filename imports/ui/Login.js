import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      password: ''
    };
  }
  onSubmit(e) {
    let { email, password } = this.state;

    e.preventDefault();

    this.props.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password.' });
      } else {
        this.setState({ error: '' });
      }
    });
  }
  onEmailChange(e) {
    this.setState({ email: e.target.value.trim() })
  }
  onPasswordChange(e) {
    this.setState({ password: e.target.value.trim() })
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" name="email" placeholder="Email" onChange={this.onEmailChange.bind(this)} value={this.state.email} />
            <input type="password" name="password" placeholder="Password" onChange={this.onPasswordChange.bind(this)} value={this.state.password} />
            <button className="button">Login</button>
          </form>

          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginWithPassword: React.PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
}, Login);
