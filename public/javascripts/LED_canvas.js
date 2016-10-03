var Grid = function(canvas, rows, cols, editable, dataStr) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.rows = rows;
  this.cols = cols;
  this.height = this.canvas.height;
  this.width = this.canvas.width;

  if (typeof dataStr === 'undefined') {
    this.matrix = this.matrixEmpty();
  } else {
    this.matrix = this.matrixFromData(dataStr);
  }

  if (editable) {
    this.canvas.onclick = this.mouseDown.bind(this);
  }

  this.draw();
};

Grid.prototype.matrixEmpty = function() {
  var matrix = [];
  var col = [];
  var rows = this.rows;
  var cols = this.cols;

  while (rows--) {
    col.push(0);
  }
  while (cols--) {
    matrix.push(col.slice());
  }
  return matrix;
}

Grid.prototype.matrixFromData = function(dataStr) { 
  var matrix = this.matrixEmpty();

  // Split dataStr into values for each column
  // Ex) '1,255,16' -> ['1', '255', '16']
  var vals = dataStr.split(',');
  for (var col = 0; col < vals.length; col++) {
    // Convert string value into string of binary
    // Ex) '254' -> '11111110', '2' -> '10'
    var bits = parseInt(vals[col]).toString(2);
    // Front-load the bits to 8 bits
    // Ex) '110' -> '00000110'
    var bits = ('00000000'+bits).substring(bits.length);
    for (var bit = 0; bit < bits.length; bit++) {
      matrix[col][bit] = parseInt(bits[bit]);
    }
  }

  return matrix;
}

Grid.prototype.draw = function() {
  // Clear canvas
  this.ctx.clearRect(0, 0, this.width, this.height);

  var colWidth = this.width / this.cols;
  var rowHeight = this.height / this.rows;

  this.ctx.beginPath();
  this.ctx.strokeRect(0, 0, this.width, this.height);

  for (var col = 0; col < this.cols; col++) {
    for (var row = 0; row < this.rows; row++) {
      if (this.matrix[col][row]) {
        // Draw the red LED
        this.ctx.fillStyle = "#FF0000";
        this.ctx.beginPath();
        this.ctx.arc(col * colWidth + colWidth / 2, row * rowHeight + rowHeight / 2, colWidth / 3, 0, 2*Math.PI);
        this.ctx.fill();

        // Draw a white-ish glare, slightly off-center
        this.ctx.fillStyle = "#FF5555";
        this.ctx.beginPath();
        this.ctx.arc(col * colWidth + colWidth / 2 - colWidth / 8, row * rowHeight + rowHeight / 2 - rowHeight / 6, colWidth / 11, 0, 2*Math.PI);
        this.ctx.fill();
      }
      // Draw edge of LED
      this.ctx.beginPath();
      this.ctx.arc(col * colWidth + colWidth / 2, row * rowHeight + rowHeight / 2, colWidth / 3, 0, 2*Math.PI);
      this.ctx.stroke();
    }
  }
}

Grid.prototype.getClickPos = function(event) {
  var rect = this.canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

Grid.prototype.mouseDown = function(event) {
  var clickPos = this.getClickPos(event);
  var colWidth = this.width / this.cols;
  var rowHeight = this.height / this.rows;
  var col = Math.floor(clickPos.x / colWidth);
  var row = Math.floor(clickPos.y / rowHeight);

  if (event.button == 0 || event.button == 1 || event.button == 2) {
    this.matrix[col][row] = !this.matrix[col][row];
  }

  this.draw();
}

Grid.prototype.getData = function() {
  var data = new Array(this.cols).fill(0);
  for (var col = 0; col < this.cols; col++) {
    for (var row = 0; row < this.rows; row++) {
      if (this.matrix[col][row]) {
        data[col] += Math.pow(2, this.rows - 1 - row);
      }
    }
  }

  return data.join(',');
}
