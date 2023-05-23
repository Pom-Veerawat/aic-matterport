//import {CSS3DRenderer,CSS3DObject } from  'three-css3drenderer'
import Hls from "hls.js";
function VideoDummyRenderer() {
  this.inputs = {
    visible: true,
    vdosrc: "",
    size: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0 },
    color: 0xffff00,
    isLocalSrc:"false",
  };
  this.firstplay = false;
  /* inputs: Inputs = {
      size: { x: 1, y: 1, z: 1 },
      color: 0xffff00,
      visible: true,
      opacity: 0.1,
      lineOpacity: 1,
      lineColor: 0xffffff,
      transitionTime: 0.4,
    }; */

  /*     CLICK = 'INTERACTION.CLICK', */
  /** HOVER events */
  /*  HOVER = 'INTERACTION.HOVER', */
  /** DRAG events (mousedown then move) */
  /* DRAG = 'INTERACTION.DRAG',
    DRAG_BEGIN = 'INTERACTION.DRAG_BEGIN',
    DRAG_END = 'INTERACTION.DRAG_END',
    POINTER_MOVE = 'INTERACTION.POINTER_MOVE',
    POINTER_BUTTON = 'INTERACTION.POINTER_BUTTON',
    SCROLL = 'INTERACTION.SCROLL',
    KEY = 'INTERACTION.KEY',
    LONG_PRESS_START = 'INTERACTION.LONG_PRESS_START',
    LONG_PRESS_END = 'INTERACTION.LONG_PRESS_END',
    MULTI_SWIPE = 'INTERACTION.MULTI_SWIPE',
    MULTI_SWIPE_END = 'INTERACTION.MULTI_SWIPE_END',
    PINCH = 'INTERACTION.PINCH',
    PINCH_END = 'INTERACTION.PINCH_END',
    ROTATE = 'INTERACTION.ROTATE',
    ROTATE_END = 'INTERACTION.ROTATE_END', */

  this.events = {
    "INTERACTION.CLICK": true,
    "INTERACTION.HOVER": true,
    /*  'INTERACTION.CLICK',
      ['INTERACTION.CLICK']: true,
      ['INTERACTION.HOVER']: false,
      ['INTERACTION.DRAG']: false, */
  };

  this.onInit = function () {
    var THREE = this.context.three;

    /* if (this.inputs.src instanceof HTMLVideoElement) {
      this.video = this.inputs.src;
    } else {
      this.video = this.createVideoElement();

      if (typeof this.inputs.src === 'string') {
        this.video.src = this.inputs.src;
      } else {
        this.video.srcObject = this.inputs.src;
      }

      this.video.load();
    } */

    this.geometry = new THREE.BoxGeometry(
      this.inputs.size.x,
      this.inputs.size.y,
      this.inputs.size.z
    );

    this.geometry.rotateX(this.inputs.rotation.x);
    this.geometry.rotateY(this.inputs.rotation.y);
    this.geometry.rotateZ(this.inputs.rotation.z);

    /*  console.log("1");
    console.log(this);
    console.log("2");
    console.log(this.texture);
    console.log("3");
    console.log(this.video); */
    // Texture Loading
    //window.location.pathname + "icon/orange/tem2.svg"
    var textureLoader = new THREE.TextureLoader();
    /*   this.playIconTexture = textureLoader.load(
      "https://static.matterport.com/showcase-sdk/examples/assets-1.0-2-g6b74572/assets/textures/ff.png"
    ); */
    this.playIconTexture = textureLoader.load(
      window.location.pathname + "icon/orange/Frameplay.svg"
    );
    console.log(this.playIconTexture);
    this.material = new THREE.MeshBasicMaterial({
      map: this.playIconTexture,
      opacity: 0.5,
    });
    var mesh = new THREE.Mesh(this.geometry, this.material);
    mesh.material.color.setHex(this.inputs.color);
    mesh.material.color.setRGB(1, 1, 1);
    this.outputs.objectRoot = mesh;
    this.outputs.collider = mesh;

    //this.outputs.texture = this.texture;
    //this.video.play();
  };

  this.onEvent = function (type, data) {
    if (type === "INTERACTION.CLICK") {
      
    }
  };

  this.onInputsUpdated = function (previous) {};

  this.onTick = function (tickDelta) {};

  this.onDestroy = function () {
    this.material.dispose();
  };

  this.createVideoElement = () => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;

    return video;
  };
}

/* function Element( id, x, y, z, ry ) {

  const div = document.createElement( 'div' );
  div.style.width = '480px';
  div.style.height = '360px';
  div.style.backgroundColor = '#000';

  const iframe = document.createElement( 'iframe' );
  iframe.style.width = '480px';
  iframe.style.height = '360px';
  iframe.style.border = '0px';
  iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
  div.appendChild( iframe );

  const object = new CSS3DObject( div );
  object.position.set( x, y, z );
  object.rotation.y = ry;

  return object;

} */
/*  export default function BoxFactory() {
    return new Box();
 } */

export const videoRendererDummyType = "mp.videoRendererDummy";
export const makeVideoRendererDummy = function () {
  return new VideoDummyRenderer();
};
