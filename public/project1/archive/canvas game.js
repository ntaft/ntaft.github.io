$( document ).ready( function() {

  console.log('loaded and ready to go');

  var canvas = document.getElementById('canvas-game');
  var ctx = canvas.getContext('2d');

  for (var x=0.5; x < 50; x++) {
    for (var y=0.5; y <= 14; y++) {
      var r = Math.floor(255 * Math.random());
      var g = Math.floor(255 * Math.random());
      var b = Math.floor(255 * Math.random());
      var sqColor = 'rgba('+[r, g, b, '1'].join(',')+')';
      console.log(sqColor);
      console.log(x, y);

        ctx.fillRect(x*100, y*100, 7.5, 7.5);
        ctx.fillStyle = sqColor;
        //ctx.strokeRect(x*10, y*10, 10, 10)
      };
    }
   var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.fill(circle);
  })

