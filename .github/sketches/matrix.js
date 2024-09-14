const matrix = (p5) => {
  let canvas
  const aspectRatio = 9 / 16
  let symbolSize = 12  // Reduced symbol size to make the symbols smaller
  let timeElapsed = 0.0
  let cols
  let streams = []
  let gfx

  String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length)
  }

  p5.setup = () => {
    const parentWidth = p5._userNode.offsetWidth
    const parentHeight = parentWidth * aspectRatio  // Calculate height based on ratio

    canvas = p5.createCanvas(parentWidth, parentHeight, p5.P2D)
    p5.canvas.style.backgroundColor = 'transparent'

    cols = p5.width / symbolSize

    for (let i = 0; i < cols; i++) {
      let x = i * symbolSize
      streams[i] = new Stream(x)
      streams[i].prepare()
    }

    gfx = p5.createGraphics(p5.width, p5.height, p5.P2D)
    gfx.clear()  // Ensure the graphics buffer is cleared
  }

  p5.draw = () => {
    p5.clear()  // Clear the canvas to make the background transparent
    gfx.clear()  // Clear the graphics buffer as well

    for (let i = 0; i < streams.length; i++) {
      streams[i].update(timeElapsed)
      streams[i].render()
    }

    p5.image(gfx, 0, 0)
    timeElapsed = 1 / p5.frameRate()
  }

  class Stream {
    constructor(x) {
      this.x = x
      this.y = 0
      this.length = 1
      this.text = ''
      this.interval = 0.05
      this.time = 0.0
    }

    prepare() {
      let rows = (p5.height * 0.5) / symbolSize
      this.y = p5.random(rows) * symbolSize * -1
      this.length = p5.round(p5.random(12, 64))
      this.text = this.getRandomString(this.length)
      this.interval = p5.random(0.01, 0.08)
    }

    getRandomString(len) {
      let st = ''
      for (let i = 0; i < len; i++) {
        st += this.randomChar()
      }
      return st
    }

    shiftString(s) {
      return s.charAt(s.length - 1) + s.substring(0, s.length - 1)
    }

    randomChar() {
      return String.fromCharCode(0x30a0 + p5.round(p5.random(0, 96)))
    }

    flicker() {
      let r = p5.round(p5.random(0, 2))
      if (r == 0) {
        let idx = p5.round(p5.random(2, this.text.length))
        this.text = this.text.replaceAt(idx, this.randomChar())
      }
    }

    update(elapsed) {
      if (this.time >= this.interval) {
        this.y += symbolSize
        this.time = 0
        this.text = this.shiftString(this.text)
      }

      if (this.y - this.text.length * symbolSize > p5.height) {
        this.prepare()
      }

      this.flicker()
      this.time += elapsed
    }

    render() {
      p5.colorMode(p5.HSB, 360, 100, 100)

      for (let i = 0; i < this.text.length; i++) {
        let col = p5.color(132, 92, 82)
        let _x = this.x
        let _y = this.y - i * symbolSize
        let brightVal = p5.map(this.interval, 0.01, 0.08, 100, 20)
        col = p5.color(132, 92, brightVal)
        let c = this.text[i]

        if (i < 4) {
          col = p5.color(132, 20, brightVal + 20)
        }

        if (i > this.text.length - this.text.length / 4) {
          col = p5.color(132, 92, brightVal - 20)
        }

        if (i == 0) {
          c = this.randomChar()
          col = p5.color(0, 0, 100)
        }

        gfx.textSize(symbolSize)
        gfx.fill(col)
        gfx.text(c, _x, _y)
      }
    }
  }

  // Adjust canvas size when the window is resized
  p5.windowResized = () => {
    const parentWidth = p5._userNode.offsetWidth
    const parentHeight = parentWidth * aspectRatio  // Maintain the same aspect ratio
    p5.resizeCanvas(parentWidth, parentHeight)
    gfx.resizeCanvas(parentWidth, parentHeight)  // Resize the graphics buffer as well
  }
}

export default matrix