import React, { Component } from 'react';
import ListMaker from './ListMaker';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        { name: 'note1', content: 'This is a note' },
        { name: 'note2', content: 'This is note 2' },
        { name: 'note3', content: 'This is note 3' }
      ],
      focus: ''
    };
  }

  _handleClick(event, item) {
    this.setState({
      focus: item.content
    });
  }

  render() {
    return (
      <div className='tile'>
        This is a tile
        <ListMaker
          items={this.state.notes}
          handleClick={this._handleClick.bind(this)}
        />
        <div>{this.state.focus}</div>
      </div>
    );
  }
}

export default Notes;
