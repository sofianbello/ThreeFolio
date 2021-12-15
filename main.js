import './style.css'

import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
/**
 * SCENE
 */
const scene = new THREE.Scene();
const sizeX = window.innerWidth
const sizeY = window.innerHeight

/**
 * CANVAS
 */


// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizeX/sizeY, 0.1, 1000)
camera.position.setZ(30)
scene.add(camera)

/**
 * HELPERS
 */
const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper)

/**
 * GEOMETRY
 */

const geo = new THREE.TorusGeometry(10,3,16,100)
const mat = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
})
const torus = new THREE.Mesh(geo,mat)
scene.add(torus)

/**
 * LIGHTS
 */

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)

// scene.add(ambientLight)
// scene.add(pointLight)

/** 
 * RENDERER
 * */


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizeX,sizeY)

/** 
 * STARS
 */
const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.25,24,24)
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00})
  const star = new THREE.Mesh(geometry,material)

  const [x,y,z] =Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) )

  star.position.set(x,y,z)
  scene.add(star)
}
Array(200).fill().forEach(addStar)

/**
 * CONTROLS
 */

const controls = new OrbitControls(camera,renderer.domElement)
/**
 * ANIMATE
 */

 function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  controls.update()

  renderer.render(scene,camera)
}
animate()
