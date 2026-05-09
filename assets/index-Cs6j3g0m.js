(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();var _e=1e-6,ae=typeof Float32Array<"u"?Float32Array:Array;function Ze(){var e=new ae(9);return ae!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function et(e,t,n,r,o,i,a,s,c){var f=new ae(9);return f[0]=e,f[1]=t,f[2]=n,f[3]=r,f[4]=o,f[5]=i,f[6]=a,f[7]=s,f[8]=c,f}function Ue(){var e=new ae(16);return ae!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function tt(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function nt(e,t,n,r,o){var i=1/Math.tan(t/2);if(e[0]=i/n,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=i,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,o!=null&&o!==1/0){var a=1/(r-o);e[10]=(o+r)*a,e[14]=2*o*r*a}else e[10]=-1,e[14]=-2*r;return e}var rt=nt;function ot(e,t,n,r){var o,i,a,s,c,f,d,l,h,u,_=t[0],D=t[1],p=t[2],C=r[0],S=r[1],m=r[2],B=n[0],A=n[1],x=n[2];return Math.abs(_-B)<_e&&Math.abs(D-A)<_e&&Math.abs(p-x)<_e?tt(e):(d=_-B,l=D-A,h=p-x,u=1/Math.sqrt(d*d+l*l+h*h),d*=u,l*=u,h*=u,o=S*h-m*l,i=m*d-C*h,a=C*l-S*d,u=Math.sqrt(o*o+i*i+a*a),u?(u=1/u,o*=u,i*=u,a*=u):(o=0,i=0,a=0),s=l*a-h*i,c=h*o-d*a,f=d*i-l*o,u=Math.sqrt(s*s+c*c+f*f),u?(u=1/u,s*=u,c*=u,f*=u):(s=0,c=0,f=0),e[0]=o,e[1]=s,e[2]=d,e[3]=0,e[4]=i,e[5]=c,e[6]=l,e[7]=0,e[8]=a,e[9]=f,e[10]=h,e[11]=0,e[12]=-(o*_+i*D+a*p),e[13]=-(s*_+c*D+f*p),e[14]=-(d*_+l*D+h*p),e[15]=1,e)}function ue(){var e=new ae(3);return ae!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function We(e){var t=e[0],n=e[1],r=e[2];return Math.sqrt(t*t+n*n+r*r)}function q(e,t,n){var r=new ae(3);return r[0]=e,r[1]=t,r[2]=n,r}function ze(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function Ve(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e}function at(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e}function je(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function xe(e,t){var n=t[0],r=t[1],o=t[2],i=n*n+r*r+o*o;return i>0&&(i=1/Math.sqrt(i)),e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e}function it(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function ve(e,t,n){var r=t[0],o=t[1],i=t[2],a=n[0],s=n[1],c=n[2];return e[0]=o*c-i*s,e[1]=i*a-r*c,e[2]=r*s-o*a,e}function de(e,t,n){var r=n[0],o=n[1],i=n[2],a=n[3],s=t[0],c=t[1],f=t[2],d=o*f-i*c,l=i*s-r*f,h=r*c-o*s;return d=d+d,l=l+l,h=h+h,e[0]=s+a*d+o*h-i*l,e[1]=c+a*l+i*d-r*h,e[2]=f+a*h+r*l-o*d,e}var st=We;(function(){var e=ue();return function(t,n,r,o,i,a){var s,c;for(n||(n=3),r||(r=0),o?c=Math.min(o*n+r,t.length):c=t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],i(e,e,a),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2];return t}})();function ct(){var e=new ae(4);return ae!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function lt(e,t){var n=t[0],r=t[1],o=t[2],i=t[3],a=n*n+r*r+o*o+i*i;return a>0&&(a=1/Math.sqrt(a)),e[0]=n*a,e[1]=r*a,e[2]=o*a,e[3]=i*a,e}(function(){var e=ct();return function(t,n,r,o,i,a){var s,c;for(n||(n=4),r||(r=0),o?c=Math.min(o*n+r,t.length):c=t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],e[3]=t[s+3],i(e,e,a),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2],t[s+3]=e[3];return t}})();function ye(){var e=new ae(4);return ae!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function Ie(e,t,n){n=n*.5;var r=Math.sin(n);return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=Math.cos(n),e}function Oe(e,t,n){var r=t[0],o=t[1],i=t[2],a=t[3],s=n[0],c=n[1],f=n[2],d=n[3];return e[0]=r*d+a*s+o*f-i*c,e[1]=o*d+a*c+i*s-r*f,e[2]=i*d+a*f+r*c-o*s,e[3]=a*d-r*s-o*c-i*f,e}function Te(e,t,n,r){var o=t[0],i=t[1],a=t[2],s=t[3],c=n[0],f=n[1],d=n[2],l=n[3],h,u,_,D,p;return u=o*c+i*f+a*d+s*l,u<0&&(u=-u,c=-c,f=-f,d=-d,l=-l),1-u>_e?(h=Math.acos(u),_=Math.sin(h),D=Math.sin((1-r)*h)/_,p=Math.sin(r*h)/_):(D=1-r,p=r),e[0]=D*o+p*c,e[1]=D*i+p*f,e[2]=D*a+p*d,e[3]=D*s+p*l,e}function Ke(e,t){var n=t[0]+t[4]+t[8],r;if(n>0)r=Math.sqrt(n+1),e[3]=.5*r,r=.5/r,e[0]=(t[5]-t[7])*r,e[1]=(t[6]-t[2])*r,e[2]=(t[1]-t[3])*r;else{var o=0;t[4]>t[0]&&(o=1),t[8]>t[o*3+o]&&(o=2);var i=(o+1)%3,a=(o+2)%3;r=Math.sqrt(t[o*3+o]-t[i*3+i]-t[a*3+a]+1),e[o]=.5*r,r=.5/r,e[3]=(t[i*3+a]-t[a*3+i])*r,e[i]=(t[i*3+o]+t[o*3+i])*r,e[a]=(t[a*3+o]+t[o*3+a])*r}return e}var Ee=lt;(function(){var e=ue(),t=q(1,0,0),n=q(0,1,0);return function(r,o,i){var a=it(o,i);return a<-.999999?(ve(e,t,o),st(e)<1e-6&&ve(e,n,o),xe(e,e),Ie(r,e,Math.PI),r):a>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(ve(e,o,i),r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=1+a,Ee(r,r))}})();(function(){var e=ye(),t=ye();return function(n,r,o,i,a,s){return Te(e,r,a,s),Te(t,o,i,s),Te(n,e,t,2*s*(1-s)),n}})();(function(){var e=Ze();return function(t,n,r,o){return e[0]=r[0],e[3]=r[1],e[6]=r[2],e[1]=o[0],e[4]=o[1],e[7]=o[2],e[2]=-n[0],e[5]=-n[1],e[8]=-n[2],Ee(t,Ke(t,e))}})();function dt(e){const t=document.createElement("canvas");e.appendChild(t);const n=t.getContext("webgl2",{antialias:!0,depth:!0,alpha:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0});if(!n)throw new Error("WebGL2 not supported in this browser");const r=n;let o=()=>{},i=()=>{},a=!0;const s={canvas:t,gl:r,get width(){return t.width},get height(){return t.height},requestRender(){a=!0},onRender(d){o=d},onResize(d){i=d}};function c(){const d=Math.min(window.devicePixelRatio,2),l=Math.floor(e.clientWidth*d),h=Math.floor(e.clientHeight*d);(t.width!==l||t.height!==h)&&(t.width=l,t.height=h,r.viewport(0,0,l,h),i(),a=!0)}function f(){c(),a&&(a=!1,o()),requestAnimationFrame(f)}return requestAnimationFrame(f),window.addEventListener("resize",c),s}function De(e){const t=document.getElementById("banner");t&&(t.textContent=e,t.style.display="block")}function ut(){const e=Ue(),t=Ue(),n=ye(),r=q(0,0,0);let o=3,i=.01,a=1e3,s=1;function c(){const l=q(0,0,o);de(l,l,n);const h=ue();Ve(h,r,l);const u=q(0,1,0);de(u,u,n),ot(e,h,r,u)}function f(){const l=Math.PI/4,h=Math.max(.001,o*.01),u=Math.max(1e3,o*100);rt(t,l,s,h,u)}function d(l,h){const u=q(1,0,0);de(u,u,n);const _=q(0,1,0);de(_,_,n);const D=ye();Ie(D,u,h);const p=ye();Ie(p,_,l),Oe(n,p,n),Oe(n,D,n),Ee(n,n)}return c(),f(),{view:e,projection:t,attach(l,h){let u=!1,_=0,D=0;l.addEventListener("pointerdown",p=>{u=!0,_=p.clientX,D=p.clientY,l.setPointerCapture(p.pointerId)}),l.addEventListener("pointermove",p=>{if(!u)return;const C=p.clientX-_,S=p.clientY-D;if(_=p.clientX,D=p.clientY,p.shiftKey){const m=2*o*.4142/Math.max(l.clientHeight,1),B=q(1,0,0);de(B,B,n);const A=q(0,1,0);de(A,A,n),r[0]+=(-C*B[0]+S*A[0])*m,r[1]+=(-C*B[1]+S*A[1])*m,r[2]+=(-C*B[2]+S*A[2])*m}else{const m=2*Math.PI/Math.max(l.clientWidth,1);d(-C*m,-S*m)}c(),f(),h()}),l.addEventListener("pointerup",p=>{u=!1,l.releasePointerCapture(p.pointerId)}),l.addEventListener("pointercancel",p=>{u=!1,l.releasePointerCapture(p.pointerId)}),l.addEventListener("wheel",p=>{p.preventDefault(),o*=Math.exp(p.deltaY*.001),o=Math.max(i,Math.min(a,o)),c(),f(),h()},{passive:!1})},fitSphere(l,h){ze(r,l);const u=Math.max(h,.001);o=u*2.5,i=u*.05,a=u*30,c(),f()},getViewState(){const l=q(0,0,o);de(l,l,n);const h=ue();Ve(h,r,l);const u=q(0,1,0);return de(u,u,n),{eye:[h[0],h[1],h[2]],target:[r[0],r[1],r[2]],up:[u[0],u[1],u[2]]}},setLookAt(l,h,u){ze(r,h);const _=ue();at(_,l,r);const D=We(_);if(D<1e-6)return;o=D;const p=ue();je(p,_,1/D);const C=ue();xe(C,u);const S=ue();ve(S,C,p),xe(S,S),ve(C,p,S),xe(C,C);const m=et(S[0],S[1],S[2],C[0],C[1],C[2],p[0],p[1],p[2]);Ke(n,m),Ee(n,n),c(),f()},resize(l,h){s=l/Math.max(1,h),f()}}}function He(e,t,n,r){const o=e.createShader(t);if(!o)throw new Error(`createShader failed for ${r}`);if(e.shaderSource(o,n),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS)){const i=e.getShaderInfoLog(o)??"(no log)";throw e.deleteShader(o),new Error(`Shader compile failed [${r}]:
${i}`)}return o}function me(e,t,n,r){const o=He(e,e.VERTEX_SHADER,t,`${r}.vert`),i=He(e,e.FRAGMENT_SHADER,n,`${r}.frag`),a=e.createProgram();if(!a)throw new Error(`createProgram failed for ${r}`);if(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){const l=e.getProgramInfoLog(a)??"(no log)";throw e.deleteProgram(a),new Error(`Program link failed [${r}]:
${l}`)}const s=new Map,c=e.getProgramParameter(a,e.ACTIVE_UNIFORMS);for(let l=0;l<c;l++){const h=e.getActiveUniform(a,l);if(!h)continue;const u=e.getUniformLocation(a,h.name);u&&s.set(h.name,u)}const f=new Map,d=e.getProgramParameter(a,e.ACTIVE_ATTRIBUTES);for(let l=0;l<d;l++){const h=e.getActiveAttrib(a,l);h&&f.set(h.name,e.getAttribLocation(a,h.name))}return{program:a,uniforms:s,attribs:f}}function $e(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed");e.bindVertexArray(r);for(const{def:i,location:a}of t){if(a<0)continue;const s=e.createBuffer();if(!s)throw new Error(`createBuffer failed for ${i.name}`);e.bindBuffer(e.ARRAY_BUFFER,s),e.bufferData(e.ARRAY_BUFFER,i.data,e.STATIC_DRAW),e.enableVertexAttribArray(a),e.vertexAttribPointer(a,i.size,i.type,i.normalized,0,0)}const o=e.createBuffer();if(!o)throw new Error("createBuffer failed for EBO");return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,o),e.bufferData(e.ELEMENT_ARRAY_BUFFER,n,e.STATIC_DRAW),e.bindVertexArray(null),{vao:r,ebo:o,indexCount:n.length,indexType:n instanceof Uint32Array?e.UNSIGNED_INT:e.UNSIGNED_SHORT}}function ft(e){const t=e.split(/\r?\n/);if(t[0]!=="ply")throw new Error("Not a PLY file (missing 'ply' magic)");if(!t[1]||!t[1].startsWith("format ascii"))throw new Error("Only ASCII PLY is supported in M1");const n=[];let r=2;for(;r<t.length;){const h=t[r].trim();if(h==="end_header"){r++;break}if(h.startsWith("comment")||h===""){r++;continue}if(h.startsWith("element ")){const[,u,_]=h.split(/\s+/);n.push({name:u,count:parseInt(_,10),properties:[]})}else if(h.startsWith("property ")){const u=h.split(/\s+/);u[1]==="list"?n[n.length-1].properties.push({type:"list",countType:u[2],itemType:u[3],name:u[4]}):n[n.length-1].properties.push({type:u[1],name:u[2]})}r++}const o=n.find(h=>h.name==="vertex"),i=n.find(h=>h.name==="face");if(!o)throw new Error("PLY: no vertex element");if(!i)throw new Error("PLY: no face element");const a=new Float32Array(o.count*3),s=o.properties.findIndex(h=>h.name==="x"),c=o.properties.findIndex(h=>h.name==="red"),d=c>=0?new Uint8Array(o.count*3):null;for(let h=0;h<o.count;h++,r++){const u=t[r].trim().split(/\s+/);a[h*3+0]=parseFloat(u[s+0]),a[h*3+1]=parseFloat(u[s+1]),a[h*3+2]=parseFloat(u[s+2]),d&&(d[h*3+0]=parseInt(u[c+0],10),d[h*3+1]=parseInt(u[c+1],10),d[h*3+2]=parseInt(u[c+2],10))}const l=[];for(let h=0;h<i.count;h++,r++){const u=t[r].trim().split(/\s+/),_=parseInt(u[0],10);if(_!==3)throw new Error(`PLY: only triangle faces supported (got ${_}-gon at face ${h})`);l.push(parseInt(u[1],10),parseInt(u[2],10),parseInt(u[3],10))}return{vertices:a,normals:null,colors:d,indices:new Uint32Array(l)}}function ht(e){return Qe(e)}function Qe(e){const t=e.split(/[,\s]+/).filter(r=>r.length>0),n=new Int32Array(t.length);for(let r=0;r<t.length;r++){const o=parseInt(t[r],10);if(Number.isNaN(o))throw new Error(`labels: non-integer token at index ${r}: "${t[r]}"`);n[r]=o}return n}const pt=Qe;function mt(e){return pt(e)}function wt(e,t,n){const r=Math.floor(e*6),o=e*6-r,i=n*(1-t),a=n*(1-o*t),s=n*(1-(1-o)*t);let c=0,f=0,d=0;switch(r%6){case 0:c=n,f=s,d=i;break;case 1:c=a,f=n,d=i;break;case 2:c=i,f=n,d=s;break;case 3:c=i,f=a,d=n;break;case 4:c=s,f=i,d=n;break;case 5:c=n,f=i,d=a;break}return[Math.round(c*255),Math.round(f*255),Math.round(d*255)]}function vt(e){const t=new Map,n=e.length;for(let r=0;r<n;r++){const o=e[r],[i,a,s]=wt(r/n,.6,.95);t.set(o,[i,a,s,255])}return t}function yt(e,t){const n=vt(t),r=new Uint8Array(e.length*4),o=[128,128,128,255];for(let i=0;i<e.length;i++){const a=n.get(e[i])??o;r[i*4+0]=a[0],r[i*4+1]=a[1],r[i*4+2]=a[2],r[i*4+3]=a[3]}return r}function bt(e,t){const n=new Array(t);for(let i=0;i<t;i++)n[i]=new Set;const r=e.length/3;for(let i=0;i<r;i++){const a=e[i*3+0],s=e[i*3+1],c=e[i*3+2];n[a].add(s),n[a].add(c),n[s].add(a),n[s].add(c),n[c].add(a),n[c].add(s)}const o=n.map(i=>Array.from(i));return{vertexCount:t,neighbours(i){return o[i]??[]}}}function _t(e,t){const n=e.length/3,r=new Float32Array(n*3),o=t.length/3;for(let i=0;i<o;i++){const a=t[i*3+0],s=t[i*3+1],c=t[i*3+2],f=e[a*3+0],d=e[a*3+1],l=e[a*3+2],h=e[s*3+0],u=e[s*3+1],_=e[s*3+2],D=e[c*3+0],p=e[c*3+1],C=e[c*3+2],S=h-f,m=u-d,B=_-l,A=D-f,x=p-d,I=C-l,v=m*I-B*x,g=B*A-S*I,L=S*x-m*A;r[a*3+0]+=v,r[a*3+1]+=g,r[a*3+2]+=L,r[s*3+0]+=v,r[s*3+1]+=g,r[s*3+2]+=L,r[c*3+0]+=v,r[c*3+1]+=g,r[c*3+2]+=L}for(let i=0;i<n;i++){const a=r[i*3+0],s=r[i*3+1],c=r[i*3+2],f=Math.sqrt(a*a+s*s+c*c);f>0&&(r[i*3+0]=a/f,r[i*3+1]=s/f,r[i*3+2]=c/f)}return r}function xt(e){const{vertices:t,labels:n,labelOrder:r,adjacency:o,normals:i}=e,a=o.vertexCount,s=new Float32Array(a*3),c=new Uint8Array(a),f=new Int32Array(a).fill(-1),d=[];for(let p=0;p<a;p++){if(c[p])continue;const C=n[p],S=d.length;d.push(C);const m=[p];for(c[p]=1;m.length>0;){const B=m.shift();f[B]=S;const A=o.neighbours(B);for(let x=0;x<A.length;x++){const I=A[x];!c[I]&&n[I]===C&&(c[I]=1,m.push(I))}}}const l=new Map;for(let p=0;p<r.length;p++)l.set(r[p],p);const h=new Uint8Array(a);for(let p=0;p<a;p++)l.has(n[p])||(h[p]=1);const u=new Uint8Array(a);for(let p=0;p<a;p++)h[p]&&(u[p]=1);const _=-1;for(let p=0;p<a;p++){if(h[p])continue;const C=t[p*3+0],S=t[p*3+1],m=t[p*3+2],B=f[p],A=n[p],x=l.get(A);let I=0,v=0,g=0,L=0;const P=o.neighbours(p);for(let k=0;k<P.length;k++){const y=P[k];if(h[y])continue;const z=f[y];if(z===B)continue;const H=d[z],$=l.get(H);if($===void 0)continue;const X=(x>$?-1:1)*_,M=t[y*3+0],U=t[y*3+1],Y=t[y*3+2];let N=M-C,V=U-S,G=Y-m;const b=Math.sqrt(N*N+V*V+G*G);b<1e-9||(N=N/b*X,V=V/b*X,G=G/b*X,I+=N,v+=V,g+=G,L++)}L>0&&(s[p*3+0]=I/L,s[p*3+1]=v/L,s[p*3+2]=g/L,u[p]=1)}const D=200;for(let p=0;p<D;p++){let C=!1,S=!0;const m=new Uint8Array(u),B=new Float32Array(s);for(let A=0;A<a;A++){if(u[A])continue;S=!1;const x=o.neighbours(A);let I=0,v=0;for(let $=0;$<x.length;$++){const R=x[$];if(R===A||h[R]||!m[R])continue;I++;const X=t[R*3+0]-t[A*3+0],M=t[R*3+1]-t[A*3+1],U=t[R*3+2]-t[A*3+2],Y=Math.sqrt(X*X+M*M+U*U);Y>v&&(v=Y)}if(I<2)continue;const g=i[A*3+0],L=i[A*3+1],P=i[A*3+2];let k=0,y=0,z=0,H=0;for(let $=0;$<x.length;$++){const R=x[$];if(R===A||h[R]||!m[R])continue;const X=t[R*3+0]-t[A*3+0],M=t[R*3+1]-t[A*3+1],U=t[R*3+2]-t[A*3+2],Y=Math.sqrt(X*X+M*M+U*U);let N=B[R*3+0],V=B[R*3+1],G=B[R*3+2];const b=Math.sqrt(N*N+V*V+G*G);let w=0,F=0,E=0;if(b>.001){const O=N/b,W=V/b,j=G/b;if(Math.abs(O*g+W*L+j*P)<.98){const ne=L*j-P*W,J=P*O-g*j,ee=g*W-L*O,ie=Math.sqrt(ne*ne+J*J+ee*ee);if(ie>1e-9){const ce=ne/ie,re=J/ie,oe=ee/ie;let le=re*P-oe*L,K=oe*g-ce*P,Q=ce*L-re*g;const Z=Math.sqrt(le*le+K*K+Q*Q);Z>1e-9&&(le/=Z,K/=Z,Q/=Z,w=le*b,F=K*b,E=Q*b)}}}const T=Y/v;k+=T*w,y+=T*F,z+=T*E,H+=T}H>0&&(s[A*3+0]=k/H,s[A*3+1]=y/H,s[A*3+2]=z/H,u[A]=1,C=!0)}if(S||!C)break}return s}function gt(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed for arrow");e.bindVertexArray(r);const o=t.attribs.get("a_corner")??-1;if(o<0)throw new Error("arrow vertex shader missing attribute a_corner");const i=e.createBuffer();if(!i)throw new Error("createBuffer failed for a_corner");e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(o),e.vertexAttribPointer(o,2,e.FLOAT,!1,0,0);function a(c,f,d,l,h){const u=t.attribs.get(c)??-1;if(u<0)throw new Error(`arrow shader missing attribute ${c}`);const _=e.createBuffer();if(!_)throw new Error(`createBuffer failed for ${c}`);e.bindBuffer(e.ARRAY_BUFFER,_),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW),e.enableVertexAttribArray(u),e.vertexAttribPointer(u,d,l,h,0,0),e.vertexAttribDivisor(u,1)}a("a_instance_position",n.positions,3,e.FLOAT,!1),a("a_instance_direction",n.directions,3,e.FLOAT,!1),a("a_instance_normal",n.normals,3,e.FLOAT,!1),a("a_instance_color",n.colors,4,e.UNSIGNED_BYTE,!0),e.bindVertexArray(null);const s=n.positions.length/3;return{vao:r,instanceCount:s,draw(){e.bindVertexArray(r),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,s),e.bindVertexArray(null)}}}function Et(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed for curved arrow");e.bindVertexArray(r);function o(c,f,d,l,h){const u=t.attribs.get(c)??-1;if(u<0)throw new Error(`curved-arrow shader missing attribute ${c}`);const _=e.createBuffer();if(!_)throw new Error(`createBuffer failed for ${c}`);e.bindBuffer(e.ARRAY_BUFFER,_),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW),e.enableVertexAttribArray(u),e.vertexAttribPointer(u,d,l,h,0,0)}o("a_position",n.positions,3,e.FLOAT,!1),o("a_tangent",n.tangents,3,e.FLOAT,!1),o("a_normal",n.normals,3,e.FLOAT,!1),o("a_color",n.colors,4,e.UNSIGNED_BYTE,!0),o("a_stripY",n.stripY,1,e.FLOAT,!1),o("a_stripSide",n.stripSide,1,e.FLOAT,!1),e.bindVertexArray(null);const i=new Int32Array(n.firstIndices),a=new Int32Array(n.counts),s=i.length;return{vao:r,firstIndices:i,counts:a,draw(){e.bindVertexArray(r);for(let c=0;c<s;c++)e.drawArrays(e.TRIANGLE_STRIP,i[c],a[c]);e.bindVertexArray(null)}}}const Je=8;function Ge(e,t,n,r,o){const i=t*o[e*3],a=t*o[e*3+1],s=t*o[e*3+2],c=Math.sqrt(i*i+a*a+s*s);if(c<1e-6)return null;const f=i/c,d=a/c,l=s/c,h=r.neighbours(e);let u=-1,_=.3,D=0;for(let p=0;p<h.length;p++){const C=h[p],S=n[C*3]-n[e*3],m=n[C*3+1]-n[e*3+1],B=n[C*3+2]-n[e*3+2],A=Math.sqrt(S*S+m*m+B*B);if(A<1e-6)continue;const x=(S*f+m*d+B*l)/A;x>_&&(_=x,u=C,D=A)}return u===-1?null:{next:u,edgeLen:D}}function At(e,t,n,r,o,i,a,s=Je){const c=t.length;if(e.length!==c*3)throw new Error(`buildCurvedArrowBuffers: anchors.length (${e.length}) does not match anchorAdjacencyIndices.length*3 (${c*3})`);const f=2*s+1,d=2*f,l=c*d,h=new Float32Array(l*3),u=new Float32Array(l*3),_=new Float32Array(l*3),D=new Uint8Array(l*4),p=new Float32Array(l),C=new Float32Array(l),S=new Int32Array(c),m=new Int32Array(c),B=new Int32Array(f),A=new Float32Array(f*3),x=new Float32Array(f*3),I=new Float32Array(f*3),v=new Uint8Array(f*4);for(let g=0;g<c;g++){const L=t[g];for(let y=0;y<f;y++)B[y]=L;let P=L;for(let y=0;y<s;y++){const z=Ge(P,-1,n,r,o);if(!z)break;P=z.next,B[s-1-y]=P}B[s]=L,P=L;for(let y=0;y<s;y++){const z=Ge(P,1,n,r,o);if(!z)break;P=z.next,B[s+1+y]=P}for(let y=0;y<f;y++){const z=B[y];y===s?(A[y*3+0]=e[g*3+0],A[y*3+1]=e[g*3+1],A[y*3+2]=e[g*3+2]):(A[y*3+0]=n[z*3+0],A[y*3+1]=n[z*3+1],A[y*3+2]=n[z*3+2]);const H=o[z*3+0],$=o[z*3+1],R=o[z*3+2],X=Math.sqrt(H*H+$*$+R*R)||1;x[y*3+0]=H/X,x[y*3+1]=$/X,x[y*3+2]=R/X;const M=i[z*3+0],U=i[z*3+1],Y=i[z*3+2],N=Math.sqrt(M*M+U*U+Y*Y)||1;I[y*3+0]=M/N,I[y*3+1]=U/N,I[y*3+2]=Y/N,v[y*4+0]=a[z*4+0],v[y*4+1]=a[z*4+1],v[y*4+2]=a[z*4+2],v[y*4+3]=255}const k=g*d;S[g]=k,m[g]=d;for(let y=0;y<f;y++){const H=2*(y/(f-1))-1;for(let $=0;$<2;$++){const R=k+y*2+$;h[R*3+0]=A[y*3+0],h[R*3+1]=A[y*3+1],h[R*3+2]=A[y*3+2],u[R*3+0]=x[y*3+0],u[R*3+1]=x[y*3+1],u[R*3+2]=x[y*3+2],_[R*3+0]=I[y*3+0],_[R*3+1]=I[y*3+1],_[R*3+2]=I[y*3+2],D[R*4+0]=v[y*4+0],D[R*4+1]=v[y*4+1],D[R*4+2]=v[y*4+2],D[R*4+3]=v[y*4+3],p[R]=H,C[R]=$===0?-1:1}}}return{positions:h,tangents:u,normals:_,colors:D,stripY:p,stripSide:C,firstIndices:S,counts:m}}const Tt="di-cache",fe="datasets",Ct=1,Me="current";function ke(){return new Promise(e=>{if(typeof indexedDB>"u"){e(null);return}let t;try{t=indexedDB.open(Tt,Ct)}catch(n){console.warn("[datasetCache] indexedDB.open threw:",n),e(null);return}t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(fe)||n.createObjectStore(fe)},t.onsuccess=()=>e(t.result),t.onerror=()=>{console.warn("[datasetCache] failed to open DB:",t.error),e(null)},t.onblocked=()=>{console.warn("[datasetCache] open blocked by another connection"),e(null)}})}async function Xe(e){const t=await ke();if(t)try{await new Promise(n=>{const r=t.transaction(fe,"readwrite"),o=r.objectStore(fe),i={...e,savedAt:Date.now()},a=o.put(i,Me);a.onerror=()=>{console.warn("[datasetCache] put failed:",a.error)},r.oncomplete=()=>n(),r.onerror=()=>{console.warn("[datasetCache] save tx error:",r.error),n()},r.onabort=()=>{console.warn("[datasetCache] save tx aborted:",r.error),n()}})}catch(n){console.warn("[datasetCache] saveDataset threw:",n)}finally{t.close()}}async function St(){const e=await ke();if(!e)return null;try{return await new Promise(t=>{const n=e.transaction(fe,"readonly"),o=n.objectStore(fe).get(Me);o.onsuccess=()=>{const i=o.result;if(!i){t(null);return}typeof i.name=="string"&&typeof i.plyText=="string"&&typeof i.labelsText=="string"&&typeof i.orderText=="string"&&typeof i.savedAt=="number"?t(i):(console.warn("[datasetCache] cached record has unexpected shape; ignoring"),t(null))},o.onerror=()=>{console.warn("[datasetCache] get failed:",o.error),t(null)},n.onerror=()=>{console.warn("[datasetCache] load tx error:",n.error),t(null)},n.onabort=()=>{console.warn("[datasetCache] load tx aborted:",n.error),t(null)}})}catch(t){return console.warn("[datasetCache] loadCachedDataset threw:",t),null}finally{e.close()}}async function Rt(){const e=await ke();if(e)try{await new Promise(t=>{const n=e.transaction(fe,"readwrite"),o=n.objectStore(fe).delete(Me);o.onerror=()=>{console.warn("[datasetCache] delete failed:",o.error)},n.oncomplete=()=>t(),n.onerror=()=>{console.warn("[datasetCache] clear tx error:",n.error),t()},n.onabort=()=>{console.warn("[datasetCache] clear tx aborted:",n.error),t()}})}catch(t){console.warn("[datasetCache] clearDataset threw:",t)}finally{e.close()}}function Lt(e,t){const n=e.length,r=new Uint8Array(n);for(let o=0;o<n;o++){const i=e[o],a=t.neighbours(o);for(let s=0;s<a.length;s++)if(e[a[s]]!==i){r[o]=1;break}}return r}function Ft(e,t,n,r,o,i,a=.05,s){const c=t.vertexCount,f=a*a,d=new Int32Array(c);for(let x=0;x<c;x++)d[x]=x;let l=3737844653;const h=()=>(l=l*1664525+1013904223>>>0,(l&4294967295)/4294967295);for(let x=c-1;x>0;x--){const I=Math.floor(h()*(x+1)),v=d[x];d[x]=d[I],d[I]=v}const u=new Uint8Array(c),_=new Float32Array(c),D=[];for(let x=0;x<c;x++){const I=d[x];if(u[I]||s&&!s[I])continue;const v=n[I*3],g=n[I*3+1],L=n[I*3+2];if(v*v+g*g+L*L<f)continue;D.push(I),_.fill(1/0),_[I]=0,u[I]=1;const P=[{d:0,u:I}];for(;P.length>0;){let k=0;for(let R=1;R<P.length;R++)P[R].d<P[k].d&&(k=R);const y=P[k];P[k]=P[P.length-1],P.pop();const z=y.d,H=y.u;if(z>_[H])continue;if(z>i)break;u[H]=1;const $=t.neighbours(H);for(let R=0;R<$.length;R++){const X=$[R],M=e[X*3]-e[H*3],U=e[X*3+1]-e[H*3+1],Y=e[X*3+2]-e[H*3+2],N=Math.sqrt(M*M+U*U+Y*Y),V=z+N;V<_[X]&&V<=i&&(_[X]=V,P.push({d:V,u:X}))}}}const p=D.length,C=new Float32Array(p*3),S=new Float32Array(p*3),m=new Float32Array(p*3),B=new Uint8Array(p*4),A=new Int32Array(p);for(let x=0;x<p;x++){const I=D[x];A[x]=I,C[x*3+0]=e[I*3+0],C[x*3+1]=e[I*3+1],C[x*3+2]=e[I*3+2];const v=n[I*3],g=n[I*3+1],L=n[I*3+2],P=Math.sqrt(v*v+g*g+L*L)||1;S[x*3+0]=v/P,S[x*3+1]=g/P,S[x*3+2]=L/P,m[x*3+0]=r[I*3],m[x*3+1]=r[I*3+1],m[x*3+2]=r[I*3+2],B[x*4+0]=o[I*4],B[x*4+1]=o[I*4+1],B[x*4+2]=o[I*4+2],B[x*4+3]=255}return{positions:C,directions:S,normals:m,colors:B,vertexIDs:A}}function It(e,t,n=.8){const r=e.positions.length/3;if(r===0)return e;const o=(t*n)**2,i=t*n,a=new Map,s=new Uint8Array(r),c=new Float32Array(r),f=new Float32Array(r),d=new Float32Array(r);for(let m=0;m<r;m++)c[m]=e.positions[m*3],f[m]=e.positions[m*3+1],d[m]=e.positions[m*3+2];for(let m=0;m<r;m++){const B=Math.floor(c[m]/i),A=Math.floor(f[m]/i),x=Math.floor(d[m]/i);let I=!1;e:for(let v=-1;v<=1;v++)for(let g=-1;g<=1;g++)for(let L=-1;L<=1;L++){const P=`${B+L},${A+g},${x+v}`,k=a.get(P);if(k)for(let y=0;y<k.length;y++){const z=k[y],H=c[z]-c[m],$=f[z]-f[m],R=d[z]-d[m];if(H*H+$*$+R*R<o){I=!0;break e}}}if(!I){s[m]=1;const v=`${B},${A},${x}`,g=a.get(v);g?g.push(m):a.set(v,[m])}}let l=0;for(let m=0;m<r;m++)s[m]&&l++;const h=new Float32Array(l*3),u=new Float32Array(l*3),_=new Float32Array(l*3),D=new Uint8Array(l*4),p=e.vertexIDs??null,C=p?new Int32Array(l):null;let S=0;for(let m=0;m<r;m++)s[m]&&(h[S*3+0]=e.positions[m*3+0],h[S*3+1]=e.positions[m*3+1],h[S*3+2]=e.positions[m*3+2],u[S*3+0]=e.directions[m*3+0],u[S*3+1]=e.directions[m*3+1],u[S*3+2]=e.directions[m*3+2],_[S*3+0]=e.normals[m*3+0],_[S*3+1]=e.normals[m*3+1],_[S*3+2]=e.normals[m*3+2],D[S*4+0]=e.colors[m*4+0],D[S*4+1]=e.colors[m*4+1],D[S*4+2]=e.colors[m*4+2],D[S*4+3]=e.colors[m*4+3],C&&p&&(C[S]=p[m]),S++);return{positions:h,directions:u,normals:_,colors:D,vertexIDs:C}}function Dt(e,t,n,r,o,i,a,s=.05){const c=t.vertexCount,f=s*s,d=new Int32Array(c);for(let v=0;v<c;v++)d[v]=v;let l=1592651789;const h=()=>(l=l*1664525+1013904223>>>0,(l&4294967295)/4294967295);for(let v=c-1;v>0;v--){const g=Math.floor(h()*(v+1)),L=d[v];d[v]=d[g],d[g]=L}const u=new Uint8Array(c),_=[];function D(v,g){const L=g*n[v*3],P=g*n[v*3+1],k=g*n[v*3+2],y=Math.sqrt(L*L+P*P+k*k);if(y<1e-6)return null;const z=L/y,H=P/y,$=k/y,R=t.neighbours(v);let X=-1,M=.3,U=0;for(let Y=0;Y<R.length;Y++){const N=R[Y],V=e[N*3]-e[v*3],G=e[N*3+1]-e[v*3+1],b=e[N*3+2]-e[v*3+2],w=Math.sqrt(V*V+G*G+b*b);if(w<1e-6)continue;const F=(V*z+G*H+b*$)/w;F>M&&(M=F,X=N,U=w)}return X===-1?null:{next:X,edgeLen:U}}function p(v){const g=new Map;g.set(v,0);const L=[{d:0,u:v}];for(;L.length>0;){let P=0;for(let z=1;z<L.length;z++)L[z].d<L[P].d&&(P=z);const k=L[P];if(L[P]=L[L.length-1],L.pop(),k.d>(g.get(k.u)??1/0))continue;if(k.d>a)break;u[k.u]=1;const y=t.neighbours(k.u);for(let z=0;z<y.length;z++){const H=y[z],$=e[H*3]-e[k.u*3],R=e[H*3+1]-e[k.u*3+1],X=e[H*3+2]-e[k.u*3+2],M=Math.sqrt($*$+R*R+X*X),U=k.d+M;U<=a&&U<(g.get(H)??1/0)&&(g.set(H,U),L.push({d:U,u:H}))}}}function C(v,g,L){const P=[];let k=v,y=0;L&&P.push(k);const z=500;for(let H=0;H<z;H++){const $=D(k,g);if(!$||u[$.next])break;if(y+=$.edgeLen,k=$.next,y>=i){const R=n[k*3],X=n[k*3+1],M=n[k*3+2];if(R*R+X*X+M*M<f)break;P.push(k),y=0}}return P}for(let v=0;v<c;v++){const g=d[v];if(u[g])continue;const L=n[g*3],P=n[g*3+1],k=n[g*3+2];if(L*L+P*P+k*k<f)continue;const y=C(g,1,!0),z=C(g,-1,!1),H=y.concat(z);if(H.length!==0){for(const $ of H)p($);_.push(...H)}}const S=_.length,m=new Float32Array(S*3),B=new Float32Array(S*3),A=new Float32Array(S*3),x=new Uint8Array(S*4),I=new Int32Array(S);for(let v=0;v<S;v++){const g=_[v];I[v]=g,m[v*3+0]=e[g*3+0],m[v*3+1]=e[g*3+1],m[v*3+2]=e[g*3+2];const L=n[g*3],P=n[g*3+1],k=n[g*3+2],y=Math.sqrt(L*L+P*P+k*k)||1;B[v*3+0]=L/y,B[v*3+1]=P/y,B[v*3+2]=k/y,A[v*3+0]=r[g*3],A[v*3+1]=r[g*3+1],A[v*3+2]=r[g*3+2],x[v*4+0]=o[g*4],x[v*4+1]=o[g*4+1],x[v*4+2]=o[g*4+2],x[v*4+3]=255}return{positions:m,directions:B,normals:A,colors:x,vertexIDs:I}}let be=null,Pe=null,pe=null;function Pt(){if(be)return be;const e=document.createElement("div");return e.className="panel-tooltip",e.setAttribute("role","tooltip"),document.body.appendChild(e),be=e,e}function Mt(e,t){t.style.left="0px",t.style.top="0px",t.style.maxWidth="240px";const n=t.getBoundingClientRect(),r=e.getBoundingClientRect(),o=10;let i=r.left-n.width-o,a=r.top+r.height/2-n.height/2;i<o&&(i=r.left+r.width/2-n.width/2,a=r.top-n.height-o,a<o&&(a=r.bottom+o));const s=window.innerWidth-n.width-o,c=window.innerHeight-n.height-o;i=Math.max(o,Math.min(i,s)),a=Math.max(o,Math.min(a,c)),t.style.left=`${i}px`,t.style.top=`${a}px`}function kt(e,t){const n=Pt();n.textContent=t,n.classList.add("visible"),Pe=e,requestAnimationFrame(()=>{Pe===e&&Mt(e,n)})}function Ae(){pe!==null&&(clearTimeout(pe),pe=null),Pe=null,be&&be.classList.remove("visible")}function se(e,t){t&&(e.addEventListener("mouseenter",()=>{pe!==null&&clearTimeout(pe),pe=window.setTimeout(()=>{pe=null,kt(e,t)},400)}),e.addEventListener("mouseleave",Ae),e.addEventListener("mousedown",Ae))}window.addEventListener("scroll",Ae,!0);window.addEventListener("resize",Ae);const Ce={showLIC:!1,showColor:!0,showArrows:!0,useLabelColors:!1,licIterations:50,licHighContrast:!0,licEmphasizeSingular:!1,arrowCurved:!1,arrowBorderMode:!1,arrowDensity:.02,arrowScale:.008,arrowHeight:1.3,arrowWidth:.9,arrowBodyWidth:.25,arrowHeadFrac:.25,arrowDist:.5,arrowOpacity:.72,arrowFlipDirection:!0,arrowColorR:0,arrowColorG:0,arrowColorB:0,bgColorR:.07,bgColorG:.07,bgColorB:.07,parcelSmoothing:1,parcelRefinement:0,surfaceAmbient:.04,surfaceDiffuse:.75,surfaceSpecular:.4,surfaceShininess:80,screenshotDPI:600,lastDatasetName:null,lastDatasetFiles:null},Be="di-panel-params-v1";function Bt(){try{const e=window.localStorage.getItem(Be);if(!e)return{...Ce};const t=JSON.parse(e);return{...Ce,...t}}catch{return{...Ce}}}function ge(e){try{window.localStorage.setItem(Be,JSON.stringify(e))}catch{}}function Nt(e){ge(e)}function Se(e,t){if(e.replaceChildren(),t.lastDatasetFiles){const n=t.lastDatasetFiles,r=document.createElement("div");r.textContent="Loaded:",e.appendChild(r);const o=document.createElement("div");o.style.paddingLeft="8px",o.style.opacity="0.9";for(const i of[n.ply,n.labels,n.labelorder]){const a=document.createElement("div");a.textContent=i,o.appendChild(a)}e.appendChild(o),e.style.color="var(--ok)"}else t.lastDatasetName?(e.textContent=`Loaded: ${t.lastDatasetName}`,e.style.color="var(--ok)"):(e.textContent="Pick a .ply + .labels + .labelorder triple",e.style.color="")}const Ut=[{key:"showLIC",label:"LIC streamlines",type:"checkbox",tooltip:"Toggle the swirling streamline pattern (Line Integral Convolution) that visualizes the directional field on the surface."},{key:"showColor",label:"Parcellation colors",type:"checkbox",tooltip:"Toggle per-region surface colors. When off, the surface goes black so the LIC streaks read more clearly."},{key:"useLabelColors",label:"Use label-order palette (override PLY RGB)",type:"checkbox",tooltip:"Use the label-order HSV palette instead of any RGB colors stored in the PLY mesh. Useful when the PLY's vertex colors aren't what you want."},{key:"showArrows",label:"Arrows",type:"checkbox",tooltip:"Toggle the directional glyph overlay."}],zt=[{key:"licIterations",label:"Streamline length (iterations)",type:"range",min:5,max:100,step:1,tooltip:"How many advection steps each noise sample takes along the field. Higher = longer, more visible streaks."},{key:"licHighContrast",label:"High contrast",type:"checkbox",tooltip:"Boost the LIC contribution to the composite for crisper streaks."},{key:"licEmphasizeSingular",label:"Emphasize singularities",type:"checkbox",tooltip:"Highlight regions with weak directional magnitude (saddle points, vortex centers) in white/black bands so field topology reads at a glance."}],Vt=[{key:"arrowBorderMode",label:"Borders only",type:"checkbox",expensive:!0,tooltip:"Place glyphs only on parcellation borders, not the whole surface."},{key:"arrowDensity",label:"Density (smaller = denser)",type:"range",min:.02,max:.18,step:.005,expensive:!0,tooltip:"Minimum spacing between glyphs as a fraction of mesh radius. Smaller numbers pack glyphs more densely."},{key:"arrowScale",label:"Size",type:"range",min:.002,max:.025,step:5e-4,expensive:!0,tooltip:"Overall glyph size as a fraction of mesh radius. Multiplies every glyph length and width proportionally."},{key:"arrowDist",label:"Distance from surface",type:"range",min:0,max:5,step:.1,tooltip:"How far above the surface the glyph bodies float, in mesh units relative to glyph size."}],Ot=[{key:"arrowHeight",label:"Length",type:"range",min:.5,max:8,step:.1,expensive:!0,tooltip:"Total length of the glyph along its flow direction. The Head/body ratio slider subdivides this length."},{key:"arrowHeadFrac",label:"Head/body ratio",type:"range",min:0,max:1,step:.01,tooltip:"Head's share of total length. 0 = pure body (rectangle, no head); 1 = pure head (full triangle, no body); 0.5 = head and body equal. Default 0.25."},{key:"arrowWidth",label:"Head width",type:"range",min:.5,max:4,step:.1,tooltip:"Maximum width at the head's base. Body width is a fraction of this."},{key:"arrowBodyWidth",label:"Body width (fraction of head)",type:"range",min:.05,max:1,step:.02,tooltip:"Body width as a fraction of head width. 0 = pin-thin shaft; 1 = uniform width with no flare."},{key:"arrowOpacity",label:"Opacity",type:"range",min:0,max:1,step:.02,tooltip:"Glyph alpha. Lower values let the LIC underlay show through."},{key:"arrowFlipDirection",label:"Flip direction",type:"checkbox",tooltip:"Reverse the direction every glyph points along its flow line. Instant — no recompute."},{key:"arrowColorR",label:"Color",type:"color",tooltip:"Glyph fill color. The preview background flips to a contrasting tone automatically."}],Ht=[{key:"bgColorR",label:"Background",type:"color",tooltip:"Canvas background color, used for the page background and as the reference background for screenshot transparency cropping."}],$t=[{key:"surfaceAmbient",label:"Ambient",type:"range",min:0,max:.5,step:.01,tooltip:"Constant lighting offset added to every surface pixel. Higher = flatter look."},{key:"surfaceDiffuse",label:"Diffuse",type:"range",min:0,max:1.5,step:.05,tooltip:"Light intensity scaled by surface-normal · light-direction. Higher = more pronounced shading from curvature."},{key:"surfaceSpecular",label:"Specular (glare)",type:"range",min:0,max:1,step:.02,tooltip:"Glare intensity. Higher = more shiny highlights (can make brains look plasticy)."},{key:"surfaceShininess",label:"Shininess (sharpness)",type:"range",min:1,max:400,step:1,tooltip:"Specular sharpness. Higher = smaller, sharper highlights."}],Ne="di-panel-collapsed-v1";function Gt(){try{const e=window.localStorage.getItem(Ne);if(!e)return new Set;const t=JSON.parse(e);return Array.isArray(t)?new Set(t.filter(n=>typeof n=="string")):new Set}catch{return new Set}}function Xt(e){try{window.localStorage.setItem(Ne,JSON.stringify(Array.from(e)))}catch{}}function he(e,t,n){const r=document.createElement("div");if(r.className="panel-control",e.type==="range"){const o=document.createElement("label");o.className="panel-label";const i=document.createElement("span");i.className="panel-label-text",i.textContent=e.label,o.appendChild(i);const a=d=>e.step!==void 0&&String(e.step).includes(".")?d.toFixed(3):String(d),s=document.createElement("input");s.type="text",s.className="panel-value panel-value-input",s.inputMode="decimal",s.spellcheck=!1,s.value=a(t[e.key]),s.title=`Click to type a value (range: ${e.min}–${e.max})`,o.appendChild(s);const c=document.createElement("input");c.type="range",c.min=String(e.min),c.max=String(e.max),c.step=String(e.step),c.value=String(t[e.key]);const f=d=>{let l=d;e.min!==void 0&&l<e.min&&(l=e.min),e.max!==void 0&&l>e.max&&(l=e.max),t[e.key]=l,c.value=String(l),s.value=a(l),n()};c.addEventListener("input",()=>f(parseFloat(c.value))),s.addEventListener("focus",()=>s.select()),s.addEventListener("keydown",d=>{if(d.key==="Enter"){d.preventDefault();const l=parseFloat(s.value);Number.isFinite(l)?f(l):s.value=a(t[e.key]),s.blur()}else d.key==="Escape"&&(s.value=a(t[e.key]),s.blur())}),s.addEventListener("blur",()=>{const d=parseFloat(s.value);Number.isFinite(d)?f(d):s.value=a(t[e.key])}),r.appendChild(o),r.appendChild(c)}else if(e.type==="checkbox"){r.classList.add("checkbox-row");const o=document.createElement("input");o.type="checkbox",o.checked=!!t[e.key],o.id=`panel-cb-${String(e.key)}`,o.addEventListener("change",()=>{t[e.key]=o.checked,n()});const i=document.createElement("label");i.className="panel-label",i.htmlFor=o.id;const a=document.createElement("span");a.className="panel-label-text",a.textContent=e.label,i.appendChild(a),r.appendChild(o),r.appendChild(i)}else if(e.type==="color"){const o=document.createElement("label");o.className="panel-label";const i=document.createElement("span");i.className="panel-label-text",i.textContent=e.label,o.appendChild(i);const a=e.key,s=a,c=a.replace(/R$/,"G"),f=a.replace(/R$/,"B"),d=t,l=document.createElement("input");l.type="color";const h=_=>Math.max(0,Math.min(255,Math.round(_*255))),u=(_,D,p)=>"#"+[_,D,p].map(C=>h(C).toString(16).padStart(2,"0")).join("");l.value=u(d[s],d[c],d[f]),l.addEventListener("input",()=>{const _=l.value.slice(1);d[s]=parseInt(_.slice(0,2),16)/255,d[c]=parseInt(_.slice(2,4),16)/255,d[f]=parseInt(_.slice(4,6),16)/255,n()}),r.appendChild(o),r.appendChild(l)}return se(r,e.tooltip),r}function Yt(e,t,n,r,o,i){const a=document.createElement("div");a.id="panel-root";const s=document.createElement("button");s.id="panel-toggle",s.title="Toggle controls",s.setAttribute("aria-label","Toggle controls"),s.innerHTML='<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 2L7.5 7L2.5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';const c=document.createElement("div");c.id="panel";const f=document.createElement("div");f.id="panel-titlebar";const d=document.createElement("span");d.id="panel-title",d.textContent="Controls";const l=document.createElement("button");l.id="panel-collapse-btn",l.type="button",l.title="Hide controls",l.setAttribute("aria-label","Hide controls"),l.innerHTML='<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',f.appendChild(d),f.appendChild(l),c.appendChild(f);const h=Gt(),u=(M,U,Y)=>{const N=document.createElement("section");N.className="panel-section",N.dataset.section=M;const V=document.createElement("button");V.type="button",V.className="panel-heading",V.setAttribute("aria-expanded","true");const G=document.createElement("span");G.className="panel-heading-caret",G.textContent="▾";const b=document.createElement("span");b.className="panel-heading-title",b.textContent=U,V.appendChild(G),V.appendChild(b);const w=document.createElement("div");w.className="panel-section-body";const F=document.createElement("div");F.className="panel-section-inner",w.appendChild(F);const E=T=>{N.classList.toggle("collapsed",T),G.textContent=T?"▸":"▾",V.setAttribute("aria-expanded",T?"false":"true")};return E(h.has(M)),V.addEventListener("click",()=>{const T=!N.classList.contains("collapsed");E(T),T?h.add(M):h.delete(M),Xt(h)}),N.appendChild(V),N.appendChild(w),c.appendChild(N),se(V,Y),F};if(n){const M=u("data","Data","Pick a bundled dataset, or upload your own .ply + .labels + .labelorder triple. Loaded datasets are cached so they auto-restore on reload."),U=document.createElement("div");if(U.className="panel-note",Se(U,e),M.appendChild(U),i){const G=document.createElement("div");G.className="panel-control";const b=document.createElement("div");b.className="panel-label-text",b.textContent="Bundled datasets";const w=document.createElement("select");w.className="panel-select";const F=document.createElement("option");F.value="",F.textContent="Loading…",F.disabled=!0,F.selected=!0,w.appendChild(F),G.appendChild(b),G.appendChild(w),M.appendChild(G),se(G,"Load one of the example datasets bundled with the site. Each dataset has matching .ply mesh, .labels per-vertex, and .labelorder files.");let E="";(async()=>{try{const T=await fetch("/directionality-indicator-webgl/data/manifest.json");if(!T.ok)throw new Error(`manifest ${T.status}`);const O=await T.json();w.replaceChildren();const W=document.createElement("option");W.value="",W.textContent="Pick a bundled dataset…",W.disabled=!0,W.selected=!0,w.appendChild(W);for(const j of O.datasets){const te=document.createElement("option");te.value=j,te.textContent=j,w.appendChild(te)}}catch{w.replaceChildren();const T=document.createElement("option");T.textContent="(no manifest)",T.disabled=!0,T.selected=!0,w.appendChild(T)}})(),w.addEventListener("change",async()=>{const T=w.value;if(!(!T||T===E)){U.textContent=`Loading ${T}…`,U.style.color="var(--text-mute)";try{await i(T),e.lastDatasetName=`${T}.ply`,e.lastDatasetFiles={ply:`${T}.ply`,labels:`${T}.labels`,labelorder:`${T}.labelorder`},ge(e),Se(U,e),E=T}catch(O){U.textContent="Error: "+(O instanceof Error?O.message:String(O)),U.style.color="var(--danger)",w.value=E}}})}const Y=document.createElement("div");Y.className="panel-file-row";const N=document.createElement("input");N.type="file",N.multiple=!0,N.accept=".ply,.labels,.labelorder",N.id="panel-file-input",N.className="panel-file-input";const V=document.createElement("label");V.htmlFor=N.id,V.className="panel-file-label",V.innerHTML='<span class="icon" aria-hidden="true">⬆</span><span>Or upload local files…</span>',se(V,"Select all three files (.ply mesh, .labels per-vertex, .labelorder display order). They must share a vertex count."),N.addEventListener("change",async()=>{if(!N.files)return;const G=Array.from(N.files),b=G.find(E=>E.name.toLowerCase().endsWith(".ply")),w=G.find(E=>E.name.toLowerCase().endsWith(".labels")),F=G.find(E=>E.name.toLowerCase().endsWith(".labelorder"));if(!b||!w||!F){U.textContent="Need exactly one .ply, .labels, and .labelorder",U.style.color="var(--danger)";return}U.textContent="Loading…",U.style.color="var(--text-mute)";try{await n({ply:b,labels:w,labelorder:F}),e.lastDatasetName=b.name,e.lastDatasetFiles={ply:b.name,labels:w.name,labelorder:F.name},ge(e),Se(U,e)}catch(E){U.textContent="Error: "+(E instanceof Error?E.message:String(E)),U.style.color="var(--danger)"}}),Y.appendChild(N),Y.appendChild(V),M.appendChild(Y)}let _=!1,D=null;const p=()=>{ge(e),_&&(D!==null&&clearTimeout(D),D=window.setTimeout(()=>{D=null;const M=_;_=!1,t(e,M)},250)),t(e,!1)};if(o){const M=u("view","View","Snap to a canonical anatomical view, or rotate freely with mouse drag. Camera position auto-saves and restores on next load."),U=document.createElement("div");U.className="panel-view-grid";const Y=[{name:"lateral-left",label:"Lateral L",tip:"Snap camera to the left lateral view."},{name:"lateral-right",label:"Lateral R",tip:"Snap camera to the right lateral view."},{name:"anterior",label:"Anterior",tip:"Snap camera to the anterior (front) view."},{name:"posterior",label:"Posterior",tip:"Snap camera to the posterior (back) view."},{name:"dorsal",label:"Dorsal",tip:"Snap camera to the dorsal (top) view."},{name:"ventral",label:"Ventral",tip:"Snap camera to the ventral (bottom) view."}];for(const V of Y){const G=document.createElement("button");G.type="button",G.className="panel-view-btn",G.textContent=V.label,G.addEventListener("click",()=>o.set(V.name)),U.appendChild(G),se(G,V.tip)}M.appendChild(U);const N=document.createElement("div");N.className="panel-note",N.textContent="Or rotate freely with mouse drag. Position auto-saves.",M.appendChild(N)}const C=u("visibility","Visibility","Toggle which layers (LIC, parcellation colors, glyphs) are visible.");for(const M of Ut)C.appendChild(he(M,e,p));const S=u("lic","LIC","Tune the Line Integral Convolution streamline pattern that visualizes the directional field.");for(const M of zt)S.appendChild(he(M,e,p));const m=u("scene","Scene","Background color for the canvas.");for(const M of Ht)m.appendChild(he(M,e,p));const B=u("surface","Surface shading","Phong lighting parameters for the underlying parcellation surface (ambient, diffuse, specular, shininess).");for(const M of $t)B.appendChild(he(M,e,p));const A=u("arrows","Glyphs","Place and design the directional glyphs overlaid on the brain. The Glyph designer below the layout controls includes a live preview.");for(const M of Vt){const U=!!M.expensive;A.appendChild(he(M,e,()=>{U&&(_=!0),p()}))}const x=document.createElement("div");x.className="glyph-designer";const I=document.createElement("div");I.className="glyph-designer-heading",I.textContent="Glyph designer",x.appendChild(I),se(I,"Per-glyph shape parameters with a live preview. The brain uses the same parameters in real time.");const v=document.createElement("div");v.className="glyph-preview-wrap";const g="http://www.w3.org/2000/svg",L=document.createElementNS(g,"svg");L.setAttribute("viewBox","-80 -45 160 90"),L.setAttribute("class","glyph-preview"),L.setAttribute("aria-label","Glyph preview");const P=document.createElementNS(g,"g");P.setAttribute("class","glyph-preview-group");const k=document.createElementNS(g,"line");k.setAttribute("x1","-76"),k.setAttribute("x2","76"),k.setAttribute("y1","0"),k.setAttribute("y2","0"),k.setAttribute("stroke","rgba(128,128,128,0.25)"),k.setAttribute("stroke-dasharray","2 3"),L.appendChild(k),L.appendChild(P);const y=document.createElementNS(g,"path");y.setAttribute("stroke-linejoin","round"),P.appendChild(y),v.appendChild(L),x.appendChild(v),se(v,"Live preview of a single glyph using the current shape parameters. The background flips between dark and light to keep contrast with the glyph color.");const z=()=>{const Y=2*e.arrowHeight*12,N=e.arrowWidth*12,V=N*e.arrowBodyWidth,G=Y/2,b=Y*e.arrowHeadFrac,w=-G+b,F=G,E=V/2,T=N/2,O=`M ${-E} ${F} L ${-E} ${w} L ${-T} ${w} L 0 ${-G} L ${T} ${w} L ${E} ${w} L ${E} ${F} Z`;y.setAttribute("d",O);const W=Math.round(e.arrowColorR*255),j=Math.round(e.arrowColorG*255),te=Math.round(e.arrowColorB*255);y.setAttribute("fill",`rgb(${W}, ${j}, ${te})`),y.setAttribute("fill-opacity",String(e.arrowOpacity)),y.setAttribute("stroke","rgba(128,128,128,0.45)"),y.setAttribute("stroke-width","0.6");const ne=e.arrowFlipDirection?90:-90;P.setAttribute("transform",`rotate(${ne})`);const J=.299*e.arrowColorR+.587*e.arrowColorG+.114*e.arrowColorB,ee=J>.5?"rgba(28, 28, 28, 0.92)":"rgba(238, 238, 238, 0.95)";v.style.backgroundColor=ee,k.setAttribute("stroke",J>.5?"rgba(255,255,255,0.22)":"rgba(0,0,0,0.18)")};for(const M of Ot){const U=!!M.expensive;x.appendChild(he(M,e,()=>{U&&(_=!0),p(),z()}))}if(z(),A.appendChild(x),r){const M=u("screenshot","Screenshot","Save high-resolution PNGs of the current view, or all six canonical anatomical views. Backgrounds are transparent and auto-cropped."),U=document.createElement("div");U.className="panel-note",U.textContent="Saves PNG with transparent background",M.appendChild(U);const Y={key:"screenshotDPI",label:"Resolution (DPI)",type:"range",min:72,max:1200,step:6,tooltip:"Output pixel scale. 96 = current canvas size; higher = upsampled. Hard-capped at 50 megapixels (a console warning fires if a setting would exceed it)."};M.appendChild(he(Y,e,p));const N=document.createElement("button");N.type="button",N.className="panel-btn",N.innerHTML='<span class="icon" aria-hidden="true">⤓</span><span>Current view</span>',N.addEventListener("click",async()=>{N.disabled=!0;try{await r.current()}finally{N.disabled=!1}}),M.appendChild(N),se(N,"Save the current camera angle as a transparent-background PNG, auto-cropped to the brain extent.");const V=document.createElement("button");V.type="button",V.className="panel-btn",V.style.marginTop="8px",V.innerHTML='<span class="icon" aria-hidden="true">▦</span><span>All canonical views</span>',V.addEventListener("click",async()=>{V.disabled=!0;try{await r.canonical()}finally{V.disabled=!1}}),M.appendChild(V),se(V,"Save 6 PNGs (one per anatomical direction: lateral L/R, anterior, posterior, dorsal, ventral), each auto-cropped.")}const H=document.createElement("div");H.className="panel-control",H.style.marginTop="22px";const $=document.createElement("button");$.id="panel-reset",$.type="button",$.innerHTML='<span class="icon" aria-hidden="true">↻</span><span>Reset to defaults</span>',$.addEventListener("click",async()=>{try{window.localStorage.removeItem(Be)}catch{}try{window.localStorage.removeItem(Ne)}catch{}try{window.localStorage.removeItem("di-camera-state-v1")}catch{}await Rt(),window.location.reload()}),H.appendChild($),c.appendChild(H),se($,"Clear all panel parameters, camera state, section-collapse state, and the cached dataset, then reload the page.");let R=!0;const X=M=>{R=M,c.classList.toggle("closed",!R),s.classList.toggle("closed",!R),s.title=R?"Hide controls":"Show controls",s.setAttribute("aria-label",R?"Hide controls":"Show controls")};return s.addEventListener("click",()=>X(!R)),l.addEventListener("click",()=>X(!1)),X(!0),a.appendChild(s),a.appendChild(c),{element:a,toggle:()=>X(!R)}}function Re(e,t){if(t.colors.some(c=>c.type===e.FLOAT||c.type===e.HALF_FLOAT)&&!e.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float not supported — cannot create float-format FBO");const r=e.createFramebuffer();if(!r)throw new Error("createFramebuffer failed");let o=[],i=null;function a(c,f){e.bindFramebuffer(e.FRAMEBUFFER,r);for(const l of o)e.deleteTexture(l);if(i&&e.deleteTexture(i),o=[],i=null,t.colors.forEach((l,h)=>{const u=e.createTexture();if(!u)throw new Error(`createTexture failed for color attachment ${h}`);e.bindTexture(e.TEXTURE_2D,u),e.texImage2D(e.TEXTURE_2D,0,l.internalFormat,c,f,0,l.format,l.type,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,l.minFilter??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,l.magFilter??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,l.wrapS??e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,l.wrapT??e.CLAMP_TO_EDGE),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+h,e.TEXTURE_2D,u,0),o.push(u)}),t.depth){const l=e.createTexture();if(!l)throw new Error("createTexture failed for depth attachment");e.bindTexture(e.TEXTURE_2D,l),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT32F,c,f,0,e.DEPTH_COMPONENT,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,l,0),i=l}const d=e.checkFramebufferStatus(e.FRAMEBUFFER);if(d!==e.FRAMEBUFFER_COMPLETE)throw new Error(`Framebuffer incomplete: 0x${d.toString(16)}`);e.bindFramebuffer(e.FRAMEBUFFER,null)}return a(t.width,t.height),{fbo:r,get width(){return t.width},get height(){return t.height},get colorTextures(){return o},get depthTexture(){return i},bind(){e.bindFramebuffer(e.FRAMEBUFFER,r),e.viewport(0,0,t.width,t.height);const c=t.colors.map((f,d)=>e.COLOR_ATTACHMENT0+d);e.drawBuffers(c)},resize(c,f){t.width=c,t.height=f,a(c,f)},generateMipmaps(){t.colors.forEach((c,f)=>{c.mipmap&&(e.bindTexture(e.TEXTURE_2D,o[f]),e.generateMipmap(e.TEXTURE_2D))}),t.depth&&i&&(e.bindTexture(e.TEXTURE_2D,i),e.generateMipmap(e.TEXTURE_2D))}}}function Le(e,t){if(t<0)throw new Error("screenQuad: a_position attribute not found in program");const n=e.createVertexArray();if(!n)throw new Error("createVertexArray failed for screenQuad");e.bindVertexArray(n);const r=e.createBuffer();if(!r)throw new Error("createBuffer failed for screenQuad");return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),n}function qt(e){let t=e>>>0;return function(){t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),(n^n>>>14)>>>0}}function Wt(e,t,n,r){const o=qt(r),i=new Uint8Array(e*t*n);for(let a=0;a<i.length;a++)i[a]=o()&255;return i}const jt=`#version 300 es
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
`,Kt=`#version 300 es
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
`,Qt=`// Minimal Phong helper, parameterized via uniforms so the panel can tune the
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
`,Jt=`#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
`,Zt=`#version 300 es
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
`,en=`#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
`,tn=`#version 300 es
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
`,nn=`#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
`,rn=`#version 300 es
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
`;function on(e){const t=e.indexOf("void main()");if(t<0)throw new Error("transform.frag.glsl: void main() not found");return e.slice(0,t)+Qt+`
`+e.slice(t)}function an(e,t,n){const r=me(e,jt,on(Kt),"lic.transform"),o=me(e,Jt,Zt,"lic.edge"),i=me(e,en,tn,"lic.advect"),a=me(e,nn,rn,"lic.compose"),s=Le(e,o.attribs.get("a_position")??-1),c=Le(e,i.attribs.get("a_position")??-1),f=Le(e,a.attribs.get("a_position")??-1);let d=Re(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT},{internalFormat:e.R8,format:e.RED,type:e.UNSIGNED_BYTE},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT}],depth:!0}),l=Re(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE,mipmap:!0}],depth:!1}),h=Re(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE}],depth:!1});const u=128,_=Wt(u,u,u,12345),D=e.createTexture();if(!D)throw new Error("createTexture failed for noiseTex");e.bindTexture(e.TEXTURE_3D,D),e.texImage3D(e.TEXTURE_3D,0,e.R8,u,u,u,0,e.RED,e.UNSIGNED_BYTE,_),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_R,e.REPEAT);function p(m,B,A,x,I){const v=m.uniforms.get(B);v&&(e.activeTexture(e.TEXTURE0+A),e.bindTexture(x,I),e.uniform1i(v,A))}function C(m,B,A,x,I){const v=e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);d.bind(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.enable(e.CULL_FACE),e.cullFace(e.BACK),e.useProgram(r.program),e.uniformMatrix4fv(r.uniforms.get("u_view"),!1,B),e.uniformMatrix4fv(r.uniforms.get("u_projection"),!1,A),e.uniform3fv(r.uniforms.get("u_meshBBMin"),m.meshBBMin),e.uniform3fv(r.uniforms.get("u_meshBBMax"),m.meshBBMax),e.uniform1f(r.uniforms.get("u_surfaceAmbient"),m.surfaceAmbient??.04),e.uniform1f(r.uniforms.get("u_surfaceDiffuse"),m.surfaceDiffuse??.75),e.uniform1f(r.uniforms.get("u_surfaceSpecular"),m.surfaceSpecular??.4),e.uniform1f(r.uniforms.get("u_surfaceShininess"),m.surfaceShininess??80),p(r,"u_noiseSampler",0,e.TEXTURE_3D,D),e.bindVertexArray(m.meshVAO),e.drawElements(e.TRIANGLES,m.meshIndexCount,m.meshIndexType,0),e.bindVertexArray(null),d.generateMipmaps(),l.bind(),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.useProgram(o.program),e.uniform2f(o.uniforms.get("u_viewportSize"),d.width,d.height),p(o,"u_depthSampler",0,e.TEXTURE_2D,d.depthTexture),e.bindVertexArray(s),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),l.generateMipmaps(),h.bind(),e.useProgram(i.program),e.uniform2f(i.uniforms.get("u_viewportSize"),d.width,d.height),e.uniform2f(i.uniforms.get("u_viewportScale"),1,1),e.uniform1f(i.uniforms.get("u_noiseRatio"),0),e.uniform1i(i.uniforms.get("u_numIter"),m.licIterations??50),p(i,"u_depthSampler",0,e.TEXTURE_2D,d.depthTexture),p(i,"u_noiseSampler",1,e.TEXTURE_2D,d.colorTextures[2]),p(i,"u_vecSampler",2,e.TEXTURE_2D,d.colorTextures[1]),p(i,"u_edgeSampler",3,e.TEXTURE_2D,l.colorTextures[0]),e.bindVertexArray(c),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.bindFramebuffer(e.FRAMEBUFFER,v),e.viewport(0,0,x,I),e.useProgram(a.program),e.uniform1i(a.uniforms.get("u_useHighContrast"),m.useHighContrast??!0?1:0),e.uniform1i(a.uniforms.get("u_showLIC"),m.showLIC??!0?1:0),e.uniform1i(a.uniforms.get("u_showColor"),m.showColor??!0?1:0),e.uniform1i(a.uniforms.get("u_emphasizeSingular"),m.emphasizeSingular??!1?1:0),p(a,"u_colorSampler",0,e.TEXTURE_2D,d.colorTextures[0]),p(a,"u_vecSampler",1,e.TEXTURE_2D,d.colorTextures[1]),p(a,"u_depthSampler",2,e.TEXTURE_2D,d.depthTexture),p(a,"u_edgeSampler",3,e.TEXTURE_2D,l.colorTextures[0]),p(a,"u_noiseSampler",4,e.TEXTURE_2D,d.colorTextures[2]),p(a,"u_advectSampler",5,e.TEXTURE_2D,h.colorTextures[0]),e.enable(e.DEPTH_TEST),e.bindVertexArray(f),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}function S(m,B){d.resize(m,B),l.resize(m,B),h.resize(m,B)}return{render:C,resize:S,transformAttribs:r.attribs,getTransformDepthTexture:()=>d.depthTexture,getColorTexture:()=>d.colorTextures[0],getVecTexture:()=>d.colorTextures[1],getNormalTexture:()=>d.colorTextures[3],getPosTexture:()=>d.colorTextures[4]}}const sn=`#version 300 es
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
`,Ye=`#version 300 es
precision highp float;

uniform float u_widthTails;     // matches original default 0.25
uniform float u_arrowHeadFrac;  // head fraction of total length, default 0.25 (legacy)
uniform vec4 u_arrowColor;      // a = mix factor between region color (a=0) and arrow color (a=1)
uniform float u_arrowOpacity;   // 0..1; final fragment alpha (with shade-edge anti-alias)

in vec4 v_color;
in vec3 v_normal;
in vec2 v_surfaceUV;

out vec4 fragColor;

void main() {
  float shade;

  // Quad y in [-1, 1]. Head occupies the top 2*headFrac (y in [headThr, 1]),
  // body occupies the rest (y in [-1, headThr]). Default headFrac=0.25
  // reproduces the original 0.5 threshold.
  float headFrac = max(u_arrowHeadFrac, 0.001);
  float headThr = 1.0 - 2.0 * headFrac;

  if (v_surfaceUV.y >= headThr) {
    // Arrow head: triangle. arrowHeadY=1 at base (y=headThr), 0 at apex (y=1).
    float arrowHeadY = (1.0 - v_surfaceUV.y) / (2.0 * headFrac);
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
`,cn=`#version 300 es
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
`;async function Fe(e){const t=await fetch(e);if(!t.ok)throw new Error(`Fetch failed ${e}: ${t.status} ${t.statusText}`);return t.text()}function ln(e){const t=q(1/0,1/0,1/0),n=q(-1/0,-1/0,-1/0),r=q(0,0,0),o=e.length/3;for(let a=0;a<o;a++){const s=e[a*3+0],c=e[a*3+1],f=e[a*3+2];s<t[0]&&(t[0]=s),s>n[0]&&(n[0]=s),c<t[1]&&(t[1]=c),c>n[1]&&(n[1]=c),f<t[2]&&(t[2]=f),f>n[2]&&(n[2]=f),r[0]+=s,r[1]+=c,r[2]+=f}je(r,r,1/o);let i=0;for(let a=0;a<o;a++){const s=e[a*3+0]-r[0],c=e[a*3+1]-r[1],f=e[a*3+2]-r[2];i=Math.max(i,s*s+c*c+f*f)}return{center:r,radius:Math.sqrt(i),bbMin:t,bbMax:n}}async function dn(e){const t=dt(e),n=t.gl;if(!n.getExtension("EXT_color_buffer_float")){De("Your browser does not support EXT_color_buffer_float; LIC requires it.");return}const r=an(n,t.width||1,t.height||1),o=me(n,sn,Ye,"arrow"),i=me(n,cn,Ye,"arrow.curved"),a=ut(),s=Bt();let c=null,f=null,d=null,l=null,h=null,u=null,_=null,D=null,p=null,C=null,S=null,m=null;function B(b){if(!c||!_||!f||!d||!l||!C)return;const w=2*b.arrowHeight*b.arrowScale*C.radius,F=.5*b.arrowWidth*b.arrowScale*C.radius;let E;if(b.arrowBorderMode&&D){const O=C.radius*b.arrowDensity,W=Math.max(O,w);E=Ft(c.vertices,_,f,d,l,W,.05,D)}else{const O=w*1.2,W=C.radius*b.arrowDensity,j=Math.max(W,Math.max(F*1.5,w*.4));E=Dt(c.vertices,_,f,d,l,O,j,.05)}const T=It(E,w,1);if(S=gt(n,o,{positions:T.positions,directions:T.directions,normals:T.normals,colors:T.colors}),T.vertexIDs&&c&&_&&f&&d&&l){const O=At(T.positions,Array.from(T.vertexIDs),c.vertices,_,f,d,l,Je);m=Et(n,i,O)}else m=null}function A(b,w,F){const E=ft(b),T=ht(w),O=mt(F);if(T.length!==E.vertices.length/3)throw new Error(`Vertex count mismatch: mesh has ${E.vertices.length/3} vertices, labels has ${T.length}`);const W=E.vertices.length/3;let j=null;if(E.colors&&E.colors.length===W*3){j=new Uint8Array(W*4);for(let Q=0;Q<W;Q++)j[Q*4+0]=E.colors[Q*3+0],j[Q*4+1]=E.colors[Q*3+1],j[Q*4+2]=E.colors[Q*3+2],j[Q*4+3]=255}const te=yt(T,O),ne=!s.useLabelColors&&j?j:te,J=_t(E.vertices,E.indices),ee=bt(E.indices,E.vertices.length/3),ie=Lt(T,ee),ce=xt({vertices:E.vertices,indices:E.indices,labels:T,labelOrder:O,adjacency:ee,normals:J}),re=ln(E.vertices),oe=r.transformAttribs,le=$e(n,[{def:{name:"a_position",data:E.vertices,size:3,type:n.FLOAT,normalized:!1},location:oe.get("a_position")??-1},{def:{name:"a_normal",data:J,size:3,type:n.FLOAT,normalized:!1},location:oe.get("a_normal")??-1},{def:{name:"a_color",data:ne,size:4,type:n.UNSIGNED_BYTE,normalized:!0},location:oe.get("a_color")??-1},{def:{name:"a_vector",data:ce,size:3,type:n.FLOAT,normalized:!1},location:oe.get("a_vector")??-1}],E.indices);c=E,f=ce,d=J,l=ne,h=j,u=te,_=ee,D=ie,p=le,C=re,B(s),a.fitSphere(re.center,re.radius);const K=L();K?a.setLookAt(q(K.eye[0],K.eye[1],K.eye[2]),q(K.target[0],K.target[1],K.target[2]),q(K.up[0],K.up[1],K.up[2])):v("lateral-left",re.center,re.radius),t.requestRender()}function x(b){if(!c||!f||!d)return;const w=b||!h?u:h;if(!w)return;const F=r.transformAttribs;p=$e(n,[{def:{name:"a_position",data:c.vertices,size:3,type:n.FLOAT,normalized:!1},location:F.get("a_position")??-1},{def:{name:"a_normal",data:d,size:3,type:n.FLOAT,normalized:!1},location:F.get("a_normal")??-1},{def:{name:"a_color",data:w,size:4,type:n.UNSIGNED_BYTE,normalized:!0},location:F.get("a_color")??-1},{def:{name:"a_vector",data:f,size:3,type:n.FLOAT,normalized:!1},location:F.get("a_vector")??-1}],c.indices),l=w,B(s)}function I(b,w,F,E=2.5){const T=F*E;switch(b){case"lateral-left":return{eye:q(w[0]-T,w[1],w[2]),up:q(0,0,1)};case"lateral-right":return{eye:q(w[0]+T,w[1],w[2]),up:q(0,0,1)};case"anterior":return{eye:q(w[0],w[1]+T,w[2]),up:q(0,0,1)};case"posterior":return{eye:q(w[0],w[1]-T,w[2]),up:q(0,0,1)};case"dorsal":return{eye:q(w[0],w[1],w[2]+T),up:q(0,1,0)};case"ventral":return{eye:q(w[0],w[1],w[2]-T),up:q(0,1,0)}}}function v(b,w,F){const{eye:E,up:T}=I(b,w,F);a.setLookAt(E,w,T)}const g="di-camera-state-v1";function L(){try{const b=window.localStorage.getItem(g);if(!b)return null;const w=JSON.parse(b);return w&&Array.isArray(w.eye)&&Array.isArray(w.target)&&Array.isArray(w.up)?w:null}catch{return null}}let P=null;function k(){P!==null&&clearTimeout(P),P=window.setTimeout(()=>{P=null;try{window.localStorage.setItem(g,JSON.stringify(a.getViewState()))}catch{}},350)}const y=A;async function z(b){const[w,F,E]=await Promise.all([Fe(`/directionality-indicator-webgl/data/${b}.ply`),Fe(`/directionality-indicator-webgl/data/${b}.labels`),Fe(`/directionality-indicator-webgl/data/${b}.labelorder`)]);y(w,F,E),await Xe({name:`${b}.ply`,plyText:w,labelsText:F,orderText:E}),s.lastDatasetName=`${b}.ply`,s.lastDatasetFiles={ply:`${b}.ply`,labels:`${b}.labels`,labelorder:`${b}.labelorder`},Nt(s)}const H=await St();H?y(H.plyText,H.labelsText,H.orderText):await z("label18"),t.onResize(()=>{a.resize(t.width,t.height),r.resize(t.width,t.height),t.requestRender()}),a.attach(t.canvas,()=>{t.requestRender(),k()}),a.resize(t.width,t.height),r.resize(t.width,t.height);let $=s.useLabelColors;const{element:R}=Yt(s,(b,w)=>{b.useLabelColors!==$?($=b.useLabelColors,x(b.useLabelColors)):w&&B(b),t.requestRender()},async({ply:b,labels:w,labelorder:F})=>{const[E,T,O]=await Promise.all([b.text(),w.text(),F.text()]);y(E,T,O),await Xe({name:b.name,plyText:E,labelsText:T,orderText:O})},{current:()=>N(),canonical:()=>G()},{set:b=>{C&&(v(b,C.center,C.radius),k(),t.requestRender())}},z);e.appendChild(R);function X(b){if(n.clearColor(s.bgColorR,s.bgColorG,s.bgColorB,b),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),!p||!C||(r.render({meshVAO:p.vao,meshIndexCount:p.indexCount,meshIndexType:p.indexType,meshBBMin:C.bbMin,meshBBMax:C.bbMax,licIterations:s.licIterations,useHighContrast:s.licHighContrast,showLIC:s.showLIC,showColor:s.showColor,emphasizeSingular:s.licEmphasizeSingular,surfaceAmbient:s.surfaceAmbient,surfaceDiffuse:s.surfaceDiffuse,surfaceSpecular:s.surfaceSpecular,surfaceShininess:s.surfaceShininess},a.view,a.projection,t.width,t.height),!s.showArrows))return;const w=s.arrowCurved&&m!==null,F=w?i:o;!w&&!S||(n.disable(n.DEPTH_TEST),n.disable(n.CULL_FACE),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.useProgram(F.program),n.uniformMatrix4fv(F.uniforms.get("u_view"),!1,a.view),n.uniformMatrix4fv(F.uniforms.get("u_projection"),!1,a.projection),n.uniform1f(F.uniforms.get("u_arrowWidth"),s.arrowWidth),n.uniform1f(F.uniforms.get("u_arrowDist"),s.arrowDist),n.uniform1f(F.uniforms.get("u_arrowScale"),C.radius*s.arrowScale),n.uniform1f(F.uniforms.get("u_directionSign"),s.arrowFlipDirection?-1:1),n.uniform1f(F.uniforms.get("u_widthTails"),s.arrowBodyWidth),n.uniform1f(F.uniforms.get("u_arrowHeadFrac"),s.arrowHeadFrac),n.uniform4f(F.uniforms.get("u_arrowColor"),s.arrowColorR,s.arrowColorG,s.arrowColorB,1),n.uniform1f(F.uniforms.get("u_arrowOpacity"),s.arrowOpacity),w||n.uniform1f(F.uniforms.get("u_arrowHeight"),s.arrowHeight),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,r.getPosTexture()),n.uniform1i(F.uniforms.get("u_posSampler"),0),w&&m?m.draw():S&&S.draw(),n.disable(n.BLEND))}t.onRender(()=>X(1));const M=5e7;function U(b,w,F){const E=t.canvas,T=E.width,O=E.height;E.width=b,E.height=w,n.viewport(0,0,b,w),a.resize(b,w),r.resize(b,w);try{return F()}finally{E.width=T,E.height=O,n.viewport(0,0,T,O),a.resize(T,O),r.resize(T,O)}}function Y(){const b=Math.max(.5,s.screenshotDPI/96);let w=Math.round(t.canvas.width*b),F=Math.round(t.canvas.height*b);if(w*F>M){const E=Math.sqrt(M/(w*F));w=Math.round(w*E),F=Math.round(F*E),console.warn(`Screenshot pixel cap: clamped ${s.screenshotDPI} DPI to ${Math.round(96*E*(s.screenshotDPI/96))} effective DPI to stay under 50 MP`)}return{w,h:F}}async function N(){if(!C)return;const{w:b,h:w}=Y();await V(b,w,"directionality-current.png"),X(1)}async function V(b,w,F){let E="";U(b,w,()=>{X(0),E=t.canvas.toDataURL("image/png")}),await new Promise(T=>{const O=new Image;O.onload=async()=>{const W=document.createElement("canvas");W.width=O.width,W.height=O.height;const j=W.getContext("2d");if(!j){T();return}j.drawImage(O,0,0);const te=j.getImageData(0,0,O.width,O.height).data;let ne=O.width,J=O.height,ee=-1,ie=-1;for(let K=0;K<O.height;K++){const Q=K*O.width*4;for(let Z=0;Z<O.width;Z++)te[Q+Z*4+3]>0&&(Z<ne&&(ne=Z),Z>ee&&(ee=Z),K<J&&(J=K),K>ie&&(ie=K))}if(ee<0){T();return}const ce=ee-ne+1,re=ie-J+1,oe=document.createElement("canvas");oe.width=ce,oe.height=re;const le=oe.getContext("2d");if(!le){T();return}le.drawImage(W,ne,J,ce,re,0,0,ce,re),await new Promise(K=>{oe.toBlob(Q=>{if(Q){const Z=URL.createObjectURL(Q),we=document.createElement("a");we.href=Z,we.download=F,document.body.appendChild(we),we.click(),document.body.removeChild(we),URL.revokeObjectURL(Z)}K()},"image/png")}),T()},O.src=E})}async function G(){if(!C)return;const b=C.radius,w=C.center,F=["lateral-left","lateral-right","anterior","posterior","dorsal","ventral"],{w:E,h:T}=Y();for(const W of F){const{eye:j,up:te}=I(W,w,b,3.2);a.setLookAt(j,w,te),await V(E,T,`directionality-${W}.png`)}const O=L();O?a.setLookAt(q(O.eye[0],O.eye[1],O.eye[2]),q(O.target[0],O.target[1],O.target[2]),q(O.up[0],O.up[1],O.up[2])):v("lateral-left",w,b),X(1)}t.requestRender()}const qe=document.getElementById("app");qe?dn(qe).catch(e=>{console.error(e),De(e instanceof Error?e.message:String(e))}):De("Internal error: #app container missing");
//# sourceMappingURL=index-Cs6j3g0m.js.map
