(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();var we=1e-6,ne=typeof Float32Array<"u"?Float32Array:Array;function $e(){var e=new ne(9);return ne!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function qe(e,t,n,r,i,a,o,s,c){var f=new ne(9);return f[0]=e,f[1]=t,f[2]=n,f[3]=r,f[4]=i,f[5]=a,f[6]=o,f[7]=s,f[8]=c,f}function Ie(){var e=new ne(16);return ne!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function We(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function je(e,t,n,r,i){var a=1/Math.tan(t/2);if(e[0]=a/n,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,i!=null&&i!==1/0){var o=1/(r-i);e[10]=(i+r)*o,e[14]=2*i*r*o}else e[10]=-1,e[14]=-2*r;return e}var Ke=je;function Qe(e,t,n,r){var i,a,o,s,c,f,d,l,u,h,A=t[0],C=t[1],p=t[2],R=r[0],S=r[1],m=r[2],P=n[0],g=n[1],E=n[2];return Math.abs(A-P)<we&&Math.abs(C-g)<we&&Math.abs(p-E)<we?We(e):(d=A-P,l=C-g,u=p-E,h=1/Math.sqrt(d*d+l*l+u*u),d*=h,l*=h,u*=h,i=S*u-m*l,a=m*d-R*u,o=R*l-S*d,h=Math.sqrt(i*i+a*a+o*o),h?(h=1/h,i*=h,a*=h,o*=h):(i=0,a=0,o=0),s=l*o-u*a,c=u*i-d*o,f=d*a-l*i,h=Math.sqrt(s*s+c*c+f*f),h?(h=1/h,s*=h,c*=h,f*=h):(s=0,c=0,f=0),e[0]=i,e[1]=s,e[2]=d,e[3]=0,e[4]=a,e[5]=c,e[6]=l,e[7]=0,e[8]=o,e[9]=f,e[10]=u,e[11]=0,e[12]=-(i*A+a*C+o*p),e[13]=-(s*A+c*C+f*p),e[14]=-(d*A+l*C+u*p),e[15]=1,e)}function le(){var e=new ne(3);return ne!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function Oe(e){var t=e[0],n=e[1],r=e[2];return Math.sqrt(t*t+n*n+r*r)}function O(e,t,n){var r=new ne(3);return r[0]=e,r[1]=t,r[2]=n,r}function Fe(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function De(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e}function Je(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e}function Xe(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function ve(e,t){var n=t[0],r=t[1],i=t[2],a=n*n+r*r+i*i;return a>0&&(a=1/Math.sqrt(a)),e[0]=t[0]*a,e[1]=t[1]*a,e[2]=t[2]*a,e}function Ze(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function pe(e,t,n){var r=t[0],i=t[1],a=t[2],o=n[0],s=n[1],c=n[2];return e[0]=i*c-a*s,e[1]=a*o-r*c,e[2]=r*s-i*o,e}function ce(e,t,n){var r=n[0],i=n[1],a=n[2],o=n[3],s=t[0],c=t[1],f=t[2],d=i*f-a*c,l=a*s-r*f,u=r*c-i*s;return d=d+d,l=l+l,u=u+u,e[0]=s+o*d+i*u-a*l,e[1]=c+o*l+a*d-r*u,e[2]=f+o*u+r*l-i*d,e}var et=Oe;(function(){var e=le();return function(t,n,r,i,a,o){var s,c;for(n||(n=3),r||(r=0),i?c=Math.min(i*n+r,t.length):c=t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2];return t}})();function tt(){var e=new ne(4);return ne!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function nt(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=n*n+r*r+i*i+a*a;return o>0&&(o=1/Math.sqrt(o)),e[0]=n*o,e[1]=r*o,e[2]=i*o,e[3]=a*o,e}(function(){var e=tt();return function(t,n,r,i,a,o){var s,c;for(n||(n=4),r||(r=0),i?c=Math.min(i*n+r,t.length):c=t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],e[3]=t[s+3],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2],t[s+3]=e[3];return t}})();function me(){var e=new ne(4);return ne!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function Te(e,t,n){n=n*.5;var r=Math.sin(n);return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=Math.cos(n),e}function Pe(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[0],c=n[1],f=n[2],d=n[3];return e[0]=r*d+o*s+i*f-a*c,e[1]=i*d+o*c+a*s-r*f,e[2]=a*d+o*f+r*c-i*s,e[3]=o*d-r*s-i*c-a*f,e}function _e(e,t,n,r){var i=t[0],a=t[1],o=t[2],s=t[3],c=n[0],f=n[1],d=n[2],l=n[3],u,h,A,C,p;return h=i*c+a*f+o*d+s*l,h<0&&(h=-h,c=-c,f=-f,d=-d,l=-l),1-h>we?(u=Math.acos(h),A=Math.sin(u),C=Math.sin((1-r)*u)/A,p=Math.sin(r*u)/A):(C=1-r,p=r),e[0]=C*i+p*c,e[1]=C*a+p*f,e[2]=C*o+p*d,e[3]=C*s+p*l,e}function He(e,t){var n=t[0]+t[4]+t[8],r;if(n>0)r=Math.sqrt(n+1),e[3]=.5*r,r=.5/r,e[0]=(t[5]-t[7])*r,e[1]=(t[6]-t[2])*r,e[2]=(t[1]-t[3])*r;else{var i=0;t[4]>t[0]&&(i=1),t[8]>t[i*3+i]&&(i=2);var a=(i+1)%3,o=(i+2)%3;r=Math.sqrt(t[i*3+i]-t[a*3+a]-t[o*3+o]+1),e[i]=.5*r,r=.5/r,e[3]=(t[a*3+o]-t[o*3+a])*r,e[a]=(t[a*3+i]+t[i*3+a])*r,e[o]=(t[o*3+i]+t[i*3+o])*r}return e}var ye=nt;(function(){var e=le(),t=O(1,0,0),n=O(0,1,0);return function(r,i,a){var o=Ze(i,a);return o<-.999999?(pe(e,t,i),et(e)<1e-6&&pe(e,n,i),ve(e,e),Te(r,e,Math.PI),r):o>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(pe(e,i,a),r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=1+o,ye(r,r))}})();(function(){var e=me(),t=me();return function(n,r,i,a,o,s){return _e(e,r,o,s),_e(t,i,a,s),_e(n,e,t,2*s*(1-s)),n}})();(function(){var e=$e();return function(t,n,r,i){return e[0]=r[0],e[3]=r[1],e[6]=r[2],e[1]=i[0],e[4]=i[1],e[7]=i[2],e[2]=-n[0],e[5]=-n[1],e[8]=-n[2],ye(t,He(t,e))}})();function rt(e){const t=document.createElement("canvas");e.appendChild(t);const n=t.getContext("webgl2",{antialias:!0,depth:!0,alpha:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0});if(!n)throw new Error("WebGL2 not supported in this browser");const r=n;let i=()=>{},a=()=>{},o=!0;const s={canvas:t,gl:r,get width(){return t.width},get height(){return t.height},requestRender(){o=!0},onRender(d){i=d},onResize(d){a=d}};function c(){const d=Math.min(window.devicePixelRatio,2),l=Math.floor(e.clientWidth*d),u=Math.floor(e.clientHeight*d);(t.width!==l||t.height!==u)&&(t.width=l,t.height=u,r.viewport(0,0,l,u),a(),o=!0)}function f(){c(),o&&(o=!1,i()),requestAnimationFrame(f)}return requestAnimationFrame(f),window.addEventListener("resize",c),s}function ge(e){const t=document.getElementById("banner");t&&(t.textContent=e,t.style.display="block")}function ot(){const e=Ie(),t=Ie(),n=me(),r=O(0,0,0);let i=3,a=.01,o=1e3,s=1;function c(){const l=O(0,0,i);ce(l,l,n);const u=le();De(u,r,l);const h=O(0,1,0);ce(h,h,n),Qe(e,u,r,h)}function f(){const l=Math.PI/4,u=Math.max(.001,i*.01),h=Math.max(1e3,i*100);Ke(t,l,s,u,h)}function d(l,u){const h=O(1,0,0);ce(h,h,n);const A=O(0,1,0);ce(A,A,n);const C=me();Te(C,h,u);const p=me();Te(p,A,l),Pe(n,p,n),Pe(n,C,n),ye(n,n)}return c(),f(),{view:e,projection:t,attach(l,u){let h=!1,A=0,C=0;l.addEventListener("pointerdown",p=>{h=!0,A=p.clientX,C=p.clientY,l.setPointerCapture(p.pointerId)}),l.addEventListener("pointermove",p=>{if(!h)return;const R=p.clientX-A,S=p.clientY-C;if(A=p.clientX,C=p.clientY,p.shiftKey){const m=2*i*.4142/Math.max(l.clientHeight,1),P=O(1,0,0);ce(P,P,n);const g=O(0,1,0);ce(g,g,n),r[0]+=(-R*P[0]+S*g[0])*m,r[1]+=(-R*P[1]+S*g[1])*m,r[2]+=(-R*P[2]+S*g[2])*m}else{const m=2*Math.PI/Math.max(l.clientWidth,1);d(-R*m,-S*m)}c(),f(),u()}),l.addEventListener("pointerup",p=>{h=!1,l.releasePointerCapture(p.pointerId)}),l.addEventListener("pointercancel",p=>{h=!1,l.releasePointerCapture(p.pointerId)}),l.addEventListener("wheel",p=>{p.preventDefault(),i*=Math.exp(p.deltaY*.001),i=Math.max(a,Math.min(o,i)),c(),f(),u()},{passive:!1})},fitSphere(l,u){Fe(r,l);const h=Math.max(u,.001);i=h*2.5,a=h*.05,o=h*30,c(),f()},getViewState(){const l=O(0,0,i);ce(l,l,n);const u=le();De(u,r,l);const h=O(0,1,0);return ce(h,h,n),{eye:[u[0],u[1],u[2]],target:[r[0],r[1],r[2]],up:[h[0],h[1],h[2]]}},setLookAt(l,u,h){Fe(r,u);const A=le();Je(A,l,r);const C=Oe(A);if(C<1e-6)return;i=C;const p=le();Xe(p,A,1/C);const R=le();ve(R,h);const S=le();pe(S,R,p),ve(S,S),pe(R,p,S),ve(R,R);const m=qe(S[0],S[1],S[2],R[0],R[1],R[2],p[0],p[1],p[2]);He(n,m),ye(n,n),c(),f()},resize(l,u){s=l/Math.max(1,u),f()}}}function Me(e,t,n,r){const i=e.createShader(t);if(!i)throw new Error(`createShader failed for ${r}`);if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){const a=e.getShaderInfoLog(i)??"(no log)";throw e.deleteShader(i),new Error(`Shader compile failed [${r}]:
${a}`)}return i}function he(e,t,n,r){const i=Me(e,e.VERTEX_SHADER,t,`${r}.vert`),a=Me(e,e.FRAGMENT_SHADER,n,`${r}.frag`),o=e.createProgram();if(!o)throw new Error(`createProgram failed for ${r}`);if(e.attachShader(o,i),e.attachShader(o,a),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS)){const l=e.getProgramInfoLog(o)??"(no log)";throw e.deleteProgram(o),new Error(`Program link failed [${r}]:
${l}`)}const s=new Map,c=e.getProgramParameter(o,e.ACTIVE_UNIFORMS);for(let l=0;l<c;l++){const u=e.getActiveUniform(o,l);if(!u)continue;const h=e.getUniformLocation(o,u.name);h&&s.set(u.name,h)}const f=new Map,d=e.getProgramParameter(o,e.ACTIVE_ATTRIBUTES);for(let l=0;l<d;l++){const u=e.getActiveAttrib(o,l);u&&f.set(u.name,e.getAttribLocation(o,u.name))}return{program:o,uniforms:s,attribs:f}}function Ue(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed");e.bindVertexArray(r);for(const{def:a,location:o}of t){if(o<0)continue;const s=e.createBuffer();if(!s)throw new Error(`createBuffer failed for ${a.name}`);e.bindBuffer(e.ARRAY_BUFFER,s),e.bufferData(e.ARRAY_BUFFER,a.data,e.STATIC_DRAW),e.enableVertexAttribArray(o),e.vertexAttribPointer(o,a.size,a.type,a.normalized,0,0)}const i=e.createBuffer();if(!i)throw new Error("createBuffer failed for EBO");return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,i),e.bufferData(e.ELEMENT_ARRAY_BUFFER,n,e.STATIC_DRAW),e.bindVertexArray(null),{vao:r,ebo:i,indexCount:n.length,indexType:n instanceof Uint32Array?e.UNSIGNED_INT:e.UNSIGNED_SHORT}}function at(e){const t=e.split(/\r?\n/);if(t[0]!=="ply")throw new Error("Not a PLY file (missing 'ply' magic)");if(!t[1]||!t[1].startsWith("format ascii"))throw new Error("Only ASCII PLY is supported in M1");const n=[];let r=2;for(;r<t.length;){const u=t[r].trim();if(u==="end_header"){r++;break}if(u.startsWith("comment")||u===""){r++;continue}if(u.startsWith("element ")){const[,h,A]=u.split(/\s+/);n.push({name:h,count:parseInt(A,10),properties:[]})}else if(u.startsWith("property ")){const h=u.split(/\s+/);h[1]==="list"?n[n.length-1].properties.push({type:"list",countType:h[2],itemType:h[3],name:h[4]}):n[n.length-1].properties.push({type:h[1],name:h[2]})}r++}const i=n.find(u=>u.name==="vertex"),a=n.find(u=>u.name==="face");if(!i)throw new Error("PLY: no vertex element");if(!a)throw new Error("PLY: no face element");const o=new Float32Array(i.count*3),s=i.properties.findIndex(u=>u.name==="x"),c=i.properties.findIndex(u=>u.name==="red"),d=c>=0?new Uint8Array(i.count*3):null;for(let u=0;u<i.count;u++,r++){const h=t[r].trim().split(/\s+/);o[u*3+0]=parseFloat(h[s+0]),o[u*3+1]=parseFloat(h[s+1]),o[u*3+2]=parseFloat(h[s+2]),d&&(d[u*3+0]=parseInt(h[c+0],10),d[u*3+1]=parseInt(h[c+1],10),d[u*3+2]=parseInt(h[c+2],10))}const l=[];for(let u=0;u<a.count;u++,r++){const h=t[r].trim().split(/\s+/),A=parseInt(h[0],10);if(A!==3)throw new Error(`PLY: only triangle faces supported (got ${A}-gon at face ${u})`);l.push(parseInt(h[1],10),parseInt(h[2],10),parseInt(h[3],10))}return{vertices:o,normals:null,colors:d,indices:new Uint32Array(l)}}function it(e){return Ge(e)}function Ge(e){const t=e.split(/[,\s]+/).filter(r=>r.length>0),n=new Int32Array(t.length);for(let r=0;r<t.length;r++){const i=parseInt(t[r],10);if(Number.isNaN(i))throw new Error(`labels: non-integer token at index ${r}: "${t[r]}"`);n[r]=i}return n}const st=Ge;function ct(e){return st(e)}function lt(e,t,n){const r=Math.floor(e*6),i=e*6-r,a=n*(1-t),o=n*(1-i*t),s=n*(1-(1-i)*t);let c=0,f=0,d=0;switch(r%6){case 0:c=n,f=s,d=a;break;case 1:c=o,f=n,d=a;break;case 2:c=a,f=n,d=s;break;case 3:c=a,f=o,d=n;break;case 4:c=s,f=a,d=n;break;case 5:c=n,f=a,d=o;break}return[Math.round(c*255),Math.round(f*255),Math.round(d*255)]}function ut(e){const t=new Map,n=e.length;for(let r=0;r<n;r++){const i=e[r],[a,o,s]=lt(r/n,.6,.95);t.set(i,[a,o,s,255])}return t}function ft(e,t){const n=ut(t),r=new Uint8Array(e.length*4),i=[128,128,128,255];for(let a=0;a<e.length;a++){const o=n.get(e[a])??i;r[a*4+0]=o[0],r[a*4+1]=o[1],r[a*4+2]=o[2],r[a*4+3]=o[3]}return r}function dt(e,t){const n=new Array(t);for(let a=0;a<t;a++)n[a]=new Set;const r=e.length/3;for(let a=0;a<r;a++){const o=e[a*3+0],s=e[a*3+1],c=e[a*3+2];n[o].add(s),n[o].add(c),n[s].add(o),n[s].add(c),n[c].add(o),n[c].add(s)}const i=n.map(a=>Array.from(a));return{vertexCount:t,neighbours(a){return i[a]??[]}}}function ht(e,t){const n=e.length/3,r=new Float32Array(n*3),i=t.length/3;for(let a=0;a<i;a++){const o=t[a*3+0],s=t[a*3+1],c=t[a*3+2],f=e[o*3+0],d=e[o*3+1],l=e[o*3+2],u=e[s*3+0],h=e[s*3+1],A=e[s*3+2],C=e[c*3+0],p=e[c*3+1],R=e[c*3+2],S=u-f,m=h-d,P=A-l,g=C-f,E=p-d,I=R-l,y=m*I-P*E,v=P*g-S*I,_=S*E-m*g;r[o*3+0]+=y,r[o*3+1]+=v,r[o*3+2]+=_,r[s*3+0]+=y,r[s*3+1]+=v,r[s*3+2]+=_,r[c*3+0]+=y,r[c*3+1]+=v,r[c*3+2]+=_}for(let a=0;a<n;a++){const o=r[a*3+0],s=r[a*3+1],c=r[a*3+2],f=Math.sqrt(o*o+s*s+c*c);f>0&&(r[a*3+0]=o/f,r[a*3+1]=s/f,r[a*3+2]=c/f)}return r}function pt(e){const{vertices:t,labels:n,labelOrder:r,adjacency:i,normals:a}=e,o=i.vertexCount,s=new Float32Array(o*3),c=new Uint8Array(o),f=new Int32Array(o).fill(-1),d=[];for(let p=0;p<o;p++){if(c[p])continue;const R=n[p],S=d.length;d.push(R);const m=[p];for(c[p]=1;m.length>0;){const P=m.shift();f[P]=S;const g=i.neighbours(P);for(let E=0;E<g.length;E++){const I=g[E];!c[I]&&n[I]===R&&(c[I]=1,m.push(I))}}}const l=new Map;for(let p=0;p<r.length;p++)l.set(r[p],p);const u=new Uint8Array(o);for(let p=0;p<o;p++)l.has(n[p])||(u[p]=1);const h=new Uint8Array(o);for(let p=0;p<o;p++)u[p]&&(h[p]=1);const A=-1;for(let p=0;p<o;p++){if(u[p])continue;const R=t[p*3+0],S=t[p*3+1],m=t[p*3+2],P=f[p],g=n[p],E=l.get(g);let I=0,y=0,v=0,_=0;const T=i.neighbours(p);for(let x=0;x<T.length;x++){const w=T[x];if(u[w])continue;const F=f[w];if(F===P)continue;const M=d[F],N=l.get(M);if(N===void 0)continue;const B=(E>N?-1:1)*A,G=t[w*3+0],X=t[w*3+1],W=t[w*3+2];let Y=G-R,$=X-S,D=W-m;const b=Math.sqrt(Y*Y+$*$+D*D);b<1e-9||(Y=Y/b*B,$=$/b*B,D=D/b*B,I+=Y,y+=$,v+=D,_++)}_>0&&(s[p*3+0]=I/_,s[p*3+1]=y/_,s[p*3+2]=v/_,h[p]=1)}const C=200;for(let p=0;p<C;p++){let R=!1,S=!0;const m=new Uint8Array(h),P=new Float32Array(s);for(let g=0;g<o;g++){if(h[g])continue;S=!1;const E=i.neighbours(g);let I=0,y=0;for(let N=0;N<E.length;N++){const L=E[N];if(L===g||u[L]||!m[L])continue;I++;const B=t[L*3+0]-t[g*3+0],G=t[L*3+1]-t[g*3+1],X=t[L*3+2]-t[g*3+2],W=Math.sqrt(B*B+G*G+X*X);W>y&&(y=W)}if(I<2)continue;const v=a[g*3+0],_=a[g*3+1],T=a[g*3+2];let x=0,w=0,F=0,M=0;for(let N=0;N<E.length;N++){const L=E[N];if(L===g||u[L]||!m[L])continue;const B=t[L*3+0]-t[g*3+0],G=t[L*3+1]-t[g*3+1],X=t[L*3+2]-t[g*3+2],W=Math.sqrt(B*B+G*G+X*X);let Y=P[L*3+0],$=P[L*3+1],D=P[L*3+2];const b=Math.sqrt(Y*Y+$*$+D*D);let z=0,U=0,V=0;if(b>.001){const j=Y/b,q=$/b,oe=D/b;if(Math.abs(j*v+q*_+oe*T)<.98){const J=_*oe-T*q,Z=T*j-v*oe,ie=v*q-_*j,re=Math.sqrt(J*J+Z*Z+ie*ie);if(re>1e-9){const ee=J/re,te=Z/re,fe=ie/re;let H=te*T-fe*_,K=fe*v-ee*T,Q=ee*_-te*v;const ae=Math.sqrt(H*H+K*K+Q*Q);ae>1e-9&&(H/=ae,K/=ae,Q/=ae,z=H*b,U=K*b,V=Q*b)}}}const k=W/y;x+=k*z,w+=k*U,F+=k*V,M+=k}M>0&&(s[g*3+0]=x/M,s[g*3+1]=w/M,s[g*3+2]=F/M,h[g]=1,R=!0)}if(S||!R)break}return s}function mt(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed for arrow");e.bindVertexArray(r);const i=t.attribs.get("a_corner")??-1;if(i<0)throw new Error("arrow vertex shader missing attribute a_corner");const a=e.createBuffer();if(!a)throw new Error("createBuffer failed for a_corner");e.bindBuffer(e.ARRAY_BUFFER,a),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0);function o(c,f,d,l,u){const h=t.attribs.get(c)??-1;if(h<0)throw new Error(`arrow shader missing attribute ${c}`);const A=e.createBuffer();if(!A)throw new Error(`createBuffer failed for ${c}`);e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW),e.enableVertexAttribArray(h),e.vertexAttribPointer(h,d,l,u,0,0),e.vertexAttribDivisor(h,1)}o("a_instance_position",n.positions,3,e.FLOAT,!1),o("a_instance_direction",n.directions,3,e.FLOAT,!1),o("a_instance_normal",n.normals,3,e.FLOAT,!1),o("a_instance_color",n.colors,4,e.UNSIGNED_BYTE,!0),e.bindVertexArray(null);const s=n.positions.length/3;return{vao:r,instanceCount:s,draw(){e.bindVertexArray(r),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,s),e.bindVertexArray(null)}}}function wt(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed for curved arrow");e.bindVertexArray(r);function i(c,f,d,l,u){const h=t.attribs.get(c)??-1;if(h<0)throw new Error(`curved-arrow shader missing attribute ${c}`);const A=e.createBuffer();if(!A)throw new Error(`createBuffer failed for ${c}`);e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW),e.enableVertexAttribArray(h),e.vertexAttribPointer(h,d,l,u,0,0)}i("a_position",n.positions,3,e.FLOAT,!1),i("a_tangent",n.tangents,3,e.FLOAT,!1),i("a_normal",n.normals,3,e.FLOAT,!1),i("a_color",n.colors,4,e.UNSIGNED_BYTE,!0),i("a_stripY",n.stripY,1,e.FLOAT,!1),i("a_stripSide",n.stripSide,1,e.FLOAT,!1),e.bindVertexArray(null);const a=new Int32Array(n.firstIndices),o=new Int32Array(n.counts),s=a.length;return{vao:r,firstIndices:a,counts:o,draw(){e.bindVertexArray(r);for(let c=0;c<s;c++)e.drawArrays(e.TRIANGLE_STRIP,a[c],o[c]);e.bindVertexArray(null)}}}const Ye=8;function Be(e,t,n,r,i){const a=t*i[e*3],o=t*i[e*3+1],s=t*i[e*3+2],c=Math.sqrt(a*a+o*o+s*s);if(c<1e-6)return null;const f=a/c,d=o/c,l=s/c,u=r.neighbours(e);let h=-1,A=.3,C=0;for(let p=0;p<u.length;p++){const R=u[p],S=n[R*3]-n[e*3],m=n[R*3+1]-n[e*3+1],P=n[R*3+2]-n[e*3+2],g=Math.sqrt(S*S+m*m+P*P);if(g<1e-6)continue;const E=(S*f+m*d+P*l)/g;E>A&&(A=E,h=R,C=g)}return h===-1?null:{next:h,edgeLen:C}}function vt(e,t,n,r,i,a,o,s=Ye){const c=t.length;if(e.length!==c*3)throw new Error(`buildCurvedArrowBuffers: anchors.length (${e.length}) does not match anchorAdjacencyIndices.length*3 (${c*3})`);const f=2*s+1,d=2*f,l=c*d,u=new Float32Array(l*3),h=new Float32Array(l*3),A=new Float32Array(l*3),C=new Uint8Array(l*4),p=new Float32Array(l),R=new Float32Array(l),S=new Int32Array(c),m=new Int32Array(c),P=new Int32Array(f),g=new Float32Array(f*3),E=new Float32Array(f*3),I=new Float32Array(f*3),y=new Uint8Array(f*4);for(let v=0;v<c;v++){const _=t[v];for(let w=0;w<f;w++)P[w]=_;let T=_;for(let w=0;w<s;w++){const F=Be(T,-1,n,r,i);if(!F)break;T=F.next,P[s-1-w]=T}P[s]=_,T=_;for(let w=0;w<s;w++){const F=Be(T,1,n,r,i);if(!F)break;T=F.next,P[s+1+w]=T}for(let w=0;w<f;w++){const F=P[w];w===s?(g[w*3+0]=e[v*3+0],g[w*3+1]=e[v*3+1],g[w*3+2]=e[v*3+2]):(g[w*3+0]=n[F*3+0],g[w*3+1]=n[F*3+1],g[w*3+2]=n[F*3+2]);const M=i[F*3+0],N=i[F*3+1],L=i[F*3+2],B=Math.sqrt(M*M+N*N+L*L)||1;E[w*3+0]=M/B,E[w*3+1]=N/B,E[w*3+2]=L/B;const G=a[F*3+0],X=a[F*3+1],W=a[F*3+2],Y=Math.sqrt(G*G+X*X+W*W)||1;I[w*3+0]=G/Y,I[w*3+1]=X/Y,I[w*3+2]=W/Y,y[w*4+0]=o[F*4+0],y[w*4+1]=o[F*4+1],y[w*4+2]=o[F*4+2],y[w*4+3]=255}const x=v*d;S[v]=x,m[v]=d;for(let w=0;w<f;w++){const M=2*(w/(f-1))-1;for(let N=0;N<2;N++){const L=x+w*2+N;u[L*3+0]=g[w*3+0],u[L*3+1]=g[w*3+1],u[L*3+2]=g[w*3+2],h[L*3+0]=E[w*3+0],h[L*3+1]=E[w*3+1],h[L*3+2]=E[w*3+2],A[L*3+0]=I[w*3+0],A[L*3+1]=I[w*3+1],A[L*3+2]=I[w*3+2],C[L*4+0]=y[w*4+0],C[L*4+1]=y[w*4+1],C[L*4+2]=y[w*4+2],C[L*4+3]=y[w*4+3],p[L]=M,R[L]=N===0?-1:1}}}return{positions:u,tangents:h,normals:A,colors:C,stripY:p,stripSide:R,firstIndices:S,counts:m}}const yt="di-cache",ue="datasets",_t=1,Ce="current";function Se(){return new Promise(e=>{if(typeof indexedDB>"u"){e(null);return}let t;try{t=indexedDB.open(yt,_t)}catch(n){console.warn("[datasetCache] indexedDB.open threw:",n),e(null);return}t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(ue)||n.createObjectStore(ue)},t.onsuccess=()=>e(t.result),t.onerror=()=>{console.warn("[datasetCache] failed to open DB:",t.error),e(null)},t.onblocked=()=>{console.warn("[datasetCache] open blocked by another connection"),e(null)}})}async function ze(e){const t=await Se();if(t)try{await new Promise(n=>{const r=t.transaction(ue,"readwrite"),i=r.objectStore(ue),a={...e,savedAt:Date.now()},o=i.put(a,Ce);o.onerror=()=>{console.warn("[datasetCache] put failed:",o.error)},r.oncomplete=()=>n(),r.onerror=()=>{console.warn("[datasetCache] save tx error:",r.error),n()},r.onabort=()=>{console.warn("[datasetCache] save tx aborted:",r.error),n()}})}catch(n){console.warn("[datasetCache] saveDataset threw:",n)}finally{t.close()}}async function bt(){const e=await Se();if(!e)return null;try{return await new Promise(t=>{const n=e.transaction(ue,"readonly"),i=n.objectStore(ue).get(Ce);i.onsuccess=()=>{const a=i.result;if(!a){t(null);return}typeof a.name=="string"&&typeof a.plyText=="string"&&typeof a.labelsText=="string"&&typeof a.orderText=="string"&&typeof a.savedAt=="number"?t(a):(console.warn("[datasetCache] cached record has unexpected shape; ignoring"),t(null))},i.onerror=()=>{console.warn("[datasetCache] get failed:",i.error),t(null)},n.onerror=()=>{console.warn("[datasetCache] load tx error:",n.error),t(null)},n.onabort=()=>{console.warn("[datasetCache] load tx aborted:",n.error),t(null)}})}catch(t){return console.warn("[datasetCache] loadCachedDataset threw:",t),null}finally{e.close()}}async function xt(){const e=await Se();if(e)try{await new Promise(t=>{const n=e.transaction(ue,"readwrite"),i=n.objectStore(ue).delete(Ce);i.onerror=()=>{console.warn("[datasetCache] delete failed:",i.error)},n.oncomplete=()=>t(),n.onerror=()=>{console.warn("[datasetCache] clear tx error:",n.error),t()},n.onabort=()=>{console.warn("[datasetCache] clear tx aborted:",n.error),t()}})}catch(t){console.warn("[datasetCache] clearDataset threw:",t)}finally{e.close()}}function Et(e,t){const n=e.length,r=new Uint8Array(n);for(let i=0;i<n;i++){const a=e[i],o=t.neighbours(i);for(let s=0;s<o.length;s++)if(e[o[s]]!==a){r[i]=1;break}}return r}function At(e,t,n,r,i,a,o=.05,s){const c=t.vertexCount,f=o*o,d=new Int32Array(c);for(let E=0;E<c;E++)d[E]=E;let l=3737844653;const u=()=>(l=l*1664525+1013904223>>>0,(l&4294967295)/4294967295);for(let E=c-1;E>0;E--){const I=Math.floor(u()*(E+1)),y=d[E];d[E]=d[I],d[I]=y}const h=new Uint8Array(c),A=new Float32Array(c),C=[];for(let E=0;E<c;E++){const I=d[E];if(h[I]||s&&!s[I])continue;const y=n[I*3],v=n[I*3+1],_=n[I*3+2];if(y*y+v*v+_*_<f)continue;C.push(I),A.fill(1/0),A[I]=0,h[I]=1;const T=[{d:0,u:I}];for(;T.length>0;){let x=0;for(let L=1;L<T.length;L++)T[L].d<T[x].d&&(x=L);const w=T[x];T[x]=T[T.length-1],T.pop();const F=w.d,M=w.u;if(F>A[M])continue;if(F>a)break;h[M]=1;const N=t.neighbours(M);for(let L=0;L<N.length;L++){const B=N[L],G=e[B*3]-e[M*3],X=e[B*3+1]-e[M*3+1],W=e[B*3+2]-e[M*3+2],Y=Math.sqrt(G*G+X*X+W*W),$=F+Y;$<A[B]&&$<=a&&(A[B]=$,T.push({d:$,u:B}))}}}const p=C.length,R=new Float32Array(p*3),S=new Float32Array(p*3),m=new Float32Array(p*3),P=new Uint8Array(p*4),g=new Int32Array(p);for(let E=0;E<p;E++){const I=C[E];g[E]=I,R[E*3+0]=e[I*3+0],R[E*3+1]=e[I*3+1],R[E*3+2]=e[I*3+2];const y=n[I*3],v=n[I*3+1],_=n[I*3+2],T=Math.sqrt(y*y+v*v+_*_)||1;S[E*3+0]=y/T,S[E*3+1]=v/T,S[E*3+2]=_/T,m[E*3+0]=r[I*3],m[E*3+1]=r[I*3+1],m[E*3+2]=r[I*3+2],P[E*4+0]=i[I*4],P[E*4+1]=i[I*4+1],P[E*4+2]=i[I*4+2],P[E*4+3]=255}return{positions:R,directions:S,normals:m,colors:P,vertexIDs:g}}function Tt(e,t,n=.8){const r=e.positions.length/3;if(r===0)return e;const i=(t*n)**2,a=t*n,o=new Map,s=new Uint8Array(r),c=new Float32Array(r),f=new Float32Array(r),d=new Float32Array(r);for(let m=0;m<r;m++)c[m]=e.positions[m*3],f[m]=e.positions[m*3+1],d[m]=e.positions[m*3+2];for(let m=0;m<r;m++){const P=Math.floor(c[m]/a),g=Math.floor(f[m]/a),E=Math.floor(d[m]/a);let I=!1;e:for(let y=-1;y<=1;y++)for(let v=-1;v<=1;v++)for(let _=-1;_<=1;_++){const T=`${P+_},${g+v},${E+y}`,x=o.get(T);if(x)for(let w=0;w<x.length;w++){const F=x[w],M=c[F]-c[m],N=f[F]-f[m],L=d[F]-d[m];if(M*M+N*N+L*L<i){I=!0;break e}}}if(!I){s[m]=1;const y=`${P},${g},${E}`,v=o.get(y);v?v.push(m):o.set(y,[m])}}let l=0;for(let m=0;m<r;m++)s[m]&&l++;const u=new Float32Array(l*3),h=new Float32Array(l*3),A=new Float32Array(l*3),C=new Uint8Array(l*4),p=e.vertexIDs??null,R=p?new Int32Array(l):null;let S=0;for(let m=0;m<r;m++)s[m]&&(u[S*3+0]=e.positions[m*3+0],u[S*3+1]=e.positions[m*3+1],u[S*3+2]=e.positions[m*3+2],h[S*3+0]=e.directions[m*3+0],h[S*3+1]=e.directions[m*3+1],h[S*3+2]=e.directions[m*3+2],A[S*3+0]=e.normals[m*3+0],A[S*3+1]=e.normals[m*3+1],A[S*3+2]=e.normals[m*3+2],C[S*4+0]=e.colors[m*4+0],C[S*4+1]=e.colors[m*4+1],C[S*4+2]=e.colors[m*4+2],C[S*4+3]=e.colors[m*4+3],R&&p&&(R[S]=p[m]),S++);return{positions:u,directions:h,normals:A,colors:C,vertexIDs:R}}function gt(e,t,n,r,i,a,o,s=.05){const c=t.vertexCount,f=s*s,d=new Int32Array(c);for(let y=0;y<c;y++)d[y]=y;let l=1592651789;const u=()=>(l=l*1664525+1013904223>>>0,(l&4294967295)/4294967295);for(let y=c-1;y>0;y--){const v=Math.floor(u()*(y+1)),_=d[y];d[y]=d[v],d[v]=_}const h=new Uint8Array(c),A=[];function C(y,v){const _=v*n[y*3],T=v*n[y*3+1],x=v*n[y*3+2],w=Math.sqrt(_*_+T*T+x*x);if(w<1e-6)return null;const F=_/w,M=T/w,N=x/w,L=t.neighbours(y);let B=-1,G=.3,X=0;for(let W=0;W<L.length;W++){const Y=L[W],$=e[Y*3]-e[y*3],D=e[Y*3+1]-e[y*3+1],b=e[Y*3+2]-e[y*3+2],z=Math.sqrt($*$+D*D+b*b);if(z<1e-6)continue;const U=($*F+D*M+b*N)/z;U>G&&(G=U,B=Y,X=z)}return B===-1?null:{next:B,edgeLen:X}}function p(y){const v=new Map;v.set(y,0);const _=[{d:0,u:y}];for(;_.length>0;){let T=0;for(let F=1;F<_.length;F++)_[F].d<_[T].d&&(T=F);const x=_[T];if(_[T]=_[_.length-1],_.pop(),x.d>(v.get(x.u)??1/0))continue;if(x.d>o)break;h[x.u]=1;const w=t.neighbours(x.u);for(let F=0;F<w.length;F++){const M=w[F],N=e[M*3]-e[x.u*3],L=e[M*3+1]-e[x.u*3+1],B=e[M*3+2]-e[x.u*3+2],G=Math.sqrt(N*N+L*L+B*B),X=x.d+G;X<=o&&X<(v.get(M)??1/0)&&(v.set(M,X),_.push({d:X,u:M}))}}}function R(y,v,_){const T=[];let x=y,w=0;_&&T.push(x);const F=500;for(let M=0;M<F;M++){const N=C(x,v);if(!N||h[N.next])break;if(w+=N.edgeLen,x=N.next,w>=a){const L=n[x*3],B=n[x*3+1],G=n[x*3+2];if(L*L+B*B+G*G<f)break;T.push(x),w=0}}return T}for(let y=0;y<c;y++){const v=d[y];if(h[v])continue;const _=n[v*3],T=n[v*3+1],x=n[v*3+2];if(_*_+T*T+x*x<f)continue;const w=R(v,1,!0),F=R(v,-1,!1),M=w.concat(F);if(M.length!==0){for(const N of M)p(N);A.push(...M)}}const S=A.length,m=new Float32Array(S*3),P=new Float32Array(S*3),g=new Float32Array(S*3),E=new Uint8Array(S*4),I=new Int32Array(S);for(let y=0;y<S;y++){const v=A[y];I[y]=v,m[y*3+0]=e[v*3+0],m[y*3+1]=e[v*3+1],m[y*3+2]=e[v*3+2];const _=n[v*3],T=n[v*3+1],x=n[v*3+2],w=Math.sqrt(_*_+T*T+x*x)||1;P[y*3+0]=_/w,P[y*3+1]=T/w,P[y*3+2]=x/w,g[y*3+0]=r[v*3],g[y*3+1]=r[v*3+1],g[y*3+2]=r[v*3+2],E[y*4+0]=i[v*4],E[y*4+1]=i[v*4+1],E[y*4+2]=i[v*4+2],E[y*4+3]=255}return{positions:m,directions:P,normals:g,colors:E,vertexIDs:I}}const be={showLIC:!0,showColor:!0,showArrows:!0,useLabelColors:!1,licIterations:50,licHighContrast:!0,licEmphasizeSingular:!1,arrowCurved:!1,arrowBorderMode:!1,arrowDensity:.07,arrowScale:.0075,arrowHeight:2.5,arrowWidth:1.5,arrowBodyWidth:.25,arrowDist:.5,arrowOpacity:.6,arrowFlipDirection:!1,arrowColorR:0,arrowColorG:0,arrowColorB:0,bgColorR:.07,bgColorG:.07,bgColorB:.07,parcelSmoothing:1,parcelRefinement:0,surfaceAmbient:.04,surfaceDiffuse:.75,surfaceSpecular:.4,surfaceShininess:80,screenshotDPI:150,lastDatasetName:null},Re="di-panel-params-v1";function Ct(){try{const e=window.localStorage.getItem(Re);if(!e)return{...be};const t=JSON.parse(e);return{...be,...t}}catch{return{...be}}}function Ne(e){try{window.localStorage.setItem(Re,JSON.stringify(e))}catch{}}const St=[{key:"showLIC",label:"LIC streamlines",type:"checkbox"},{key:"showColor",label:"Parcellation colors",type:"checkbox"},{key:"useLabelColors",label:"Use label-order palette (override PLY RGB)",type:"checkbox"},{key:"showArrows",label:"Arrows",type:"checkbox"}],Rt=[{key:"licIterations",label:"Streamline length (iterations)",type:"range",min:5,max:100,step:1},{key:"licHighContrast",label:"High contrast",type:"checkbox"},{key:"licEmphasizeSingular",label:"Emphasize singularities",type:"checkbox"}],Lt=[{key:"arrowBorderMode",label:"Borders only (M2 mode)",type:"checkbox",expensive:!0},{key:"arrowDensity",label:"Density (smaller = denser)",type:"range",min:.02,max:.18,step:.005,expensive:!0},{key:"arrowScale",label:"Size",type:"range",min:.002,max:.025,step:5e-4,expensive:!0},{key:"arrowHeight",label:"Length",type:"range",min:.5,max:8,step:.1,expensive:!0},{key:"arrowWidth",label:"Head width",type:"range",min:.5,max:4,step:.1},{key:"arrowBodyWidth",label:"Body width (fraction of head)",type:"range",min:.05,max:1,step:.02},{key:"arrowDist",label:"Distance from surface",type:"range",min:0,max:5,step:.1},{key:"arrowOpacity",label:"Opacity",type:"range",min:0,max:1,step:.02},{key:"arrowFlipDirection",label:"Flip direction",type:"checkbox"},{key:"arrowColorR",label:"Color",type:"color"}],It=[{key:"bgColorR",label:"Background",type:"color"}],Ft=[{key:"surfaceAmbient",label:"Ambient",type:"range",min:0,max:.5,step:.01},{key:"surfaceDiffuse",label:"Diffuse",type:"range",min:0,max:1.5,step:.05},{key:"surfaceSpecular",label:"Specular (glare)",type:"range",min:0,max:1,step:.02},{key:"surfaceShininess",label:"Shininess (sharpness)",type:"range",min:1,max:400,step:1}],Le="di-panel-collapsed-v1";function Dt(){try{const e=window.localStorage.getItem(Le);if(!e)return new Set;const t=JSON.parse(e);return Array.isArray(t)?new Set(t.filter(n=>typeof n=="string")):new Set}catch{return new Set}}function Pt(e){try{window.localStorage.setItem(Le,JSON.stringify(Array.from(e)))}catch{}}function de(e,t,n,r){const i=document.createElement("div");if(i.className="panel-control",e.type==="range"){const a=document.createElement("label");a.className="panel-label";const o=document.createElement("span");o.className="panel-label-text",o.textContent=e.label,a.appendChild(o);const s=l=>e.step!==void 0&&String(e.step).includes(".")?l.toFixed(3):String(l),c=document.createElement("input");c.type="text",c.className="panel-value panel-value-input",c.inputMode="decimal",c.spellcheck=!1,c.value=s(t[e.key]),c.title=`Click to type a value (range: ${e.min}–${e.max})`,a.appendChild(c);const f=document.createElement("input");f.type="range",f.min=String(e.min),f.max=String(e.max),f.step=String(e.step),f.value=String(t[e.key]);const d=l=>{let u=l;e.min!==void 0&&u<e.min&&(u=e.min),e.max!==void 0&&u>e.max&&(u=e.max),t[e.key]=u,f.value=String(u),c.value=s(u),n()};f.addEventListener("input",()=>d(parseFloat(f.value))),c.addEventListener("focus",()=>c.select()),c.addEventListener("keydown",l=>{if(l.key==="Enter"){l.preventDefault();const u=parseFloat(c.value);Number.isFinite(u)?d(u):c.value=s(t[e.key]),c.blur()}else l.key==="Escape"&&(c.value=s(t[e.key]),c.blur())}),c.addEventListener("blur",()=>{const l=parseFloat(c.value);Number.isFinite(l)?d(l):c.value=s(t[e.key])}),i.appendChild(a),i.appendChild(f)}else if(e.type==="checkbox"){i.classList.add("checkbox-row");const a=document.createElement("input");a.type="checkbox",a.checked=!!t[e.key],a.id=`panel-cb-${String(e.key)}`,a.addEventListener("change",()=>{t[e.key]=a.checked,n()});const o=document.createElement("label");o.className="panel-label",o.htmlFor=a.id;const s=document.createElement("span");s.className="panel-label-text",s.textContent=e.label,o.appendChild(s),i.appendChild(a),i.appendChild(o)}else if(e.type==="color"){const a=document.createElement("label");a.className="panel-label";const o=document.createElement("span");o.className="panel-label-text",o.textContent=e.label,a.appendChild(o);const s=e.key,c=s,f=s.replace(/R$/,"G"),d=s.replace(/R$/,"B"),l=t,u=document.createElement("input");u.type="color";const h=C=>Math.max(0,Math.min(255,Math.round(C*255))),A=(C,p,R)=>"#"+[C,p,R].map(S=>h(S).toString(16).padStart(2,"0")).join("");u.value=A(l[c],l[f],l[d]),u.addEventListener("input",()=>{const C=u.value.slice(1);l[c]=parseInt(C.slice(0,2),16)/255,l[f]=parseInt(C.slice(2,4),16)/255,l[d]=parseInt(C.slice(4,6),16)/255,n()}),i.appendChild(a),i.appendChild(u)}if(r){const a=document.createElement("div");a.className="panel-note",a.textContent="Recomputed on release (~200 ms)",i.appendChild(a)}return i}function Mt(e,t,n,r,i){const a=document.createElement("div");a.id="panel-root";const o=document.createElement("button");o.id="panel-toggle",o.title="Toggle controls",o.setAttribute("aria-label","Toggle controls"),o.innerHTML='<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 2L7.5 7L2.5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';const s=document.createElement("div");s.id="panel";const c=document.createElement("div");c.id="panel-titlebar";const f=document.createElement("span");f.id="panel-title",f.textContent="Controls";const d=document.createElement("button");d.id="panel-collapse-btn",d.type="button",d.title="Hide controls",d.setAttribute("aria-label","Hide controls"),d.innerHTML='<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',c.appendChild(f),c.appendChild(d),s.appendChild(c);const l=Dt(),u=(v,_)=>{const T=document.createElement("section");T.className="panel-section",T.dataset.section=v;const x=document.createElement("button");x.type="button",x.className="panel-heading",x.setAttribute("aria-expanded","true");const w=document.createElement("span");w.className="panel-heading-caret",w.textContent="▾";const F=document.createElement("span");F.className="panel-heading-title",F.textContent=_,x.appendChild(w),x.appendChild(F);const M=document.createElement("div");M.className="panel-section-body";const N=document.createElement("div");N.className="panel-section-inner",M.appendChild(N);const L=B=>{T.classList.toggle("collapsed",B),w.textContent=B?"▸":"▾",x.setAttribute("aria-expanded",B?"false":"true")};return L(l.has(v)),x.addEventListener("click",()=>{const B=!T.classList.contains("collapsed");L(B),B?l.add(v):l.delete(v),Pt(l)}),T.appendChild(x),T.appendChild(M),s.appendChild(T),N};if(n){const v=u("data","Data"),_=document.createElement("div");_.className="panel-note",e.lastDatasetName?(_.textContent=`Loaded: ${e.lastDatasetName}`,_.style.color="var(--ok)"):_.textContent="Pick a .ply + .labels + .labelorder triple",v.appendChild(_);const T=document.createElement("div");T.className="panel-file-row";const x=document.createElement("input");x.type="file",x.multiple=!0,x.accept=".ply,.labels,.labelorder",x.id="panel-file-input",x.className="panel-file-input";const w=document.createElement("label");w.htmlFor=x.id,w.className="panel-file-label",w.innerHTML='<span class="icon" aria-hidden="true">⬆</span><span>Choose files…</span>',x.addEventListener("change",async()=>{if(!x.files)return;const F=Array.from(x.files),M=F.find(B=>B.name.toLowerCase().endsWith(".ply")),N=F.find(B=>B.name.toLowerCase().endsWith(".labels")),L=F.find(B=>B.name.toLowerCase().endsWith(".labelorder"));if(!M||!N||!L){_.textContent="Need exactly one .ply, .labels, and .labelorder",_.style.color="var(--danger)";return}_.textContent="Loading…",_.style.color="var(--text-mute)";try{await n({ply:M,labels:N,labelorder:L}),e.lastDatasetName=M.name,Ne(e),_.textContent=`Loaded: ${M.name}`,_.style.color="var(--ok)"}catch(B){_.textContent="Error: "+(B instanceof Error?B.message:String(B)),_.style.color="var(--danger)"}}),T.appendChild(x),T.appendChild(w),v.appendChild(T)}let h=!1,A=null;const C=()=>{Ne(e),h&&(A!==null&&clearTimeout(A),A=window.setTimeout(()=>{A=null;const v=h;h=!1,t(e,v)},250)),t(e,!1)};if(i){const v=u("view","View"),_=document.createElement("div");_.className="panel-view-grid";const T=[{name:"lateral-left",label:"Lateral L"},{name:"lateral-right",label:"Lateral R"},{name:"anterior",label:"Anterior"},{name:"posterior",label:"Posterior"},{name:"dorsal",label:"Dorsal"},{name:"ventral",label:"Ventral"}];for(const w of T){const F=document.createElement("button");F.type="button",F.className="panel-view-btn",F.textContent=w.label,F.addEventListener("click",()=>i.set(w.name)),_.appendChild(F)}v.appendChild(_);const x=document.createElement("div");x.className="panel-note",x.textContent="Or rotate freely with mouse drag. Position auto-saves.",v.appendChild(x)}const p=u("visibility","Visibility");for(const v of St)p.appendChild(de(v,e,C,!1));const R=u("lic","LIC");for(const v of Rt)R.appendChild(de(v,e,C,!1));const S=u("scene","Scene");for(const v of It)S.appendChild(de(v,e,C,!1));const m=u("surface","Surface shading");for(const v of Ft)m.appendChild(de(v,e,C,!1));const P=u("arrows","Arrows");for(const v of Lt){const _=!!v.expensive;P.appendChild(de(v,e,()=>{_&&(h=!0),C()},_))}if(r){const v=u("screenshot","Screenshot"),_=document.createElement("div");_.className="panel-note",_.textContent="Saves PNG with transparent background",v.appendChild(_);const T={key:"screenshotDPI",label:"Resolution (DPI)",type:"range",min:72,max:1200,step:6};v.appendChild(de(T,e,C,!1));const x=document.createElement("button");x.type="button",x.className="panel-btn",x.innerHTML='<span class="icon" aria-hidden="true">⤓</span><span>Current view</span>',x.addEventListener("click",async()=>{x.disabled=!0;try{await r.current()}finally{x.disabled=!1}}),v.appendChild(x);const w=document.createElement("button");w.type="button",w.className="panel-btn",w.style.marginTop="8px",w.innerHTML='<span class="icon" aria-hidden="true">▦</span><span>All canonical views</span>',w.addEventListener("click",async()=>{w.disabled=!0;try{await r.canonical()}finally{w.disabled=!1}}),v.appendChild(w)}const g=document.createElement("div");g.className="panel-control",g.style.marginTop="22px";const E=document.createElement("button");E.id="panel-reset",E.type="button",E.innerHTML='<span class="icon" aria-hidden="true">↻</span><span>Reset to defaults</span>',E.addEventListener("click",async()=>{try{window.localStorage.removeItem(Re)}catch{}try{window.localStorage.removeItem(Le)}catch{}try{window.localStorage.removeItem("di-camera-state-v1")}catch{}await xt(),window.location.reload()}),g.appendChild(E),s.appendChild(g);let I=!0;const y=v=>{I=v,s.classList.toggle("closed",!I),o.classList.toggle("closed",!I),o.title=I?"Hide controls":"Show controls",o.setAttribute("aria-label",I?"Hide controls":"Show controls")};return o.addEventListener("click",()=>y(!I)),d.addEventListener("click",()=>y(!1)),y(!0),a.appendChild(o),a.appendChild(s),{element:a,toggle:()=>y(!I)}}function xe(e,t){if(t.colors.some(c=>c.type===e.FLOAT||c.type===e.HALF_FLOAT)&&!e.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float not supported — cannot create float-format FBO");const r=e.createFramebuffer();if(!r)throw new Error("createFramebuffer failed");let i=[],a=null;function o(c,f){e.bindFramebuffer(e.FRAMEBUFFER,r);for(const l of i)e.deleteTexture(l);if(a&&e.deleteTexture(a),i=[],a=null,t.colors.forEach((l,u)=>{const h=e.createTexture();if(!h)throw new Error(`createTexture failed for color attachment ${u}`);e.bindTexture(e.TEXTURE_2D,h),e.texImage2D(e.TEXTURE_2D,0,l.internalFormat,c,f,0,l.format,l.type,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,l.minFilter??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,l.magFilter??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,l.wrapS??e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,l.wrapT??e.CLAMP_TO_EDGE),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+u,e.TEXTURE_2D,h,0),i.push(h)}),t.depth){const l=e.createTexture();if(!l)throw new Error("createTexture failed for depth attachment");e.bindTexture(e.TEXTURE_2D,l),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT32F,c,f,0,e.DEPTH_COMPONENT,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,l,0),a=l}const d=e.checkFramebufferStatus(e.FRAMEBUFFER);if(d!==e.FRAMEBUFFER_COMPLETE)throw new Error(`Framebuffer incomplete: 0x${d.toString(16)}`);e.bindFramebuffer(e.FRAMEBUFFER,null)}return o(t.width,t.height),{fbo:r,get width(){return t.width},get height(){return t.height},get colorTextures(){return i},get depthTexture(){return a},bind(){e.bindFramebuffer(e.FRAMEBUFFER,r),e.viewport(0,0,t.width,t.height);const c=t.colors.map((f,d)=>e.COLOR_ATTACHMENT0+d);e.drawBuffers(c)},resize(c,f){t.width=c,t.height=f,o(c,f)},generateMipmaps(){t.colors.forEach((c,f)=>{c.mipmap&&(e.bindTexture(e.TEXTURE_2D,i[f]),e.generateMipmap(e.TEXTURE_2D))}),t.depth&&a&&(e.bindTexture(e.TEXTURE_2D,a),e.generateMipmap(e.TEXTURE_2D))}}}function Ee(e,t){if(t<0)throw new Error("screenQuad: a_position attribute not found in program");const n=e.createVertexArray();if(!n)throw new Error("createVertexArray failed for screenQuad");e.bindVertexArray(n);const r=e.createBuffer();if(!r)throw new Error("createBuffer failed for screenQuad");return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),n}function Ut(e){let t=e>>>0;return function(){t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),(n^n>>>14)>>>0}}function Bt(e,t,n,r){const i=Ut(r),a=new Uint8Array(e*t*n);for(let o=0;o<a.length;o++)a[o]=i()&255;return a}const zt=`#version 300 es
precision highp float;

in vec3 a_position;
in vec3 a_normal;
in vec4 a_color;
in vec3 a_vector;

uniform mat4 u_view;
uniform mat4 u_projection;
uniform vec3 u_meshBBMin;
uniform vec3 u_meshBBMax;

out vec4 v_color;
out vec3 v_normalView;
out vec3 v_vectorView;
out vec3 v_noiseCoord;
out vec4 v_posView;

void main() {
  v_color = a_color;
  v_vectorView = (u_view * vec4(a_vector, 0.0)).xyz;
  v_normalView = (u_view * vec4(a_normal, 0.0)).xyz;
  v_posView = u_view * vec4(a_position, 1.0);
  v_noiseCoord = 2.0 * (a_position - u_meshBBMin) / (u_meshBBMax - u_meshBBMin);
  gl_Position = u_projection * v_posView;
}
`,Nt=`#version 300 es
precision highp float;
precision highp sampler3D;

in vec4 v_color;
in vec3 v_normalView;
in vec3 v_vectorView;
in vec3 v_noiseCoord;
in vec4 v_posView;

uniform sampler3D u_noiseSampler;

layout(location = 0) out vec4 fragColor;
layout(location = 1) out vec4 fragVec;
layout(location = 2) out vec4 fragNoise;
layout(location = 3) out vec4 fragNormal; // view-space normal — for arrow G-buffer sampling
layout(location = 4) out vec4 fragPos;    // view-space position — for arrow G-buffer sampling

// FN_PROVIDED_BY_HOST: blinnPhongIlluminationIntensityFullDiffuse
// (host code prepends shading.glsl before this body)
float blinnPhongIlluminationIntensityFullDiffuse(in vec3 normal);

void main() {
  float noise = texture(u_noiseSampler, v_noiseCoord).r;
  float light = blinnPhongIlluminationIntensityFullDiffuse(normalize(v_normalView));

  fragColor = vec4(light * v_color.rgb, 1.0);
  fragVec = vec4(v_vectorView, 1.0); // alpha=1 marks "inside mesh"; outside stays 0 from FBO clear
  fragNoise = vec4(vec3(noise), 1.0);
  fragNormal = vec4(normalize(v_normalView), 1.0);
  fragPos = v_posView;
}
`,kt=`// Minimal Phong helper, parameterized via uniforms so the panel can tune the
// look without re-linking shaders. Inlined into the LIC transform fragment by
// surfaceLIC.ts's injectShading().

uniform float u_surfaceAmbient;
uniform float u_surfaceDiffuse;
uniform float u_surfaceSpecular;
uniform float u_surfaceShininess;

float blinnPhongIlluminationIntensityFullDiffuse(in vec3 normal) {
  // Light + view both along +z in view space (head-lamp).
  vec3 L = vec3(0.0, 0.0, 1.0);
  float diffuse = max(dot(normal, L), 0.0);
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 H = normalize(L + V);
  float specBase = max(dot(normal, H), 0.0);
  float specular = pow(specBase, max(u_surfaceShininess, 1.0));
  return u_surfaceAmbient + u_surfaceDiffuse * diffuse + u_surfaceSpecular * specular;
}
`,Vt=`#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
`,Ot=`#version 300 es
precision highp float;

uniform sampler2D u_depthSampler;
uniform vec2 u_viewportSize;

in vec2 v_texCoord;
out vec4 fragEdge;

void main() {
  ivec2 texel = ivec2(int(u_viewportSize.x * v_texCoord.x),
                      int(u_viewportSize.y * v_texCoord.y));
  float c = texelFetch(u_depthSampler, texel, 0).r;
  float l = texelFetch(u_depthSampler, texel + ivec2(-1, 0), 0).r;
  float r = texelFetch(u_depthSampler, texel + ivec2( 1, 0), 0).r;
  float t = texelFetch(u_depthSampler, texel + ivec2( 0, 1), 0).r;
  float b = texelFetch(u_depthSampler, texel + ivec2( 0,-1), 0).r;
  // Standard Laplacian on a cross-shaped 5-tap kernel; same as the C++ shader.
  float lap = 10.0 * abs(t + l - 4.0 * c + r + b);
  fragEdge = vec4(lap, c, 0.0, 1.0); // r=edge, g=depth-passthrough
}
`,Xt=`#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
`,Ht=`#version 300 es
precision highp float;

uniform sampler2D u_depthSampler;
uniform sampler2D u_noiseSampler;
uniform sampler2D u_vecSampler;
uniform sampler2D u_edgeSampler;

uniform vec2 u_viewportSize;
uniform vec2 u_viewportScale;
uniform float u_noiseRatio;
uniform int u_numIter;

in vec2 v_texCoord;
out vec4 fragAdvect;

vec2 getVec(in vec2 pos, out float len) {
  vec2 vec = texture(u_vecSampler, pos).rg;
  len = length(vec);
  return len > 1e-6 ? vec / len : vec2(0.0);
}

float outside(in vec2 pos) {
  return 1.0 - texture(u_vecSampler, pos).a;
}

float getNoise(in vec2 pos) {
  return texture(u_noiseSampler, pos).r;
}

void main() {
  vec2 texel = v_texCoord;
  float offsetX = u_viewportScale.x * (1.0 / u_viewportSize.x);
  float offsetY = u_viewportScale.y * (1.0 / u_viewportSize.y);

  float vecLen = 0.0;
  vec2 vec = getVec(texel, vecLen);
  if (vecLen < 1e-4) {
    fragAdvect = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  // Forward and backward streamline integration.
  vec2 lastVec1 = vec;
  vec2 lastPos1 = texel;
  vec2 lastVec2 = vec;
  vec2 lastPos2 = texel;
  float sum = 0.0;
  int m = 0;
  float scaler1 = 1.0;
  float scaler2 = 1.0;

  for (int i = 0; i < u_numIter; ++i) {
    vec2 newPos1 = lastPos1 + vec2(lastVec1.x * offsetX, lastVec1.y * offsetY);
    vec2 newPos2 = lastPos2 - vec2(lastVec2.x * offsetX, lastVec2.y * offsetY);

    float vecLen1 = 0.0, vecLen2 = 0.0;
    vec2 newVec1 = getVec(newPos1, vecLen1);
    vec2 newVec2 = -getVec(newPos2, vecLen2);

    if (vecLen1 < 1e-4) break;
    if (vecLen2 < 1e-4) break;

    sum += scaler1 * getNoise(newPos1);
    sum += scaler2 * getNoise(newPos2);
    m += int(scaler1) + int(scaler2);

    if (outside(newPos1) > 0.0) scaler1 = 0.0;
    if (outside(newPos2) > 0.0) scaler2 = 0.0;

    lastPos1 = newPos1; lastVec1 = newVec1;
    lastPos2 = newPos2; lastVec2 = newVec2;
  }

  float n = m > 0 ? sum / float(m) : 0.0;
  fragAdvect = vec4(vec3(n * (1.0 - u_noiseRatio) + getNoise(texel) * u_noiseRatio), 1.0);
}
`,Gt=`#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
`,Yt=`#version 300 es
precision highp float;

uniform sampler2D u_colorSampler;
uniform sampler2D u_vecSampler;
uniform sampler2D u_depthSampler;
uniform sampler2D u_edgeSampler;
uniform sampler2D u_advectSampler;
uniform bool u_useHighContrast;
uniform bool u_showLIC;    // when false, skip the LIC streamline mixing
uniform bool u_showColor;  // when false, surface goes black (parcellation hidden)
uniform bool u_emphasizeSingular; // when true, white/black band weak-magnitude regions (saddles, vortex centers)

in vec2 v_texCoord;
out vec4 fragColor;

void main() {
  vec4 color = texture(u_colorSampler, v_texCoord);
  // Background pixel (no mesh rendered there) — discard so the canvas's
  // clearColor (= scene background) shows through instead of compose writing black.
  if (color.a < 0.5) discard;
  float edge = texture(u_edgeSampler, v_texCoord).r;
  float advect = texture(u_advectSampler, v_texCoord).r;
  float mag = length(texture(u_vecSampler, v_texCoord).xyz);

  // Depth halo from multi-LOD depth difference (matches the C++ Compose).
  float depthLodMost = textureLod(u_depthSampler, v_texCoord, 5.0).r;
  float depthLodMore = textureLod(u_depthSampler, v_texCoord, 3.0).r;
  float depthLodLess = texture(u_depthSampler, v_texCoord).r;

  float depthHalo2 = 5.0 * (depthLodLess - depthLodMost);
  depthHalo2 = 1.0 - depthHalo2;
  depthHalo2 = depthHalo2 * depthHalo2 * depthHalo2 * depthHalo2 * depthHalo2;
  depthHalo2 = min(1.0, depthHalo2);
  float depthHalo = smoothstep(0.2, 1.0, depthHalo2) * smoothstep(0.5, 1.0, depthHalo2);

  float contrastingS = u_useHighContrast ? 9.0 : 2.5;
  float contrastingP = u_useHighContrast ? 4.0 : 2.5;
  vec3 baseColor = u_showColor ? color.rgb : vec3(0.0);
  vec3 plainColor = u_showLIC
    ? mix(baseColor, vec3(contrastingS * pow(advect, contrastingP)), 0.4)
    : baseColor;

  vec4 col = vec4(
    depthHalo * mix(plainColor, vec3(0.5), edge),
    color.a
  );

  if (u_emphasizeSingular) {
    if (mag < 0.40) col.rgb = vec3(1.0);
    if (mag < 0.33) col.rgb = vec3(0.0);
  }

  fragColor = col;
  gl_FragDepth = texture(u_depthSampler, v_texCoord).r;
}
`;function $t(e){const t=e.indexOf("void main()");if(t<0)throw new Error("transform.frag.glsl: void main() not found");return e.slice(0,t)+kt+`
`+e.slice(t)}function qt(e,t,n){const r=he(e,zt,$t(Nt),"lic.transform"),i=he(e,Vt,Ot,"lic.edge"),a=he(e,Xt,Ht,"lic.advect"),o=he(e,Gt,Yt,"lic.compose"),s=Ee(e,i.attribs.get("a_position")??-1),c=Ee(e,a.attribs.get("a_position")??-1),f=Ee(e,o.attribs.get("a_position")??-1);let d=xe(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT},{internalFormat:e.R8,format:e.RED,type:e.UNSIGNED_BYTE},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT}],depth:!0}),l=xe(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE,mipmap:!0}],depth:!1}),u=xe(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE}],depth:!1});const h=128,A=Bt(h,h,h,12345),C=e.createTexture();if(!C)throw new Error("createTexture failed for noiseTex");e.bindTexture(e.TEXTURE_3D,C),e.texImage3D(e.TEXTURE_3D,0,e.R8,h,h,h,0,e.RED,e.UNSIGNED_BYTE,A),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_R,e.REPEAT);function p(m,P,g,E,I){const y=m.uniforms.get(P);y&&(e.activeTexture(e.TEXTURE0+g),e.bindTexture(E,I),e.uniform1i(y,g))}function R(m,P,g,E,I){const y=e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);d.bind(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.enable(e.CULL_FACE),e.cullFace(e.BACK),e.useProgram(r.program),e.uniformMatrix4fv(r.uniforms.get("u_view"),!1,P),e.uniformMatrix4fv(r.uniforms.get("u_projection"),!1,g),e.uniform3fv(r.uniforms.get("u_meshBBMin"),m.meshBBMin),e.uniform3fv(r.uniforms.get("u_meshBBMax"),m.meshBBMax),e.uniform1f(r.uniforms.get("u_surfaceAmbient"),m.surfaceAmbient??.04),e.uniform1f(r.uniforms.get("u_surfaceDiffuse"),m.surfaceDiffuse??.75),e.uniform1f(r.uniforms.get("u_surfaceSpecular"),m.surfaceSpecular??.4),e.uniform1f(r.uniforms.get("u_surfaceShininess"),m.surfaceShininess??80),p(r,"u_noiseSampler",0,e.TEXTURE_3D,C),e.bindVertexArray(m.meshVAO),e.drawElements(e.TRIANGLES,m.meshIndexCount,m.meshIndexType,0),e.bindVertexArray(null),d.generateMipmaps(),l.bind(),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.useProgram(i.program),e.uniform2f(i.uniforms.get("u_viewportSize"),d.width,d.height),p(i,"u_depthSampler",0,e.TEXTURE_2D,d.depthTexture),e.bindVertexArray(s),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),l.generateMipmaps(),u.bind(),e.useProgram(a.program),e.uniform2f(a.uniforms.get("u_viewportSize"),d.width,d.height),e.uniform2f(a.uniforms.get("u_viewportScale"),1,1),e.uniform1f(a.uniforms.get("u_noiseRatio"),0),e.uniform1i(a.uniforms.get("u_numIter"),m.licIterations??50),p(a,"u_depthSampler",0,e.TEXTURE_2D,d.depthTexture),p(a,"u_noiseSampler",1,e.TEXTURE_2D,d.colorTextures[2]),p(a,"u_vecSampler",2,e.TEXTURE_2D,d.colorTextures[1]),p(a,"u_edgeSampler",3,e.TEXTURE_2D,l.colorTextures[0]),e.bindVertexArray(c),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.bindFramebuffer(e.FRAMEBUFFER,y),e.viewport(0,0,E,I),e.useProgram(o.program),e.uniform1i(o.uniforms.get("u_useHighContrast"),m.useHighContrast??!0?1:0),e.uniform1i(o.uniforms.get("u_showLIC"),m.showLIC??!0?1:0),e.uniform1i(o.uniforms.get("u_showColor"),m.showColor??!0?1:0),e.uniform1i(o.uniforms.get("u_emphasizeSingular"),m.emphasizeSingular??!1?1:0),p(o,"u_colorSampler",0,e.TEXTURE_2D,d.colorTextures[0]),p(o,"u_vecSampler",1,e.TEXTURE_2D,d.colorTextures[1]),p(o,"u_depthSampler",2,e.TEXTURE_2D,d.depthTexture),p(o,"u_edgeSampler",3,e.TEXTURE_2D,l.colorTextures[0]),p(o,"u_noiseSampler",4,e.TEXTURE_2D,d.colorTextures[2]),p(o,"u_advectSampler",5,e.TEXTURE_2D,u.colorTextures[0]),e.enable(e.DEPTH_TEST),e.bindVertexArray(f),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}function S(m,P){d.resize(m,P),l.resize(m,P),u.resize(m,P)}return{render:R,resize:S,transformAttribs:r.attribs,getTransformDepthTexture:()=>d.depthTexture,getColorTexture:()=>d.colorTextures[0],getVecTexture:()=>d.colorTextures[1],getNormalTexture:()=>d.colorTextures[3],getPosTexture:()=>d.colorTextures[4]}}const Wt=`#version 300 es
precision highp float;

// Per-vertex (4 corners of unit quad as triangle strip).
in vec2 a_corner; // (-1,-1), (1,-1), (-1,1), (1,1)

// Per-instance: world-space anchor data, pre-sampled from the mesh surface so
// arrows stay attached to specific cortex points as the camera rotates.
in vec3 a_instance_position;  // world-space surface point
in vec3 a_instance_direction; // unit world-space tangent (LIC direction)
in vec3 a_instance_normal;    // unit world-space surface normal
in vec4 a_instance_color;     // region color

uniform mat4 u_view;
uniform mat4 u_projection;
uniform float u_arrowWidth;
uniform float u_arrowHeight;
uniform float u_arrowDist;
uniform float u_arrowScale;
uniform float u_directionSign; // +1 or -1; flips arrow tangent in place

// G-buffer view-space position from the LIC transform pass. Used to occlude
// arrows that are behind the front-most visible surface (e.g. far-wall sulci).
uniform sampler2D u_posSampler;

out vec4 v_color;
out vec3 v_normal;
out vec2 v_surfaceUV;

void main() {
  // Transform anchor data to view space.
  vec4 viewAnchor = u_view * vec4(a_instance_position, 1.0);
  vec3 viewNormal = (u_view * vec4(a_instance_normal, 0.0)).xyz;
  vec3 viewTangent = u_directionSign * (u_view * vec4(a_instance_direction, 0.0)).xyz;

  // ---------- Occlusion check ----------
  // Project anchor to clip space, look up the front-most-surface view-space
  // position at that pixel from the G-buffer. If our anchor is significantly
  // behind that depth, cull. View-space z is negative for points in front of
  // the camera; "further away" = more negative z. The G-buffer pos texture
  // uses a=1 inside mesh, 0 outside.
  vec4 anchorClip = u_projection * viewAnchor;
  if (anchorClip.w > 0.0) {
    vec2 anchorUV = (anchorClip.xy / anchorClip.w) * 0.5 + 0.5;
    if (anchorUV.x >= 0.0 && anchorUV.x <= 1.0 &&
        anchorUV.y >= 0.0 && anchorUV.y <= 1.0) {
      ivec2 size = textureSize(u_posSampler, 0);
      ivec2 texel = clamp(ivec2(anchorUV * vec2(size)), ivec2(0), size - ivec2(1));
      vec4 frontPos = texelFetch(u_posSampler, texel, 0);
      // Only enforce occlusion if there IS a surface at that pixel. If a=0
      // (background), skip the check — arrows near the silhouette still draw.
      if (frontPos.a > 0.5) {
        // Cull when anchor is more than 0.5 mesh units behind the front surface.
        // The bias absorbs any floating-point drift between the rasterizer-
        // emitted depth and the vertex shader's computation.
        if (viewAnchor.z < frontPos.z - 0.5) {
          gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
          v_color = vec4(0.0);
          v_normal = vec3(0.0);
          v_surfaceUV = vec2(0.0);
          return;
        }
      }
    }
  }

  // ---------- Build oriented quad in view space ----------
  vec3 normal = normalize(viewNormal);
  vec3 tangent = normalize(viewTangent);
  vec3 binormal = normalize(cross(tangent, normal));

  float lscale = u_arrowScale * 2.0 * u_arrowHeight;
  float wscale = u_arrowScale * u_arrowWidth;

  vec3 p = viewAnchor.xyz + u_arrowScale * normal * u_arrowDist;
  // Anchor is at the MIDDLE of the arrow (a_corner.y in [-1, 1] maps to
  // half-length on either side of the anchor). This makes flipping the
  // direction rotate the arrow around its own anchor without shifting
  // its on-surface position — and makes spacing math (Poisson, overlap
  // rejection) center-to-center as the user expects.
  vec3 viewPos = p + a_corner.x * binormal * wscale
                   + a_corner.y * 0.5 * tangent * lscale;

  gl_Position = u_projection * vec4(viewPos, 1.0);

  v_color = a_instance_color;
  v_normal = normal;
  v_surfaceUV = a_corner;
}
`,ke=`#version 300 es
precision highp float;

uniform float u_widthTails;   // matches original default 0.25
uniform vec4 u_arrowColor;    // a = mix factor between region color (a=0) and arrow color (a=1)
uniform float u_arrowOpacity; // 0..1; final fragment alpha (with shade-edge anti-alias)

in vec4 v_color;
in vec3 v_normal;
in vec2 v_surfaceUV;

out vec4 fragColor;

void main() {
  float shade;

  if (v_surfaceUV.y >= 0.5) {
    // Arrow head: triangle.
    float arrowHeadY = 1.0 - 2.0 * (v_surfaceUV.y - 0.5);
    float leftEdge = -arrowHeadY;
    float rightEdge = arrowHeadY;
    float leftStep = 1.0 - smoothstep(leftEdge - 0.15, leftEdge, v_surfaceUV.x);
    float rightStep = smoothstep(rightEdge - 0.15, rightEdge, v_surfaceUV.x);
    shade = 1.0 - (rightStep + leftStep);
  } else {
    // Arrow body: rectangle of width u_widthTails.
    float body = abs(v_surfaceUV.x);
    float skip = step(u_widthTails, body);
    shade = 1.0 - skip;
  }

  if (shade < 0.01) discard;

  // Cheap view-direction Lambert (matches the original arrow fragment's lighting).
  float light = clamp(0.1 + pow(abs(dot(v_normal, vec3(0.0, 0.0, 1.0))), 2.0), 0.0, 1.0);

  vec3 mixed = mix(v_color.rgb, u_arrowColor.rgb, u_arrowColor.a);
  // Use shade as anti-alias factor on the alpha; multiply by global opacity.
  // With BLEND (SRC_ALPHA, ONE_MINUS_SRC_ALPHA) on the host side, this gives true
  // semi-transparent arrows that let the LIC underlay show through.
  fragColor = vec4(mixed * light, clamp(shade, 0.0, 1.0) * u_arrowOpacity);
}
`,jt=`#version 300 es
precision highp float;

// Curved-arrow vertex shader. WebGL2 has no geometry shaders, so the polyline
// has been computed CPU-side (see curvedArrows.ts) — every ribbon vertex
// already carries its own world-space position, tangent, and normal sampled
// from the mesh at that path point. This shader just extrudes each path
// sample sideways along the binormal to give the strip its width.
//
// Output v_color, v_normal, v_surfaceUV match arrow.vert.glsl exactly so
// the existing arrow.frag.glsl renders the result unchanged.

in vec3  a_position;   // world-space path point
in vec3  a_tangent;    // unit world-space tangent at the path point
in vec3  a_normal;     // unit world-space normal at the path point
in vec4  a_color;      // region color
in float a_stripY;     // longitudinal coord, -1 (tail) ... +1 (tip)
in float a_stripSide;  // -1 (left) or +1 (right)

uniform mat4  u_view;
uniform mat4  u_projection;
uniform float u_arrowWidth;
uniform float u_arrowScale;
uniform float u_arrowDist;
uniform float u_directionSign; // +1 or -1; flips arrow tangent in place

// G-buffer view-space position from the LIC transform pass — used to occlude
// path points that are behind the front-most visible surface.
uniform sampler2D u_posSampler;

out vec4 v_color;
out vec3 v_normal;
out vec2 v_surfaceUV;

void main() {
  // Transform path-point data to view space.
  vec4 viewAnchor = u_view * vec4(a_position, 1.0);
  vec3 viewNormal = (u_view * vec4(a_normal, 0.0)).xyz;
  vec3 viewTangent = u_directionSign * (u_view * vec4(a_tangent, 0.0)).xyz;

  // ---------- Occlusion check (matches arrow.vert.glsl) ----------
  vec4 anchorClip = u_projection * viewAnchor;
  if (anchorClip.w > 0.0) {
    vec2 anchorUV = (anchorClip.xy / anchorClip.w) * 0.5 + 0.5;
    if (anchorUV.x >= 0.0 && anchorUV.x <= 1.0 &&
        anchorUV.y >= 0.0 && anchorUV.y <= 1.0) {
      ivec2 size = textureSize(u_posSampler, 0);
      ivec2 texel = clamp(ivec2(anchorUV * vec2(size)), ivec2(0), size - ivec2(1));
      vec4 frontPos = texelFetch(u_posSampler, texel, 0);
      if (frontPos.a > 0.5) {
        if (viewAnchor.z < frontPos.z - 0.5) {
          gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
          v_color = vec4(0.0);
          v_normal = vec3(0.0);
          v_surfaceUV = vec2(0.0);
          return;
        }
      }
    }
  }

  // ---------- Build oriented quad in view space ----------
  vec3 normal = normalize(viewNormal);
  vec3 tangent = normalize(viewTangent);
  vec3 binormal = normalize(cross(tangent, normal));

  // Path point sits on the surface; lift along the normal by u_arrowDist
  // (same as the straight-arrow path), then push sideways along the
  // binormal by half-width × u_arrowScale.
  vec3 p = viewAnchor.xyz + u_arrowScale * normal * u_arrowDist;
  vec3 viewPos = p + a_stripSide * binormal * (u_arrowScale * u_arrowWidth);

  gl_Position = u_projection * vec4(viewPos, 1.0);

  v_color = a_color;
  v_normal = normal;
  // Same UV layout as arrow.vert.glsl: x = stripSide ∈ {-1, +1}, y = stripY
  // along the arrow length so the fragment shader's head/body split works.
  v_surfaceUV = vec2(a_stripSide, a_stripY);
}
`;async function Ae(e){const t=await fetch(e);if(!t.ok)throw new Error(`Fetch failed ${e}: ${t.status} ${t.statusText}`);return t.text()}function Kt(e){const t=O(1/0,1/0,1/0),n=O(-1/0,-1/0,-1/0),r=O(0,0,0),i=e.length/3;for(let o=0;o<i;o++){const s=e[o*3+0],c=e[o*3+1],f=e[o*3+2];s<t[0]&&(t[0]=s),s>n[0]&&(n[0]=s),c<t[1]&&(t[1]=c),c>n[1]&&(n[1]=c),f<t[2]&&(t[2]=f),f>n[2]&&(n[2]=f),r[0]+=s,r[1]+=c,r[2]+=f}Xe(r,r,1/i);let a=0;for(let o=0;o<i;o++){const s=e[o*3+0]-r[0],c=e[o*3+1]-r[1],f=e[o*3+2]-r[2];a=Math.max(a,s*s+c*c+f*f)}return{center:r,radius:Math.sqrt(a),bbMin:t,bbMax:n}}async function Qt(e){const t=rt(e),n=t.gl;if(!n.getExtension("EXT_color_buffer_float")){ge("Your browser does not support EXT_color_buffer_float; LIC requires it.");return}const r=qt(n,t.width||1,t.height||1),i=he(n,Wt,ke,"arrow"),a=he(n,jt,ke,"arrow.curved"),o=ot(),s=Ct();let c=null,f=null,d=null,l=null,u=null,h=null,A=null,C=null,p=null,R=null,S=null,m=null;function P(D){if(!c||!A||!f||!d||!l||!R)return;const b=2*D.arrowHeight*D.arrowScale*R.radius,z=.5*D.arrowWidth*D.arrowScale*R.radius;let U;if(D.arrowBorderMode&&C){const k=R.radius*D.arrowDensity,j=Math.max(k,b);U=At(c.vertices,A,f,d,l,j,.05,C)}else{const k=b*1.2,j=R.radius*D.arrowDensity,q=Math.max(j,Math.max(z*1.5,b*.4));U=gt(c.vertices,A,f,d,l,k,q,.05)}const V=Tt(U,b,1);if(S=mt(n,i,{positions:V.positions,directions:V.directions,normals:V.normals,colors:V.colors}),V.vertexIDs&&c&&A&&f&&d&&l){const k=vt(V.positions,Array.from(V.vertexIDs),c.vertices,A,f,d,l,Ye);m=wt(n,a,k)}else m=null}function g(D,b,z){const U=at(D),V=it(b),k=ct(z);if(V.length!==U.vertices.length/3)throw new Error(`Vertex count mismatch: mesh has ${U.vertices.length/3} vertices, labels has ${V.length}`);const j=U.vertices.length/3;let q=null;if(U.colors&&U.colors.length===j*3){q=new Uint8Array(j*4);for(let K=0;K<j;K++)q[K*4+0]=U.colors[K*3+0],q[K*4+1]=U.colors[K*3+1],q[K*4+2]=U.colors[K*3+2],q[K*4+3]=255}const oe=ft(V,k),se=!s.useLabelColors&&q?q:oe,J=ht(U.vertices,U.indices),Z=dt(U.indices,U.vertices.length/3),ie=Et(V,Z),re=pt({vertices:U.vertices,indices:U.indices,labels:V,labelOrder:k,adjacency:Z,normals:J}),ee=Kt(U.vertices),te=r.transformAttribs,fe=Ue(n,[{def:{name:"a_position",data:U.vertices,size:3,type:n.FLOAT,normalized:!1},location:te.get("a_position")??-1},{def:{name:"a_normal",data:J,size:3,type:n.FLOAT,normalized:!1},location:te.get("a_normal")??-1},{def:{name:"a_color",data:se,size:4,type:n.UNSIGNED_BYTE,normalized:!0},location:te.get("a_color")??-1},{def:{name:"a_vector",data:re,size:3,type:n.FLOAT,normalized:!1},location:te.get("a_vector")??-1}],U.indices);c=U,f=re,d=J,l=se,u=q,h=oe,A=Z,C=ie,p=fe,R=ee,P(s),o.fitSphere(ee.center,ee.radius);const H=_();H?o.setLookAt(O(H.eye[0],H.eye[1],H.eye[2]),O(H.target[0],H.target[1],H.target[2]),O(H.up[0],H.up[1],H.up[2])):y("lateral-left",ee.center,ee.radius),t.requestRender()}function E(D){if(!c||!f||!d)return;const b=D||!u?h:u;if(!b)return;const z=r.transformAttribs;p=Ue(n,[{def:{name:"a_position",data:c.vertices,size:3,type:n.FLOAT,normalized:!1},location:z.get("a_position")??-1},{def:{name:"a_normal",data:d,size:3,type:n.FLOAT,normalized:!1},location:z.get("a_normal")??-1},{def:{name:"a_color",data:b,size:4,type:n.UNSIGNED_BYTE,normalized:!0},location:z.get("a_color")??-1},{def:{name:"a_vector",data:f,size:3,type:n.FLOAT,normalized:!1},location:z.get("a_vector")??-1}],c.indices),l=b,P(s)}function I(D,b,z,U=2.5){const V=z*U;switch(D){case"lateral-left":return{eye:O(b[0]-V,b[1],b[2]),up:O(0,0,1)};case"lateral-right":return{eye:O(b[0]+V,b[1],b[2]),up:O(0,0,1)};case"anterior":return{eye:O(b[0],b[1]+V,b[2]),up:O(0,0,1)};case"posterior":return{eye:O(b[0],b[1]-V,b[2]),up:O(0,0,1)};case"dorsal":return{eye:O(b[0],b[1],b[2]+V),up:O(0,1,0)};case"ventral":return{eye:O(b[0],b[1],b[2]-V),up:O(0,1,0)}}}function y(D,b,z){const{eye:U,up:V}=I(D,b,z);o.setLookAt(U,b,V)}const v="di-camera-state-v1";function _(){try{const D=window.localStorage.getItem(v);if(!D)return null;const b=JSON.parse(D);return b&&Array.isArray(b.eye)&&Array.isArray(b.target)&&Array.isArray(b.up)?b:null}catch{return null}}let T=null;function x(){T!==null&&clearTimeout(T),T=window.setTimeout(()=>{T=null;try{window.localStorage.setItem(v,JSON.stringify(o.getViewState()))}catch{}},350)}const w=g,F=await bt();if(F)w(F.plyText,F.labelsText,F.orderText);else{const[D,b,z]=await Promise.all([Ae("/directionality-indicator-webgl/data/label34.ply"),Ae("/directionality-indicator-webgl/data/label34.labels"),Ae("/directionality-indicator-webgl/data/label34.labelorder")]);w(D,b,z),await ze({name:"label34.ply",plyText:D,labelsText:b,orderText:z})}t.onResize(()=>{o.resize(t.width,t.height),r.resize(t.width,t.height),t.requestRender()}),o.attach(t.canvas,()=>{t.requestRender(),x()}),o.resize(t.width,t.height),r.resize(t.width,t.height);let M=s.useLabelColors;const{element:N}=Mt(s,(D,b)=>{D.useLabelColors!==M?(M=D.useLabelColors,E(D.useLabelColors)):b&&P(D),t.requestRender()},async({ply:D,labels:b,labelorder:z})=>{const[U,V,k]=await Promise.all([D.text(),b.text(),z.text()]);w(U,V,k),await ze({name:D.name,plyText:U,labelsText:V,orderText:k})},{current:()=>W(),canonical:()=>$()},{set:D=>{R&&(y(D,R.center,R.radius),x(),t.requestRender())}});e.appendChild(N);function L(D){if(n.clearColor(s.bgColorR,s.bgColorG,s.bgColorB,D),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),!p||!R||(r.render({meshVAO:p.vao,meshIndexCount:p.indexCount,meshIndexType:p.indexType,meshBBMin:R.bbMin,meshBBMax:R.bbMax,licIterations:s.licIterations,useHighContrast:s.licHighContrast,showLIC:s.showLIC,showColor:s.showColor,emphasizeSingular:s.licEmphasizeSingular,surfaceAmbient:s.surfaceAmbient,surfaceDiffuse:s.surfaceDiffuse,surfaceSpecular:s.surfaceSpecular,surfaceShininess:s.surfaceShininess},o.view,o.projection,t.width,t.height),!s.showArrows))return;const b=s.arrowCurved&&m!==null,z=b?a:i;!b&&!S||(n.disable(n.DEPTH_TEST),n.disable(n.CULL_FACE),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.useProgram(z.program),n.uniformMatrix4fv(z.uniforms.get("u_view"),!1,o.view),n.uniformMatrix4fv(z.uniforms.get("u_projection"),!1,o.projection),n.uniform1f(z.uniforms.get("u_arrowWidth"),s.arrowWidth),n.uniform1f(z.uniforms.get("u_arrowDist"),s.arrowDist),n.uniform1f(z.uniforms.get("u_arrowScale"),R.radius*s.arrowScale),n.uniform1f(z.uniforms.get("u_directionSign"),s.arrowFlipDirection?-1:1),n.uniform1f(z.uniforms.get("u_widthTails"),s.arrowBodyWidth),n.uniform4f(z.uniforms.get("u_arrowColor"),s.arrowColorR,s.arrowColorG,s.arrowColorB,1),n.uniform1f(z.uniforms.get("u_arrowOpacity"),s.arrowOpacity),b||n.uniform1f(z.uniforms.get("u_arrowHeight"),s.arrowHeight),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,r.getPosTexture()),n.uniform1i(z.uniforms.get("u_posSampler"),0),b&&m?m.draw():S&&S.draw(),n.disable(n.BLEND))}t.onRender(()=>L(1));const B=5e7;function G(D,b,z){const U=t.canvas,V=U.width,k=U.height;U.width=D,U.height=b,n.viewport(0,0,D,b),o.resize(D,b),r.resize(D,b);try{return z()}finally{U.width=V,U.height=k,n.viewport(0,0,V,k),o.resize(V,k),r.resize(V,k)}}function X(){const D=Math.max(.5,s.screenshotDPI/96);let b=Math.round(t.canvas.width*D),z=Math.round(t.canvas.height*D);if(b*z>B){const U=Math.sqrt(B/(b*z));b=Math.round(b*U),z=Math.round(z*U),console.warn(`Screenshot pixel cap: clamped ${s.screenshotDPI} DPI to ${Math.round(96*U*(s.screenshotDPI/96))} effective DPI to stay under 50 MP`)}return{w:b,h:z}}async function W(){if(!R)return;const{w:D,h:b}=X();await Y(D,b,"directionality-current.png"),L(1)}async function Y(D,b,z){let U="";G(D,b,()=>{L(0),U=t.canvas.toDataURL("image/png")}),await new Promise(V=>{const k=new Image;k.onload=async()=>{const j=document.createElement("canvas");j.width=k.width,j.height=k.height;const q=j.getContext("2d");if(!q){V();return}q.drawImage(k,0,0);const oe=q.getImageData(0,0,k.width,k.height).data;let se=k.width,J=k.height,Z=-1,ie=-1;for(let H=0;H<k.height;H++){const K=H*k.width*4;for(let Q=0;Q<k.width;Q++)oe[K+Q*4+3]>0&&(Q<se&&(se=Q),Q>Z&&(Z=Q),H<J&&(J=H),H>ie&&(ie=H))}if(Z<0){V();return}const re=Z-se+1,ee=ie-J+1,te=document.createElement("canvas");te.width=re,te.height=ee;const fe=te.getContext("2d");if(!fe){V();return}fe.drawImage(j,se,J,re,ee,0,0,re,ee),await new Promise(H=>{te.toBlob(K=>{if(K){const Q=URL.createObjectURL(K),ae=document.createElement("a");ae.href=Q,ae.download=z,document.body.appendChild(ae),ae.click(),document.body.removeChild(ae),URL.revokeObjectURL(Q)}H()},"image/png")}),V()},k.src=U})}async function $(){if(!R)return;const D=R.radius,b=R.center,z=["lateral-left","lateral-right","anterior","posterior","dorsal","ventral"],{w:U,h:V}=X();for(const j of z){const{eye:q,up:oe}=I(j,b,D,3.2);o.setLookAt(q,b,oe),await Y(U,V,`directionality-${j}.png`)}const k=_();k?o.setLookAt(O(k.eye[0],k.eye[1],k.eye[2]),O(k.target[0],k.target[1],k.target[2]),O(k.up[0],k.up[1],k.up[2])):y("lateral-left",b,D),L(1)}t.requestRender()}const Ve=document.getElementById("app");Ve?Qt(Ve).catch(e=>{console.error(e),ge(e instanceof Error?e.message:String(e))}):ge("Internal error: #app container missing");
//# sourceMappingURL=index-DACYbgHL.js.map
