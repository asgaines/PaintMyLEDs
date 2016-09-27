var canvas = document.getElementById("ledGrid");
var ctx = canvas.getContext("2d");

ctx.lineWidth = 1;

var rows = 8;
var cols = 16;

var Grid = {
  init: function(rows, cols) {
    var grid = [];
    var col = [];

    while (rows--) {
      col.push(0);
    }
    while (cols--) {
      grid.push(col.slice());
    }
    return grid;
  },

  drawGrid: function(gridData, width, height, rows, cols) {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    var colWidth = width / cols;
    var rowHeight = height / rows;
    for (var col = 0; col < cols; col++) {
      for (var row = 0; row < rows; row++) {
        if (gridData[col][row]) {
          ctx.fillStyle="#FF0000";
          ctx.fillRect(col * colWidth, row * rowHeight, colWidth, rowHeight);
        }
        ctx.strokeRect(col * colWidth, row * rowHeight, colWidth, rowHeight);
      }
    }
  },

  mouseDown: function(event) {
    var clickPos = Grid.getClickPos(canvas, event);
    var colWidth = canvas.width / cols;
    var rowHeight = canvas.height / rows;
    var col = Math.floor(clickPos.x / colWidth);
    var row = Math.floor(clickPos.y / rowHeight);

    if (event.button == 0 || event.button == 1) {
      gridData[col][row] = 1;
    } else if (event.button == 2) {
      gridData[col][row] = 0;
    }

    Grid.drawGrid(gridData, canvas.width, canvas.height, rows, cols);
  },

  getClickPos: function(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  },

  getGridData: function() {
    var data = new Array(cols).fill(0);
    for (var col = 0; col < cols; col++) {
      for (var row = 0; row < rows; row++) {
        if (gridData[col][row]) {
          data[col] += Math.pow(2, rows - 1 - row);
        }
      }
    }

    return data.join(',');
    /*
    var publishEvent = particle.publishEvent({ name: 'led-data', data: dataString, auth: access_token });

    publishEvent.then(
      function(data) {
        if (data.body.ok) { console.log("Event published succesfully") }
      },
      function(err) {
        console.log("Failed to publish event: " + err)
      }
    );
    console.log(data);
    */
  },
}

var gridData = Grid.init(rows, cols);
Grid.drawGrid(gridData, canvas.width, canvas.height, rows, cols);
ctx.canvas.addEventListener('mousedown', Grid.mouseDown, false);
