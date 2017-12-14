import * as React from 'react'

import startRender from './render'


/**
 * Blob
 *
 * Blob which reacts to sound through the microphone.
 */
export default class Blob extends React.Component {
  render() {
    return (
      <canvas
        width={ 800 }
        height={ 800 }
        style={ canvasStyle }
        ref={ this.onRef }
      />
    )
  }

  onRef = el => {
    startRender( el )
  }
}


const canvasStyle = {
  height: '400px',
  width: '400px',
}
