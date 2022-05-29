let mic, fft;

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES)
  
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);
  
  rotateX(30)
  
  noFill()
  stroke(100)
  
  let spectrum = fft.analyze();

  let sumAmp = 0;
  
  for (i = 0; i < spectrum.length; i++) {
    sumAmp += spectrum[i];
  }
  
  let averageAmp = sumAmp / spectrum.length;
  
  
  for(var i = 0; i < 150; i++){
    
    var r = map(sin(frameCount/5), -1, 1, 50, 150)
    var g = map(1, 0, 50, 100, 200)
    var b = map(cos(frameCount), -1, 1, 150, 50)
    
    stroke(r, g, b)
    
    rotate(frameCount / 10)
    
    beginShape()
    for(var j = 0; j <270; j += 30){
      var rad = i * 2 + averageAmp
      var x = rad * cos(j) + averageAmp
      var y = rad * sin(j) + averageAmp
      var z = sin(frameCount * 2 + i * 2) * 100
    
      vertex(x, y, z)
    }
    endShape(CLOSE)
  }  
}