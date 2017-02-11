import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

const Form = React.createClass({

  render: function () {
    return (
      <div>
        <form onSubmit={this.props.handleSearchChange} className="hashtag-form">
          <FormGroup>
            <InputGroup bsSize={'lg'}>
              <InputGroup.Addon>#</InputGroup.Addon>
              <FormControl
                type="text"
                value={this.props.inputValue}
                onChange={this.props.updateInputValue}
                placeholder="Enter hashtag"
              />
              <InputGroup.Button>
                <Button
                  type={'submit'}
                  disabled={this.props.disabledButton}
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
});

export default Form;
