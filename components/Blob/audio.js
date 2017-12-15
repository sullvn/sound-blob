export class Monitor {
  constructor({ size, minDecibels, maxDecibels, timeSmoothing }) {
    this.context = audioContext()
    this.analyser = analyser( this.context,
      { size, minDecibels, maxDecibels, timeSmoothing }
    )


    this.buffer = new Float32Array( this.analyser.frequencyBinCount )
    this.buffer.fill( -120 )
  }

  start() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then( stream => {
      this.context
        .createMediaStreamSource( stream )
        .connect( this.analyser )
    })
  }

  get data() {
    this.analyser.getFloatFrequencyData( this.buffer )

    return this.buffer
  }
}


function analyser( context, { size, minDecibels, maxDecibels, timeSmoothing }) {
  const a = context.createAnalyser()
  a.fftSize = size
  a.minDecibels = minDecibels
  a.maxDecibels = maxDecibels
  a.smoothingTimeConstant = timeSmoothing

  return a
}


function audioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  return new AudioContext()
}


