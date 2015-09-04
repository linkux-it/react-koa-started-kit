import React from 'react';


export class HelloMessage extends React.Component {

  handleClick () {
    alert('You clicked!');
  }

  render () {
    return <div onClick={this.handleClick}>Hello {this.props.name}</div>;
  }

}
