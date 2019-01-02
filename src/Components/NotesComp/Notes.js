import React, { Component } from 'react';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [{ title: 'thing', content: 'hey' }]
    };
  }

  render() {
    return <div>Notes and stuff</div>;
  }
}

export default Notes;
