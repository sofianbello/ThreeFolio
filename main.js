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
const camera = new THREE.PerspectiveCamera(75, sizeX/sizeY, 0.001, 1000)
camera.position.setZ(3)
camera.position.setX(30)
scene.add(camera)

/**
 * HELPERS
 */
const gridHelper = new THREE.GridHelper(200,50);
// scene.add(gridHelper)

/**
 * GEOMETRY
 */

// TEXTURES
const textureLoader = new THREE.TextureLoader()

const belloTex = textureLoader.load('/img/Bello.jpg')

const ballTex = textureLoader.load('/img/textures/aerial_rocks_04_diff_1k.jpg')
const ballNormal = textureLoader.load('/img/textures/aerial_rocks_04_disp_1k.jpg')
const ballRough = textureLoader.load('/img/textures/aerial_rocks_04_rough_1k.jpg')

const matcapTexture1 = textureLoader.load('/img/matcaps/03.png')
const matcapTexture2 = textureLoader.load('/img/matcaps/03.png')
const matcapTexture3 = textureLoader.load('/img/matcaps/03.png')



// TORUS
const geo = new THREE.ConeBufferGeometry(10,10,4)
const mat = new THREE.MeshStandardMaterial({ map: matcapTexture2 })
const torus = new THREE.Mesh(geo,mat)
torus.position.z = 10; 
torus.position.z = 10; 
scene.add(torus)

// BelloCube



const bello = new THREE.Mesh(
  new THREE.BoxBufferGeometry(7,10,1),
  new THREE.MeshBasicMaterial( { map: belloTex } )
)
bello.rotation.y = 20
bello.position.x = -10
bello.position.z = -5
scene.add(bello)

// Basketball


const ball = new THREE.Mesh(
  new THREE.SphereBufferGeometry(3,24,24),
  new THREE.MeshStandardMaterial( { map: matcapTexture2} )
)
ball.position.setX(-30)
ball.position.setZ(-30)
scene.add(ball)
/**
 * LIGHTS
 */

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(ambientLight)
scene.add(pointLight)

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
  const material = new THREE.MeshStandardMaterial({ map: matcapTexture1})
  const star = new THREE.Mesh(geometry,material)

  const [x,y,z] =Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) )

  star.position.set(x,y,z)
  scene.add(star)
}
Array(200).fill().forEach(addStar)

const imgTexture = new THREE.TextureLoader().load('/img/bg2.png')
scene.background = imgTexture

/**
 * CONTROLS
 */

const controls = new OrbitControls(camera,renderer.domElement)

// MOVE CAMERA
const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top
  ball.rotation.x += 0.0005 
  ball.rotation.y += 0.00075 
  ball.rotation.z += 0.005 

  
  bello.rotation.y += -(0.05 * 0.1) 
  
  // bello.rotation.z += 0.05 
  camera.position.x =  t * -0.01 
  camera.position.y =  t * -0.0002 
  camera.position.z =  t * -0.0002 

}
document.body.onscroll = moveCamera

/**
 * ANIMATE
 */

 function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.00005 * 0.5;
  torus.rotation.y += 0.0005;
  torus.rotation.z += 0.0005* 0.5;

  controls.update()

  renderer.render(scene,camera)
}
animate()
