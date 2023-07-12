import { useEffect, useRef, useState, useContext } from "react";
import "./App.css";
import {
  videoRendererType,
  makeVideoRenderer,
} from "./scene-components/VideoRenderer";
import {
  iframeRendererType,
  makeIframeRenderer,
} from "./scene-components/IframeRenderer";
import {
  videoRendererDummyType,
  makeVideoRendererDummy,
} from "./scene-components/VideoDummyRenderer";
import Iframe from "./UI/Iframe";
import Iframe3slot from "./UI/Iframe3slot";
import { isElement } from "react-dom/test-utils";

import logoThermometer from "./icon/thermometer.png";
import EditDataCard from "./UI/EditDataCard";
import EditorMP from "./components/EditorMP";

function App() {
  const [sdk, setSdk] = useState();
  const [editMode, GetEditMode] = useState("default");
  const container = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  const [allMatterTag, setAllMatterTag] = useState([]);

  const [allVDONode, setAllVDONode] = useState([]);

  const [positionPointer, setPositionPointer] = useState(
    "x=0" + ", y=0" + ",z=0"
  );

  const [showBtn, setShowBtn] = useState(false);
  const [locationBtn, setLocationBtn] = useState("");

  const [iframe, setIframe] = useState();

  const [iframe3slot, setIframe3slot] = useState();

  const [mouseLocation, setMouseLocation] = useState({
    position: {},
    normal: {},
  });

  const showCaseLoaded = async () => {
    const showcase = document.getElementById("showcase");
    const key = "x1pa124pp38sxs85k46kmbuha";
    console.log(showcase);
    console.log(showcase.contentWindow);
    console.log(showcase.contentWindow.MP_SDK);
    setTimeout(function () {
      try {
        const rtvSDK = showcase.contentWindow.MP_SDK.connect(
          showcase,
          key,
          "3.6"
        ).then((e) => setSdk(e));
      } catch (e) {
        //console.error(e);
        console.log(e);
        return;
      }
      //exportar(nextpage,miliseconds,totalpages);
    }, 2000);
    /* try {
      const rtvSDK = await showcase.contentWindow.MP_SDK.connect(
        showcase,
        key,
        "3.6"
      );
      setSdk(rtvSDK);
    } catch (e) {
      //console.error(e);
      console.log(e);
      return;
    } */
    sdk?.App.state.waitUntil((state) => {
      console.log(state);
      if (state.phase == "appphase.playing") {
        return true;
      } else {
        return false;
      }
    });
  };
  useEffect(() => {
    const url = window.location.search.toString().replace("?", "");
    let splitParam = url.split("&");
    splitParam.forEach((element) => {
      const a = element.split("=")[0];
      const b = element.split("=")[1];
      if (a == "edit") {
        GetEditMode(b);
      }
      /* if (a == "iottype") {
        GetIotType(b);
      }
      if (a == "number") {
        GetNumber(b);
      }
      if (a == "link") {
        GetLink(b);
      }
      if (a == "graphlink") {
        GetGraph(b);
      }
      if (a == "linkon") {
        GetLinkOn(b);
      }
      if (a == "linkoff") {
        GetLinkOff(b);
      } */
    });
  }, []);
  const [selectNode, setSelectNode] = useState("ทั้งหมด");
  const options = [
    "ทั้งหมด",
    "Electrical",
    "Lighting",
    "Sensors",
    "Facilities_Management",
    "CCTV",
  ];
  const onOptionChangeHandler = (event) => {
    console.log("User Selected Value - ", event.target.value);
    console.log("User Selected Value - ", event.target.alt);
    setSelectNode(event.target.value);
  };

  useEffect(() => {
    loaded().then(
      sdk?.App.state.waitUntil((state) =>
        state.phase == "appphase.playing"
          ? setIsLoaded(true)
          : console.log(state.phase)
      )
    );
  }, [sdk]);
  async function loaded() {
    await sdk?.App.state.waitUntil(
      (state) => state.phase === sdk.App.Phase.PLAYING
    );
  }

  useEffect(() => {
    //After finished load

    if (isLoaded === true) {
      initialFunction();
      startSDKHere();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded === true) {
      if (editMode != "y") {
        removeAllTaginEditMode();
      }
    }
  }, [selectNode, isLoaded]);

  function pointToString(point) {
    var x = point.x.toFixed(3);
    var y = point.y.toFixed(3);
    var z = point.z.toFixed(3);

    return `{ x: ${x}, y: ${y}, z: ${z} }`;
  }

  const registerCustomComponent = async () => {
    sdk.Scene.register(videoRendererType, makeVideoRenderer);
    sdk.Scene.register(videoRendererDummyType, makeVideoRendererDummy);
    sdk.Scene.register(iframeRendererType, makeIframeRenderer);
    /*  sdk.Scene.register(boxFactoryType, makeBoxFactory);
    sdk.Scene.register(iotBoxType, makeIotBox); */
  };

  const registerCustomIcon = async () => {
    /*  sdk.Scene.register(boxFactoryType, makeBoxFactory);
    sdk.Scene.register(iotBoxType, makeIotBox); */
    console.log(window.location.pathname + "icon/thermometer.png");
    sdk.Asset.registerTexture(
      "customIcon-thermometer",
      window.location.pathname + "icon/thermometer.png"
    );
    sdk.Asset.registerTexture(
      "customIcon-thermometer-2",
      window.location.pathname + "icon/temperature-icon-png-26.png"
    );
    sdk.Asset.registerTexture(
      "customSVG-thermometer-2",
      window.location.pathname + "icon/orange/tem2.svg"
    );

    sdk.Asset.registerTexture(
      "Electrical",
      window.location.pathname + "icon/orange/elc2.svg"
    );
    sdk.Asset.registerTexture(
      "Lighting",
      window.location.pathname + "icon/orange/light2.svg"
    );
    sdk.Asset.registerTexture(
      "Sensors",
      window.location.pathname + "icon/orange/tem2.svg"
    );
    sdk.Asset.registerTexture(
      "Facilities_Management",
      window.location.pathname + "icon/orange/fm2.svg"
    );
    sdk.Asset.registerTexture(
      "CCTV",
      window.location.pathname + "icon/orange/cctv2.svg"
    );

    sdk.Asset.registerTexture(
      "vdo-play-2",
      window.location.pathname + "icon/play.svg"
    );
  };

  const initialFunction = async () => {
    const [sceneObject] = await sdk.Scene.createObjects(1);
    const lightsNode = sceneObject.addNode();
    const directionalLightComponet = lightsNode.addComponent(
      "mp.directionalLight",
      {
        color: { r: 0.7, g: 0.7, b: 0.7 },
      }
    );
    lightsNode.addComponent("mp.ambientLight", {
      intensity: 0.5,
      color: { r: 1.0, g: 1.0, b: 1.0 },
    });
    const ambientIntensityPath = sceneObject.addInputPath(
      directionalLightComponet,
      "intensity",
      "ambientIntensity"
    );
    lightsNode.start();

    registerCustomIcon();

    registerCustomComponent();

    //addComponentNode1();

    //addMattertagNode1();
    //addMattertagNode2();
    //addVideoObjectFromJson();
    //addIframeObjectFromJson();

    //addMatterTagFromJson();

    //html sandbox injection
    //addMattertagNode3();

    addMatterTagFromJsonWithEditMode();
    addVideoObjectFromJsonAIC();

    var iframe = document.getElementById("showcase");
    //add pointer
    var poseCache;
    sdk.Camera.pose.subscribe(function (pose) {
      poseCache = pose;
    });
    var delayBeforeShow = 1000;
    var buttonDisplayed = false;
    var intersectionCache;
    var button = document.getElementById("buttonGetPos");

    sdk.Pointer.intersection.subscribe(function (intersection) {
      console.log(intersection);
      intersectionCache = intersection;
      intersectionCache.time = new Date().getTime();
      button.style.display = "none";
      buttonDisplayed = false;
      setShowBtn(false);
      setMouseLocation({
        position: intersection.position,
        normal: intersection.normal,
      });
      setPositionPointer(
        "position = " +
          pointToString(intersection.position) +
          " normal = " +
          pointToString(intersection.normal) +
          " floorId = " +
          intersection.floorId
      );
    });

    if (editMode === "y") {
      setInterval(() => {
        if (!intersectionCache || !poseCache) {
          return;
        }

        const nextShow = intersectionCache.time + delayBeforeShow;
        if (new Date().getTime() > nextShow) {
          if (buttonDisplayed) {
            return;
          }

          var size = {
            w: iframe.clientWidth,
            h: iframe.clientHeight,
          };
          var coord = sdk.Conversion.worldToScreen(
            intersectionCache.position,
            poseCache,
            size
          );
          button.style.left = `${coord.x - 25}px`;
          button.style.top = `${coord.y - 50}px`;
          button.style.display = "block";
          buttonDisplayed = true;
          setLocationBtn(
            "left = " + button.style.left + " top = " + button.style.top
          );
          if (coord.x - 25 < 0 && coord.y - 50 < 0) {
            button.style.left = "700px";
            button.style.top = "550px";
          }

          setShowBtn(true);
        }
      }, 16);
    }
  };

  //Start code inthis function
  const startSDKHere = () => {
    //sdk.Camera.rotate(100, 0);
    //console.log(sdk.Scene);
    //addDemoObject();
  };
  const iframeHandler = () => {
    setIframe(null);
  };
  const iframe3slotHandler = () => {
    setIframe3slot(null);
  };

  const addVideoObjectFromJson = () => {
    fetch(
      "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/IOTEquipment/Video.json"
    )
      .then((response) => {
        const json = response.json();

        return json;
      })
      .then((data) => {
        const allTagCount = data.count;
        const allItems = data.items;

        allItems.forEach((element) => {
          if (element.disable == "true") {
            return;
          }

          sdk.Scene.createObjects(1).then((sceneObject) => {
            var node3 = sceneObject[0].addNode("obj3d-" + element.id);
            var initial = {
              //url: "https://static.matterport.com/showcase-sdk/examples/assets-1.0-2-g6b74572/assets/models/sofa/9/scene.gltf",
              visible: true,
              size: element.size,
              rotation: element.rotation,
              vdosrc: element.VDOsrc,
              isLocalSrc: element.isLocalSrc,
              /*  position: { x: -1, y: -7.5, z: 2.25 }, */
            };

            const gltfrtv = node3.addComponent(
              videoRendererType,
              initial,
              "my-component-" + element.id
            );

            class ClickSpy {
              node = node3;
              component = gltfrtv;
              eventType = "INTERACTION.CLICK";
              onEvent(payload) {
                //this.component.video.play();//ย้ายไปเรียกในตัว three เพราะจะได้มี toggle
                return;
                console.log("received node3", payload, this);
                console.log(this.component.material.color);
                if (
                  this.component.material.color.r === 1 &&
                  this.component.material.color.g === 1 &&
                  this.component.material.color.b === 1
                ) {
                  this.component.material.color.setRGB(1, 1, 0);
                } else {
                  this.component.material.color.setRGB(1, 1, 1);
                }
                setIframe({
                  title: "Watch Realtime IOT No. #44s572",
                  message:
                    /* "https://static.matterport.com/showcase-sdk/examples/vs-app-1.1.6-12-g0a66341/vs-app/index.html?applicationKey=08s53auxt9txz1w6hx2iww1qb&m=89SActNChJm&sr=-3.09,-1.18&ss=38", */
                    "https://appz.myftp.org/d-solo/H3UlaCYVk/c?orgId=1&from=1681297720564&to=1681310146292&panelId=2",
                });
                //alert("clicked!");
                //setColorBoxFactoryMat(1,1,1)
                /* this.node.stop();
                addComponentNode2(); */
              }
            }
            node3.position.set(
              element.position.x,
              element.position.y,
              element.position.z
            );

            console.log(node3);
            // Spy on the click event
            //inputComponent.spyOnEvent(new ClickSpy());
            //console.log(node3);
            //gltfrtv?.outputs.objectRoot.position.set(0,-7,0);
            gltfrtv?.spyOnEvent(new ClickSpy());

            //setComponentBoxFactory(gltfrtv);
            node3.start();
            //setNodeBoxFactory(node3);
            //console.log(gltfrtv);
          });
        });
      });

    // You can enable navigation after starting the node.
    //inputComponent.inputs.userNavigationEnabled = true;
    //console.log(node);
    // You can turn off all events and the spy wont receive any callbacks.
    //inputComponent.inputs.eventsEnabled = false;
  };

  const addIframeObjectFromJson = () => {
    sdk.Scene.createObjects(1).then((sceneObject) => {
      var node3 = sceneObject[0].addNode("node-obj-3");
      var initial = {
        //url: "https://static.matterport.com/showcase-sdk/examples/assets-1.0-2-g6b74572/assets/models/sofa/9/scene.gltf",
        visible: true,
        size: { x: 1, y: 0.6, z: 0.01 },
        localScale: {
          x: 1,
          y: 1,
          z: 1,
        },
        localPosition: {
          x: -5.12,
          y: 0.002,
          z: 2.4,
        },
        localRotation: {
          x: 0,
          y: 0,
          z: 0,
        },

        /*  position: { x: -1, y: -7.5, z: 2.25 }, */
      };

      const gltfrtv = node3.addComponent(
        iframeRendererType,
        initial,
        "my-component-3"
      );

      class ClickSpy {
        node = node3;
        component = gltfrtv;
        eventType = "INTERACTION.CLICK";
        onEvent(payload) {
          //this.component.video.play();//ย้ายไปเรียกในตัว three เพราะจะได้มี toggle
          return;
          console.log("received node3", payload, this);
          console.log(this.component.material.color);
          if (
            this.component.material.color.r === 1 &&
            this.component.material.color.g === 1 &&
            this.component.material.color.b === 1
          ) {
            this.component.material.color.setRGB(1, 1, 0);
          } else {
            this.component.material.color.setRGB(1, 1, 1);
          }
          setIframe({
            title: "Watch Realtime IOT No. #44s572",
            message:
              /* "https://static.matterport.com/showcase-sdk/examples/vs-app-1.1.6-12-g0a66341/vs-app/index.html?applicationKey=08s53auxt9txz1w6hx2iww1qb&m=89SActNChJm&sr=-3.09,-1.18&ss=38", */
              "https://appz.myftp.org/d-solo/H3UlaCYVk/c?orgId=1&from=1681297720564&to=1681310146292&panelId=2",
          });
          //alert("clicked!");
          //setColorBoxFactoryMat(1,1,1)
          /* this.node.stop();
          addComponentNode2(); */
        }
      }
      node3.position.set(-7.829, 1.886, 3.266);

      console.log(node3);
      // Spy on the click event
      //inputComponent.spyOnEvent(new ClickSpy());
      //console.log(node3);
      //gltfrtv?.outputs.objectRoot.position.set(0,-7,0);
      gltfrtv?.spyOnEvent(new ClickSpy());

      //setComponentBoxFactory(gltfrtv);
      node3.start();
      //setNodeBoxFactory(node3);
      //console.log(gltfrtv);
    });

    // You can enable navigation after starting the node.
    //inputComponent.inputs.userNavigationEnabled = true;
    //console.log(node);
    // You can turn off all events and the spy wont receive any callbacks.
    //inputComponent.inputs.eventsEnabled = false;
  };

  const removeAllTaginEditMode = () => {
    console.log(allMatterTag);
    sdk.Tag.remove(...allMatterTag);
    setAllMatterTag([]);
    addMatterTagFromJsonWithEditMode();
  };

  const removeAllVDOinEditMode = () => {
    allVDONode.forEach((element) => {
      element.stop();
    });
    setAllVDONode([]);
    //console.log(allVDONode);
    //removeAllTaginEditMode();
    //console.log(removeAllVDOinEditMode);
    /*  sdk.Tag.remove(...allMatterTag);
    setAllMatterTag([]);
    addMatterTagFromJsonWithEditMode(); */
    addVideoObjectFromJsonAIC();
  };

  const addVideoObjectFromJsonAIC = () => {
    fetch(
      "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/AICProject/Video.json"
    )
      .then((response) => {
        const json = response.json();

        return json;
      })
      .then((data) => {
        //scaleSize
        const allTagCount = data.count;
        const arrGetData = [];
        for (const key in data.items) {
          /*   console.log(`${key}: ${data.items[key]}`);
            console.log(data.items[key]); */
          arrGetData.push(data.items[key]);
        }
        const allItems = arrGetData;

        allItems.forEach((element) => {
          if (element.enable == "no") {
            return;
          }
          if (editMode == "y") {
            sdk.Scene.createObjects(1).then((sceneObject) => {
              var node3 = sceneObject[0].addNode("obj3d-" + element.id);
              var initial = {
                //url: "https://static.matterport.com/showcase-sdk/examples/assets-1.0-2-g6b74572/assets/models/sofa/9/scene.gltf",
                visible: true,
                size: { x: element.width, y: element.height, z: 0.05 },
                rotation: element.normal,
                vdosrc: element.VDOurl,
                isLocalSrc: "false",
                /*  position: { x: -1, y: -7.5, z: 2.25 }, */
              };

              const gltfrtv = node3.addComponent(
                videoRendererDummyType,
                initial,
                "my-component-" + element.id
              );

              class ClickSpy {
                node = node3;
                component = gltfrtv;
                eventType = "INTERACTION.CLICK";
                onEvent(payload) {
                  alert("edit mode เล่นไม่ได้");
                  //this.component.video.play();//ย้ายไปเรียกในตัว three เพราะจะได้มี toggle
                  return;
                  console.log("received node3", payload, this);
                  console.log(this.component.material.color);
                  if (
                    this.component.material.color.r === 1 &&
                    this.component.material.color.g === 1 &&
                    this.component.material.color.b === 1
                  ) {
                    this.component.material.color.setRGB(1, 1, 0);
                  } else {
                    this.component.material.color.setRGB(1, 1, 1);
                  }
                  setIframe({
                    title: "Watch Realtime IOT No. #44s572",
                    message:
                      /* "https://static.matterport.com/showcase-sdk/examples/vs-app-1.1.6-12-g0a66341/vs-app/index.html?applicationKey=08s53auxt9txz1w6hx2iww1qb&m=89SActNChJm&sr=-3.09,-1.18&ss=38", */
                      "https://appz.myftp.org/d-solo/H3UlaCYVk/c?orgId=1&from=1681297720564&to=1681310146292&panelId=2",
                  });
                  //alert("clicked!");
                  //setColorBoxFactoryMat(1,1,1)
                  /* this.node.stop();
                addComponentNode2(); */
                }
              }
              node3.position.set(
                element.position.x,
                element.position.y,
                element.position.z
              );

              console.log(node3);
              // Spy on the click event
              //inputComponent.spyOnEvent(new ClickSpy());
              //console.log(node3);
              //gltfrtv?.outputs.objectRoot.position.set(0,-7,0);
              gltfrtv?.spyOnEvent(new ClickSpy());

              //setComponentBoxFactory(gltfrtv);
              node3.start();
              setAllVDONode((prev) => {
                /*  console.log(mattertagId[0]);
                console.log(prev); */
                return [...prev, node3];
              });
              //setNodeBoxFactory(node3);
              //console.log(gltfrtv);
            });
            //return;
          } else {
            sdk.Scene.createObjects(1).then((sceneObject) => {
              var node3 = sceneObject[0].addNode("obj3d-" + element.id);
              var initial = {
                //url: "https://static.matterport.com/showcase-sdk/examples/assets-1.0-2-g6b74572/assets/models/sofa/9/scene.gltf",
                visible: true,
                size: { x: element.width, y: element.height, z: 0.05 },
                rotation: element.normal,
                vdosrc: element.VDOurl,
                isLocalSrc: "false",
                /*  position: { x: -1, y: -7.5, z: 2.25 }, */
              };

              const gltfrtv = node3.addComponent(
                videoRendererType,
                initial,
                "my-component-" + element.id
              );

              class ClickSpy {
                node = node3;
                component = gltfrtv;
                eventType = "INTERACTION.CLICK";
                onEvent(payload) {
                  //this.component.video.play();//ย้ายไปเรียกในตัว three เพราะจะได้มี toggle
                  return;
                  console.log("received node3", payload, this);
                  console.log(this.component.material.color);
                  if (
                    this.component.material.color.r === 1 &&
                    this.component.material.color.g === 1 &&
                    this.component.material.color.b === 1
                  ) {
                    this.component.material.color.setRGB(1, 1, 0);
                  } else {
                    this.component.material.color.setRGB(1, 1, 1);
                  }
                  setIframe({
                    title: "Watch Realtime IOT No. #44s572",
                    message:
                      /* "https://static.matterport.com/showcase-sdk/examples/vs-app-1.1.6-12-g0a66341/vs-app/index.html?applicationKey=08s53auxt9txz1w6hx2iww1qb&m=89SActNChJm&sr=-3.09,-1.18&ss=38", */
                      "https://appz.myftp.org/d-solo/H3UlaCYVk/c?orgId=1&from=1681297720564&to=1681310146292&panelId=2",
                  });
                  //alert("clicked!");
                  //setColorBoxFactoryMat(1,1,1)
                  /* this.node.stop();
                addComponentNode2(); */
                }
              }
              node3.position.set(
                element.position.x,
                element.position.y,
                element.position.z
              );

              console.log(node3);
              // Spy on the click event
              //inputComponent.spyOnEvent(new ClickSpy());
              //console.log(node3);
              //gltfrtv?.outputs.objectRoot.position.set(0,-7,0);
              gltfrtv?.spyOnEvent(new ClickSpy());

              //setComponentBoxFactory(gltfrtv);
              node3.start();
              //setNodeBoxFactory(node3);
              //console.log(gltfrtv);
            });
          }
        });
      });

    // You can enable navigation after starting the node.
    //inputComponent.inputs.userNavigationEnabled = true;
    //console.log(node);
    // You can turn off all events and the spy wont receive any callbacks.
    //inputComponent.inputs.eventsEnabled = false;
  };

  const addMatterTagFromJsonWithEditMode = () => {
    if (editMode == "y" && false) {
      fetch(
        "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/AICProject/Video.json"
      )
        .then((response) => {
          const json = response.json();

          return json;
        })
        .then((data) => {
          /* this.outputs.objectRoot.material.color.setHex(data.hexColor);
          this.inputs.myUpdatedHexColor = data.hexColor;
          this.outputs.objectRoot.scale.set(
            data.scaleSize,
            data.scaleSize,
            data.scaleSize
          ); */
          //scaleSize
          const allTagCount = data.count;
          const arrGetData = [];
          for (const key in data.items) {
            /*   console.log(`${key}: ${data.items[key]}`);
              console.log(data.items[key]); */
            arrGetData.push(data.items[key]);
          }
          const allItems = arrGetData;
          //console.log(allItems);

          //(label, description, position, vector,color,iconId)
          allItems.forEach((element) => {
            addTextMatterTagRefEdit(
              element.comment + " VDO display",
              element.VDOurl + " enable = " + element.enable,
              element.position,
              element.normal,
              { r: 100, g: 100, b: 100 },
              "vdo-play-2"
            );

            //console.log(element);
          });

          //console.log(allTagCount);
          //console.log(allItems);
          //console.log('sdk.Tag.data');
          //console.log(sdk.Tag.data.);
        });
    }

    fetch(
      "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/AICProject/MatterTag.json"
    )
      .then((response) => {
        const json = response.json();

        return json;
      })
      .then((data) => {
        /* this.outputs.objectRoot.material.color.setHex(data.hexColor);
        this.inputs.myUpdatedHexColor = data.hexColor;
        this.outputs.objectRoot.scale.set(
          data.scaleSize,
          data.scaleSize,
          data.scaleSize
        ); */
        //scaleSize
        const allTagCount = data.count;
        const arrGetData = [];
        for (const key in data.items) {
          /*   console.log(`${key}: ${data.items[key]}`);
            console.log(data.items[key]); */
          arrGetData.push(data.items[key]);
        }
        const allItems = arrGetData;
        //console.log(allItems);

        //(label, description, position, vector,color,iconId)
        allItems.forEach((element) => {
          if (editMode == "y") {
            addTextMatterTagRefEdit(
              element.header + " " + element.type,
              element.val + " enable = " + element.enable,
              element.position,
              element.normal,
              element.color,
              element.icon
            );
          } else {
            if (element.enable == "yes")
              if (selectNode == "ทั้งหมด") {
                if (element.type === "rawdata") {
                  addTextMatterTagRefEdit(
                    element.header,
                    element.val,
                    element.position,
                    element.normal,
                    element.color,
                    element.icon
                  );
                }
                if (element.type === "iframe") {
                  addIframeMatterTag(
                    element.header,
                    "",
                    element.position,
                    element.normal,
                    element.val,
                    element.w,
                    element.h,
                    element.id,
                    element.color,
                    element.icon
                  );
                }
              } else {
                console.log(element.icon);
                console.log(selectNode);
                if (element.icon == selectNode) {
                  if (element.type === "rawdata") {
                    addTextMatterTagRefEdit(
                      element.header,
                      element.val,
                      element.position,
                      element.normal,
                      element.color,
                      element.icon
                    );
                  }
                  if (element.type === "iframe") {
                    addIframeMatterTag(
                      element.header,
                      "",
                      element.position,
                      element.normal,
                      element.val,
                      element.w,
                      element.h,
                      element.id,
                      element.color,
                      element.icon
                    );
                  }
                }
              }
          }
          //console.log(element);
        });

        //console.log(allTagCount);
        //console.log(allItems);
        //console.log('sdk.Tag.data');
        //console.log(sdk.Tag.data.);
      });
  };

  const addMatterTagFromJson = () => {
    fetch(
      "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/IOTEquipment/MatterTag.json"
    )
      .then((response) => {
        const json = response.json();

        return json;
      })
      .then((data) => {
        /* this.outputs.objectRoot.material.color.setHex(data.hexColor);
        this.inputs.myUpdatedHexColor = data.hexColor;
        this.outputs.objectRoot.scale.set(
          data.scaleSize,
          data.scaleSize,
          data.scaleSize
        ); */
        //scaleSize
        const allTagCount = data.count;
        const allItems = data.items;

        allItems.forEach((element) => {
          if (element.type === "data") {
            addTextMatterTag(
              element.header,
              element.val,
              element.position,
              element.normal
            );
          }
          if (element.type === "iframe") {
            addIframeMatterTag(
              element.header,
              "",
              element.position,
              element.normal,
              element.link,
              element.w,
              element.h,
              element.id,
              element.color,
              element.icon
            );
          }

          console.log(element);
        });

        console.log(allTagCount);
        console.log(allItems);
      });
  };

  const addTextMatterTagRefEdit = (
    label,
    description,
    position,
    vector,
    color,
    iconId
  ) => {
    var mattertagDesc = {
      color: color,
      iconId: iconId,
      label: label,
      description: description,
      anchorPosition: position,
      stemVector: vector,
    };

    sdk.Mattertag.add(mattertagDesc).then(function (mattertagId) {
      setAllMatterTag((prev) => {
        /*  console.log(mattertagId[0]);
        console.log(prev); */
        return [...prev, mattertagId[0]];
      });
      sdk.Mattertag.editStem(mattertagId[0], { stemHeight: 0.1 });
    });
  };

  const addTextMatterTag = (label, description, position, vector) => {
    var mattertagDesc = {
      label: label,
      description: description,
      anchorPosition: position,
      stemVector: vector,
    };

    sdk.Mattertag.add(mattertagDesc).then(function (mattertagId) {});
  };

  const addIframeMatterTag = (
    label,
    description,
    position,
    vector,
    link,
    w,
    h,
    tagid,
    color,
    icon
  ) => {
    h = 600;
    w = 500;
    const tagIds = sdk.Tag.add({
      label: label,
      anchorPosition: position,
      stemVector: vector,
      stemVisible: true,
      color: color,
      //icon:icon,
      iconId: icon,
    }).then(function (tagIds) {
      setAllMatterTag((prev) => {
        /*  console.log(mattertagId[0]);
        console.log(prev); */
        return [...prev, tagIds[0]];
      });

      var htmlToInject =
        ' \
        <style> \
        button {\
          width: 100px;\
          height: 20px;\
        }\
      </style> \
      <button id="btn1">Full Screen</button>\
<iframe src="' +
        link +
        '" height="' +
        h +
        '" width="' +
        w +
        '" title="Iframe Example"></iframe> \
        <script>\
    var btn1 = document.getElementById("btn1");\
    btn1.addEventListener("click", () => {\
      window.send("buttonClick' +
        tagid +
        '", ' +
        1001 +
        ");\
    });\
    \
  </script>\
    ";
      sdk.Tag.editStem(tagIds[0], { stemHeight: 0.1 });
      //sdk.Tag.editIcon(tagId[0], icon);
      /* // receive data from outside of the sandbox\
window.on("updateButton", (newLabel, color) => {\
  btn1.innerText = newLabel;\
  btn1.style.backgroundColor = color;\
});\ */
      const sandboxId = sdk.Tag.registerSandbox(htmlToInject, {
        size: {
          w: 530,
          h: 625,
        },
      }).then(function (sandboxId) {
        sdk.Tag.attach(tagIds[0], sandboxId[0]);
        sandboxId[1].on("buttonClick" + tagid, (buttonId) => {
          setIframe({
            title: label,
            message:
              /* "https://static.matterport.com/showcase-sdk/examples/vs-app-1.1.6-12-g0a66341/vs-app/index.html?applicationKey=08s53auxt9txz1w6hx2iww1qb&m=89SActNChJm&sr=-3.09,-1.18&ss=38", */
              link,
          });
          console.log("clicked button with id:", buttonId);
        });
      });
    });
  };

  const addMattertagNode1 = () => {
    var mattertagDesc = {
      label: "Hello custom Mattertag",
      description: "0 c",
      anchorPosition: { x: -1, y: -6.9, z: 3.05 },
      stemVector: { x: 0, y: -0.5, z: 0 },
    };
    //setMatterTag2("test");
    sdk.Mattertag.add(mattertagDesc).then(function (mattertagId) {
      //console.log(mattertagId);
      //setMatterTag1(mattertagId[0]);

      var htmlToInject =
        ' \
<style> \
button { \
width: 260px; \
height: 50px; \
} \
</style> \
<button id="btn1">Reset temperature to 25c</button> \
<script> \
var btn1 = document.getElementById("btn1"); \
btn1.addEventListener("click", function () { \
window.send("buttonClick", 12345); \
}); \
</script>';
      sdk.Mattertag.injectHTML(mattertagId[0], htmlToInject, {
        size: {
          w: 300,
          h: 200,
        },
      }).then(function (messenger) {
        messenger.on("buttonClick", function (buttonId) {
          alert("Rest temperature to 25c");
          console.log("clicked button with id:", buttonId);
          fetch(
            "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/aircon.json",
            {
              method: "PUT",
              body: JSON.stringify({
                temp: "25c",
              }),
            }
          );
        });
      });
      //console.log(mattertagId);
      // output: TODO
    });
  };
  const addMattertagNode2 = () => {
    var mattertagDesc = {
      label: "ตารางซ่อมบำรุง",
      description: "ตารางซ่อมบำรุงสำหรับ item xyyx001",
      anchorPosition: { x: -1, y: -6.9, z: 3.55 },
      stemVector: { x: 0, y: -0.5, z: 0 },
    };
    //setMatterTag2("test");
    sdk.Mattertag.add(mattertagDesc).then(function (mattertagId) {
      //console.log(mattertagId);
      //setMatterTag2(mattertagId[0]);

      var htmlToInject =
        ' \
<style> \
button { \
width: 260px; \
height: 50px; \
} \
</style> \
<iframe src="https://cadthai.com/Modelsobj/Details?modelid=FMID00002891" height="300" width="400" title="Iframe Example"></iframe> \
<button id="btn2">Go to Dashboard</button> \
<script> \
var btn2 = document.getElementById("btn2"); \
btn2.addEventListener("click", function () { \
window.send("buttonClick2", 123456); \
}); \
</script>';
      var htmlToInject2 =
        ' \
\
<iframe src="http://appz.myftp.org:3000/api/hassio_ingress/fCKbAFQTyuWnTeRV4Nymoc9my1yaH63Y3wIxWFqEP8Q/d/pq5JN9L4z/c?orgId=1&from=1681233228674&to=1681287506562&viewPanel=4" height="400" width="800" title="Iframe Example"></iframe> \
<button id="btn2">Go to Dashboard</button> \
<script> \
var btn2 = document.getElementById("btn2"); \
btn2.addEventListener("click", function () { \
window.send("buttonClick2", 123456); \
}); \
</script>';

      //http://appz.myftp.org:3000/api/hassio_ingress/fCKbAFQTyuWnTeRV4Nymoc9my1yaH63Y3wIxWFqEP8Q/d/pq5JN9L4z/c?orgId=1&from=1681233228674&to=1681287506562&viewPanel=4
      sdk.Mattertag.injectHTML(mattertagId[0], htmlToInject, {
        size: {
          w: 800,
          h: 400,
        },
      }).then(function (messenger) {
        messenger.on("buttonClick2", function (buttonId) {
          alert("msg2");
          /* alert("Rest temperature to 25c");
          console.log("clicked button with id:", buttonId);
          fetch(
            "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/aircon.json",
            {
              method: "PUT",
              body: JSON.stringify({
                temp: "25c",
              }),
            }
          ); */
        });
      });
      //console.log(mattertagId);
      // output: TODO
    });
  };

  const addMattertagNode3 = () => {
    //"mattertag.media.rich"
    var mattertagDesc = {
      label: "Hello Iframe C",
      description:
        "https://appz.myftp.org/d-solo/H3UlaCYVk/c?orgId=1&from=1681297720564&to=1681310146292&panelId=2",
      anchorPosition: { x: -1.821, y: 0.003, z: 1.326 },
      stemVector: { x: 0, y: 1, z: 0 },
      /*  media: {
        src: "http://appz.myftp.org:3000/api/hassio_ingress/fCKbAFQTyuWnTeRV4Nymoc9my1yaH63Y3wIxWFqEP8Q/d/pq5JN9L4z/c?orgId=1&from=1681233228674&to=1681287506562&viewPanel=2",
        type: "mattertag.media.none",
      }, */
      color: { b: 1, g: 1, r: 1 },
    };
    //setMatterTag2("test");
    console.log("sdk.Tag");
    console.log(sdk.Tag);
    // create a tag
    const tagId = sdk.Tag.add({
      label: "***Test Tag",
      anchorPosition: { x: -1.821, y: 0.003, z: 1.326 },
      stemVector: { x: 0, y: 1, z: 0 },
    }).then(function (tagId) {
      console.log("tag id");
      console.log(tagId);

      var htmlToInject =
        ' \
<style> \
button { \
width: 260px; \
height: 50px; \
} \
</style> \
<iframe src="https://appz.myftp.org/d-solo/H3UlaCYVk/c?orgId=1&from=1681297720564&to=1681310146292&panelId=2" height="500" width="600" title="Iframe Example"></iframe> \
<br></br> \
<button id="btn2">Go to Dashboard</button> \
<script> \
var btn2 = document.getElementById("btn2"); \
btn2.addEventListener("click", function () { \
window.send("buttonClick2", 123456); \
}); \
</script>';
      const sandboxId = sdk.Tag.registerSandbox(htmlToInject, {
        size: {
          w: 600,
          h: 500,
        },
      }).then(function (sandboxId) {
        console.log("sandboxId id");
        console.log(sandboxId);
        sdk.Tag.attach(tagId[0], sandboxId[0]);
      });
    });

    /*  sdk.Mattertag.add(mattertagDesc).then(function (mattertagId) {

       
      //console.log(mattertagId);
      //setMatterTag1(mattertagId[0]);
      //console.log(mattertagId);
      // output: TODO
    }); */
  };

  const addComponentNode1 = async () => {
    var [sceneObject] = await sdk.Scene.createObjects(1);
    var node1 = sceneObject.addNode("node-obj-1");
    var initial = {
      //url: "https://static.matterport.com/showcase-sdk/examples/assets-1.0-2-g6b74572/assets/models/sofa/9/scene.gltf",
      url: "https://cadthai.com/Content/MAAS/gltf/sofa.gltf",
      visible: true,
      localScale: {
        x: 1,
        y: 1,
        z: 1,
      },
      localPosition: {
        x: -1.1,
        y: -9,
        z: 2,
      },
      localRotation: {
        x: 0,
        y: 0,
        z: 10,
      },
    };

    const gltfrtv = node1.addComponent(
      "mp.gltfLoader",
      initial,
      "my-component-gltf-1"
    );

    class ClickSpy {
      node = node1;
      eventType = "INTERACTION.CLICK";
      onEvent(payload) {
        console.log("received node1", payload, this);
        this.node.stop();
        addComponentNode2();
      }
    }
    // Spy on the click event
    //inputComponent.spyOnEvent(new ClickSpy());

    gltfrtv?.spyOnEvent(new ClickSpy());
    node1.start();
    console.log(gltfrtv);
    // You can enable navigation after starting the node.
    //inputComponent.inputs.userNavigationEnabled = true;
    //console.log(node);
    // You can turn off all events and the spy wont receive any callbacks.
    //inputComponent.inputs.eventsEnabled = false;
  };

  const addComponentNode2 = async () => {
    var [sceneObject] = await sdk.Scene.createObjects(1);
    var node2 = sceneObject.addNode("node-obj-1");
    var initial = {
      //url: "https://static.matterport.com/showcase-sdk/examples/assets-1.0-2-g6b74572/assets/models/iot/nest-1/model.dae",
      url: "https://cadthai.com/Content/MAAS/gltf/iot.dae",
      visible: true,
      localScale: {
        x: 0.5,
        y: 0.5,
        z: 0.5,
      },
      localPosition: {
        x: 0,
        y: -9,
        z: 1,
      },
      localRotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    };

    const gltfrtv = node2.addComponent(
      "mp.daeLoader",
      initial,
      "my-component-gltf-2"
    );

    class ClickSpy {
      node = node2;
      eventType = "INTERACTION.CLICK";
      onEvent(payload) {
        console.log("received node2", payload, this);
        this.node.stop();
        addComponentNode1();
      }
    }
    // Spy on the click event
    //inputComponent.spyOnEvent(new ClickSpy());

    gltfrtv?.spyOnEvent(new ClickSpy());

    // You can enable navigation after starting the node.
    //inputComponent.inputs.userNavigationEnabled = true;
    //console.log(node);
    // You can turn off all events and the spy wont receive any callbacks.
    //inputComponent.inputs.eventsEnabled = false;
    node2.start();
  };
  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const createNewTagNode = () => {
    const dataToPost = {
      color: { r: 111, g: 111, b: 111 },
      header: "add your header",
      icon: "Electrical",
      id: makeid(10),
      type: "rawdata",
      val: "your value raw data",
      enable: "yes",
      position: mouseLocation.position,
      normal: mouseLocation.normal,
    };
    console.log(dataToPost);
    var ans = window.confirm("คุณต้องการที่จะเพิ่ม Tag ตรงจุดนี้ใช่หรือไม่");

    if (ans == false) {
      return;
    }

    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(dataToPost), // We send data in JSON format
    };

    // make the HTTP put request using fetch api
    fetch(
      "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/AICProject/MatterTag/items/" +
        dataToPost.id +
        ".json",
      putMethod
    )
      .then((response) => response.json())
      .then((data) => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch((err) => console.log(err)); // Do something with the error
  };

  const createNewVDONode = () => {
    const dataToPost = {
      comment: "your comment",
      id: makeid(10),
      VDOurl: "www",
      enable: "yes",
      position: mouseLocation.position,
      normal: mouseLocation.normal,
      width: "1.2",
      height: "0.6",
    };
    console.log(dataToPost);
    var ans = window.confirm("คุณต้องการที่จะเพิ่ม VDO ตรงจุดนี้ใช่หรือไม่");

    if (ans == false) {
      return;
    }

    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(dataToPost), // We send data in JSON format
    };

    // make the HTTP put request using fetch api
    fetch(
      "https://pom-iot-default-rtdb.asia-southeast1.firebasedatabase.app/AICProject/Video/items/" +
        dataToPost.id +
        ".json",
      putMethod
    )
      .then((response) => response.json())
      .then((data) => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch((err) => console.log(err)); // Do something with the error
  };

  const trackingData = () => {
    if (editMode == "y") {
      return (
        <div>
          **Hover mouse for show position<br></br> {positionPointer}
          <br></br>
          {showBtn ? "true" : "false"}
          <br></br>
          {locationBtn}
          {/* <button
        onClick={() => {
          setIframe({
            title: "Watch Realtime IOT Grafana",
            message:
              "https://appz.myftp.org/d-solo/H3UlaCYVk/c?orgId=1&from=1681297720564&to=1681310146292&panelId=2",
          });
        }}
      >
        Open external iframe
      </button> */}
          <br></br>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div className="app">
      {/* <div className="container" ref={container}></div> */}

      <div className="button-wrap">
        {trackingData()}
        <div id="buttonGetPos">
          <br></br>
          <br></br>
          <button
            onClick={(e) => {
              createNewTagNode();
            }}
            type="button"
          >
            Add Tag
          </button>
          <button
            onClick={(e) => {
              createNewVDONode();
            }}
            type="button"
          >
            Add VDO
          </button>
          <br></br>
          <br></br>
        </div>
      </div>
      {iframe && (
        <Iframe
          title={iframe.title}
          message={iframe.message}
          onConfirm={iframeHandler}
        />
      )}
      {iframe3slot && (
        <Iframe3slot
          title={iframe3slot.title}
          message1={
            "https://gf.mirrordr.com/d-solo/b09464f0-891d-4e7c-a544-b4889446814d/ha?orgId=1&panelId=18"
          }
          message2={
            "https://gf.mirrordr.com/d-solo/b09464f0-891d-4e7c-a544-b4889446814d/ha?orgId=1&panelId=16"
          }
          message3={
            "https://gf.mirrordr.com/d-solo/b09464f0-891d-4e7c-a544-b4889446814d/ha?orgId=1&panelId=17"
          }
          onConfirm={iframe3slotHandler}
        />
      )}
      {editMode === "y" ? (
        <div>
          <div className="column c80">
            <iframe
              id="showcase"
              //src="./bundle/showcase.html?m=V5hx2ktRhvH&play=1&qs=1&log=0&applicationKey=w78qr7ncg7npmnhwu1xi07yza"
              src="./showcase-bundle/showcase.html?m=AuuKLiFsFwz&play=1&qs=1&log=0&applicationKey=x1pa124pp38sxs85k46kmbuha"
              width="100%"
              height="900px"
              frameBorder="0"
              allow="xr-spatial-tracking"
              allowFullScreen
              ref={container}
              onLoad={showCaseLoaded}
            >
              {" "}
            </iframe>
          </div>
          <div
            className="column c20"
            style={{ height: "900px", overflowY: "auto" }}
          >
            <EditorMP
              refreshtag={removeAllTaginEditMode}
              refreshVDO={removeAllVDOinEditMode}
            ></EditorMP>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <iframe
              id="showcase"
              //src="./bundle/showcase.html?m=V5hx2ktRhvH&play=1&qs=1&log=0&applicationKey=w78qr7ncg7npmnhwu1xi07yza"
              src="./showcase-bundle/showcase.html?m=AuuKLiFsFwz&play=1&qs=1&log=0&applicationKey=x1pa124pp38sxs85k46kmbuha"
              width="100%"
              height="900px"
              frameBorder="0"
              allow="xr-spatial-tracking"
              allowFullScreen
              ref={container}
              onLoad={showCaseLoaded}
              style={{ position: "absolute", left: "0", top: "0" }}
            >
              {" "}
            </iframe>
            <div id="content">
              <div>
                <select id="contentselect" onChange={onOptionChangeHandler}>
                  {options.map((option, index) => {
                    return <option key={index}>{option}</option>;
                  })}
                </select>
                {/*  <a><img onClick={onOptionChangeHandler} src = {window.location.pathname + "icon/orange/elc2.svg"} alt="Electrical"/></a> 
              <img onClick={onOptionChangeHandler} src = {window.location.pathname + "icon/orange/light2.svg"} alt="Lighting"/>
              <img onClick={onOptionChangeHandler} src = {window.location.pathname + "icon/orange/tem2.svg"} alt="Sensor"/>
              <img onClick={onOptionChangeHandler} src = {window.location.pathname + "icon/orange/fm2.svg"} alt="Facilities_Management"/>
              <img onClick={onOptionChangeHandler} src = {window.location.pathname + "icon/orange/cctv2.svg"} alt="CCTV"/>
              <img onClick={onOptionChangeHandler} src = {window.location.pathname + "icon/play.svg"} alt="All"/> */}
              </div>
            </div>
            <div id="content2">
              <button class="button-23" role="button"
                onClick={() => {
                  setIframe3slot({
                    title: "All Graph",
                    message:
                      /* "https://static.matterport.com/showcase-sdk/examples/vs-app-1.1.6-12-g0a66341/vs-app/index.html?applicationKey=08s53auxt9txz1w6hx2iww1qb&m=89SActNChJm&sr=-3.09,-1.18&ss=38", */
                      "link",
                  });
                }}
              >
                All Elc Graphs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
