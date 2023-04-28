//import {CSS3DRenderer,CSS3DObject } from  'three-css3drenderer'
import { CSS3DRenderer, CSS3DSprite, CSS3DObject } from "three-css3d";

function IframeRenderer() {
  this.inputs = {
    visible: true,
    size: { x: 1, y: 1, z: 1 },
    color: 0xffff00,
    scene: null,
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

    this.currentScene = this.context.scene;
    this.container = document.getElementById("showcase");

    this.renderer = new CSS3DRenderer();

    /* this.renderer.setSize( window.innerWidth, window.innerHeight ); */

    console.log(this.renderer.domElement);
    
    this.container.appendChild(this.renderer.domElement);
    this.objectDOM = document.createElement("div");
    this.spriteDOM = document.createElement("div");

    this.object = new CSS3DObject(this.objectDOM);
    this.sprite = new CSS3DSprite(this.spriteDOM);

   /*  this.currentScene.add(this.object, this.sprite);
    this.renderer.render(this.scene, this.camera); */
    console.log(this.container);
    /* const group = new THREE.Group();
        const item1 = this.Element( 'SJOz3qjfQXU',0, 0, 0, 0 );
				group.add( item1 );
				group.add( new Element( 'Y2-xZ-1HE-Q', 240, 0, 0, Math.PI / 2 ) );
				group.add( new Element( 'IrydklNpcFI', 0, 0, - 240, Math.PI ) );
				group.add( new Element( '9ubytEsCaS0', - 240, 0, 0, - Math.PI / 2 ) );
        currentScene.add( group ); */
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
    return;
    this.geometry = new THREE.BoxGeometry(
      this.inputs.size.x,
      this.inputs.size.y,
      this.inputs.size.z
    );

    this.geometry.rotateY(0.01);

    /*  console.log("1");
    console.log(this);
    console.log("2");
    console.log(this.texture);
    console.log("3");
    console.log(this.video); */
    // Texture Loading
    //window.location + "icon/orange/tem2.svg"
    var textureLoader = new THREE.TextureLoader();
    /*   this.playIconTexture = textureLoader.load(
      "https://static.matterport.com/showcase-sdk/examples/assets-1.0-2-g6b74572/assets/textures/ff.png"
    ); */
    this.playIconTexture = textureLoader.load(
      window.location + "icon/orange/tem2.svg"
    );
    console.log(this.playIconTexture);
    this.material = new THREE.MeshBasicMaterial({
      map: this.playIconTexture,
      opacity: 1,
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
      this.notify("INTERACTION.CLICK", {
        type: type,
        node: this.context.root,
        component: this,
      });
      console.log(type, data);
      if (this.firstplay === true) {
        return;
      }
      var THREE = this.context.three;
      this.video = this.createVideoElement();
      this.video.src = window.location + "vdo/AIC-intro.mp4";
      this.video.load();

      this.texture = new THREE.VideoTexture(this.video);
      this.texture.minFilter = THREE.LinearFilter;
      this.texture.magFilter = THREE.LinearFilter;
      this.texture.format = THREE.RGBAFormat;
      this.material = new THREE.MeshBasicMaterial({
        map: this.texture,
        opacity: 1,
      });
      var mesh = new THREE.Mesh(this.geometry, this.material);
      mesh.material.color.setHex(this.inputs.color);
      mesh.material.color.setRGB(1, 1, 1);
      this.outputs.objectRoot = mesh;
      this.outputs.collider = mesh;

      this.video.play();
      this.firstplay = true;
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

  this.Element = (id, x, y, z, ry) => {
    const div = document.createElement("div");
    div.style.width = "480px";
    div.style.height = "360px";
    div.style.backgroundColor = "#000";

    const iframe = document.createElement("iframe");
    iframe.style.width = "480px";
    iframe.style.height = "360px";
    iframe.style.border = "0px";
    iframe.src = ["https://www.youtube.com/embed/", id, "?rel=0"].join("");
    div.appendChild(iframe);

    const object = new CSS3DObject(div);
    object.position.set(x, y, z);
    object.rotation.y = ry;

    return object;
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

export const iframeRendererType = "mp.iframeRenderer";
export const makeIframeRenderer = function () {
  return new IframeRenderer();
};
