#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;

const vec3 black = vec3( 0.0 );
const vec2 center = vec2( 0.5 );


// Random and noise
//
// Gradient noise implementation as featured in:
//
//    https://thebookofshaders.com/edit.php#11/2d-gnoise.frag
//
vec2 random2( vec2 st ){
  st = vec2( dot( st, vec2( 127.1, 311.7 )),
             dot( st, vec2( 269.5, 183.3 )));

  return -1.0 + 2.0 * fract( sin( st ) * 43758.5453123 );
}


// 2D noise space
//
// Uses gradient noise.
//
float noise( in vec2 st ) {
  vec2 i = floor( st );
  vec2 f = fract( st );

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix( mix( dot( random2( i + vec2( 0.0, 0.0 )), f - vec2( 0.0, 0.0 )),
                   dot( random2( i + vec2( 1.0, 0.0 )), f - vec2( 1.0, 0.0 )), u.x),
              mix( dot( random2( i + vec2( 0.0, 1.0 )), f - vec2( 0.0, 1.0 )),
                   dot( random2( i + vec2( 1.0, 1.0 )), f - vec2( 1.0, 1.0 )), u.x), u.y);
}


// Offset a point from the center
//
// For fun times, it depends on:
//
// * Unit vector from the center
// * Time
//
// Ability to tweak:
//
// * Max amplitude (offset distance)
// * Frequency
//
float offset( in float amp, in float freq, in vec2 unitVector, in float time ) {
  return amp * noise( freq * (unitVector + time ));
}


// Color
//
// Render blacks within a certain radius.
//
vec4 color( in float radius ) {
  if ( radius < 0.2 ) {
    return vec4( black, 1. );
  } else {
    return vec4( 0. );
  }
}


void main() {
  // Unit coordinate, [0, 1]
  vec2 u = gl_FragCoord.xy / resolution;

  // Vector from center
  vec2 v = center - u;

  // Radius from center
  float r = length( v );

  // Unit vector
  vec2 uv = v / r;

  // Ring offset
  float o = offset( 0.6 * r, 2.0,  uv + vec2( 0., r * 1.5 ), time       ) +
            offset( 0.1 * r, 10.0, uv,                       time / 3.0 );

  // Noisey radius
  float nr = r + o;

  gl_FragColor = color( nr );
}
