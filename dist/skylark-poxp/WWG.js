/**
 * skylark-poxp - A version of poxp that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-poxp/
 * @license MIT
 */
define(["./pox"],function(t){function e(){this.version="0.9.11",this.can=null,this.gl=null,this.vsize={float:1,vec2:2,vec3:3,vec4:4,mat2:4,mat3:9,mat4:16}}return e.prototype.init=function(t,e){let i;return this.can=t,!(!(i=t.getContext("experimental-webgl",e))&&!(i=t.getContext("webgl",e)))&&(!!window.Promise&&(this.gl=i,this.ext_vao=i.getExtension("OES_vertex_array_object"),this.ext_vao&&(this.vao_create=function(){return this.ext_vao.createVertexArrayOES()},this.vao_bind=function(t){this.ext_vao.bindVertexArrayOES(t)}),this.ext_inst=i.getExtension("ANGLE_instanced_arrays"),this.ext_inst&&(this.inst_divisor=function(t,e){this.ext_inst.vertexAttribDivisorANGLE(t,e)},this.inst_draw=function(t,e,i,r,s){this.ext_inst.drawElementsInstancedANGLE(t,e,i,r,s)},this.inst_drawa=function(t,e,i,r){this.ext_inst.drawArrayInstancedANGLE(t,e,i,r)}),this.ext_anis=i.getExtension("EXT_texture_filter_anisotropic"),this.ext_ftex=i.getExtension("OES_texture_float"),this.ext_mrt=i.getExtension("WEBGL_draw_buffers"),this.ext_mrt&&(this.mrt_att=this.ext_mrt.COLOR_ATTACHMENT0_WEBGL,this.mrt_draw=function(t,e){return this.ext_mrt.drawBuffersWEBGL(t,e)}),this.ext_i32=i.getExtension("OES_element_index_uint"),this.ext_mv=i.getExtension("WEBGL_multiview"),this.ext_mv?console.log("MULTIVIEW extension is supported"):(this.ext_mv=i.getExtension("OVR_multiview"),this.ext_mv&&console.log("OVR MULTIVIEW extension is supported")),this.dmodes={tri_strip:i.TRIANGLE_STRIP,tri:i.TRIANGLES,points:i.POINTS,lines:i.LINES,line_strip:i.LINE_STRIP},this.version=1,!0))},e.prototype.init2=function(t,e){let i;return this.can=t,!(!(i=t.getContext("experimental-webgl2",e))&&!(i=t.getContext("webgl2",e)))&&(!!window.Promise&&(console.log("init for webGL2"),this.gl=i,this.ext_vao=!0,this.vao_create=function(){return this.gl.createVertexArray()},this.vao_bind=function(t){this.gl.bindVertexArray(t)},this.ext_inst=!0,this.inst_divisor=function(t,e){this.gl.vertexAttribDivisor(t,e)},this.inst_draw=function(t,e,i,r,s){this.gl.drawElementsInstanced(t,e,i,r,s)},this.inst_drawa=function(t,e,i,r){this.gl.drawArraysInstanced(t,e,i,r)},this.ext_anis=i.getExtension("EXT_texture_filter_anisotropic"),this.ext_anis&&(this.ext_anis_max=i.getParameter(this.ext_anis.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),this.ext_ftex=!0,this.ext_mrt=i.getParameter(i.MAX_DRAW_BUFFERS)>1,this.ext_mrt&&(this.mrt_att=i.COLOR_ATTACHMENT0,this.mrt_draw=function(t,e){return i.drawBuffers(t,e)}),this.ext_i32=!0,this.ext_mv=i.getExtension("WEBGL_multiview"),this.ext_mv?console.log("MULTIVIEW extension is supported"):(this.ext_mv=i.getExtension("OVR_multiview"),this.ext_mv&&console.log("OVR MULTIVIEW extension is supported")),this.dmodes={tri_strip:i.TRIANGLE_STRIP,tri:i.TRIANGLES,points:i.POINTS,lines:i.LINES,line_strip:i.LINE_STRIP},this.version=2,!0))},e.prototype.loadAjax=function(t,e){return new Promise((i,r)=>{const s=new XMLHttpRequest;s.open("get",t,!0),s.responseType=e&&e.type?e.type:"text",s.onload=(()=>{200==s.status?i(s.response):r("Ajax error:"+s.statusText)}),s.onerror=(()=>{r("Ajax error:"+s.statusText)}),s.send()})},e.prototype.loadImageAjax=function(t){return new Promise((e,i)=>{this.loadAjax(t,{type:"blob"}).then(t=>{const i=new Image,r=URL.createObjectURL(t);i.onload=(()=>{URL.revokeObjectURL(r),e(i)}),i.src=r}).catch(t=>{console.log(t),e(null)})})},e.prototype.createRender=function(){return new this.Render(this)},e.prototype.Render=function(t){this.wwg=t,this.gl=t.gl,this.env={},this.modelCount=0},e.prototype.Render.prototype.setUnivec=function(t,e){if(null==t.pos)return;let r=[];if(t.dim>0&&!(e instanceof Float32Array))for(let i=0;i<t.dim;i++)r=r.concat(e[i]);else r=e;if(null!=t.cache)if(Array.isArray(r)){for(let e=0;e<r.length&&r[e]==t.cache[e];e++);if(i==r.length)return}else if(r==t.cache)return;switch(t.type){case"mat2":this.gl.uniformMatrix2fv(t.pos,!1,this.f32Array(e));break;case"mat3":this.gl.uniformMatrix3fv(t.pos,!1,this.f32Array(e));break;case"mat4":this.gl.uniformMatrix4fv(t.pos,!1,this.f32Array(e));break;case"vec2":this.gl.uniform2fv(t.pos,this.f32Array(e));break;case"vec2v":this.gl.uniform2fv(t.pos,this.f32Array(r));break;case"vec3":this.gl.uniform3fv(t.pos,this.f32Array(e));break;case"vec3v":this.gl.uniform3fv(t.pos,this.f32Array(r));break;case"vec4":this.gl.uniform4fv(t.pos,this.f32Array(e));break;case"vec4v":this.gl.uniform4fv(t.pos,this.f32Array(r));break;case"int":case"bool":this.gl.uniform1i(t.pos,e);break;case"ivec2":case"bvec2":this.gl.uniform2iv(t.pos,this.i16Array(e));break;case"ivec2v":case"bvec2v":this.gl.uniform2iv(t.pos,this.i16Array(r));break;case"ivec3":case"bvec3":this.gl.uniform3iv(t.pos,this.i16Array(e));break;case"ivec3v":case"bvec3v":this.gl.uniform3iv(t.pos,this.i16Array(r));break;case"ivec4":case"bvec4":this.gl.uniform4iv(t.pos,this.i16Array(e));break;case"ivec4v":case"bvec4v":this.gl.uniform4iv(t.pos,this.i16Array(r));break;case"intv":case"boolv":this.gl.uniform1iv(t.pos,this.i16Array(e));break;case"float":this.gl.uniform1f(t.pos,e);break;case"floatv":this.gl.uniform1fv(t.pos,this.f32Array(e));break;case"sampler2D":if("string"==typeof e&&(e=this.getTexIndex(e)),this.gl.activeTexture(this.gl.TEXTURE0+t.texunit),this.gl.bindTexture(this.gl.TEXTURE_2D,this.texobj[e]),void 0==this.data.texture[e])break;this.data.texture&&this.data.texture[e].video&&this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this.data.texture[e].video),this.gl.uniform1i(t.pos,t.texunit)}},e.prototype.Render.prototype.setShader=function(t){let e=0;function r(t){const r=t.split("\n"),s=[],n=[],a={};for(i=0;i<r.length;i++){let t=r[i];if(t.match(/^\s*#define\s*([^\s]+)\s+([^\s]+)/)&&(a[RegExp.$1.trim()]=RegExp.$2.trim()),t.match(/^\s*uniform\s*([0-9a-z]+)\s+([0-9a-z_]+)(\[[^\]]+\])?/i)){let t={type:RegExp.$1,name:RegExp.$2};if(""!=RegExp.$3){t.type=t.type+"v";let e=RegExp.$3.substr(1,RegExp.$3.length-2).trim();t.dim=parseInt(e),isNaN(t.dim)&&(t.dim=a[e])}"sampler2D"==t.type&&(t.texunit=e++),s.push(t)}t.match(/^\s*(?:attribute|in)\s+([0-9a-z]+)\s*([0-9a-z_]+)/i)&&n.push({type:RegExp.$1,name:RegExp.$2})}return{uni:s,att:n}}const s=this.gl;return new Promise((e,i)=>{if(!t.vshader)return i("no vshader"),!1;if(!t.fshader)return i("no fshader"),!1;let n,a,o=[];t.vshader.text?n=t.vshader.text:t.vshader.src&&o.push(this.wwg.loadAjax(t.vshader.src).then(t=>{n=t,e()}).catch(t=>{i(t)})),t.fshader.text?a=t.fshader.text:t.fshader.src&&o.push(this.wwg.loadAjax(t.fshader.src).then(t=>{a=t,e()}).catch(t=>{i(t)})),Promise.all(o).then(t=>{let o={},h=s.createShader(s.VERTEX_SHADER);if(s.shaderSource(h,n),s.compileShader(h),!s.getShaderParameter(h,s.COMPILE_STATUS))return i("vs error:"+s.getShaderInfoLog(h)),!1;o.vshader=h;let l=s.createShader(s.FRAGMENT_SHADER);if(s.shaderSource(l,a),s.compileShader(l),!s.getShaderParameter(l,s.COMPILE_STATUS))return i("fs error:"+s.getShaderInfoLog(l)),!1;o.fshader=l;let f=s.createProgram();if(s.attachShader(f,h),s.attachShader(f,l),s.linkProgram(f),!s.getProgramParameter(f,s.LINK_STATUS))return i("link error:"+s.getProgramInfoLog(f)),!1;o.program=f,s.useProgram(f);let u=r(n);o.vs_att={};for(let t in u.att)u.att[t].pos=s.getAttribLocation(f,u.att[t].name),o.vs_att[u.att[t].name]=u.att[t];o.vs_uni={};for(let t in u.uni)u.uni[t].pos=s.getUniformLocation(f,u.uni[t].name),u.uni[t].cache=null,o.vs_uni[u.uni[t].name]=u.uni[t];let E=r(a);o.fs_uni={};for(let t in E.uni)E.uni[t].pos=s.getUniformLocation(f,E.uni[t].name),E.uni[t].cache=null,o.fs_uni[E.uni[t].name]=E.uni[t];e(o)}).catch(t=>{i(t)})})},e.prototype.Render.prototype.setUniValues=function(t){if(t.vs_uni)for(let e in t.vs_uni)this.vs_uni[e]&&this.setUnivec(this.vs_uni[e],t.vs_uni[e]);if(t.fs_uni)for(let e in t.fs_uni)this.fs_uni[e]&&this.setUnivec(this.fs_uni[e],t.fs_uni[e]);return!0},e.prototype.Render.prototype.genTex=function(t,e){e||(e={flevel:0});let i=this.gl;const r={rgb:i.RGB,gray:i.LUMINANCE,grayalpha:i.LUMINANCE_ALPHA};let s=e.format&&r[e.format]?r[e.format]:i.RGBA,n=i.createTexture();switch(i.bindTexture(i.TEXTURE_2D,n),e.isarray?(t instanceof Float32Array?i.texImage2D(i.TEXTURE_2D,0,i.RGBA32F,e.width,e.height,0,s,i.FLOAT,t,0):i.texImage2D(i.TEXTURE_2D,0,i.RGBA,e.width,e.height,0,s,i.UNSIGNED_BYTE,t),e.flevel=0,e.nomipmap=!0):i.texImage2D(i.TEXTURE_2D,0,s,s,i.UNSIGNED_BYTE,t),e.nomipmap||i.generateMipmap(i.TEXTURE_2D),e.flevel){case 0:i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST);break;case 1:i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR);break;case 2:i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR_MIPMAP_LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR)}return 2==e.repeat?(i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)):1==e.repeat?(i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.MIRRORED_REPEAT),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.MIRRORED_REPEAT)):(i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.REPEAT),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.REPEAT)),this.wwg.ext_anis&&e.anisotropy&&i.texParameteri(i.TEXTURE_2D,this.wwg.ext_anis.TEXTURE_MAX_ANISOTROPY_EXT,e.anisotropy),i.bindTexture(i.TEXTURE_2D,null),n},e.prototype.Render.prototype.loadTex=function(t){this.gl;return new Promise((e,i)=>{if(t.src)if(t.opt&&t.opt.cors)this.wwg.loadImageAjax(t.src).then(i=>{e(this.genTex(i,t.opt))}).catch(t=>i(t));else{let r=new Image;r.onload=(()=>{e(this.genTex(r,t.opt))}),r.onerror=(()=>{i("cannot load image")}),r.src=t.src}else t.img instanceof Image?e(this.genTex(t.img,t.opt)):t.video?e(this.genTex(t.video,{nomipmap:!0,flevel:0,repeat:2})):t.buffer?void 0!=t.mrt?e(t.buffer.fb.t[t.mrt]):e(t.buffer.fb.t):t.texture?e(t.texture):t.canvas?e(this.genTex(t.canvas,t.opt)):t.array?(t.opt.isarray=!0,e(this.genTex(t.array,t.opt))):i("no image")})},e.prototype.Render.prototype.getTexIndex=function(t){if(!this.data.texture)return null;let e;for(e=0;e<this.data.texture.length&&this.data.texture[e].name!=t;e++);return e==this.data.texture.length?null:e},e.prototype.Render.prototype.addTex=function(t){return new Promise((e,i)=>{this.data.texture||(this.data.texture=[]),this.data.texture.push(t),this.loadTex(t).then(t=>{this.texobj.push(t),e(this.texobj.length-1)}).catch(t=>i(t))})},e.prototype.Render.prototype.removeTex=function(t){"string"==typeof t&&(t=this.getTexIndex(t)),null!==t&&(this.data.texture[t]=null,this.texobj[t]=null)},e.prototype.Render.prototype.frameBuffer=function(t){let e=this.gl;console.log("create framebuffer "+t.width+"x"+t.height);let i=t.mrt,r=e.UNSIGNED_BYTE,s=e.LINEAR;this.wwg.ext_ftex&&t.float&&(r=e.FLOAT,s=e.NEAREST,console.log("use float tex"));let n=[],a=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,a);let o=e.createRenderbuffer();if(e.bindRenderbuffer(e.RENDERBUFFER,o),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT16,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,o),i){let a=[];for(let o=0;o<i;o++)a[o]=e.createTexture(),e.bindTexture(e.TEXTURE_2D,a[o]),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t.width,t.height,0,e.RGBA,r,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,s),e.framebufferTexture2D(e.FRAMEBUFFER,this.wwg.mrt_att+o,e.TEXTURE_2D,a[o],0),n.push(this.wwg.mrt_att+o)}else{let i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t.width,t.height,0,e.RGBA,r,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,s),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0)}e.bindTexture(e.TEXTURE_2D,null),e.bindRenderbuffer(e.RENDERBUFFER,null),e.bindFramebuffer(e.FRAMEBUFFER,null);let h={ox:t.offsetX,oy:t.offsetY,width:t.width,height:t.height,f:a,d:o,t:fTexture};return i&&(h.fblist=n),h},e.prototype.Render.prototype.setRender=function(t){let e=this.gl;return this.env=t.env,this.data=t,new Promise((i,r)=>{if(!e)return void r("no init");let s=[];this.setShader({fshader:t.fshader,vshader:t.vshader}).then(n=>{if(this.vshader=n.vshader,this.fshader=n.fshader,this.program=n.program,this.vs_uni=n.vs_uni,this.vs_att=n.vs_att,this.fs_uni=n.fs_uni,t.texture)for(let e=0;e<t.texture.length;e++)s.push(this.loadTex(t.texture[e]));Promise.all(s).then(s=>{if(this.texobj=s,this.setUniValues(t)){this.env.cull?e.enable(e.CULL_FACE):e.disable(e.CULL_FACE),this.env.face_cw?e.frontFace(e.CW):e.frontFace(e.CCW),this.env.nodepth?e.disable(e.DEPTH_TEST):e.enable(e.DEPTH_TEST);for(let e=0;e<t.model.length;e++)t.model[e].obuf=this.setObj(t.model[e],!0);this.modelCount=t.model.length,this.env.offscreen&&(this.env.offscreen.mrt&&(this.wwg.ext_mrt||r("MRT not support")),this.fb=this.frameBuffer(this.env.offscreen)),i(this)}else r("no uniform name")}).catch(t=>{r(t)})}).catch(t=>{r(t)})})},e.prototype.Render.prototype.clear=function(){let t=this.env.clear_color;this.gl.clearColor(t[0],t[1],t[2],t[3]),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)},e.prototype.Render.prototype.f32Array=function(t){return t instanceof Float32Array?t:new Float32Array(t)},e.prototype.Render.prototype.i16Array=function(t){return t instanceof Int16Array?t:new Int16Array(t)},e.prototype.Render.prototype.i32Array=function(t){return t instanceof Uint32Array?t:new Uint32Array(t)},e.prototype.Render.prototype.setObj=function(t,e){let i,r=this.gl,s=t.geo,n=t.inst;ret={},this.wwg.ext_vao&&(i=this.wwg.vao_create(),this.wwg.vao_bind(i),ret.vao=i);let a=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,a);let o=0,h=[];for(let t=0;t<s.vtx_at.length;t++)h.push(this.vs_att[s.vtx_at[t]]),o+=this.wwg.vsize[this.vs_att[s.vtx_at[t]].type];ret.ats=h,ret.tl=o;let l,f,u=0;for(let t in this.vs_att)this.vs_att[t].pos>=0&&r.disableVertexAttribArray(this.vs_att[t].pos);for(let t=0;t<h.length;t++){let e=this.wwg.vsize[h[t].type];r.enableVertexAttribArray(this.vs_att[h[t].name].pos),r.vertexAttribPointer(this.vs_att[h[t].name].pos,e,r.FLOAT,!1,4*o,u),u+=4*e}if(ret.vbo=a,s.idx&&(l=r.createBuffer(),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,l),ret.ibo=l),n){f=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,f);let t=0,e=[];for(let i=0;i<n.attr.length;i++)e.push(this.vs_att[n.attr[i]]),t+=this.wwg.vsize[this.vs_att[n.attr[i]].type];t*=4,ret.iats=e,ret.itl=t;let i=0;for(let s=0;s<e.length;s++){let a=n.divisor?n.divisor[s]:1,o=this.wwg.vsize[e[s].type],h=this.vs_att[e[s].name].pos;r.enableVertexAttribArray(h),r.vertexAttribPointer(h,o,r.FLOAT,!1,t,i),i+=4*o,this.wwg.inst_divisor(h,a)}ret.inst=f}return this.wwg.ext_vao&&this.wwg.vao_bind(null),this.wwg.ext_vao&&this.wwg.vao_bind(i),e&&(r.bindBuffer(r.ARRAY_BUFFER,a),r.bufferData(r.ARRAY_BUFFER,this.f32Array(s.vtx),s.dynamic?r.DYNAMIC_DRAW:r.STATIC_DRAW)),e&&s.idx&&(r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,l),s.vtx.length/ret.tl>65536&&this.wwg.ext_i32?(r.bufferData(r.ELEMENT_ARRAY_BUFFER,this.i32Array(s.idx),r.STATIC_DRAW),ret.i32=!0):(r.bufferData(r.ELEMENT_ARRAY_BUFFER,this.i16Array(s.idx),r.STATIC_DRAW),ret.i32=!1)),e&&n&&(r.bindBuffer(r.ARRAY_BUFFER,f),r.bufferData(r.ARRAY_BUFFER,this.f32Array(n.data),n.dynamic?r.DYNAMIC_DRAW:r.STATIC_DRAW)),this.wwg.ext_vao&&this.wwg.vao_bind(null),ret},e.prototype.Render.prototype.getModels=function(){return this.data.model.filter(t=>null!==t)},e.prototype.Render.prototype.getModelIdx=function(t){let e=!1;if("string"!=typeof t)e=parseInt(t);else for(let i=0;i<this.data.model.length;i++)if(null!==this.data.model[i]&&t==this.data.model[i].name){e=i;break}return e},e.prototype.Render.prototype.addModel=function(t){let e=!1;if(t.name&&(e=this.getModelIdx(t.name)),!1!==e)return this.data.model[e]=t,void(this.data.model[e].obuf=this.setObj(t,!0));this.data.model.push(t),this.data.model[this.data.model.length-1].obuf=this.setObj(t,!0),this.modelCount++},e.prototype.Render.prototype.removeModel=function(t){let e=this.getModelIdx(t);return!1!==e&&(this.data.model[e].obuf=null,this.data.model[e]=null,this.modelCount--,!0)},e.prototype.Render.prototype.updateModel=function(t,e,i,r=!0){let s=this.getModelIdx(t),n=this.data.model[s].obuf;switch(e){case"vbo":this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n.vbo);break;case"inst":this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n.inst)}r?this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,this.f32Array(i)):this.gl.bufferData(this.gl.ARRAY_BUFFER,this.f32Array(i),this.gl.DYNAMIC_DRAW)},e.prototype.Render.prototype.updateModelInstance=function(t,e,i){let r=this.getModelIdx(t),s=this.data.model[r].obuf;this.data.model[r].inst.count=i,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,s.inst),this.gl.bufferData(this.gl.ARRAY_BUFFER,this.f32Array(e),this.gl.DYNAMIC_DRAW)},e.prototype.Render.prototype.getModelData=function(t){let e=this.getModelIdx(t);return this.data.model[e]},e.prototype.Render.prototype.updateTex=function(t,e,i){"string"==typeof t&&(t=this.getTexIndex(t));var r=this.data.texture[t];this.gl.bindTexture(this.gl.TEXTURE_2D,this.texobj[t]),r.array?i?r.array instanceof Float32Array?this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,i.sx,i.sy,i.width,i.height,this.gl.RGBA,this.gl.FLOAT,e,i.ofs):this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,i.sx,i.sy,i.width,i.height,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e,i.ofs):r.array instanceof Float32Array?this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA16F,r.opt.width,r.opt.height,0,this.gl.RGBA,this.gl.FLOAT,e):this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,r.opt.width,r.opt.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e):i?i.wx>0&&i.wy>0?this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,i.sx,i.sy,i.wx,i.wy,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e):this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,i.sx,i.sy,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e):this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),r.opt&&!r.opt.nomipmap&&this.gl.generateMipmap(this.gl.TEXTURE_2D)},e.prototype.Render.prototype.pushUniValues=function(t){if(t.vs_uni)for(let e in t.vs_uni)this.update_uni.vs_uni[e]=t.vs_uni[e];if(t.fs_uni)for(let e in t.fs_uni)this.update_uni.fs_uni[e]=t.fs_uni[e]},e.prototype.Render.prototype.updateUniValues=function(t){t?this.setUniValues(this.update_uni):this.update_uni={vs_uni:{},fs_uni:{}}},e.prototype.Render.prototype.draw=function(t,e){let i=this.gl;i.useProgram(this.program),this.env.offscreen&&(i.bindFramebuffer(i.FRAMEBUFFER,this.fb.f),this.env.offscreen.mrt&&this.wwg.mrt_draw(this.fb.fblist),i.viewport(fb.offsetX,fb.offsetY,this.fb.width,this.fb.height)),e||this.clear();let r=this.data.model;for(let e=0;e<r.length;e++){if(null===r[e])continue;let s=r[e];if(s.hide)continue;if(null==s.obuf)continue;let n=s.geo;if(this.updateUniValues(0),this.pushUniValues(this.data),this.pushUniValues(s),t){Array.isArray(t)||(t=[t]);for(let i=0;i<t.length;i++)if(this.pushUniValues(t[i]),t[i].model){let r=t[i].model[e];r&&this.pushUniValues(r)}}this.updateUniValues(1);let a=s.obuf,o=n.ofs>0?n.ofs:0;if(this.wwg.ext_vao)this.wwg.vao_bind(a.vao);else{i.bindBuffer(i.ARRAY_BUFFER,a.vbo);let t=0;for(let t in this.vs_att)i.disableVertexAttribArray(this.vs_att[t].pos);for(let e=0;e<a.ats.length;e++){let r=this.wwg.vsize[a.ats[e].type];i.enableVertexAttribArray(this.vs_att[a.ats[e].name].pos),i.vertexAttribPointer(this.vs_att[a.ats[e].name].pos,r,i.FLOAT,!1,4*a.tl,t),t+=4*r}if(a.ibo&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,a.ibo),a.inst){let t=s.inst;i.bindBuffer(i.ARRAY_BUFFER,a.inst);let e=0;for(let r=0;r<a.iats.length;r++){let s=t.divisor?t.divisor[r]:1,n=this.wwg.vsize[a.iats[r].type],o=this.vs_att[a.iats[r].name].pos;i.enableVertexAttribArray(o),i.vertexAttribPointer(o,n,i.FLOAT,!1,a.itl,e),e+=4*n,this.wwg.inst_divisor(o,s)}}}s.preFunction&&s.preFunction(i,s,a),void 0!==s.blend&&(i.enable(i.BLEND),"alpha"==s.blend&&i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE)),void 0!==s.cull&&(s.cull?i.enable(i.CULL_FACE):i.disable(i.CULL_FACE));let h=this.wwg.dmodes[n.mode];if(void 0==h)return console.log("Error: illigal draw mode"),!1;s.inst?n.idx?this.wwg.inst_draw(h,n.idx.length,a.i32?i.UNSIGNED_INT:i.UNSIGNED_SHORT,o,s.inst.count):this.wwg.inst_drawa(h,o,n.count>0?n.count:n.vtx.length/a.tl,s.inst.count):n.idx?i.drawElements(h,n.idx.length,a.i32?i.UNSIGNED_INT:i.UNSIGNED_SHORT,o):i.drawArrays(h,o,n.count>0?n.count:n.vtx.length/a.tl),this.wwg.ext_vao&&this.wwg.vao_bind(null),void 0!==s.blend&&i.disable(i.BLEND),void 0!==s.cull&&(this.env.cull?i.enable(i.CULL_FACE):i.disable(i.CULL_FACE)),s.postFunction&&s.postFunction(i,s)}return this.env.offscreen&&(i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,this.wwg.can.width,this.wwg.can.height)),!0},t.WWG=e});
//# sourceMappingURL=sourcemaps/WWG.js.map
