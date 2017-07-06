import React, { Component } from 'react';
import update from 'immutability-helper';
import { validatePattern } from './Util';
import { fields } from './Data';
import './App.css';
import $ from 'jquery';

class App extends Component {

  /**
   * constructor
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
     this.state = {
      showErrors: false,
      validationErrors: {},
      payload: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * componentWillMount
   */
  componentWillMount() {
    fields.forEach(function(field) {
      this.runValidation(field.name, this.state);
    }, this);
  }

  /**
   * handle input change
   * @param {String} field 
   */
  handleChange(field) {
    return (e) => {
      let newState = update(this.state, {
        payload: {[field]: {$set: e.target.value}}
      });

      this.runValidation(field, newState);
      this.setState(newState);
    }
  }

  /**
   * handle form submit
   * @param {SytheticEvent} event 
   */
  handleSubmit(event) {
    this.setState({showErrors: true});

    if($.isEmptyObject(this.state.validationErrors)) {
       console.log("All pass");
       console.dir(this.state.payload);
    }
    event.preventDefault();
  }

  /**
   * run validation on field and update state.validationErrors
   * @param {String} field 
   * @param {Object} state 
   */
  runValidation(field, state) {
    const validatedResult = this.validateField(field, state);

    if(validatedResult != null) {
      state.validationErrors[field] = validatedResult;
    }else {
      delete state.validationErrors[field];
    }
  }

  /**
   * validate field
   * @param {String} field 
   * @param {Object} state 
   */
  validateField(field, state) {
    if(!state.payload[field]) {
      return "is required";
    }
    return validatePattern(field, state);
  }

  /**
   * determine className for input
   * @param {String} field 
   * @return {String}
   */
  isTextInputErrorOn(field) {
    return this.state.showErrors && this.state.validationErrors[field] ? "text-input text-input-error": "text-input";
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <div className="app-title">Create an Account</div>
        </div>
        <form onSubmit={this.handleSubmit}>
          {
            fields.map((value) => {
              return <div className="form-group" key={value.name}>
                      <label>{value.name}</label>
                      <div className="text-group">
                        <input className={this.isTextInputErrorOn(value.name)}  
                               type={value.type} placeholder={value.placeholder} 
                               value={this.state.payload[value.name] || ''}
                               onChange={this.handleChange(value.name)} />
                        { this.state.showErrors && this.state.validationErrors[value.name] ? 
                        <div className="text-validation-error"> {this.state.validationErrors[value.name]}</div> : null }
                      </div>
                    </div>
            })
          }
          <input type="submit" value="Create Account" />
        </form>
      </div>
    );
  }
}

export default App;
