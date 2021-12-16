import './style.css'
import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'lil-gui'
import gsap from 'gsap'
import { MOUSE } from 'three'

// Debug
const gui = new dat.GUI()

/** 
 * LOADERS
 */

 const textureLoader = new THREE.TextureLoader()


 // TEXTURES
//  const map1 = new textureLoader.load(`/img/Examples/0.jpg`)
//  const map2 = new textureLoader.load(`/img/Examples/1.jpg`)
//  const map3 = new textureLoader.load(`/img/Examples/2.jpg`)
//  const map4 = new textureLoader.load(`/img/Examples/3.jpg`)
 

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
// CANVAS
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object#1

const geo = new THREE.PlaneBufferGeometry( 1, 1.3)


for(let i = 0; i< 4; i++ ) {
  const mat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(`/img/Examples/${i}.jpg`)
  })
  const img = new THREE.Mesh(geo,mat)
  img.position.set(Math.random()+.3, i*-1.6) 
  scene.add(img)
}

let objs = []

scene.traverse((object) => {
  if (object.isMesh)
      objs.push(object)
})

// Camera

const sizes = {  
  width: window.innerWidth,
  height: window.innerHeight 
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
camera.position.x = 0;
camera.rotation.y = 0;
scene.add(camera);

// const controls = new OrbitControls(camera,canvas)

gui.add(camera.position,'y').min(-5).max(5).step(0.1)

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

// MOUSE


let y = 0
let position = 0

const onMouseWheel = (event) =>{
  y = event.deltaY * 0.0007
}

window.addEventListener("wheel", onMouseWheel)

const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = -(event.clientY / sizes.height) * 2 + 1
})





/**
 * Animate
 */

// RayCaster
const rayCaster = new THREE.Raycaster()

 const clock = new THREE.Clock()

 const tick = () => 
 {
   const elapsedTime = clock.getElapsedTime()
   const deltaTime =
 
  // OnScrollAnimation
    position += y
    camera.position.y = position
    y *= .94

    camera.position.y = -position
    
    // RayCaster

    rayCaster.setFromCamera(mouse, camera)
    const intersects = rayCaster.intersectObjects(objs)
    
    for(const intersect of intersects) {
      gsap.to(intersect.object.scale, {x: 1.5,y:1.5});
      gsap.to(intersect.object.rotation, {y:-0.5});
      gsap.to(intersect.object.position, {z:-0.9});
    }

    for (const object of objs) {
      if(!intersects.find(intersect => intersect.object === object)){
        gsap.to(object.scale, {x:1,y:1});
        gsap.to(object.rotation, {y:0});
        gsap.to(object.position, {z:0});
      }
    }


  //  controls.update()
   // Render
   renderer.render(scene,camera)
 
   // Tick loop
   window.requestAnimationFrame(tick)
 }
 
 
 
 tick()