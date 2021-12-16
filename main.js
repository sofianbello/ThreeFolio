import './style.css'

import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

/**
 * BASE
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')
// SIZES

 const sizes = { 
  width: window.innerWidth,
  height: window.innerHeight 
 }

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

// SCENE
 const scene = new THREE.Scene();


/**
 * OBJECTS
*/

const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper)

// Object#1

const geo1 = new THREE.BoxGeometry( 1,1,1, 5,5,5)
const mat1 = new THREE.MeshBasicMaterial({color: 0xff0000})
const obj1 = new THREE.Mesh(geo1,mat1)
scene.add(obj1)

/**
 * CAMERA
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.001, 1000)
scene.add(camera)

// CONTROLS
const controls = new OrbitControls(camera,canvas)

 /** 
 * RENDERER
 * */

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width,sizes.height)

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