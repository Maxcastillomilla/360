import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { RGBELoader } from 'three/addons/loaders/RGBELoader';

// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.outputEncoding = THREE.sRGBEncoding

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

//import hdri

const hdrUrl = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/hotel_room_2k.hdr'
new RGBELoader().load(hdrUrl, texture => {
  const gen = new THREE.PMREMGenerator(renderer)
  const envMap = gen.fromEquirectangular(texture).texture
  scene.environment = envMap
  scene.background = envMap
  
  texture.dispose()
  gen.dispose()
})



// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 3;
camera.position.z = 6;
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 0.5);
directionalLight.position.x = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false
controls.enableRotate = true
controls.enableZoom = false


/* const floorMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshLambertMaterial({
    color: 'burlywood'
  })
);
floorMesh.rotation.x = -Math.PI/2;
scene.add(floorMesh); */

// gltf loader
/* const gltfLoader = new GLTFLoader();
gltfLoader.load(
  './models/palmtree.glb',
  gltf => {
    const mesh = gltf.scene.children[0];
    scene.add(mesh);
  }
); */

// Draw
const clock = new THREE.Clock();

function draw() {
  const delta = clock.getDelta();

  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

// Event
window.addEventListener('resize', setSize);

draw();


function load360(url){

  
    console.log('Cambio 360')
    let link = url
    new RGBELoader().load(link, texture => {
      const gen = new THREE.PMREMGenerator(renderer)
      const envMap = gen.fromEquirectangular(texture).texture
      scene.environment = envMap
      scene.background = envMap
      
      texture.dispose()
      gen.dispose()
  
  })
  
  

}

  
  


document.getElementById("cocina").addEventListener("click", function(){
  console.log('click')
  load360('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/blue_photo_studio_2k.hdr')
});

document.getElementById("living").addEventListener("click", function(){
  console.log('click')
  load360('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/kiara_interior_2k.hdr')
});


document.getElementById("habitacion").addEventListener("click", function(){
  console.log('click')
  load360('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/hotel_room_2k.hdr')
});


