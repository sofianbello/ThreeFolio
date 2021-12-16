import './style.css'
import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

/** 
 * LOADERS
 */

 const textureLoader = new THREE.TextureLoader()

 // TEXTURES
 
 const object2Texure = textureLoader.load('https://raw.githubusercontent.com/sofianbello/ThreeFolio/main/img/sdlfsdfgklj.jpg')
 const matcapTexture1 = textureLoader.load('https://raw.githubusercontent.com/nidorx/matcaps/master/1024/736655_D9D8D5_2F281F_B1AEAB.png')
 const matcapTexture2 = textureLoader.load('https://raw.githubusercontent.com/nidorx/matcaps/master/1024/3A2412_A78B5F_705434_836C47.png')
 const imgTexture = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1638932030844-b584074bd619?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2022&q=80')
 
 

// EVENTS
window.addEventListener('resize', () =>
{
  // Update Sizses
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  // Update Renderer
  renderer.setSize(sizes.width,sizes.height)
})

// Scene
const scene = new THREE.Scene();
const canvas = document.querySelector('canvas.webgl');


// Object#1

const geo1 = new THREE.BoxBufferGeometry( 1,1,1, 5,5,5)
const mat1 = new THREE.MeshMatcapMaterial({matcap: matcapTexture2, wireframe: false})
const obj1 = new THREE.Mesh(geo1,mat1)
scene.add(obj1)

// Camera

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight 
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1.5;
camera.rotation.y = 0.5;
scene.add(camera);

const controls = new OrbitControls(camera,canvas)

/**
 * LIGHTS
 */

 const pointLight = new THREE.PointLight(0xffffff)
 pointLight.position.set(3,3,3)
 
 const ambientLight = new THREE.AmbientLight(0xffffff)
 
 scene.add(ambientLight)
 scene.add(pointLight)

// Renderer

console.log(canvas)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)

/**
 * Animate
 */
 const clock = new THREE.Clock()

 const tick = () => 
 {
   const elapsedTime = clock.getElapsedTime()
 
 
   controls.update()
   // Render
   renderer.render(scene,camera)
 
   // Tick loop
   window.requestAnimationFrame(tick)
 }
 
 
 
 tick()