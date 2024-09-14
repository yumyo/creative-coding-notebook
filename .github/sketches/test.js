const test = (p5) => {
  let canvas
  const aspectRatio = 9 / 16  // Define your aspect ratio here (height / width)

  p5.setup = () => {
    const parentWidth = p5._userNode.offsetWidth
    const parentHeight = parentWidth * aspectRatio  // Calculate height based on ratio

    canvas = p5.createCanvas(parentWidth, parentHeight, p5.WEBGL)
  }

  p5.draw = () => {
    p5.background(250)
    p5.normalMaterial()
    p5.push()
    p5.rotateZ(p5.frameCount * 0.01)
    p5.rotateX(p5.frameCount * 0.01)
    p5.rotateY(p5.frameCount * 0.01)
    p5.plane(100)
    p5.pop()
  }

  // Adjust canvas size when the window is resized
  p5.windowResized = () => {
    const parentWidth = p5._userNode.offsetWidth
    const parentHeight = parentWidth * aspectRatio  // Maintain the same aspect ratio
    p5.resizeCanvas(parentWidth, parentHeight)
  }
}

export default test