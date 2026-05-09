(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();var ve=1e-6,re=typeof Float32Array<"u"?Float32Array:Array;function We(){var e=new re(9);return re!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function je(e,t,n,r,i,o,a,s,c){var f=new re(9);return f[0]=e,f[1]=t,f[2]=n,f[3]=r,f[4]=i,f[5]=o,f[6]=a,f[7]=s,f[8]=c,f}function Pe(){var e=new re(16);return re!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function Ke(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Qe(e,t,n,r,i){var o=1/Math.tan(t/2);if(e[0]=o/n,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=o,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,i!=null&&i!==1/0){var a=1/(r-i);e[10]=(i+r)*a,e[14]=2*i*r*a}else e[10]=-1,e[14]=-2*r;return e}var Je=Qe;function Ze(e,t,n,r){var i,o,a,s,c,f,p,l,u,d,T=t[0],F=t[1],h=t[2],R=r[0],g=r[1],w=r[2],M=n[0],L=n[1],x=n[2];return Math.abs(T-M)<ve&&Math.abs(F-L)<ve&&Math.abs(h-x)<ve?Ke(e):(p=T-M,l=F-L,u=h-x,d=1/Math.sqrt(p*p+l*l+u*u),p*=d,l*=d,u*=d,i=g*u-w*l,o=w*p-R*u,a=R*l-g*p,d=Math.sqrt(i*i+o*o+a*a),d?(d=1/d,i*=d,o*=d,a*=d):(i=0,o=0,a=0),s=l*a-u*o,c=u*i-p*a,f=p*o-l*i,d=Math.sqrt(s*s+c*c+f*f),d?(d=1/d,s*=d,c*=d,f*=d):(s=0,c=0,f=0),e[0]=i,e[1]=s,e[2]=p,e[3]=0,e[4]=o,e[5]=c,e[6]=l,e[7]=0,e[8]=a,e[9]=f,e[10]=u,e[11]=0,e[12]=-(i*T+o*F+a*h),e[13]=-(s*T+c*F+f*h),e[14]=-(p*T+l*F+u*h),e[15]=1,e)}function le(){var e=new re(3);return re!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function He(e){var t=e[0],n=e[1],r=e[2];return Math.sqrt(t*t+n*n+r*r)}function H(e,t,n){var r=new re(3);return r[0]=e,r[1]=t,r[2]=n,r}function Me(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function Ue(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e}function et(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e}function $e(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function ye(e,t){var n=t[0],r=t[1],i=t[2],o=n*n+r*r+i*i;return o>0&&(o=1/Math.sqrt(o)),e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e}function tt(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function me(e,t,n){var r=t[0],i=t[1],o=t[2],a=n[0],s=n[1],c=n[2];return e[0]=i*c-o*s,e[1]=o*a-r*c,e[2]=r*s-i*a,e}function ce(e,t,n){var r=n[0],i=n[1],o=n[2],a=n[3],s=t[0],c=t[1],f=t[2],p=i*f-o*c,l=o*s-r*f,u=r*c-i*s;return p=p+p,l=l+l,u=u+u,e[0]=s+a*p+i*u-o*l,e[1]=c+a*l+o*p-r*u,e[2]=f+a*u+r*l-i*p,e}var nt=He;(function(){var e=le();return function(t,n,r,i,o,a){var s,c;for(n||(n=3),r||(r=0),i?c=Math.min(i*n+r,t.length):c=t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],o(e,e,a),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2];return t}})();function rt(){var e=new re(4);return re!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function ot(e,t){var n=t[0],r=t[1],i=t[2],o=t[3],a=n*n+r*r+i*i+o*o;return a>0&&(a=1/Math.sqrt(a)),e[0]=n*a,e[1]=r*a,e[2]=i*a,e[3]=o*a,e}(function(){var e=rt();return function(t,n,r,i,o,a){var s,c;for(n||(n=4),r||(r=0),i?c=Math.min(i*n+r,t.length):c=t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],e[3]=t[s+3],o(e,e,a),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2],t[s+3]=e[3];return t}})();function we(){var e=new re(4);return re!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function Se(e,t,n){n=n*.5;var r=Math.sin(n);return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=Math.cos(n),e}function Be(e,t,n){var r=t[0],i=t[1],o=t[2],a=t[3],s=n[0],c=n[1],f=n[2],p=n[3];return e[0]=r*p+a*s+i*f-o*c,e[1]=i*p+a*c+o*s-r*f,e[2]=o*p+a*f+r*c-i*s,e[3]=a*p-r*s-i*c-o*f,e}function xe(e,t,n,r){var i=t[0],o=t[1],a=t[2],s=t[3],c=n[0],f=n[1],p=n[2],l=n[3],u,d,T,F,h;return d=i*c+o*f+a*p+s*l,d<0&&(d=-d,c=-c,f=-f,p=-p,l=-l),1-d>ve?(u=Math.acos(d),T=Math.sin(u),F=Math.sin((1-r)*u)/T,h=Math.sin(r*u)/T):(F=1-r,h=r),e[0]=F*i+h*c,e[1]=F*o+h*f,e[2]=F*a+h*p,e[3]=F*s+h*l,e}function Ge(e,t){var n=t[0]+t[4]+t[8],r;if(n>0)r=Math.sqrt(n+1),e[3]=.5*r,r=.5/r,e[0]=(t[5]-t[7])*r,e[1]=(t[6]-t[2])*r,e[2]=(t[1]-t[3])*r;else{var i=0;t[4]>t[0]&&(i=1),t[8]>t[i*3+i]&&(i=2);var o=(i+1)%3,a=(i+2)%3;r=Math.sqrt(t[i*3+i]-t[o*3+o]-t[a*3+a]+1),e[i]=.5*r,r=.5/r,e[3]=(t[o*3+a]-t[a*3+o])*r,e[o]=(t[o*3+i]+t[i*3+o])*r,e[a]=(t[a*3+i]+t[i*3+a])*r}return e}var be=ot;(function(){var e=le(),t=H(1,0,0),n=H(0,1,0);return function(r,i,o){var a=tt(i,o);return a<-.999999?(me(e,t,i),nt(e)<1e-6&&me(e,n,i),ye(e,e),Se(r,e,Math.PI),r):a>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(me(e,i,o),r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=1+a,be(r,r))}})();(function(){var e=we(),t=we();return function(n,r,i,o,a,s){return xe(e,r,a,s),xe(t,i,o,s),xe(n,e,t,2*s*(1-s)),n}})();(function(){var e=We();return function(t,n,r,i){return e[0]=r[0],e[3]=r[1],e[6]=r[2],e[1]=i[0],e[4]=i[1],e[7]=i[2],e[2]=-n[0],e[5]=-n[1],e[8]=-n[2],be(t,Ge(t,e))}})();function at(e){const t=document.createElement("canvas");e.appendChild(t);const n=t.getContext("webgl2",{antialias:!0,depth:!0,alpha:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0});if(!n)throw new Error("WebGL2 not supported in this browser");const r=n;let i=()=>{},o=()=>{},a=!0;const s={canvas:t,gl:r,get width(){return t.width},get height(){return t.height},requestRender(){a=!0},onRender(p){i=p},onResize(p){o=p}};function c(){const p=Math.min(window.devicePixelRatio,2),l=Math.floor(e.clientWidth*p),u=Math.floor(e.clientHeight*p);(t.width!==l||t.height!==u)&&(t.width=l,t.height=u,r.viewport(0,0,l,u),o(),a=!0)}function f(){c(),a&&(a=!1,i()),requestAnimationFrame(f)}return requestAnimationFrame(f),window.addEventListener("resize",c),s}function Re(e){const t=document.getElementById("banner");t&&(t.textContent=e,t.style.display="block")}function it(){const e=Pe(),t=Pe(),n=we(),r=H(0,0,0);let i=3,o=.01,a=1e3,s=1;function c(){const l=H(0,0,i);ce(l,l,n);const u=le();Ue(u,r,l);const d=H(0,1,0);ce(d,d,n),Ze(e,u,r,d)}function f(){const l=Math.PI/4,u=Math.max(.001,i*.01),d=Math.max(1e3,i*100);Je(t,l,s,u,d)}function p(l,u){const d=H(1,0,0);ce(d,d,n);const T=H(0,1,0);ce(T,T,n);const F=we();Se(F,d,u);const h=we();Se(h,T,l),Be(n,h,n),Be(n,F,n),be(n,n)}return c(),f(),{view:e,projection:t,attach(l,u){let d=!1,T=0,F=0;l.addEventListener("pointerdown",h=>{d=!0,T=h.clientX,F=h.clientY,l.setPointerCapture(h.pointerId)}),l.addEventListener("pointermove",h=>{if(!d)return;const R=h.clientX-T,g=h.clientY-F;if(T=h.clientX,F=h.clientY,h.shiftKey){const w=2*i*.4142/Math.max(l.clientHeight,1),M=H(1,0,0);ce(M,M,n);const L=H(0,1,0);ce(L,L,n),r[0]+=(-R*M[0]+g*L[0])*w,r[1]+=(-R*M[1]+g*L[1])*w,r[2]+=(-R*M[2]+g*L[2])*w}else{const w=2*Math.PI/Math.max(l.clientWidth,1);p(-R*w,-g*w)}c(),f(),u()}),l.addEventListener("pointerup",h=>{d=!1,l.releasePointerCapture(h.pointerId)}),l.addEventListener("pointercancel",h=>{d=!1,l.releasePointerCapture(h.pointerId)}),l.addEventListener("wheel",h=>{h.preventDefault(),i*=Math.exp(h.deltaY*.001),i=Math.max(o,Math.min(a,i)),c(),f(),u()},{passive:!1})},fitSphere(l,u){Me(r,l);const d=Math.max(u,.001);i=d*2.5,o=d*.05,a=d*30,c(),f()},getViewState(){const l=H(0,0,i);ce(l,l,n);const u=le();Ue(u,r,l);const d=H(0,1,0);return ce(d,d,n),{eye:[u[0],u[1],u[2]],target:[r[0],r[1],r[2]],up:[d[0],d[1],d[2]]}},setLookAt(l,u,d){Me(r,u);const T=le();et(T,l,r);const F=He(T);if(F<1e-6)return;i=F;const h=le();$e(h,T,1/F);const R=le();ye(R,d);const g=le();me(g,R,h),ye(g,g),me(R,h,g),ye(R,R);const w=je(g[0],g[1],g[2],R[0],R[1],R[2],h[0],h[1],h[2]);Ge(n,w),be(n,n),c(),f()},resize(l,u){s=l/Math.max(1,u),f()}}}function Ne(e,t,n,r){const i=e.createShader(t);if(!i)throw new Error(`createShader failed for ${r}`);if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){const o=e.getShaderInfoLog(i)??"(no log)";throw e.deleteShader(i),new Error(`Shader compile failed [${r}]:
${o}`)}return i}function pe(e,t,n,r){const i=Ne(e,e.VERTEX_SHADER,t,`${r}.vert`),o=Ne(e,e.FRAGMENT_SHADER,n,`${r}.frag`),a=e.createProgram();if(!a)throw new Error(`createProgram failed for ${r}`);if(e.attachShader(a,i),e.attachShader(a,o),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){const l=e.getProgramInfoLog(a)??"(no log)";throw e.deleteProgram(a),new Error(`Program link failed [${r}]:
${l}`)}const s=new Map,c=e.getProgramParameter(a,e.ACTIVE_UNIFORMS);for(let l=0;l<c;l++){const u=e.getActiveUniform(a,l);if(!u)continue;const d=e.getUniformLocation(a,u.name);d&&s.set(u.name,d)}const f=new Map,p=e.getProgramParameter(a,e.ACTIVE_ATTRIBUTES);for(let l=0;l<p;l++){const u=e.getActiveAttrib(a,l);u&&f.set(u.name,e.getAttribLocation(a,u.name))}return{program:a,uniforms:s,attribs:f}}function ze(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed");e.bindVertexArray(r);for(const{def:o,location:a}of t){if(a<0)continue;const s=e.createBuffer();if(!s)throw new Error(`createBuffer failed for ${o.name}`);e.bindBuffer(e.ARRAY_BUFFER,s),e.bufferData(e.ARRAY_BUFFER,o.data,e.STATIC_DRAW),e.enableVertexAttribArray(a),e.vertexAttribPointer(a,o.size,o.type,o.normalized,0,0)}const i=e.createBuffer();if(!i)throw new Error("createBuffer failed for EBO");return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,i),e.bufferData(e.ELEMENT_ARRAY_BUFFER,n,e.STATIC_DRAW),e.bindVertexArray(null),{vao:r,ebo:i,indexCount:n.length,indexType:n instanceof Uint32Array?e.UNSIGNED_INT:e.UNSIGNED_SHORT}}function st(e){const t=e.split(/\r?\n/);if(t[0]!=="ply")throw new Error("Not a PLY file (missing 'ply' magic)");if(!t[1]||!t[1].startsWith("format ascii"))throw new Error("Only ASCII PLY is supported in M1");const n=[];let r=2;for(;r<t.length;){const u=t[r].trim();if(u==="end_header"){r++;break}if(u.startsWith("comment")||u===""){r++;continue}if(u.startsWith("element ")){const[,d,T]=u.split(/\s+/);n.push({name:d,count:parseInt(T,10),properties:[]})}else if(u.startsWith("property ")){const d=u.split(/\s+/);d[1]==="list"?n[n.length-1].properties.push({type:"list",countType:d[2],itemType:d[3],name:d[4]}):n[n.length-1].properties.push({type:d[1],name:d[2]})}r++}const i=n.find(u=>u.name==="vertex"),o=n.find(u=>u.name==="face");if(!i)throw new Error("PLY: no vertex element");if(!o)throw new Error("PLY: no face element");const a=new Float32Array(i.count*3),s=i.properties.findIndex(u=>u.name==="x"),c=i.properties.findIndex(u=>u.name==="red"),p=c>=0?new Uint8Array(i.count*3):null;for(let u=0;u<i.count;u++,r++){const d=t[r].trim().split(/\s+/);a[u*3+0]=parseFloat(d[s+0]),a[u*3+1]=parseFloat(d[s+1]),a[u*3+2]=parseFloat(d[s+2]),p&&(p[u*3+0]=parseInt(d[c+0],10),p[u*3+1]=parseInt(d[c+1],10),p[u*3+2]=parseInt(d[c+2],10))}const l=[];for(let u=0;u<o.count;u++,r++){const d=t[r].trim().split(/\s+/),T=parseInt(d[0],10);if(T!==3)throw new Error(`PLY: only triangle faces supported (got ${T}-gon at face ${u})`);l.push(parseInt(d[1],10),parseInt(d[2],10),parseInt(d[3],10))}return{vertices:a,normals:null,colors:p,indices:new Uint32Array(l)}}function ct(e){return Ye(e)}function Ye(e){const t=e.split(/[,\s]+/).filter(r=>r.length>0),n=new Int32Array(t.length);for(let r=0;r<t.length;r++){const i=parseInt(t[r],10);if(Number.isNaN(i))throw new Error(`labels: non-integer token at index ${r}: "${t[r]}"`);n[r]=i}return n}const lt=Ye;function ut(e){return lt(e)}function dt(e,t,n){const r=Math.floor(e*6),i=e*6-r,o=n*(1-t),a=n*(1-i*t),s=n*(1-(1-i)*t);let c=0,f=0,p=0;switch(r%6){case 0:c=n,f=s,p=o;break;case 1:c=a,f=n,p=o;break;case 2:c=o,f=n,p=s;break;case 3:c=o,f=a,p=n;break;case 4:c=s,f=o,p=n;break;case 5:c=n,f=o,p=a;break}return[Math.round(c*255),Math.round(f*255),Math.round(p*255)]}function ft(e){const t=new Map,n=e.length;for(let r=0;r<n;r++){const i=e[r],[o,a,s]=dt(r/n,.6,.95);t.set(i,[o,a,s,255])}return t}function pt(e,t){const n=ft(t),r=new Uint8Array(e.length*4),i=[128,128,128,255];for(let o=0;o<e.length;o++){const a=n.get(e[o])??i;r[o*4+0]=a[0],r[o*4+1]=a[1],r[o*4+2]=a[2],r[o*4+3]=a[3]}return r}function ht(e,t){const n=new Array(t);for(let o=0;o<t;o++)n[o]=new Set;const r=e.length/3;for(let o=0;o<r;o++){const a=e[o*3+0],s=e[o*3+1],c=e[o*3+2];n[a].add(s),n[a].add(c),n[s].add(a),n[s].add(c),n[c].add(a),n[c].add(s)}const i=n.map(o=>Array.from(o));return{vertexCount:t,neighbours(o){return i[o]??[]}}}function mt(e,t){const n=e.length/3,r=new Float32Array(n*3),i=t.length/3;for(let o=0;o<i;o++){const a=t[o*3+0],s=t[o*3+1],c=t[o*3+2],f=e[a*3+0],p=e[a*3+1],l=e[a*3+2],u=e[s*3+0],d=e[s*3+1],T=e[s*3+2],F=e[c*3+0],h=e[c*3+1],R=e[c*3+2],g=u-f,w=d-p,M=T-l,L=F-f,x=h-p,D=R-l,v=w*D-M*x,E=M*L-g*D,y=g*x-w*L;r[a*3+0]+=v,r[a*3+1]+=E,r[a*3+2]+=y,r[s*3+0]+=v,r[s*3+1]+=E,r[s*3+2]+=y,r[c*3+0]+=v,r[c*3+1]+=E,r[c*3+2]+=y}for(let o=0;o<n;o++){const a=r[o*3+0],s=r[o*3+1],c=r[o*3+2],f=Math.sqrt(a*a+s*s+c*c);f>0&&(r[o*3+0]=a/f,r[o*3+1]=s/f,r[o*3+2]=c/f)}return r}function wt(e){const{vertices:t,labels:n,labelOrder:r,adjacency:i,normals:o}=e,a=i.vertexCount,s=new Float32Array(a*3),c=new Uint8Array(a),f=new Int32Array(a).fill(-1),p=[];for(let h=0;h<a;h++){if(c[h])continue;const R=n[h],g=p.length;p.push(R);const w=[h];for(c[h]=1;w.length>0;){const M=w.shift();f[M]=g;const L=i.neighbours(M);for(let x=0;x<L.length;x++){const D=L[x];!c[D]&&n[D]===R&&(c[D]=1,w.push(D))}}}const l=new Map;for(let h=0;h<r.length;h++)l.set(r[h],h);const u=new Uint8Array(a);for(let h=0;h<a;h++)l.has(n[h])||(u[h]=1);const d=new Uint8Array(a);for(let h=0;h<a;h++)u[h]&&(d[h]=1);const T=-1;for(let h=0;h<a;h++){if(u[h])continue;const R=t[h*3+0],g=t[h*3+1],w=t[h*3+2],M=f[h],L=n[h],x=l.get(L);let D=0,v=0,E=0,y=0;const _=i.neighbours(h);for(let I=0;I<_.length;I++){const m=_[I];if(u[m])continue;const C=f[m];if(C===M)continue;const P=p[C],U=l.get(P);if(U===void 0)continue;const N=(x>U?-1:1)*T,k=t[m*3+0],O=t[m*3+1],G=t[m*3+2];let $=k-R,q=O-g,j=G-w;const S=Math.sqrt($*$+q*q+j*j);S<1e-9||($=$/S*N,q=q/S*N,j=j/S*N,D+=$,v+=q,E+=j,y++)}y>0&&(s[h*3+0]=D/y,s[h*3+1]=v/y,s[h*3+2]=E/y,d[h]=1)}const F=200;for(let h=0;h<F;h++){let R=!1,g=!0;const w=new Uint8Array(d),M=new Float32Array(s);for(let L=0;L<a;L++){if(d[L])continue;g=!1;const x=i.neighbours(L);let D=0,v=0;for(let U=0;U<x.length;U++){const b=x[U];if(b===L||u[b]||!w[b])continue;D++;const N=t[b*3+0]-t[L*3+0],k=t[b*3+1]-t[L*3+1],O=t[b*3+2]-t[L*3+2],G=Math.sqrt(N*N+k*k+O*O);G>v&&(v=G)}if(D<2)continue;const E=o[L*3+0],y=o[L*3+1],_=o[L*3+2];let I=0,m=0,C=0,P=0;for(let U=0;U<x.length;U++){const b=x[U];if(b===L||u[b]||!w[b])continue;const N=t[b*3+0]-t[L*3+0],k=t[b*3+1]-t[L*3+1],O=t[b*3+2]-t[L*3+2],G=Math.sqrt(N*N+k*k+O*O);let $=M[b*3+0],q=M[b*3+1],j=M[b*3+2];const S=Math.sqrt($*$+q*q+j*j);let A=0,z=0,B=0;if(S>.001){const V=$/S,K=q/S,W=j/S;if(Math.abs(V*E+K*y+W*_)<.98){const oe=y*W-_*K,Z=_*V-E*W,ee=E*K-y*V,ae=Math.sqrt(oe*oe+Z*Z+ee*ee);if(ae>1e-9){const ie=oe/ae,te=Z/ae,ne=ee/ae;let se=te*_-ne*y,Y=ne*E-ie*_,Q=ie*y-te*E;const J=Math.sqrt(se*se+Y*Y+Q*Q);J>1e-9&&(se/=J,Y/=J,Q/=J,A=se*S,z=Y*S,B=Q*S)}}}const X=G/v;I+=X*A,m+=X*z,C+=X*B,P+=X}P>0&&(s[L*3+0]=I/P,s[L*3+1]=m/P,s[L*3+2]=C/P,d[L]=1,R=!0)}if(g||!R)break}return s}function vt(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed for arrow");e.bindVertexArray(r);const i=t.attribs.get("a_corner")??-1;if(i<0)throw new Error("arrow vertex shader missing attribute a_corner");const o=e.createBuffer();if(!o)throw new Error("createBuffer failed for a_corner");e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0);function a(c,f,p,l,u){const d=t.attribs.get(c)??-1;if(d<0)throw new Error(`arrow shader missing attribute ${c}`);const T=e.createBuffer();if(!T)throw new Error(`createBuffer failed for ${c}`);e.bindBuffer(e.ARRAY_BUFFER,T),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW),e.enableVertexAttribArray(d),e.vertexAttribPointer(d,p,l,u,0,0),e.vertexAttribDivisor(d,1)}a("a_instance_position",n.positions,3,e.FLOAT,!1),a("a_instance_direction",n.directions,3,e.FLOAT,!1),a("a_instance_normal",n.normals,3,e.FLOAT,!1),a("a_instance_color",n.colors,4,e.UNSIGNED_BYTE,!0),e.bindVertexArray(null);const s=n.positions.length/3;return{vao:r,instanceCount:s,draw(){e.bindVertexArray(r),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,s),e.bindVertexArray(null)}}}function yt(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed for curved arrow");e.bindVertexArray(r);function i(c,f,p,l,u){const d=t.attribs.get(c)??-1;if(d<0)throw new Error(`curved-arrow shader missing attribute ${c}`);const T=e.createBuffer();if(!T)throw new Error(`createBuffer failed for ${c}`);e.bindBuffer(e.ARRAY_BUFFER,T),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW),e.enableVertexAttribArray(d),e.vertexAttribPointer(d,p,l,u,0,0)}i("a_position",n.positions,3,e.FLOAT,!1),i("a_tangent",n.tangents,3,e.FLOAT,!1),i("a_normal",n.normals,3,e.FLOAT,!1),i("a_color",n.colors,4,e.UNSIGNED_BYTE,!0),i("a_stripY",n.stripY,1,e.FLOAT,!1),i("a_stripSide",n.stripSide,1,e.FLOAT,!1),e.bindVertexArray(null);const o=new Int32Array(n.firstIndices),a=new Int32Array(n.counts),s=o.length;return{vao:r,firstIndices:o,counts:a,draw(){e.bindVertexArray(r);for(let c=0;c<s;c++)e.drawArrays(e.TRIANGLE_STRIP,o[c],a[c]);e.bindVertexArray(null)}}}const qe=8;function ke(e,t,n,r,i){const o=t*i[e*3],a=t*i[e*3+1],s=t*i[e*3+2],c=Math.sqrt(o*o+a*a+s*s);if(c<1e-6)return null;const f=o/c,p=a/c,l=s/c,u=r.neighbours(e);let d=-1,T=.3,F=0;for(let h=0;h<u.length;h++){const R=u[h],g=n[R*3]-n[e*3],w=n[R*3+1]-n[e*3+1],M=n[R*3+2]-n[e*3+2],L=Math.sqrt(g*g+w*w+M*M);if(L<1e-6)continue;const x=(g*f+w*p+M*l)/L;x>T&&(T=x,d=R,F=L)}return d===-1?null:{next:d,edgeLen:F}}function _t(e,t,n,r,i,o,a,s=qe){const c=t.length;if(e.length!==c*3)throw new Error(`buildCurvedArrowBuffers: anchors.length (${e.length}) does not match anchorAdjacencyIndices.length*3 (${c*3})`);const f=2*s+1,p=2*f,l=c*p,u=new Float32Array(l*3),d=new Float32Array(l*3),T=new Float32Array(l*3),F=new Uint8Array(l*4),h=new Float32Array(l),R=new Float32Array(l),g=new Int32Array(c),w=new Int32Array(c),M=new Int32Array(f),L=new Float32Array(f*3),x=new Float32Array(f*3),D=new Float32Array(f*3),v=new Uint8Array(f*4);for(let E=0;E<c;E++){const y=t[E];for(let m=0;m<f;m++)M[m]=y;let _=y;for(let m=0;m<s;m++){const C=ke(_,-1,n,r,i);if(!C)break;_=C.next,M[s-1-m]=_}M[s]=y,_=y;for(let m=0;m<s;m++){const C=ke(_,1,n,r,i);if(!C)break;_=C.next,M[s+1+m]=_}for(let m=0;m<f;m++){const C=M[m];m===s?(L[m*3+0]=e[E*3+0],L[m*3+1]=e[E*3+1],L[m*3+2]=e[E*3+2]):(L[m*3+0]=n[C*3+0],L[m*3+1]=n[C*3+1],L[m*3+2]=n[C*3+2]);const P=i[C*3+0],U=i[C*3+1],b=i[C*3+2],N=Math.sqrt(P*P+U*U+b*b)||1;x[m*3+0]=P/N,x[m*3+1]=U/N,x[m*3+2]=b/N;const k=o[C*3+0],O=o[C*3+1],G=o[C*3+2],$=Math.sqrt(k*k+O*O+G*G)||1;D[m*3+0]=k/$,D[m*3+1]=O/$,D[m*3+2]=G/$,v[m*4+0]=a[C*4+0],v[m*4+1]=a[C*4+1],v[m*4+2]=a[C*4+2],v[m*4+3]=255}const I=E*p;g[E]=I,w[E]=p;for(let m=0;m<f;m++){const P=2*(m/(f-1))-1;for(let U=0;U<2;U++){const b=I+m*2+U;u[b*3+0]=L[m*3+0],u[b*3+1]=L[m*3+1],u[b*3+2]=L[m*3+2],d[b*3+0]=x[m*3+0],d[b*3+1]=x[m*3+1],d[b*3+2]=x[m*3+2],T[b*3+0]=D[m*3+0],T[b*3+1]=D[m*3+1],T[b*3+2]=D[m*3+2],F[b*4+0]=v[m*4+0],F[b*4+1]=v[m*4+1],F[b*4+2]=v[m*4+2],F[b*4+3]=v[m*4+3],h[b]=P,R[b]=U===0?-1:1}}}return{positions:u,tangents:d,normals:T,colors:F,stripY:h,stripSide:R,firstIndices:g,counts:w}}const bt="di-cache",ue="datasets",xt=1,Le="current";function Fe(){return new Promise(e=>{if(typeof indexedDB>"u"){e(null);return}let t;try{t=indexedDB.open(bt,xt)}catch(n){console.warn("[datasetCache] indexedDB.open threw:",n),e(null);return}t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(ue)||n.createObjectStore(ue)},t.onsuccess=()=>e(t.result),t.onerror=()=>{console.warn("[datasetCache] failed to open DB:",t.error),e(null)},t.onblocked=()=>{console.warn("[datasetCache] open blocked by another connection"),e(null)}})}async function Ve(e){const t=await Fe();if(t)try{await new Promise(n=>{const r=t.transaction(ue,"readwrite"),i=r.objectStore(ue),o={...e,savedAt:Date.now()},a=i.put(o,Le);a.onerror=()=>{console.warn("[datasetCache] put failed:",a.error)},r.oncomplete=()=>n(),r.onerror=()=>{console.warn("[datasetCache] save tx error:",r.error),n()},r.onabort=()=>{console.warn("[datasetCache] save tx aborted:",r.error),n()}})}catch(n){console.warn("[datasetCache] saveDataset threw:",n)}finally{t.close()}}async function Et(){const e=await Fe();if(!e)return null;try{return await new Promise(t=>{const n=e.transaction(ue,"readonly"),i=n.objectStore(ue).get(Le);i.onsuccess=()=>{const o=i.result;if(!o){t(null);return}typeof o.name=="string"&&typeof o.plyText=="string"&&typeof o.labelsText=="string"&&typeof o.orderText=="string"&&typeof o.savedAt=="number"?t(o):(console.warn("[datasetCache] cached record has unexpected shape; ignoring"),t(null))},i.onerror=()=>{console.warn("[datasetCache] get failed:",i.error),t(null)},n.onerror=()=>{console.warn("[datasetCache] load tx error:",n.error),t(null)},n.onabort=()=>{console.warn("[datasetCache] load tx aborted:",n.error),t(null)}})}catch(t){return console.warn("[datasetCache] loadCachedDataset threw:",t),null}finally{e.close()}}async function At(){const e=await Fe();if(e)try{await new Promise(t=>{const n=e.transaction(ue,"readwrite"),i=n.objectStore(ue).delete(Le);i.onerror=()=>{console.warn("[datasetCache] delete failed:",i.error)},n.oncomplete=()=>t(),n.onerror=()=>{console.warn("[datasetCache] clear tx error:",n.error),t()},n.onabort=()=>{console.warn("[datasetCache] clear tx aborted:",n.error),t()}})}catch(t){console.warn("[datasetCache] clearDataset threw:",t)}finally{e.close()}}function Tt(e,t){const n=e.length,r=new Uint8Array(n);for(let i=0;i<n;i++){const o=e[i],a=t.neighbours(i);for(let s=0;s<a.length;s++)if(e[a[s]]!==o){r[i]=1;break}}return r}function Ct(e,t,n,r,i,o,a=.05,s){const c=t.vertexCount,f=a*a,p=new Int32Array(c);for(let x=0;x<c;x++)p[x]=x;let l=3737844653;const u=()=>(l=l*1664525+1013904223>>>0,(l&4294967295)/4294967295);for(let x=c-1;x>0;x--){const D=Math.floor(u()*(x+1)),v=p[x];p[x]=p[D],p[D]=v}const d=new Uint8Array(c),T=new Float32Array(c),F=[];for(let x=0;x<c;x++){const D=p[x];if(d[D]||s&&!s[D])continue;const v=n[D*3],E=n[D*3+1],y=n[D*3+2];if(v*v+E*E+y*y<f)continue;F.push(D),T.fill(1/0),T[D]=0,d[D]=1;const _=[{d:0,u:D}];for(;_.length>0;){let I=0;for(let b=1;b<_.length;b++)_[b].d<_[I].d&&(I=b);const m=_[I];_[I]=_[_.length-1],_.pop();const C=m.d,P=m.u;if(C>T[P])continue;if(C>o)break;d[P]=1;const U=t.neighbours(P);for(let b=0;b<U.length;b++){const N=U[b],k=e[N*3]-e[P*3],O=e[N*3+1]-e[P*3+1],G=e[N*3+2]-e[P*3+2],$=Math.sqrt(k*k+O*O+G*G),q=C+$;q<T[N]&&q<=o&&(T[N]=q,_.push({d:q,u:N}))}}}const h=F.length,R=new Float32Array(h*3),g=new Float32Array(h*3),w=new Float32Array(h*3),M=new Uint8Array(h*4),L=new Int32Array(h);for(let x=0;x<h;x++){const D=F[x];L[x]=D,R[x*3+0]=e[D*3+0],R[x*3+1]=e[D*3+1],R[x*3+2]=e[D*3+2];const v=n[D*3],E=n[D*3+1],y=n[D*3+2],_=Math.sqrt(v*v+E*E+y*y)||1;g[x*3+0]=v/_,g[x*3+1]=E/_,g[x*3+2]=y/_,w[x*3+0]=r[D*3],w[x*3+1]=r[D*3+1],w[x*3+2]=r[D*3+2],M[x*4+0]=i[D*4],M[x*4+1]=i[D*4+1],M[x*4+2]=i[D*4+2],M[x*4+3]=255}return{positions:R,directions:g,normals:w,colors:M,vertexIDs:L}}function gt(e,t,n=.8){const r=e.positions.length/3;if(r===0)return e;const i=(t*n)**2,o=t*n,a=new Map,s=new Uint8Array(r),c=new Float32Array(r),f=new Float32Array(r),p=new Float32Array(r);for(let w=0;w<r;w++)c[w]=e.positions[w*3],f[w]=e.positions[w*3+1],p[w]=e.positions[w*3+2];for(let w=0;w<r;w++){const M=Math.floor(c[w]/o),L=Math.floor(f[w]/o),x=Math.floor(p[w]/o);let D=!1;e:for(let v=-1;v<=1;v++)for(let E=-1;E<=1;E++)for(let y=-1;y<=1;y++){const _=`${M+y},${L+E},${x+v}`,I=a.get(_);if(I)for(let m=0;m<I.length;m++){const C=I[m],P=c[C]-c[w],U=f[C]-f[w],b=p[C]-p[w];if(P*P+U*U+b*b<i){D=!0;break e}}}if(!D){s[w]=1;const v=`${M},${L},${x}`,E=a.get(v);E?E.push(w):a.set(v,[w])}}let l=0;for(let w=0;w<r;w++)s[w]&&l++;const u=new Float32Array(l*3),d=new Float32Array(l*3),T=new Float32Array(l*3),F=new Uint8Array(l*4),h=e.vertexIDs??null,R=h?new Int32Array(l):null;let g=0;for(let w=0;w<r;w++)s[w]&&(u[g*3+0]=e.positions[w*3+0],u[g*3+1]=e.positions[w*3+1],u[g*3+2]=e.positions[w*3+2],d[g*3+0]=e.directions[w*3+0],d[g*3+1]=e.directions[w*3+1],d[g*3+2]=e.directions[w*3+2],T[g*3+0]=e.normals[w*3+0],T[g*3+1]=e.normals[w*3+1],T[g*3+2]=e.normals[w*3+2],F[g*4+0]=e.colors[w*4+0],F[g*4+1]=e.colors[w*4+1],F[g*4+2]=e.colors[w*4+2],F[g*4+3]=e.colors[w*4+3],R&&h&&(R[g]=h[w]),g++);return{positions:u,directions:d,normals:T,colors:F,vertexIDs:R}}function St(e,t,n,r,i,o,a,s=.05){const c=t.vertexCount,f=s*s,p=new Int32Array(c);for(let v=0;v<c;v++)p[v]=v;let l=1592651789;const u=()=>(l=l*1664525+1013904223>>>0,(l&4294967295)/4294967295);for(let v=c-1;v>0;v--){const E=Math.floor(u()*(v+1)),y=p[v];p[v]=p[E],p[E]=y}const d=new Uint8Array(c),T=[];function F(v,E){const y=E*n[v*3],_=E*n[v*3+1],I=E*n[v*3+2],m=Math.sqrt(y*y+_*_+I*I);if(m<1e-6)return null;const C=y/m,P=_/m,U=I/m,b=t.neighbours(v);let N=-1,k=.3,O=0;for(let G=0;G<b.length;G++){const $=b[G],q=e[$*3]-e[v*3],j=e[$*3+1]-e[v*3+1],S=e[$*3+2]-e[v*3+2],A=Math.sqrt(q*q+j*j+S*S);if(A<1e-6)continue;const z=(q*C+j*P+S*U)/A;z>k&&(k=z,N=$,O=A)}return N===-1?null:{next:N,edgeLen:O}}function h(v){const E=new Map;E.set(v,0);const y=[{d:0,u:v}];for(;y.length>0;){let _=0;for(let C=1;C<y.length;C++)y[C].d<y[_].d&&(_=C);const I=y[_];if(y[_]=y[y.length-1],y.pop(),I.d>(E.get(I.u)??1/0))continue;if(I.d>a)break;d[I.u]=1;const m=t.neighbours(I.u);for(let C=0;C<m.length;C++){const P=m[C],U=e[P*3]-e[I.u*3],b=e[P*3+1]-e[I.u*3+1],N=e[P*3+2]-e[I.u*3+2],k=Math.sqrt(U*U+b*b+N*N),O=I.d+k;O<=a&&O<(E.get(P)??1/0)&&(E.set(P,O),y.push({d:O,u:P}))}}}function R(v,E,y){const _=[];let I=v,m=0;y&&_.push(I);const C=500;for(let P=0;P<C;P++){const U=F(I,E);if(!U||d[U.next])break;if(m+=U.edgeLen,I=U.next,m>=o){const b=n[I*3],N=n[I*3+1],k=n[I*3+2];if(b*b+N*N+k*k<f)break;_.push(I),m=0}}return _}for(let v=0;v<c;v++){const E=p[v];if(d[E])continue;const y=n[E*3],_=n[E*3+1],I=n[E*3+2];if(y*y+_*_+I*I<f)continue;const m=R(E,1,!0),C=R(E,-1,!1),P=m.concat(C);if(P.length!==0){for(const U of P)h(U);T.push(...P)}}const g=T.length,w=new Float32Array(g*3),M=new Float32Array(g*3),L=new Float32Array(g*3),x=new Uint8Array(g*4),D=new Int32Array(g);for(let v=0;v<g;v++){const E=T[v];D[v]=E,w[v*3+0]=e[E*3+0],w[v*3+1]=e[E*3+1],w[v*3+2]=e[E*3+2];const y=n[E*3],_=n[E*3+1],I=n[E*3+2],m=Math.sqrt(y*y+_*_+I*I)||1;M[v*3+0]=y/m,M[v*3+1]=_/m,M[v*3+2]=I/m,L[v*3+0]=r[E*3],L[v*3+1]=r[E*3+1],L[v*3+2]=r[E*3+2],x[v*4+0]=i[E*4],x[v*4+1]=i[E*4+1],x[v*4+2]=i[E*4+2],x[v*4+3]=255}return{positions:w,directions:M,normals:L,colors:x,vertexIDs:D}}const Ee={showLIC:!1,showColor:!0,showArrows:!0,useLabelColors:!1,licIterations:50,licHighContrast:!0,licEmphasizeSingular:!1,arrowCurved:!1,arrowBorderMode:!1,arrowDensity:.02,arrowScale:.008,arrowHeight:1.3,arrowWidth:.9,arrowBodyWidth:.25,arrowDist:.5,arrowOpacity:.72,arrowFlipDirection:!0,arrowColorR:0,arrowColorG:0,arrowColorB:0,bgColorR:.07,bgColorG:.07,bgColorB:.07,parcelSmoothing:1,parcelRefinement:0,surfaceAmbient:.04,surfaceDiffuse:.75,surfaceSpecular:.4,surfaceShininess:80,screenshotDPI:600,lastDatasetName:null,lastDatasetFiles:null},Ie="di-panel-params-v1";function Rt(){try{const e=window.localStorage.getItem(Ie);if(!e)return{...Ee};const t=JSON.parse(e);return{...Ee,...t}}catch{return{...Ee}}}function _e(e){try{window.localStorage.setItem(Ie,JSON.stringify(e))}catch{}}function Lt(e){_e(e)}function Ae(e,t){if(e.replaceChildren(),t.lastDatasetFiles){const n=t.lastDatasetFiles,r=document.createElement("div");r.textContent="Loaded:",e.appendChild(r);const i=document.createElement("div");i.style.paddingLeft="8px",i.style.opacity="0.9";for(const o of[n.ply,n.labels,n.labelorder]){const a=document.createElement("div");a.textContent=o,i.appendChild(a)}e.appendChild(i),e.style.color="var(--ok)"}else t.lastDatasetName?(e.textContent=`Loaded: ${t.lastDatasetName}`,e.style.color="var(--ok)"):(e.textContent="Pick a .ply + .labels + .labelorder triple",e.style.color="")}const Ft=[{key:"showLIC",label:"LIC streamlines",type:"checkbox"},{key:"showColor",label:"Parcellation colors",type:"checkbox"},{key:"useLabelColors",label:"Use label-order palette (override PLY RGB)",type:"checkbox"},{key:"showArrows",label:"Arrows",type:"checkbox"}],It=[{key:"licIterations",label:"Streamline length (iterations)",type:"range",min:5,max:100,step:1},{key:"licHighContrast",label:"High contrast",type:"checkbox"},{key:"licEmphasizeSingular",label:"Emphasize singularities",type:"checkbox"}],Dt=[{key:"arrowBorderMode",label:"Borders only (M2 mode)",type:"checkbox",expensive:!0},{key:"arrowDensity",label:"Density (smaller = denser)",type:"range",min:.02,max:.18,step:.005,expensive:!0},{key:"arrowScale",label:"Size",type:"range",min:.002,max:.025,step:5e-4,expensive:!0},{key:"arrowHeight",label:"Length",type:"range",min:.5,max:8,step:.1,expensive:!0},{key:"arrowWidth",label:"Head width",type:"range",min:.5,max:4,step:.1},{key:"arrowBodyWidth",label:"Body width (fraction of head)",type:"range",min:.05,max:1,step:.02},{key:"arrowDist",label:"Distance from surface",type:"range",min:0,max:5,step:.1},{key:"arrowOpacity",label:"Opacity",type:"range",min:0,max:1,step:.02},{key:"arrowFlipDirection",label:"Flip direction",type:"checkbox"},{key:"arrowColorR",label:"Color",type:"color"}],Pt=[{key:"bgColorR",label:"Background",type:"color"}],Mt=[{key:"surfaceAmbient",label:"Ambient",type:"range",min:0,max:.5,step:.01},{key:"surfaceDiffuse",label:"Diffuse",type:"range",min:0,max:1.5,step:.05},{key:"surfaceSpecular",label:"Specular (glare)",type:"range",min:0,max:1,step:.02},{key:"surfaceShininess",label:"Shininess (sharpness)",type:"range",min:1,max:400,step:1}],De="di-panel-collapsed-v1";function Ut(){try{const e=window.localStorage.getItem(De);if(!e)return new Set;const t=JSON.parse(e);return Array.isArray(t)?new Set(t.filter(n=>typeof n=="string")):new Set}catch{return new Set}}function Bt(e){try{window.localStorage.setItem(De,JSON.stringify(Array.from(e)))}catch{}}function fe(e,t,n,r){const i=document.createElement("div");if(i.className="panel-control",e.type==="range"){const o=document.createElement("label");o.className="panel-label";const a=document.createElement("span");a.className="panel-label-text",a.textContent=e.label,o.appendChild(a);const s=l=>e.step!==void 0&&String(e.step).includes(".")?l.toFixed(3):String(l),c=document.createElement("input");c.type="text",c.className="panel-value panel-value-input",c.inputMode="decimal",c.spellcheck=!1,c.value=s(t[e.key]),c.title=`Click to type a value (range: ${e.min}–${e.max})`,o.appendChild(c);const f=document.createElement("input");f.type="range",f.min=String(e.min),f.max=String(e.max),f.step=String(e.step),f.value=String(t[e.key]);const p=l=>{let u=l;e.min!==void 0&&u<e.min&&(u=e.min),e.max!==void 0&&u>e.max&&(u=e.max),t[e.key]=u,f.value=String(u),c.value=s(u),n()};f.addEventListener("input",()=>p(parseFloat(f.value))),c.addEventListener("focus",()=>c.select()),c.addEventListener("keydown",l=>{if(l.key==="Enter"){l.preventDefault();const u=parseFloat(c.value);Number.isFinite(u)?p(u):c.value=s(t[e.key]),c.blur()}else l.key==="Escape"&&(c.value=s(t[e.key]),c.blur())}),c.addEventListener("blur",()=>{const l=parseFloat(c.value);Number.isFinite(l)?p(l):c.value=s(t[e.key])}),i.appendChild(o),i.appendChild(f)}else if(e.type==="checkbox"){i.classList.add("checkbox-row");const o=document.createElement("input");o.type="checkbox",o.checked=!!t[e.key],o.id=`panel-cb-${String(e.key)}`,o.addEventListener("change",()=>{t[e.key]=o.checked,n()});const a=document.createElement("label");a.className="panel-label",a.htmlFor=o.id;const s=document.createElement("span");s.className="panel-label-text",s.textContent=e.label,a.appendChild(s),i.appendChild(o),i.appendChild(a)}else if(e.type==="color"){const o=document.createElement("label");o.className="panel-label";const a=document.createElement("span");a.className="panel-label-text",a.textContent=e.label,o.appendChild(a);const s=e.key,c=s,f=s.replace(/R$/,"G"),p=s.replace(/R$/,"B"),l=t,u=document.createElement("input");u.type="color";const d=F=>Math.max(0,Math.min(255,Math.round(F*255))),T=(F,h,R)=>"#"+[F,h,R].map(g=>d(g).toString(16).padStart(2,"0")).join("");u.value=T(l[c],l[f],l[p]),u.addEventListener("input",()=>{const F=u.value.slice(1);l[c]=parseInt(F.slice(0,2),16)/255,l[f]=parseInt(F.slice(2,4),16)/255,l[p]=parseInt(F.slice(4,6),16)/255,n()}),i.appendChild(o),i.appendChild(u)}if(r){const o=document.createElement("div");o.className="panel-note",o.textContent="Recomputed on release (~200 ms)",i.appendChild(o)}return i}function Nt(e,t,n,r,i,o){const a=document.createElement("div");a.id="panel-root";const s=document.createElement("button");s.id="panel-toggle",s.title="Toggle controls",s.setAttribute("aria-label","Toggle controls"),s.innerHTML='<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 2L7.5 7L2.5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';const c=document.createElement("div");c.id="panel";const f=document.createElement("div");f.id="panel-titlebar";const p=document.createElement("span");p.id="panel-title",p.textContent="Controls";const l=document.createElement("button");l.id="panel-collapse-btn",l.type="button",l.title="Hide controls",l.setAttribute("aria-label","Hide controls"),l.innerHTML='<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',f.appendChild(p),f.appendChild(l),c.appendChild(f);const u=Ut(),d=(y,_)=>{const I=document.createElement("section");I.className="panel-section",I.dataset.section=y;const m=document.createElement("button");m.type="button",m.className="panel-heading",m.setAttribute("aria-expanded","true");const C=document.createElement("span");C.className="panel-heading-caret",C.textContent="▾";const P=document.createElement("span");P.className="panel-heading-title",P.textContent=_,m.appendChild(C),m.appendChild(P);const U=document.createElement("div");U.className="panel-section-body";const b=document.createElement("div");b.className="panel-section-inner",U.appendChild(b);const N=k=>{I.classList.toggle("collapsed",k),C.textContent=k?"▸":"▾",m.setAttribute("aria-expanded",k?"false":"true")};return N(u.has(y)),m.addEventListener("click",()=>{const k=!I.classList.contains("collapsed");N(k),k?u.add(y):u.delete(y),Bt(u)}),I.appendChild(m),I.appendChild(U),c.appendChild(I),b};if(n){const y=d("data","Data"),_=document.createElement("div");if(_.className="panel-note",Ae(_,e),y.appendChild(_),o){const P=document.createElement("div");P.className="panel-control";const U=document.createElement("div");U.className="panel-label-text",U.textContent="Bundled datasets";const b=document.createElement("select");b.className="panel-select";const N=document.createElement("option");N.value="",N.textContent="Loading…",N.disabled=!0,N.selected=!0,b.appendChild(N),P.appendChild(U),P.appendChild(b),y.appendChild(P);let k="";(async()=>{try{const O=await fetch("/directionality-indicator-webgl/data/manifest.json");if(!O.ok)throw new Error(`manifest ${O.status}`);const G=await O.json();b.replaceChildren();const $=document.createElement("option");$.value="",$.textContent="Pick a bundled dataset…",$.disabled=!0,$.selected=!0,b.appendChild($);for(const q of G.datasets){const j=document.createElement("option");j.value=q,j.textContent=q,b.appendChild(j)}}catch{b.replaceChildren();const O=document.createElement("option");O.textContent="(no manifest)",O.disabled=!0,O.selected=!0,b.appendChild(O)}})(),b.addEventListener("change",async()=>{const O=b.value;if(!(!O||O===k)){_.textContent=`Loading ${O}…`,_.style.color="var(--text-mute)";try{await o(O),e.lastDatasetName=`${O}.ply`,e.lastDatasetFiles={ply:`${O}.ply`,labels:`${O}.labels`,labelorder:`${O}.labelorder`},_e(e),Ae(_,e),k=O}catch(G){_.textContent="Error: "+(G instanceof Error?G.message:String(G)),_.style.color="var(--danger)",b.value=k}}})}const I=document.createElement("div");I.className="panel-file-row";const m=document.createElement("input");m.type="file",m.multiple=!0,m.accept=".ply,.labels,.labelorder",m.id="panel-file-input",m.className="panel-file-input";const C=document.createElement("label");C.htmlFor=m.id,C.className="panel-file-label",C.innerHTML='<span class="icon" aria-hidden="true">⬆</span><span>Or upload local files…</span>',m.addEventListener("change",async()=>{if(!m.files)return;const P=Array.from(m.files),U=P.find(k=>k.name.toLowerCase().endsWith(".ply")),b=P.find(k=>k.name.toLowerCase().endsWith(".labels")),N=P.find(k=>k.name.toLowerCase().endsWith(".labelorder"));if(!U||!b||!N){_.textContent="Need exactly one .ply, .labels, and .labelorder",_.style.color="var(--danger)";return}_.textContent="Loading…",_.style.color="var(--text-mute)";try{await n({ply:U,labels:b,labelorder:N}),e.lastDatasetName=U.name,e.lastDatasetFiles={ply:U.name,labels:b.name,labelorder:N.name},_e(e),Ae(_,e)}catch(k){_.textContent="Error: "+(k instanceof Error?k.message:String(k)),_.style.color="var(--danger)"}}),I.appendChild(m),I.appendChild(C),y.appendChild(I)}let T=!1,F=null;const h=()=>{_e(e),T&&(F!==null&&clearTimeout(F),F=window.setTimeout(()=>{F=null;const y=T;T=!1,t(e,y)},250)),t(e,!1)};if(i){const y=d("view","View"),_=document.createElement("div");_.className="panel-view-grid";const I=[{name:"lateral-left",label:"Lateral L"},{name:"lateral-right",label:"Lateral R"},{name:"anterior",label:"Anterior"},{name:"posterior",label:"Posterior"},{name:"dorsal",label:"Dorsal"},{name:"ventral",label:"Ventral"}];for(const C of I){const P=document.createElement("button");P.type="button",P.className="panel-view-btn",P.textContent=C.label,P.addEventListener("click",()=>i.set(C.name)),_.appendChild(P)}y.appendChild(_);const m=document.createElement("div");m.className="panel-note",m.textContent="Or rotate freely with mouse drag. Position auto-saves.",y.appendChild(m)}const R=d("visibility","Visibility");for(const y of Ft)R.appendChild(fe(y,e,h,!1));const g=d("lic","LIC");for(const y of It)g.appendChild(fe(y,e,h,!1));const w=d("scene","Scene");for(const y of Pt)w.appendChild(fe(y,e,h,!1));const M=d("surface","Surface shading");for(const y of Mt)M.appendChild(fe(y,e,h,!1));const L=d("arrows","Arrows");for(const y of Dt){const _=!!y.expensive;L.appendChild(fe(y,e,()=>{_&&(T=!0),h()},_))}if(r){const y=d("screenshot","Screenshot"),_=document.createElement("div");_.className="panel-note",_.textContent="Saves PNG with transparent background",y.appendChild(_);const I={key:"screenshotDPI",label:"Resolution (DPI)",type:"range",min:72,max:1200,step:6};y.appendChild(fe(I,e,h,!1));const m=document.createElement("button");m.type="button",m.className="panel-btn",m.innerHTML='<span class="icon" aria-hidden="true">⤓</span><span>Current view</span>',m.addEventListener("click",async()=>{m.disabled=!0;try{await r.current()}finally{m.disabled=!1}}),y.appendChild(m);const C=document.createElement("button");C.type="button",C.className="panel-btn",C.style.marginTop="8px",C.innerHTML='<span class="icon" aria-hidden="true">▦</span><span>All canonical views</span>',C.addEventListener("click",async()=>{C.disabled=!0;try{await r.canonical()}finally{C.disabled=!1}}),y.appendChild(C)}const x=document.createElement("div");x.className="panel-control",x.style.marginTop="22px";const D=document.createElement("button");D.id="panel-reset",D.type="button",D.innerHTML='<span class="icon" aria-hidden="true">↻</span><span>Reset to defaults</span>',D.addEventListener("click",async()=>{try{window.localStorage.removeItem(Ie)}catch{}try{window.localStorage.removeItem(De)}catch{}try{window.localStorage.removeItem("di-camera-state-v1")}catch{}await At(),window.location.reload()}),x.appendChild(D),c.appendChild(x);let v=!0;const E=y=>{v=y,c.classList.toggle("closed",!v),s.classList.toggle("closed",!v),s.title=v?"Hide controls":"Show controls",s.setAttribute("aria-label",v?"Hide controls":"Show controls")};return s.addEventListener("click",()=>E(!v)),l.addEventListener("click",()=>E(!1)),E(!0),a.appendChild(s),a.appendChild(c),{element:a,toggle:()=>E(!v)}}function Te(e,t){if(t.colors.some(c=>c.type===e.FLOAT||c.type===e.HALF_FLOAT)&&!e.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float not supported — cannot create float-format FBO");const r=e.createFramebuffer();if(!r)throw new Error("createFramebuffer failed");let i=[],o=null;function a(c,f){e.bindFramebuffer(e.FRAMEBUFFER,r);for(const l of i)e.deleteTexture(l);if(o&&e.deleteTexture(o),i=[],o=null,t.colors.forEach((l,u)=>{const d=e.createTexture();if(!d)throw new Error(`createTexture failed for color attachment ${u}`);e.bindTexture(e.TEXTURE_2D,d),e.texImage2D(e.TEXTURE_2D,0,l.internalFormat,c,f,0,l.format,l.type,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,l.minFilter??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,l.magFilter??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,l.wrapS??e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,l.wrapT??e.CLAMP_TO_EDGE),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+u,e.TEXTURE_2D,d,0),i.push(d)}),t.depth){const l=e.createTexture();if(!l)throw new Error("createTexture failed for depth attachment");e.bindTexture(e.TEXTURE_2D,l),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT32F,c,f,0,e.DEPTH_COMPONENT,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,l,0),o=l}const p=e.checkFramebufferStatus(e.FRAMEBUFFER);if(p!==e.FRAMEBUFFER_COMPLETE)throw new Error(`Framebuffer incomplete: 0x${p.toString(16)}`);e.bindFramebuffer(e.FRAMEBUFFER,null)}return a(t.width,t.height),{fbo:r,get width(){return t.width},get height(){return t.height},get colorTextures(){return i},get depthTexture(){return o},bind(){e.bindFramebuffer(e.FRAMEBUFFER,r),e.viewport(0,0,t.width,t.height);const c=t.colors.map((f,p)=>e.COLOR_ATTACHMENT0+p);e.drawBuffers(c)},resize(c,f){t.width=c,t.height=f,a(c,f)},generateMipmaps(){t.colors.forEach((c,f)=>{c.mipmap&&(e.bindTexture(e.TEXTURE_2D,i[f]),e.generateMipmap(e.TEXTURE_2D))}),t.depth&&o&&(e.bindTexture(e.TEXTURE_2D,o),e.generateMipmap(e.TEXTURE_2D))}}}function Ce(e,t){if(t<0)throw new Error("screenQuad: a_position attribute not found in program");const n=e.createVertexArray();if(!n)throw new Error("createVertexArray failed for screenQuad");e.bindVertexArray(n);const r=e.createBuffer();if(!r)throw new Error("createBuffer failed for screenQuad");return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),n}function zt(e){let t=e>>>0;return function(){t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),(n^n>>>14)>>>0}}function kt(e,t,n,r){const i=zt(r),o=new Uint8Array(e*t*n);for(let a=0;a<o.length;a++)o[a]=i()&255;return o}const Vt=`#version 300 es
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
`,Ot=`#version 300 es
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
`,Xt=`// Minimal Phong helper, parameterized via uniforms so the panel can tune the
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
`,Ht=`#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
`,$t=`#version 300 es
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
`,qt=`#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
`,Wt=`#version 300 es
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
`;function jt(e){const t=e.indexOf("void main()");if(t<0)throw new Error("transform.frag.glsl: void main() not found");return e.slice(0,t)+Xt+`
`+e.slice(t)}function Kt(e,t,n){const r=pe(e,Vt,jt(Ot),"lic.transform"),i=pe(e,Ht,$t,"lic.edge"),o=pe(e,Gt,Yt,"lic.advect"),a=pe(e,qt,Wt,"lic.compose"),s=Ce(e,i.attribs.get("a_position")??-1),c=Ce(e,o.attribs.get("a_position")??-1),f=Ce(e,a.attribs.get("a_position")??-1);let p=Te(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT},{internalFormat:e.R8,format:e.RED,type:e.UNSIGNED_BYTE},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT}],depth:!0}),l=Te(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE,mipmap:!0}],depth:!1}),u=Te(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE}],depth:!1});const d=128,T=kt(d,d,d,12345),F=e.createTexture();if(!F)throw new Error("createTexture failed for noiseTex");e.bindTexture(e.TEXTURE_3D,F),e.texImage3D(e.TEXTURE_3D,0,e.R8,d,d,d,0,e.RED,e.UNSIGNED_BYTE,T),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_R,e.REPEAT);function h(w,M,L,x,D){const v=w.uniforms.get(M);v&&(e.activeTexture(e.TEXTURE0+L),e.bindTexture(x,D),e.uniform1i(v,L))}function R(w,M,L,x,D){const v=e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);p.bind(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.enable(e.CULL_FACE),e.cullFace(e.BACK),e.useProgram(r.program),e.uniformMatrix4fv(r.uniforms.get("u_view"),!1,M),e.uniformMatrix4fv(r.uniforms.get("u_projection"),!1,L),e.uniform3fv(r.uniforms.get("u_meshBBMin"),w.meshBBMin),e.uniform3fv(r.uniforms.get("u_meshBBMax"),w.meshBBMax),e.uniform1f(r.uniforms.get("u_surfaceAmbient"),w.surfaceAmbient??.04),e.uniform1f(r.uniforms.get("u_surfaceDiffuse"),w.surfaceDiffuse??.75),e.uniform1f(r.uniforms.get("u_surfaceSpecular"),w.surfaceSpecular??.4),e.uniform1f(r.uniforms.get("u_surfaceShininess"),w.surfaceShininess??80),h(r,"u_noiseSampler",0,e.TEXTURE_3D,F),e.bindVertexArray(w.meshVAO),e.drawElements(e.TRIANGLES,w.meshIndexCount,w.meshIndexType,0),e.bindVertexArray(null),p.generateMipmaps(),l.bind(),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.useProgram(i.program),e.uniform2f(i.uniforms.get("u_viewportSize"),p.width,p.height),h(i,"u_depthSampler",0,e.TEXTURE_2D,p.depthTexture),e.bindVertexArray(s),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),l.generateMipmaps(),u.bind(),e.useProgram(o.program),e.uniform2f(o.uniforms.get("u_viewportSize"),p.width,p.height),e.uniform2f(o.uniforms.get("u_viewportScale"),1,1),e.uniform1f(o.uniforms.get("u_noiseRatio"),0),e.uniform1i(o.uniforms.get("u_numIter"),w.licIterations??50),h(o,"u_depthSampler",0,e.TEXTURE_2D,p.depthTexture),h(o,"u_noiseSampler",1,e.TEXTURE_2D,p.colorTextures[2]),h(o,"u_vecSampler",2,e.TEXTURE_2D,p.colorTextures[1]),h(o,"u_edgeSampler",3,e.TEXTURE_2D,l.colorTextures[0]),e.bindVertexArray(c),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.bindFramebuffer(e.FRAMEBUFFER,v),e.viewport(0,0,x,D),e.useProgram(a.program),e.uniform1i(a.uniforms.get("u_useHighContrast"),w.useHighContrast??!0?1:0),e.uniform1i(a.uniforms.get("u_showLIC"),w.showLIC??!0?1:0),e.uniform1i(a.uniforms.get("u_showColor"),w.showColor??!0?1:0),e.uniform1i(a.uniforms.get("u_emphasizeSingular"),w.emphasizeSingular??!1?1:0),h(a,"u_colorSampler",0,e.TEXTURE_2D,p.colorTextures[0]),h(a,"u_vecSampler",1,e.TEXTURE_2D,p.colorTextures[1]),h(a,"u_depthSampler",2,e.TEXTURE_2D,p.depthTexture),h(a,"u_edgeSampler",3,e.TEXTURE_2D,l.colorTextures[0]),h(a,"u_noiseSampler",4,e.TEXTURE_2D,p.colorTextures[2]),h(a,"u_advectSampler",5,e.TEXTURE_2D,u.colorTextures[0]),e.enable(e.DEPTH_TEST),e.bindVertexArray(f),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}function g(w,M){p.resize(w,M),l.resize(w,M),u.resize(w,M)}return{render:R,resize:g,transformAttribs:r.attribs,getTransformDepthTexture:()=>p.depthTexture,getColorTexture:()=>p.colorTextures[0],getVecTexture:()=>p.colorTextures[1],getNormalTexture:()=>p.colorTextures[3],getPosTexture:()=>p.colorTextures[4]}}const Qt=`#version 300 es
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
`,Oe=`#version 300 es
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
`,Jt=`#version 300 es
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
`;async function ge(e){const t=await fetch(e);if(!t.ok)throw new Error(`Fetch failed ${e}: ${t.status} ${t.statusText}`);return t.text()}function Zt(e){const t=H(1/0,1/0,1/0),n=H(-1/0,-1/0,-1/0),r=H(0,0,0),i=e.length/3;for(let a=0;a<i;a++){const s=e[a*3+0],c=e[a*3+1],f=e[a*3+2];s<t[0]&&(t[0]=s),s>n[0]&&(n[0]=s),c<t[1]&&(t[1]=c),c>n[1]&&(n[1]=c),f<t[2]&&(t[2]=f),f>n[2]&&(n[2]=f),r[0]+=s,r[1]+=c,r[2]+=f}$e(r,r,1/i);let o=0;for(let a=0;a<i;a++){const s=e[a*3+0]-r[0],c=e[a*3+1]-r[1],f=e[a*3+2]-r[2];o=Math.max(o,s*s+c*c+f*f)}return{center:r,radius:Math.sqrt(o),bbMin:t,bbMax:n}}async function en(e){const t=at(e),n=t.gl;if(!n.getExtension("EXT_color_buffer_float")){Re("Your browser does not support EXT_color_buffer_float; LIC requires it.");return}const r=Kt(n,t.width||1,t.height||1),i=pe(n,Qt,Oe,"arrow"),o=pe(n,Jt,Oe,"arrow.curved"),a=it(),s=Rt();let c=null,f=null,p=null,l=null,u=null,d=null,T=null,F=null,h=null,R=null,g=null,w=null;function M(S){if(!c||!T||!f||!p||!l||!R)return;const A=2*S.arrowHeight*S.arrowScale*R.radius,z=.5*S.arrowWidth*S.arrowScale*R.radius;let B;if(S.arrowBorderMode&&F){const V=R.radius*S.arrowDensity,K=Math.max(V,A);B=Ct(c.vertices,T,f,p,l,K,.05,F)}else{const V=A*1.2,K=R.radius*S.arrowDensity,W=Math.max(K,Math.max(z*1.5,A*.4));B=St(c.vertices,T,f,p,l,V,W,.05)}const X=gt(B,A,1);if(g=vt(n,i,{positions:X.positions,directions:X.directions,normals:X.normals,colors:X.colors}),X.vertexIDs&&c&&T&&f&&p&&l){const V=_t(X.positions,Array.from(X.vertexIDs),c.vertices,T,f,p,l,qe);w=yt(n,o,V)}else w=null}function L(S,A,z){const B=st(S),X=ct(A),V=ut(z);if(X.length!==B.vertices.length/3)throw new Error(`Vertex count mismatch: mesh has ${B.vertices.length/3} vertices, labels has ${X.length}`);const K=B.vertices.length/3;let W=null;if(B.colors&&B.colors.length===K*3){W=new Uint8Array(K*4);for(let Q=0;Q<K;Q++)W[Q*4+0]=B.colors[Q*3+0],W[Q*4+1]=B.colors[Q*3+1],W[Q*4+2]=B.colors[Q*3+2],W[Q*4+3]=255}const de=pt(X,V),oe=!s.useLabelColors&&W?W:de,Z=mt(B.vertices,B.indices),ee=ht(B.indices,B.vertices.length/3),ae=Tt(X,ee),ie=wt({vertices:B.vertices,indices:B.indices,labels:X,labelOrder:V,adjacency:ee,normals:Z}),te=Zt(B.vertices),ne=r.transformAttribs,se=ze(n,[{def:{name:"a_position",data:B.vertices,size:3,type:n.FLOAT,normalized:!1},location:ne.get("a_position")??-1},{def:{name:"a_normal",data:Z,size:3,type:n.FLOAT,normalized:!1},location:ne.get("a_normal")??-1},{def:{name:"a_color",data:oe,size:4,type:n.UNSIGNED_BYTE,normalized:!0},location:ne.get("a_color")??-1},{def:{name:"a_vector",data:ie,size:3,type:n.FLOAT,normalized:!1},location:ne.get("a_vector")??-1}],B.indices);c=B,f=ie,p=Z,l=oe,u=W,d=de,T=ee,F=ae,h=se,R=te,M(s),a.fitSphere(te.center,te.radius);const Y=y();Y?a.setLookAt(H(Y.eye[0],Y.eye[1],Y.eye[2]),H(Y.target[0],Y.target[1],Y.target[2]),H(Y.up[0],Y.up[1],Y.up[2])):v("lateral-left",te.center,te.radius),t.requestRender()}function x(S){if(!c||!f||!p)return;const A=S||!u?d:u;if(!A)return;const z=r.transformAttribs;h=ze(n,[{def:{name:"a_position",data:c.vertices,size:3,type:n.FLOAT,normalized:!1},location:z.get("a_position")??-1},{def:{name:"a_normal",data:p,size:3,type:n.FLOAT,normalized:!1},location:z.get("a_normal")??-1},{def:{name:"a_color",data:A,size:4,type:n.UNSIGNED_BYTE,normalized:!0},location:z.get("a_color")??-1},{def:{name:"a_vector",data:f,size:3,type:n.FLOAT,normalized:!1},location:z.get("a_vector")??-1}],c.indices),l=A,M(s)}function D(S,A,z,B=2.5){const X=z*B;switch(S){case"lateral-left":return{eye:H(A[0]-X,A[1],A[2]),up:H(0,0,1)};case"lateral-right":return{eye:H(A[0]+X,A[1],A[2]),up:H(0,0,1)};case"anterior":return{eye:H(A[0],A[1]+X,A[2]),up:H(0,0,1)};case"posterior":return{eye:H(A[0],A[1]-X,A[2]),up:H(0,0,1)};case"dorsal":return{eye:H(A[0],A[1],A[2]+X),up:H(0,1,0)};case"ventral":return{eye:H(A[0],A[1],A[2]-X),up:H(0,1,0)}}}function v(S,A,z){const{eye:B,up:X}=D(S,A,z);a.setLookAt(B,A,X)}const E="di-camera-state-v1";function y(){try{const S=window.localStorage.getItem(E);if(!S)return null;const A=JSON.parse(S);return A&&Array.isArray(A.eye)&&Array.isArray(A.target)&&Array.isArray(A.up)?A:null}catch{return null}}let _=null;function I(){_!==null&&clearTimeout(_),_=window.setTimeout(()=>{_=null;try{window.localStorage.setItem(E,JSON.stringify(a.getViewState()))}catch{}},350)}const m=L;async function C(S){const[A,z,B]=await Promise.all([ge(`/directionality-indicator-webgl/data/${S}.ply`),ge(`/directionality-indicator-webgl/data/${S}.labels`),ge(`/directionality-indicator-webgl/data/${S}.labelorder`)]);m(A,z,B),await Ve({name:`${S}.ply`,plyText:A,labelsText:z,orderText:B}),s.lastDatasetName=`${S}.ply`,s.lastDatasetFiles={ply:`${S}.ply`,labels:`${S}.labels`,labelorder:`${S}.labelorder`},Lt(s)}const P=await Et();P?m(P.plyText,P.labelsText,P.orderText):await C("label18"),t.onResize(()=>{a.resize(t.width,t.height),r.resize(t.width,t.height),t.requestRender()}),a.attach(t.canvas,()=>{t.requestRender(),I()}),a.resize(t.width,t.height),r.resize(t.width,t.height);let U=s.useLabelColors;const{element:b}=Nt(s,(S,A)=>{S.useLabelColors!==U?(U=S.useLabelColors,x(S.useLabelColors)):A&&M(S),t.requestRender()},async({ply:S,labels:A,labelorder:z})=>{const[B,X,V]=await Promise.all([S.text(),A.text(),z.text()]);m(B,X,V),await Ve({name:S.name,plyText:B,labelsText:X,orderText:V})},{current:()=>$(),canonical:()=>j()},{set:S=>{R&&(v(S,R.center,R.radius),I(),t.requestRender())}},C);e.appendChild(b);function N(S){if(n.clearColor(s.bgColorR,s.bgColorG,s.bgColorB,S),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),!h||!R||(r.render({meshVAO:h.vao,meshIndexCount:h.indexCount,meshIndexType:h.indexType,meshBBMin:R.bbMin,meshBBMax:R.bbMax,licIterations:s.licIterations,useHighContrast:s.licHighContrast,showLIC:s.showLIC,showColor:s.showColor,emphasizeSingular:s.licEmphasizeSingular,surfaceAmbient:s.surfaceAmbient,surfaceDiffuse:s.surfaceDiffuse,surfaceSpecular:s.surfaceSpecular,surfaceShininess:s.surfaceShininess},a.view,a.projection,t.width,t.height),!s.showArrows))return;const A=s.arrowCurved&&w!==null,z=A?o:i;!A&&!g||(n.disable(n.DEPTH_TEST),n.disable(n.CULL_FACE),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.useProgram(z.program),n.uniformMatrix4fv(z.uniforms.get("u_view"),!1,a.view),n.uniformMatrix4fv(z.uniforms.get("u_projection"),!1,a.projection),n.uniform1f(z.uniforms.get("u_arrowWidth"),s.arrowWidth),n.uniform1f(z.uniforms.get("u_arrowDist"),s.arrowDist),n.uniform1f(z.uniforms.get("u_arrowScale"),R.radius*s.arrowScale),n.uniform1f(z.uniforms.get("u_directionSign"),s.arrowFlipDirection?-1:1),n.uniform1f(z.uniforms.get("u_widthTails"),s.arrowBodyWidth),n.uniform4f(z.uniforms.get("u_arrowColor"),s.arrowColorR,s.arrowColorG,s.arrowColorB,1),n.uniform1f(z.uniforms.get("u_arrowOpacity"),s.arrowOpacity),A||n.uniform1f(z.uniforms.get("u_arrowHeight"),s.arrowHeight),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,r.getPosTexture()),n.uniform1i(z.uniforms.get("u_posSampler"),0),A&&w?w.draw():g&&g.draw(),n.disable(n.BLEND))}t.onRender(()=>N(1));const k=5e7;function O(S,A,z){const B=t.canvas,X=B.width,V=B.height;B.width=S,B.height=A,n.viewport(0,0,S,A),a.resize(S,A),r.resize(S,A);try{return z()}finally{B.width=X,B.height=V,n.viewport(0,0,X,V),a.resize(X,V),r.resize(X,V)}}function G(){const S=Math.max(.5,s.screenshotDPI/96);let A=Math.round(t.canvas.width*S),z=Math.round(t.canvas.height*S);if(A*z>k){const B=Math.sqrt(k/(A*z));A=Math.round(A*B),z=Math.round(z*B),console.warn(`Screenshot pixel cap: clamped ${s.screenshotDPI} DPI to ${Math.round(96*B*(s.screenshotDPI/96))} effective DPI to stay under 50 MP`)}return{w:A,h:z}}async function $(){if(!R)return;const{w:S,h:A}=G();await q(S,A,"directionality-current.png"),N(1)}async function q(S,A,z){let B="";O(S,A,()=>{N(0),B=t.canvas.toDataURL("image/png")}),await new Promise(X=>{const V=new Image;V.onload=async()=>{const K=document.createElement("canvas");K.width=V.width,K.height=V.height;const W=K.getContext("2d");if(!W){X();return}W.drawImage(V,0,0);const de=W.getImageData(0,0,V.width,V.height).data;let oe=V.width,Z=V.height,ee=-1,ae=-1;for(let Y=0;Y<V.height;Y++){const Q=Y*V.width*4;for(let J=0;J<V.width;J++)de[Q+J*4+3]>0&&(J<oe&&(oe=J),J>ee&&(ee=J),Y<Z&&(Z=Y),Y>ae&&(ae=Y))}if(ee<0){X();return}const ie=ee-oe+1,te=ae-Z+1,ne=document.createElement("canvas");ne.width=ie,ne.height=te;const se=ne.getContext("2d");if(!se){X();return}se.drawImage(K,oe,Z,ie,te,0,0,ie,te),await new Promise(Y=>{ne.toBlob(Q=>{if(Q){const J=URL.createObjectURL(Q),he=document.createElement("a");he.href=J,he.download=z,document.body.appendChild(he),he.click(),document.body.removeChild(he),URL.revokeObjectURL(J)}Y()},"image/png")}),X()},V.src=B})}async function j(){if(!R)return;const S=R.radius,A=R.center,z=["lateral-left","lateral-right","anterior","posterior","dorsal","ventral"],{w:B,h:X}=G();for(const K of z){const{eye:W,up:de}=D(K,A,S,3.2);a.setLookAt(W,A,de),await q(B,X,`directionality-${K}.png`)}const V=y();V?a.setLookAt(H(V.eye[0],V.eye[1],V.eye[2]),H(V.target[0],V.target[1],V.target[2]),H(V.up[0],V.up[1],V.up[2])):v("lateral-left",A,S),N(1)}t.requestRender()}const Xe=document.getElementById("app");Xe?en(Xe).catch(e=>{console.error(e),Re(e instanceof Error?e.message:String(e))}):Re("Internal error: #app container missing");
//# sourceMappingURL=index-TSHY1wMi.js.map
