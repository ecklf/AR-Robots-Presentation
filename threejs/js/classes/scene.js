var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init() {
    scene = new THREE.Scene();

    initMesh();
    initCamera();
    initLights();
    initRenderer();

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(0, 3.5, 70);
    camera.lookAt(scene.position);
}


function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initLights() {
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}

var mesh = null;
function initMesh() {
    var loader = new THREE.JSONLoader();
    loader.load('./assets/robot_final5.json', function(geometry, materials) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.position.set(0, 0, 0);
        scene.add(mesh);
    });
}

/*
var mesh = null;
function initMesh() {
  var loader = new THREE.JSONLoader();
  loader.load( 'assets/robot.json', function ( geometry ) {
  mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() );
  mesh.position.set(0, 0, 0);
  mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
  scene.add(mesh);
  });
}


*/


function rotateMesh() {
    if (!mesh) {
        return;
    }
    mesh.rotation.y -= SPEED * 3;

/*
    mesh.rotation.x -= SPEED * 2;
    mesh.rotation.y -= SPEED;
    mesh.rotation.z -= SPEED * 3;
*/
}

function render() {
    requestAnimationFrame(render);
    rotateMesh();
    renderer.render(scene, camera);
}

init();
render();
