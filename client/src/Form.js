import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import TweetsActions from './tweets/TweetsActions';

export default class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      disabledButton: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({inputValue:nextProps.inputValue})
  }

  submitForm(e) {
    e.preventDefault();
    TweetsActions.fetchTweets(this.state.inputValue);
  }

  updateInputValue(e) {
    const value = e.target.value;
    this.toggleSubmitBtn(value)
    this.setState({
      inputValue: value
    });
  }

  toggleSubmitBtn(value) {
    if (value.length > 0) {
      this.setState({
        disabledButton: false
      });
    } else {
      this.setState({
        disabledButton: true
      });
    }
  }

  render() {
    const {inputValue} = this.state;

    return (
      <div>
        <form onSubmit={this.submitForm.bind(this)} className="hashtag-form">
          <FormGroup>
            <InputGroup bsSize={'lg'}>
              <InputGroup.Addon>#</InputGroup.Addon>
              <FormControl
                type="text"
                onChange={this.updateInputValue.bind(this)}
                value={inputValue}
                placeholder="Enter hashtag"
              />
              <InputGroup.Button>
                <Button
                  type={'submit'}
                  disabled={this.state.disabledButton}
                  className={this.props.disabledButton ? 'btn-disabled' : ''}
                >
                  <span className="icon-search2"></span>
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
      </div>
    );
  }
}
