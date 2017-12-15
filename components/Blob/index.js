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
  height: '100vmin',
  width: '100vmin',
}
