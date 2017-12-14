import initRegl from 'regl'

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
}


export default function startRender( ctx ) {
  const regl = initRegl( ctx )

  const draw = regl({
    frag: fragmentShader,
    vert: vertexShader,
    count: attributes.position.length,
    attributes,
    uniforms,
  })

  // Render every animationFrame
  regl.frame(({ time }) => {
    // Clear as transparent
    regl.clear({
      color: [ 0, 0, 0, 0 ],
      depth: 1,
    })

    draw()
  })
}
