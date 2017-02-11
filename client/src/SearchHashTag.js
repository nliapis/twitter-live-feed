import React from 'react';
import { Grid, Row, Col, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import Client from './Client';

const SearchHashTag = React.createClass({
  getInitialState: function() {
    return {
      tweets: {
        metadata: {},
        statuses: []
      },
      inputValue: '',
      disabledButton: true
    };
  },
  handleSearchChange: function (e) {
    e.preventDefault();
    const value = this.state.inputValue;
    Client.search(value, (tweets) => {
      this.setState({
        tweets: tweets
      })
    });
  },
  render: function () {
    return (
      <form onSubmit={this.handleSearchChange}>
        <FormGroup>
          <InputGroup bsSize={'lg'}>
            <InputGroup.Addon>#</InputGroup.Addon>
            <FormControl type="text" value={this.state.inputValue} onChange={this.updateInputValue} />
            <InputGroup.Button>
              <Button type={'submit'} disabled={this.state.disabledButton}>Sumbit hashtag</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
  },

  updateInputValue: function(evt) {
    const value = evt.target.value;

    if (value.length > 0) {
      this.setState({
        disabledButton: false
      });
    } else {
      this.setState({
        disabledButton: true
      });
    }

    this.setState({
      inputValue: evt.target.value
    });
  }
});

export default SearchHashTag;
