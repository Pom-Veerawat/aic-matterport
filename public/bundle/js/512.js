/*! For license information please see 512.js.LICENSE.txt */
(self.webpackChunkmp_webgl=self.webpackChunkmp_webgl||[]).push([[512],{55721:(e,t,i)=>{"use strict";var r;i.d(t,{Z:()=>o}),function(e){e[e.None=0]="None",e[e.Queued=1]="Queued",e[e.ForceQueued=2]="ForceQueued",e[e.Downloading=3]="Downloading",e[e.Downloaded=4]="Downloaded",e[e.DownloadFailed=5]="DownloadFailed"}(r||(r={}));const o=r},21270:(e,t,i)=>{"use strict";var r;i.d(t,{V:()=>r}),function(e){e[e.Min=0]="Min",e[e.Standard=1]="Standard",e[e.High=2]="High",e[e.Detail=3]="Detail"}(r||(r={}))},51524:(e,t,i)=>{"use strict";i.d(t,{t:()=>n});var r=i(59279),o=i(53261),s=i(31362),a=i(21270);const n={urlTemplateToken:"<file>",initialMaxLOD:a.V.Min,nonMeshMaxLOD:a.V.Standard,maxLOD:a.V.High,loadSiblings:!0,displayActiveTiles:!1,autoDisableRendererCulling:!0,optimizeRaycast:!1,stopAtEmptyTiles:!1,errorTarget:Number((0,r.eY)("errorTarget",(0,s.tq)()?6:4)),disableTileUpdates:!1,errorMultiplierRaycastOcclusion:.1,errorMultiplierHiddenFloors:.01,disposeModel:!1,limitMemoryUsage:(0,s.tq)(),allocatedMegsBeforeLimitingLod:350,lruMinExtraTiles:(0,s.tq)()?0:100,lruMaxTiles:800,lruUnloadPercent:.05,tileAssetRequestPriority:o.ru.MEDIUM,downloadQueueConcurrency:8,parseQueueConcurrency:10,snappingMaxLOD:a.V.Standard}},88338:(e,t,i)=>{"use strict";i.d(t,{E:()=>r});const r={longerTransitionMaxDist:10,TRANSITION_TIME_DH:650}},20043:(e,t,i)=>{"use strict";i.d(t,{Tq:()=>a,bG:()=>c});var r=i(98169),o=i(81248),s=i(88338);const a=(e,t,i,r,...o)=>n({sweepData:e,direction:t,directionFactor:i,sourceSweep:r,ignoreSweeps:o}),n=e=>{const{sweepData:t,direction:i,sourceSweep:s,ignoreSweeps:a,directionFactor:n}=e;if(!t.currentSweepObject)return[];const c=s||t.currentSweepObject,h=[r.ff(c),r._k(),r.vO(c),r.pI(c.position,i,n)];for(const e of a)h.push(r.ff(e));const l=[o.o7(c.position,i),o.TE(c.position)],u=t.getSweepNeighbours(c);return t.sortByScore(h,l,u)},c=(e,t,i,a)=>{const n=[r._k(),r._T()],c=[o.Dv(i.point)],h=e.currentSweepObject;t&&h&&n.push(r.ff(h),r.SF(h.position,s.E.longerTransitionMaxDist),r.vO(h)),i.face&&n.push(r.D5(i.point,i.face.normal));const l=a.floorIdFromObject(i.object);l&&c.push(o.Bv(l));const u=e.sortByScore(n,c);if(0===u.length){const t=e.getClosestSweep(i.point,!0);u.push({sweep:t,score:0})}return u}},48176:(e,t,i)=>{"use strict";i.d(t,{I6:()=>D,at:()=>b});var r,o=i(84428),s=i(27646),a=i(55084),n=i(55721),c=i(2569),h=i(76609),l=i(71239),u=i(54730),p=i(98169),d=i(81248),g=i(37082),f=i(20387),w=i(90304),y=i(31362),S=i(95882),m=i(20043);!function(e){e[e.None=0]="None",e[e.DirectionalFOV=1]="DirectionalFOV"}(r||(r={}));class D{constructor(e,t,i,r){this.cameraRot=new o.Quaternion,this.sweep=e,this.cameraPosition=(new o.Vector3).copy(t),this.cameraDir=(new o.Vector3).copy(i),this.upcomingSweeps=r,this.zoomingActive=!1}}const T=(e,t,i=!1)=>{let r=0;if(e&&t)for(const o of t)i&&-1!==e.indexOf(o)||(e.push(o),r++);return r};class b{constructor(e,t,i,r){this.panoQualityManager=e,this.tilingSettings=t,this.sweepData=i,this.raycaster=r,this.directionalFOV=120,this.tempQueue=[],this.filterAndPrioritize=(e,t,i)=>{if(!this.priorityCriteria.sweep)return;const r=void 0!==this.priorityCriteria.upcomingSweeps&&null!==this.priorityCriteria.upcomingSweeps,o=this.tempQueue;o.length=0,this.queueTilesForPano(o,i,this.priorityCriteria.sweep,h.AB.BASE);const s=T(e,o,!0);this.currViewQueue[h.SL.BASE].value=s,this.fullPanoQueue[h.SL.BASE].value=s,r?this.queueForRestrictedSweeps(e,i):this.priorityCriteria.viewMode!==S.Ey.Panorama?this.queueForNonPanoViewmode(e,i):this.queueForPanoViewmode(e,t,i),this.tilingSettings.downloadFullPano&&this.queueFullPano(e,i)},this.queueRaycast=(()=>{const e=new o.Vector3;return(t,i)=>{if(this.priorityCriteria.sweep)if(this.priorityCriteria.hoveredSweep)this.queueTilesForPano(t,i,this.priorityCriteria.hoveredSweep,h.AB.BASE);else if(this.raycaster&&this.raycaster.hit){const r=e.copy(this.raycaster.hit.point).sub(this.priorityCriteria.sweep.position),o=this.getSinglePanoInDirection(r),s=this.sweepData.getSweep(o);s&&this.queueTilesForPano(t,i,s,h.AB.BASE)}}})(),this.queueRaycastIntersection=(e,t)=>{if(!this.raycaster||!this.raycaster.hit||!this.meshQuery)return;const i=(0,m.bG)(this.sweepData,!1,this.raycaster.hit.intersection,this.meshQuery),r=i.length>0?i[0].sweep:this.sweepData.getClosestSweep(this.raycaster.hit.point,!0);r&&this.queueTilesForPano(e,t,r,h.AB.BASE)},this.getSweepIdInLocalDirection=(()=>{const e=new o.Vector3;return t=>{const i=this.priorityCriteria.cameraRot,r=e.copy(t).applyQuaternion(i);return this.getSinglePanoInDirection(r)}})(),this.persistentStorage=new u.a,this.maxResolution=e.getNavPanoSize(),this.currViewQueue=x(),this.fullPanoQueue=x(),this.isMobileDevice=(0,y.tq)(),this.priorityCriteria=new D(null,new o.Vector3(0,0,0),new o.Vector3(0,0,-1))}getQualityQueueSize(e,t){return e===f.v.CurrentView?this.currViewQueue[t].value:this.fullPanoQueue[t].value}makeQueueSubscription(e,t,i){return(e===f.v.CurrentView?this.currViewQueue[t]:this.fullPanoQueue[t]).onChanged(i)}updateCriteria(e,t,i,r){this.priorityCriteria.sweep=e,this.priorityCriteria.cameraPosition.copy(t),this.priorityCriteria.cameraDir.copy(i),this.priorityCriteria.cameraRot.copy(r)}setHoveredSweep(e){this.priorityCriteria.hoveredSweep=e}setUpcomingSweeps(e){this.priorityCriteria.upcomingSweeps=e}clearUpcomingSweeps(){this.priorityCriteria.upcomingSweeps=void 0}setDownloadFOV(e){this.directionalFOV=e}queueForRestrictedSweeps(e,t){if(!this.priorityCriteria.upcomingSweeps)return;let i=0;for(const r of this.priorityCriteria.upcomingSweeps)if(i++,this.queueTilesForPano(e,t,r,h.AB.BASE),i>=3)break;this.queueFOVStandardNarrow(e,t),this.queueFOVHighNarrow(e,t)}queueForPanoViewmode(e,t,i){this.queueRaycast(e,i),this.queueFOVStandardNarrow(e,i),this.queueScoredSweeps(e,t,i),this.queueFOVHighNarrow(e,i),this.isMobileDevice||this.queueWASD(e,t,i)}queueForNonPanoViewmode(e,t){this.queueRaycastIntersection(e,t)}queueFOVTiles(e,t,i,r){if(!this.priorityCriteria.sweep)return 0;const o=h.eE[t];return this.canDownloadSize(this.priorityCriteria.sweep,t)?this.queueTilesInDirectionForPano(e,r,this.priorityCriteria.sweep,o,this.priorityCriteria.cameraDir,i):0}queueScoredSweeps(e,t,i){if(this.priorityCriteria.sweep&&this.maxResolution<=2048){const r=this.persistentStorage.getArray("filterAndPrioritize:scoredSweeps");this.populateScoredSweeps(this.priorityCriteria.sweep,t,r,this.priorityCriteria.cameraDir,6),this.queueTilesForPanos(e,r,i,h.AB.BASE,4)}}queueFOVStandardNarrow(e,t){if(!this.priorityCriteria.sweep)return;const i=this.tempQueue;i.length=0;const r=this.queueFOVTiles(i,h.SL.STANDARD,this.directionalFOV,t);this.sortTiles(i,this.priorityCriteria.sweep,this.priorityCriteria.cameraDir),T(e,i),this.currViewQueue[h.SL.STANDARD].value=r,this.fullPanoQueue[h.SL.STANDARD].value=r}queueFOVHighNarrow(e,t){if(!this.priorityCriteria.sweep)return;const i=this.tempQueue;i.length=0;const r=this.queueFOVTiles(i,h.SL.HIGH,this.directionalFOV,t),o=this.queueFOVTiles(i,h.SL.ULTRAHIGH,this.directionalFOV,t);this.sortTiles(i,this.priorityCriteria.sweep,this.priorityCriteria.cameraDir),T(e,i),this.currViewQueue[h.SL.HIGH].value=r,this.currViewQueue[h.SL.ULTRAHIGH].value=o}queueFullPano(e,t){if(!this.priorityCriteria.sweep)return;const i=this.tempQueue;if(i.length=0,this.maxResolution<=h.AB.HIGH){if(this.canDownloadSize(this.priorityCriteria.sweep,h.SL.HIGH)){const e=this.queueTilesForPano(i,t,this.priorityCriteria.sweep,h.AB.HIGH);this.fullPanoQueue[h.SL.HIGH].value=e}}else if(this.canDownloadSize(this.priorityCriteria.sweep,h.SL.ULTRAHIGH)){const e=this.queueTilesForPano(i,t,this.priorityCriteria.sweep,h.AB.ULTRAHIGH);this.fullPanoQueue[h.SL.ULTRAHIGH].value=e}this.sortTiles(i,this.priorityCriteria.sweep,this.priorityCriteria.cameraDir),T(e,i,!0)}queueWASD(e,t,i){const r=this.persistentStorage.getArray("filterAndPrioritize:neighbors")||[];if(r.length=0,!this.priorityCriteria.sweep)return;const o=[w.f.FORWARD,w.f.RIGHT,w.f.LEFT,w.f.BACK];for(const e of o){const i=this.getSweepIdInLocalDirection(e),o=t.get(i);o&&r.push(o)}this.queueTilesForPanos(e,r,i,h.AB.BASE)}canDownloadSize(e,t){const i=h.eE[t],r=this.panoQualityManager.getNavPanoSize()>=i||this.maxResolution>=i&&this.panoQualityManager.getZoomPanoSize()>=i,o=this.panoQualityManager.getTestResults(e.id,t);return r&&o===s.S.Untested&&this.panoQualityManager.testDownload(e,t,a.I_),o===s.S.Success&&r}populateScoredSweeps(e,t,i,r,s){(i=i||[]).length=0;const a=(new o.Vector3).copy(e.position),n=[p._k(),p.ff(e),p.jN(a,400),p.pI(a,r,.75)],c=[d.Dv(a,l.Xd.navigation.distanceFactor),d.o7(a,r,l.Xd.navigation.directionFactor)],h=this.sweepData.getSweepNeighbours(e),u=this.sweepData.sortByScore(n,c,h);for(let e=0;e<u.length&&e<s;e++){const t=u[e].sweep;i.push(t)}}queueTilesForPanos(e,t,i,r,o){let s=0;for(const a of t){if(s+=this.queueTilesForPano(e,i,a,r)>0?1:0,o&&s>=o)break}return s}queueTilesForPano(e,t,i,o){const s=this.persistentStorage.get("queueTilesForSweep:filterCriteria",(()=>({filter:r.None})));return this.filterAndQueueTileDownloadDescriptors(e,t,i,o,s)}queueTilesInDirectionForPano(e,t,i,s,n,c){const h=this.persistentStorage.get("queueTilesInDirectionForSweep:panoSpaceDir",(()=>new o.Vector3)),l=this.persistentStorage.get("queueTilesInDirectionForSweep:filterCriteria",(()=>({filter:r.DirectionalFOV,direction:new o.Vector3,fov:60})));return h.copy(n),a.ym(i.rotation,h),l.direction.copy(h),l.fov=c,this.filterAndQueueTileDownloadDescriptors(e,t,i,s,l)}filterAndQueueTileDownloadDescriptors(e,t,i,r,o){const s=this.persistentStorage.getArray("filterAndQueueTileDownloadDescriptors:descriptors"),a=t.getTileDownloadDescriptors(i,r);s.length=0,this.filterTileDownloadDescriptors(a,s,o);let n=0;for(const t of s)t&&(e.push(t),n++);return n}filterTileDownloadDescriptors(e,t,i){let o,s;switch(i.filter){case r.DirectionalFOV:for(o=0;o<e.length;o++)s=e[o],s&&a.eO(s.panoSize,s.tileSize,s.face,s.tileX,s.tileY,i.direction,i.fov)&&t.push(s);break;default:for(o=0;o<e.length;o++)s=e[o],t.push(s)}for(o=0;o<t.length;o++)s=t[o],s&&!this.canIncludeDescriptor(s)&&(t[o]=null)}canIncludeDescriptor(e){return e.status!==n.Z.Downloading&&e.status!==n.Z.Downloaded}sortTiles(e,t,i){C.panoSpaceDir.copy(i),a.ym(t.rotation,C.panoSpaceDir),C.fovThresholdNarrow=c.tf(this.directionalFOV),e.sort(v)}insertSortedPanoTile(e,t,i,r){C.panoSpaceDir.copy(r),a.ym(i.rotation,C.panoSpaceDir),C.fovThresholdNarrow=c.tf(this.directionalFOV);let o=-1;for(let i=0;i<e.length;i++){if(v(t,e[i])<=0){o=i;break}}if(-1===o)e[e.length]=t;else{for(let t=e.length;t>o;t--)e[t]=e[t-1];e[o]=t}}getSinglePanoInDirection(e){const t=this.priorityCriteria.sweep;if(!t)return"";const i=[p.ff(t),p._k(),p.pI(t.position,e)],r=[d.o7(t.position,e),d.TE(t.position)],o=t.neighbours.filter((e=>{const t=this.sweepData.getSweep(e);return i.every((e=>e(t)))})).map((e=>{const t=this.sweepData.getSweep(e);return{sweepId:e,score:r.reduce(((e,i)=>e+i(t)),0)}})),s=o.reduce(((e,t)=>e.score>t.score?e:t),o[0]);return s?s.sweepId:""}}const C={panoSpaceDir:new o.Vector3,fovThresholdNarrow:-1},v=(e,t)=>{const i=C.panoSpaceDir,r=C.fovThresholdNarrow,o=Math.max(Math.min(i.dot(e.direction),1),-1),s=Math.max(Math.min(i.dot(t.direction),1),-1);return o>=r&&s<r?-1:o<r&&s>=r||e.panoSize>t.panoSize?1:t.panoSize>e.panoSize?-1:-(o-s)};function x(){return{[h.SL.BASE]:(0,g.Y)(0),[h.SL.STANDARD]:(0,g.Y)(0),[h.SL.HIGH]:(0,g.Y)(0),[h.SL.ULTRAHIGH]:(0,g.Y)(0)}}},78449:(e,t,i)=>{"use strict";i.d(t,{$7:()=>y,uc:()=>m,N3:()=>w});var r=i(84428),o=i(45837),s=i(90304),a=i(59370),n=i(69505),c=i(49827),h=i(67944),l=i(67557),u=i(7531),p=i.n(u),d=i(87804),g=i.n(d);class f extends r.Mesh{}var w;!function(e){e.WORLD="world",e.NDC="ndc"}(w||(w={}));class y extends r.Object3D{constructor(e,t=l.Qi.instance,i=w.WORLD){var a;super(),this.config=e,this.fontManager=t,this.scaleType=i,this.update=()=>{const e=this.resolvedConfig;this.textGeometry.update(e),this.textGeometry.computeBoundingBox();const t=this.textGeometry.layout.lineHeight-this.textGeometry.layout.baseline;this.labelTextMesh.position.x=-.5*this.textGeometry.layout.width+t,this.labelTextMesh.position.y=-.5*this.textGeometry.layout.height+t,this.labelTextMesh.position.z=.25,this.unscaledWidth=this.textGeometry.layout.width+this.config.backgroundBorderWidth,this.unscaledHeight=this.textGeometry.layout.height+this.config.backgroundBorderHeight,(this.labelBackgroundMesh||this.config.backgroundAsCollider)&&this.labelBackgroundMesh.scale.set(this.unscaledWidth,this.unscaledHeight,.01),this.aspect=this.unscaledWidth/Math.max(this.unscaledHeight,.001),this.fontHeightToMeters=1/e.font.info.size,this.updateScale(),this._onGeomUpdate&&this._onGeomUpdate()};const c=void 0!==this.config.opacity?this.config.opacity:1;if(this.config.background||this.config.backgroundAsCollider){this.config.backgroundOpacity=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:1,this.config.backgroundOpacity=this.config.background?this.config.backgroundOpacity:0;const t=new r.BoxGeometry(1,1,.01),i=new r.MeshBasicMaterial({color:e.backgroundColor,transparent:!0,depthTest:this.config.backgroundOpacity>0&&!e.disableDepth,depthWrite:this.config.backgroundOpacity>0&&!e.disableDepth,opacity:this.config.backgroundOpacity,stencilRef:1,stencilFail:r.KeepStencilOp,stencilZFail:r.KeepStencilOp,stencilZPass:r.ReplaceStencilOp,stencilFunc:r.AlwaysStencilFunc,stencilWrite:!0});this.labelBackgroundMesh=new this.config.backgroundColliderType(t,i),this.labelBackgroundMesh.position.z=-.25,this.labelBackgroundMesh.name="Label Background",this.collider=this.labelBackgroundMesh,this.add(this.labelBackgroundMesh)}const h={fontPath:`${null!==(a=e.assetBasePath)&&void 0!==a?a:""}${l.Ye.fontPath}`,outline:this.config.outline,outlineWidth:this.config.outlineWidth},u={uniforms:{map:{type:"t",value:(d=Object.assign(Object.assign({},h),{color:e.color,opacity:c})).map},color:{type:"c",value:new r.Color(d.color)},opacity:{type:"f",value:d.opacity}},vertexShader:p(),fragmentShader:g()};var d;const y=new r.RawShaderMaterial({uniforms:u.uniforms,fragmentShader:u.fragmentShader,vertexShader:u.vertexShader,side:r.DoubleSide,transparent:!0,depthTest:!1,depthWrite:!1,opacity:c});y.name="Label Text",this.fontId=this.fontManager.getFontId(h);const S=this.fontManager.getFont(this.fontId);y.uniforms.map.value=S.textures[0],S.onChanged((()=>{y.uniforms.map.value=S.textures[0],this.update()}));const m=this.resolvedConfig,D=m.font;this.textGeometry=(0,o.Y)(m),this.labelTextMesh=new f(this.textGeometry,y),this.labelTextMesh.name="Label Text",this.labelTextMesh.renderOrder=10;const T=(new r.Quaternion).setFromAxisAngle(s.f.FORWARD,(0,n.Id)(180)),b=(new r.Quaternion).setFromAxisAngle(s.f.UP,(0,n.Id)(180));this.labelTextMesh.quaternion.multiply(T).multiply(b),this.add(this.labelTextMesh),this.name="Label Container",this.fontHeightToMeters=1/D.info.size,this.scaleFactor=e.scale||this.fontHeightToMeters,this.update()}get resolvedConfig(){let e;if(void 0!==this.config.wordWrapWidth){const t=this.fontManager.measureText(this.fontId,this.config.text);void 0!==t&&t>this.config.wordWrapWidth&&(e=this.config.wordWrapWidth)}const t=this.fontManager.getFont(this.fontId);return Object.assign(Object.assign({},this.config),{font:t.fontData,texture:t.textures[0],width:e})}onGeomUpdate(e){this._onGeomUpdate=e}updateScale(){const e=this.config.scale*this.fontHeightToMeters;this.scale.set(e,e,e)}get text(){return this.config.text}set text(e){e!==this.name&&(this.config.text=e,this.name=e,this.fontManager.getFont(this.fontId).addCharsIfNeeded(e),this.update())}get mesh(){return this.labelTextMesh}get scaleFactor(){return this.config.scale}set scaleFactor(e){this.scaleFactor!==e&&(this.config.scale=e,this.updateScale())}get opacity(){return void 0!==this.config.opacity?this.config.opacity:1}set opacity(e){if(e!==this.config.opacity){this.config.opacity=e;const t=e>0&&!this.config.disableDepth;if(this.config.background){const i=this.labelBackgroundMesh.material;i.opacity=Math.min(this.config.backgroundOpacity||1,e),i.depthWrite=e>.15,i.depthTest=t}const i=this.labelTextMesh.material;i.uniforms.opacity.value=e,i.depthTest=t,this.visible=e>0}}setColorHex(e){const t=this.labelTextMesh.material.uniforms.color;t.value.getHex()!==e&&t.value.setHex(e)}setRenderLayer(e){this.labelTextMesh.layers.mask=e.mask,this.labelBackgroundMesh&&(this.labelBackgroundMesh.layers.mask=e.mask)}setRenderOrder(e){this.renderOrder=e,this.labelTextMesh.renderOrder=e,this.labelBackgroundMesh&&(this.labelBackgroundMesh.renderOrder=e)}setPosition(e,t=(e=>e)){this.position.copy(t(e))}setOrientation(e,t=0){this.quaternion.copy(e),0!==t&&this.rotateZ(-t*n.Ue)}scaleBillboard(e,t,i,r,o,s,n=S.SCALE_DEFAULT){if(0!==i.elements[15])this.scaleFactor=.2*n*r*(S.ORTHO_IDEAL_HEIGHT/o);else{const l=(0,a.D_)(this.position,e,t,i.asThreeMatrix4()),u=Math.abs(l.x);if(u<1){const t=(0,h.mY)(i,e,this.position,o,n),a=((0,c.uZ)(s,1,2.5)+r)*S.SCALE_ASPECT,l=1+S.SCALE_NDC-u*S.SCALE_NDC-a,p=Math.max(Math.min(1/t*l,3),.001);this.scaleType===w.NDC?this.scaleFactor=p:this.scaleFactor=Math.min(p*S.NDC_MULT,n*S.SCALE_WORLD)}else this.scaleFactor=.001}this.updateScale()}}const S={SCALE_DEFAULT:.1,SCALE_WORLD:4,SCALE_NDC:.5,SCALE_ASPECT:.035,DEPTH_WRITE_THRESHOD:.15,ORTHO_IDEAL_HEIGHT:1500,NDC_MULT:1.15};class m{constructor(e){this.currentTextConfig=m.defaultTextConfig,e?this.updateTextStyle(e):this.updateTextStyle(m.defaultTextConfig)}updateTextStyle(e){this.currentTextConfig=Object.assign(Object.assign({},this.currentTextConfig),e)}createLabel(e={text:""}){return new y(Object.assign(Object.assign({},this.currentTextConfig),e))}static makeConfig(e){return Object.assign(Object.assign({},m.defaultTextConfig),e)}}m.defaultTextConfig={text:"",align:"center",wordWrapWidth:void 0,color:"black",backgroundColor:"white",backgroundBorderWidth:50,backgroundBorderHeight:30,background:!0,backgroundAsCollider:!0,backgroundColliderType:r.Mesh,scale:1,outline:!1,outlineWidth:4}},87804:e=>{e.exports="precision highp float;precision highp int;uniform sampler2D map;uniform vec3 color;uniform float opacity;varying vec2 vUv;void main(){vec4 sample=texture2D(map,vUv).rgba;gl_FragColor=vec4(sample.rgb*color.rgb,clamp(sample.a*opacity,0.,1.));}"},7531:e=>{e.exports="precision highp float;precision highp int;attribute vec2 uv;attribute vec4 position;uniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*position;}"}}]);