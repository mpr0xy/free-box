<template>
  <div class="p2">
    <div class="img-container">
      <img src="../assets/images/p2bg.jpg" />
      <canvas width="702" height="1000" id="myCanvas"></canvas>
    </div>
  </div>
</template>
<style lang="scss"  scoped>
  .p2 {
    position: relative;
    max-width: 750px;
  }
  .img-container {
    position: relative;
    margin: 24px;
    height: 1000px;
    box-sizing: border-box;
    overflow: hidden;
    img {
      display: block;
      width: 100%
    }
  }
  .p2 {
    position: relative;
  }
  #myCanvas {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 1000px;
  }
</style>
<script type="text/ecmascript-6">
  import p2 from 'p2'
  export default{
    data(){
        return{
        }
    },

    mounted() {
      var canvas, ctx, w, h,
          world, circleBody, 
          planeBody, circleShape, planeShape,
          wallLeftBody, wallRightBody;
      var circleGroups = [];
      var bollMaterial = new p2.Material();
      var landMaterial = new p2.Material();
      var wallMaterial = new p2.Material();
      init();
      animate();
      window.addEventListener('deviceorientation', handleOrientation, false);

      function handleOrientation(event) {
        var absolute = event.absolute;
        var alpha    = event.alpha;
        var beta     = event.beta;
        var gamma    = event.gamma;
        console.log(`absolute=${absolute}`);
        console.log(`alpha=${alpha}`);
        console.log(`beta=${beta}`);
        console.log(`gamma=${gamma}`);

        if (gamma > 10) {
          circleGroups.forEach((item) => {
            item.velocity = [100, 0];
          })
        } else if (gamma < -10) {
          circleGroups.forEach((item) => {
            item.velocity = [-100, 0];
          })
        } else {
          circleGroups.forEach((item) => {
            item.velocity = [0, 0];
          })
        }
      }
      function createCircleGroup() {
        var circlePositions = [[300, -50], [470, -150], [180, -120], 
        [100, -50], [370, -159], [480, -20],
        [120, -200], [180, 10], [501, 50]]
        for (var i = 0; i < circlePositions.length; i++) {
          var circleS = new p2.Circle({ radius: 50 });
          circleS.material = bollMaterial;
          var circleB = new p2.Body({
            mass: 50,
            position: circlePositions[i],
            velocity: [0, -100]
          });
          circleB.addShape(circleS);
          world.addBody(circleB);
          circleGroups.push(circleB);
        }
      }

      function createWall() {
        var wallLeft = new p2.Box({
          width: 1,
          height: 1000
        });
        wallLeftBody = new p2.Body({
          mass: 0,
          position: [0, -500],
          allowSleep: true
        });
        var wallRight = new p2.Box({
          width: 1,
          height: 1000
        });
        wallRightBody = new p2.Body({
          mass: 0,
          position: [702, -500],
          allowSleep: true
        });
        wallLeft.material = wallMaterial;
        wallRight.material = wallMaterial;
        wallLeftBody.addShape(wallLeft);
        wallRightBody.addShape(wallRight);
        wallLeftBody.sleep();
        wallRightBody.sleep();
        world.addBody(wallLeftBody);
        world.addBody(wallRightBody);
      }

      function init(){

        // Init canvas
        canvas = document.getElementById("myCanvas");
        w = canvas.width;
        h = canvas.height;

        ctx = canvas.getContext("2d");
        ctx.lineWidth = 1;

        // Init p2.js
        world = new p2.World({
          gravity: [0, -12]
        });
        // Add a circle
        // circleShape = new p2.Circle({ radius: 50 });
        // circleShape.material = bollMaterial;
        // circleBody = new p2.Body({ 
        //   mass: 10,
        //   position: [300, -50],
        //   // velocity: -10
        //   // angularVelocity: 0
        // });
        // circleBody.addShape(circleShape);
        // world.addBody(circleBody);

        createCircleGroup()
        createWall();

        // Add a plane
        planeShape = new p2.Plane();
        planeShape.material = landMaterial;
        planeBody = new p2.Body({
          position: [0, -1000]
        });

        var bollLandContactMaterial = new p2.ContactMaterial(bollMaterial, landMaterial, {
          // stiffness : 10,
          friction: 100,
          restitution: 0.6
        });
        // var circleWallContactMaterial = new p2.ContactMaterial(bollMaterial, wallMaterial, {
        //   // stiffness : 10000000,
        //   friction: 500,
        //   restitution: 4
        // });
        planeBody.addShape(planeShape);
        world.addBody(planeBody);
        world.addContactMaterial(bollLandContactMaterial);
        // world.addContactMaterial(circleWallContactMaterial);
      }

      function drawCircle(){
        circleGroups.forEach((item) => {
          ctx.beginPath();
          var x = item.position[0],
              y = item.position[1],
              radius = 50;
          ctx.arc(x, y, radius, 0, 2*Math.PI);
          ctx.stroke();
        });
      }

      function drawPlane(){
        ctx.beginPath();
        var y = planeBody.position[1];
        ctx.moveTo(-w, y);
        ctx.lineTo( w, y);
        ctx.stroke();
      }
      function drawWall() {
        ctx.beginPath();
        var x = wallLeftBody.position[0],
            y = wallLeftBody.position[1];
        ctx.save();
        ctx.translate(x, y);        // Translate to the center of the box
        ctx.rotate(wallLeftBody.angle);  // Rotate to the box body frame
        ctx.rect(-1/2, -1000/2, 1, 1000);
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -1000)
        ctx.stroke();

        ctx.moveTo(702, 0);
        ctx.lineTo(702, -1000);
        ctx.stroke();
      }

      function render(){
        // Clear the canvas
        ctx.clearRect(0,0,w,h);

        // Transform the canvas
        // Note that we need to flip the y axis since Canvas pixel coordinates
        // goes from top to bottom, while physics does the opposite.
        ctx.save();
        ctx.translate(0, 0);  // Translate to the center
        ctx.scale(1, -1);       // Zoom in and flip y axis

        // Draw all bodies
        drawCircle();
        // drawPlane();
        // drawWall();
        // Restore transform
        ctx.restore();
      }

      // Animation loop
      function animate(){
        requestAnimationFrame(animate);

        // Move physics bodies forward in time
        world.step(1/20);

        // Render scene
        render();
      }

      world.on('beginContact', function (evt){
        // console.log(evt);
      });

      world.on('endContact', function(evt) {
        // console.log(evt);
      });
    },

    methods: {

    }
  }
</script>
