import initRegl from 'regl'

import { Monitor } from './audio'
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'


const attributes = {
  position: [
    [-1, -1],
    [-1,  1],
    [ 1,  1],

    [-1, -1],
    [ 1,  1],
    [ 1, -1],
  ],
}


const uniforms = {
  resolution( ctx ) {
    return [
      ctx.viewportWidth,
      ctx.viewportHeight,
    ]
  },
  time({ tick }) {
    return tick * 0.001
  },

  low({}, { frequencies: freq }) {
    return freq[ 0 ]
  },
  mid({}, { frequencies: freq }) {
    return (freq[ 1 ] + freq[ 2 ] + freq[ 3 ]) / 3
  },
  high({}, { frequencies: freq }) {
    return (
      freq[ 4 ]  + freq[ 5 ]  + freq[ 6 ]  + freq[ 7 ]  + freq[ 8 ] +
      freq[ 9 ]  + freq[ 10 ] + freq[ 11 ] + freq[ 12 ] + freq[ 13 ] +
      freq[ 14 ] + freq[ 15 ]
    ) / 12
  },
}


const resizeCanvas = el => () => {
  const { width, height } = el.getBoundingClientRect()
  el.width = width * window.devicePixelRatio
  el.height = height * window.devicePixelRatio
}


export default function startRender( el ) {
  const regl = initRegl( el )

  const draw = regl({
    frag: fragmentShader,
    vert: vertexShader,
    count: attributes.position.length,
    attributes,
    uniforms,
  })

  const rc = resizeCanvas( el )

  rc()
  window.addEventListener( 'resize', rc )

  // Audio monitor
  const monitor = new Monitor({
    size: 32,
    minDecibels: -90,
    maxDecibels: -10,
    timeSmoothing: 0.80,
  })

  monitor.start()

  // Render every animationFrame
  regl.frame(({ time }) => {
    // Clear with transparency
    regl.clear({
      color: [ 0, 0, 0, 0 ],
      depth: 1,
    })

    draw({
      frequencies: monitor.data,
    })
  })
}
