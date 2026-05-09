(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();var ve=1e-6,re=typeof Float32Array<"u"?Float32Array:Array;function qe(){var e=new re(9);return re!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function We(e,t,n,r,i,o,a,s,c){var f=new re(9);return f[0]=e,f[1]=t,f[2]=n,f[3]=r,f[4]=i,f[5]=o,f[6]=a,f[7]=s,f[8]=c,f}function De(){var e=new re(16);return re!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function je(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Ke(e,t,n,r,i){var o=1/Math.tan(t/2);if(e[0]=o/n,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=o,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,i!=null&&i!==1/0){var a=1/(r-i);e[10]=(i+r)*a,e[14]=2*i*r*a}else e[10]=-1,e[14]=-2*r;return e}var Qe=Ke;function Je(e,t,n,r){var i,o,a,s,c,f,p,l,u,d,T=t[0],L=t[1],h=t[2],S=r[0],g=r[1],w=r[2],M=n[0],R=n[1],b=n[2];return Math.abs(T-M)<ve&&Math.abs(L-R)<ve&&Math.abs(h-b)<ve?je(e):(p=T-M,l=L-R,u=h-b,d=1/Math.sqrt(p*p+l*l+u*u),p*=d,l*=d,u*=d,i=g*u-w*l,o=w*p-S*u,a=S*l-g*p,d=Math.sqrt(i*i+o*o+a*a),d?(d=1/d,i*=d,o*=d,a*=d):(i=0,o=0,a=0),s=l*a-u*o,c=u*i-p*a,f=p*o-l*i,d=Math.sqrt(s*s+c*c+f*f),d?(d=1/d,s*=d,c*=d,f*=d):(s=0,c=0,f=0),e[0]=i,e[1]=s,e[2]=p,e[3]=0,e[4]=o,e[5]=c,e[6]=l,e[7]=0,e[8]=a,e[9]=f,e[10]=u,e[11]=0,e[12]=-(i*T+o*L+a*h),e[13]=-(s*T+c*L+f*h),e[14]=-(p*T+l*L+u*h),e[15]=1,e)}function le(){var e=new re(3);return re!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function Xe(e){var t=e[0],n=e[1],r=e[2];return Math.sqrt(t*t+n*n+r*r)}function H(e,t,n){var r=new re(3);return r[0]=e,r[1]=t,r[2]=n,r}function Pe(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function Me(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e}function Ze(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e}function He(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function ye(e,t){var n=t[0],r=t[1],i=t[2],o=n*n+r*r+i*i;return o>0&&(o=1/Math.sqrt(o)),e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e}function et(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function me(e,t,n){var r=t[0],i=t[1],o=t[2],a=n[0],s=n[1],c=n[2];return e[0]=i*c-o*s,e[1]=o*a-r*c,e[2]=r*s-i*a,e}function ce(e,t,n){var r=n[0],i=n[1],o=n[2],a=n[3],s=t[0],c=t[1],f=t[2],p=i*f-o*c,l=o*s-r*f,u=r*c-i*s;return p=p+p,l=l+l,u=u+u,e[0]=s+a*p+i*u-o*l,e[1]=c+a*l+o*p-r*u,e[2]=f+a*u+r*l-i*p,e}var tt=Xe;(function(){var e=le();return function(t,n,r,i,o,a){var s,c;for(n||(n=3),r||(r=0),i?c=Math.min(i*n+r,t.length):c=t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],o(e,e,a),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2];return t}})();function nt(){var e=new re(4);return re!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function rt(e,t){var n=t[0],r=t[1],i=t[2],o=t[3],a=n*n+r*r+i*i+o*o;return a>0&&(a=1/Math.sqrt(a)),e[0]=n*a,e[1]=r*a,e[2]=i*a,e[3]=o*a,e}(function(){var e=nt();return function(t,n,r,i,o,a){var s,c;for(n||(n=4),r||(r=0),i?c=Math.min(i*n+r,t.length):c=t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],e[3]=t[s+3],o(e,e,a),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2],t[s+3]=e[3];return t}})();function we(){var e=new re(4);return re!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function ge(e,t,n){n=n*.5;var r=Math.sin(n);return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=Math.cos(n),e}function Ue(e,t,n){var r=t[0],i=t[1],o=t[2],a=t[3],s=n[0],c=n[1],f=n[2],p=n[3];return e[0]=r*p+a*s+i*f-o*c,e[1]=i*p+a*c+o*s-r*f,e[2]=o*p+a*f+r*c-i*s,e[3]=a*p-r*s-i*c-o*f,e}function be(e,t,n,r){var i=t[0],o=t[1],a=t[2],s=t[3],c=n[0],f=n[1],p=n[2],l=n[3],u,d,T,L,h;return d=i*c+o*f+a*p+s*l,d<0&&(d=-d,c=-c,f=-f,p=-p,l=-l),1-d>ve?(u=Math.acos(d),T=Math.sin(u),L=Math.sin((1-r)*u)/T,h=Math.sin(r*u)/T):(L=1-r,h=r),e[0]=L*i+h*c,e[1]=L*o+h*f,e[2]=L*a+h*p,e[3]=L*s+h*l,e}function Ge(e,t){var n=t[0]+t[4]+t[8],r;if(n>0)r=Math.sqrt(n+1),e[3]=.5*r,r=.5/r,e[0]=(t[5]-t[7])*r,e[1]=(t[6]-t[2])*r,e[2]=(t[1]-t[3])*r;else{var i=0;t[4]>t[0]&&(i=1),t[8]>t[i*3+i]&&(i=2);var o=(i+1)%3,a=(i+2)%3;r=Math.sqrt(t[i*3+i]-t[o*3+o]-t[a*3+a]+1),e[i]=.5*r,r=.5/r,e[3]=(t[o*3+a]-t[a*3+o])*r,e[o]=(t[o*3+i]+t[i*3+o])*r,e[a]=(t[a*3+i]+t[i*3+a])*r}return e}var _e=rt;(function(){var e=le(),t=H(1,0,0),n=H(0,1,0);return function(r,i,o){var a=et(i,o);return a<-.999999?(me(e,t,i),tt(e)<1e-6&&me(e,n,i),ye(e,e),ge(r,e,Math.PI),r):a>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(me(e,i,o),r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=1+a,_e(r,r))}})();(function(){var e=we(),t=we();return function(n,r,i,o,a,s){return be(e,r,a,s),be(t,i,o,s),be(n,e,t,2*s*(1-s)),n}})();(function(){var e=qe();return function(t,n,r,i){return e[0]=r[0],e[3]=r[1],e[6]=r[2],e[1]=i[0],e[4]=i[1],e[7]=i[2],e[2]=-n[0],e[5]=-n[1],e[8]=-n[2],_e(t,Ge(t,e))}})();function ot(e){const t=document.createElement("canvas");e.appendChild(t);const n=t.getContext("webgl2",{antialias:!0,depth:!0,alpha:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0});if(!n)throw new Error("WebGL2 not supported in this browser");const r=n;let i=()=>{},o=()=>{},a=!0;const s={canvas:t,gl:r,get width(){return t.width},get height(){return t.height},requestRender(){a=!0},onRender(p){i=p},onResize(p){o=p}};function c(){const p=Math.min(window.devicePixelRatio,2),l=Math.floor(e.clientWidth*p),u=Math.floor(e.clientHeight*p);(t.width!==l||t.height!==u)&&(t.width=l,t.height=u,r.viewport(0,0,l,u),o(),a=!0)}function f(){c(),a&&(a=!1,i()),requestAnimationFrame(f)}return requestAnimationFrame(f),window.addEventListener("resize",c),s}function Se(e){const t=document.getElementById("banner");t&&(t.textContent=e,t.style.display="block")}function at(){const e=De(),t=De(),n=we(),r=H(0,0,0);let i=3,o=.01,a=1e3,s=1;function c(){const l=H(0,0,i);ce(l,l,n);const u=le();Me(u,r,l);const d=H(0,1,0);ce(d,d,n),Je(e,u,r,d)}function f(){const l=Math.PI/4,u=Math.max(.001,i*.01),d=Math.max(1e3,i*100);Qe(t,l,s,u,d)}function p(l,u){const d=H(1,0,0);ce(d,d,n);const T=H(0,1,0);ce(T,T,n);const L=we();ge(L,d,u);const h=we();ge(h,T,l),Ue(n,h,n),Ue(n,L,n),_e(n,n)}return c(),f(),{view:e,projection:t,attach(l,u){let d=!1,T=0,L=0;l.addEventListener("pointerdown",h=>{d=!0,T=h.clientX,L=h.clientY,l.setPointerCapture(h.pointerId)}),l.addEventListener("pointermove",h=>{if(!d)return;const S=h.clientX-T,g=h.clientY-L;if(T=h.clientX,L=h.clientY,h.shiftKey){const w=2*i*.4142/Math.max(l.clientHeight,1),M=H(1,0,0);ce(M,M,n);const R=H(0,1,0);ce(R,R,n),r[0]+=(-S*M[0]+g*R[0])*w,r[1]+=(-S*M[1]+g*R[1])*w,r[2]+=(-S*M[2]+g*R[2])*w}else{const w=2*Math.PI/Math.max(l.clientWidth,1);p(-S*w,-g*w)}c(),f(),u()}),l.addEventListener("pointerup",h=>{d=!1,l.releasePointerCapture(h.pointerId)}),l.addEventListener("pointercancel",h=>{d=!1,l.releasePointerCapture(h.pointerId)}),l.addEventListener("wheel",h=>{h.preventDefault(),i*=Math.exp(h.deltaY*.001),i=Math.max(o,Math.min(a,i)),c(),f(),u()},{passive:!1})},fitSphere(l,u){Pe(r,l);const d=Math.max(u,.001);i=d*2.5,o=d*.05,a=d*30,c(),f()},getViewState(){const l=H(0,0,i);ce(l,l,n);const u=le();Me(u,r,l);const d=H(0,1,0);return ce(d,d,n),{eye:[u[0],u[1],u[2]],target:[r[0],r[1],r[2]],up:[d[0],d[1],d[2]]}},setLookAt(l,u,d){Pe(r,u);const T=le();Ze(T,l,r);const L=Xe(T);if(L<1e-6)return;i=L;const h=le();He(h,T,1/L);const S=le();ye(S,d);const g=le();me(g,S,h),ye(g,g),me(S,h,g),ye(S,S);const w=We(g[0],g[1],g[2],S[0],S[1],S[2],h[0],h[1],h[2]);Ge(n,w),_e(n,n),c(),f()},resize(l,u){s=l/Math.max(1,u),f()}}}function Be(e,t,n,r){const i=e.createShader(t);if(!i)throw new Error(`createShader failed for ${r}`);if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){const o=e.getShaderInfoLog(i)??"(no log)";throw e.deleteShader(i),new Error(`Shader compile failed [${r}]:
${o}`)}return i}function pe(e,t,n,r){const i=Be(e,e.VERTEX_SHADER,t,`${r}.vert`),o=Be(e,e.FRAGMENT_SHADER,n,`${r}.frag`),a=e.createProgram();if(!a)throw new Error(`createProgram failed for ${r}`);if(e.attachShader(a,i),e.attachShader(a,o),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){const l=e.getProgramInfoLog(a)??"(no log)";throw e.deleteProgram(a),new Error(`Program link failed [${r}]:
${l}`)}const s=new Map,c=e.getProgramParameter(a,e.ACTIVE_UNIFORMS);for(let l=0;l<c;l++){const u=e.getActiveUniform(a,l);if(!u)continue;const d=e.getUniformLocation(a,u.name);d&&s.set(u.name,d)}const f=new Map,p=e.getProgramParameter(a,e.ACTIVE_ATTRIBUTES);for(let l=0;l<p;l++){const u=e.getActiveAttrib(a,l);u&&f.set(u.name,e.getAttribLocation(a,u.name))}return{program:a,uniforms:s,attribs:f}}function Ne(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed");e.bindVertexArray(r);for(const{def:o,location:a}of t){if(a<0)continue;const s=e.createBuffer();if(!s)throw new Error(`createBuffer failed for ${o.name}`);e.bindBuffer(e.ARRAY_BUFFER,s),e.bufferData(e.ARRAY_BUFFER,o.data,e.STATIC_DRAW),e.enableVertexAttribArray(a),e.vertexAttribPointer(a,o.size,o.type,o.normalized,0,0)}const i=e.createBuffer();if(!i)throw new Error("createBuffer failed for EBO");return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,i),e.bufferData(e.ELEMENT_ARRAY_BUFFER,n,e.STATIC_DRAW),e.bindVertexArray(null),{vao:r,ebo:i,indexCount:n.length,indexType:n instanceof Uint32Array?e.UNSIGNED_INT:e.UNSIGNED_SHORT}}function it(e){const t=e.split(/\r?\n/);if(t[0]!=="ply")throw new Error("Not a PLY file (missing 'ply' magic)");if(!t[1]||!t[1].startsWith("format ascii"))throw new Error("Only ASCII PLY is supported in M1");const n=[];let r=2;for(;r<t.length;){const u=t[r].trim();if(u==="end_header"){r++;break}if(u.startsWith("comment")||u===""){r++;continue}if(u.startsWith("element ")){const[,d,T]=u.split(/\s+/);n.push({name:d,count:parseInt(T,10),properties:[]})}else if(u.startsWith("property ")){const d=u.split(/\s+/);d[1]==="list"?n[n.length-1].properties.push({type:"list",countType:d[2],itemType:d[3],name:d[4]}):n[n.length-1].properties.push({type:d[1],name:d[2]})}r++}const i=n.find(u=>u.name==="vertex"),o=n.find(u=>u.name==="face");if(!i)throw new Error("PLY: no vertex element");if(!o)throw new Error("PLY: no face element");const a=new Float32Array(i.count*3),s=i.properties.findIndex(u=>u.name==="x"),c=i.properties.findIndex(u=>u.name==="red"),p=c>=0?new Uint8Array(i.count*3):null;for(let u=0;u<i.count;u++,r++){const d=t[r].trim().split(/\s+/);a[u*3+0]=parseFloat(d[s+0]),a[u*3+1]=parseFloat(d[s+1]),a[u*3+2]=parseFloat(d[s+2]),p&&(p[u*3+0]=parseInt(d[c+0],10),p[u*3+1]=parseInt(d[c+1],10),p[u*3+2]=parseInt(d[c+2],10))}const l=[];for(let u=0;u<o.count;u++,r++){const d=t[r].trim().split(/\s+/),T=parseInt(d[0],10);if(T!==3)throw new Error(`PLY: only triangle faces supported (got ${T}-gon at face ${u})`);l.push(parseInt(d[1],10),parseInt(d[2],10),parseInt(d[3],10))}return{vertices:a,normals:null,colors:p,indices:new Uint32Array(l)}}function st(e){return $e(e)}function $e(e){const t=e.split(/[,\s]+/).filter(r=>r.length>0),n=new Int32Array(t.length);for(let r=0;r<t.length;r++){const i=parseInt(t[r],10);if(Number.isNaN(i))throw new Error(`labels: non-integer token at index ${r}: "${t[r]}"`);n[r]=i}return n}const ct=$e;function lt(e){return ct(e)}function ut(e,t,n){const r=Math.floor(e*6),i=e*6-r,o=n*(1-t),a=n*(1-i*t),s=n*(1-(1-i)*t);let c=0,f=0,p=0;switch(r%6){case 0:c=n,f=s,p=o;break;case 1:c=a,f=n,p=o;break;case 2:c=o,f=n,p=s;break;case 3:c=o,f=a,p=n;break;case 4:c=s,f=o,p=n;break;case 5:c=n,f=o,p=a;break}return[Math.round(c*255),Math.round(f*255),Math.round(p*255)]}function dt(e){const t=new Map,n=e.length;for(let r=0;r<n;r++){const i=e[r],[o,a,s]=ut(r/n,.6,.95);t.set(i,[o,a,s,255])}return t}function ft(e,t){const n=dt(t),r=new Uint8Array(e.length*4),i=[128,128,128,255];for(let o=0;o<e.length;o++){const a=n.get(e[o])??i;r[o*4+0]=a[0],r[o*4+1]=a[1],r[o*4+2]=a[2],r[o*4+3]=a[3]}return r}function pt(e,t){const n=new Array(t);for(let o=0;o<t;o++)n[o]=new Set;const r=e.length/3;for(let o=0;o<r;o++){const a=e[o*3+0],s=e[o*3+1],c=e[o*3+2];n[a].add(s),n[a].add(c),n[s].add(a),n[s].add(c),n[c].add(a),n[c].add(s)}const i=n.map(o=>Array.from(o));return{vertexCount:t,neighbours(o){return i[o]??[]}}}function ht(e,t){const n=e.length/3,r=new Float32Array(n*3),i=t.length/3;for(let o=0;o<i;o++){const a=t[o*3+0],s=t[o*3+1],c=t[o*3+2],f=e[a*3+0],p=e[a*3+1],l=e[a*3+2],u=e[s*3+0],d=e[s*3+1],T=e[s*3+2],L=e[c*3+0],h=e[c*3+1],S=e[c*3+2],g=u-f,w=d-p,M=T-l,R=L-f,b=h-p,D=S-l,v=w*D-M*b,x=M*R-g*D,y=g*b-w*R;r[a*3+0]+=v,r[a*3+1]+=x,r[a*3+2]+=y,r[s*3+0]+=v,r[s*3+1]+=x,r[s*3+2]+=y,r[c*3+0]+=v,r[c*3+1]+=x,r[c*3+2]+=y}for(let o=0;o<n;o++){const a=r[o*3+0],s=r[o*3+1],c=r[o*3+2],f=Math.sqrt(a*a+s*s+c*c);f>0&&(r[o*3+0]=a/f,r[o*3+1]=s/f,r[o*3+2]=c/f)}return r}function mt(e){const{vertices:t,labels:n,labelOrder:r,adjacency:i,normals:o}=e,a=i.vertexCount,s=new Float32Array(a*3),c=new Uint8Array(a),f=new Int32Array(a).fill(-1),p=[];for(let h=0;h<a;h++){if(c[h])continue;const S=n[h],g=p.length;p.push(S);const w=[h];for(c[h]=1;w.length>0;){const M=w.shift();f[M]=g;const R=i.neighbours(M);for(let b=0;b<R.length;b++){const D=R[b];!c[D]&&n[D]===S&&(c[D]=1,w.push(D))}}}const l=new Map;for(let h=0;h<r.length;h++)l.set(r[h],h);const u=new Uint8Array(a);for(let h=0;h<a;h++)l.has(n[h])||(u[h]=1);const d=new Uint8Array(a);for(let h=0;h<a;h++)u[h]&&(d[h]=1);const T=-1;for(let h=0;h<a;h++){if(u[h])continue;const S=t[h*3+0],g=t[h*3+1],w=t[h*3+2],M=f[h],R=n[h],b=l.get(R);let D=0,v=0,x=0,y=0;const _=i.neighbours(h);for(let I=0;I<_.length;I++){const m=_[I];if(u[m])continue;const C=f[m];if(C===M)continue;const P=p[C],U=l.get(P);if(U===void 0)continue;const k=(b>U?-1:1)*T,z=t[m*3+0],X=t[m*3+1],$=t[m*3+2];let G=z-S,q=X-g,j=$-w;const F=Math.sqrt(G*G+q*q+j*j);F<1e-9||(G=G/F*k,q=q/F*k,j=j/F*k,D+=G,v+=q,x+=j,y++)}y>0&&(s[h*3+0]=D/y,s[h*3+1]=v/y,s[h*3+2]=x/y,d[h]=1)}const L=200;for(let h=0;h<L;h++){let S=!1,g=!0;const w=new Uint8Array(d),M=new Float32Array(s);for(let R=0;R<a;R++){if(d[R])continue;g=!1;const b=i.neighbours(R);let D=0,v=0;for(let U=0;U<b.length;U++){const E=b[U];if(E===R||u[E]||!w[E])continue;D++;const k=t[E*3+0]-t[R*3+0],z=t[E*3+1]-t[R*3+1],X=t[E*3+2]-t[R*3+2],$=Math.sqrt(k*k+z*z+X*X);$>v&&(v=$)}if(D<2)continue;const x=o[R*3+0],y=o[R*3+1],_=o[R*3+2];let I=0,m=0,C=0,P=0;for(let U=0;U<b.length;U++){const E=b[U];if(E===R||u[E]||!w[E])continue;const k=t[E*3+0]-t[R*3+0],z=t[E*3+1]-t[R*3+1],X=t[E*3+2]-t[R*3+2],$=Math.sqrt(k*k+z*z+X*X);let G=M[E*3+0],q=M[E*3+1],j=M[E*3+2];const F=Math.sqrt(G*G+q*q+j*j);let A=0,N=0,B=0;if(F>.001){const V=G/F,K=q/F,W=j/F;if(Math.abs(V*x+K*y+W*_)<.98){const oe=y*W-_*K,Z=_*V-x*W,ee=x*K-y*V,ae=Math.sqrt(oe*oe+Z*Z+ee*ee);if(ae>1e-9){const ie=oe/ae,te=Z/ae,ne=ee/ae;let se=te*_-ne*y,Y=ne*x-ie*_,Q=ie*y-te*x;const J=Math.sqrt(se*se+Y*Y+Q*Q);J>1e-9&&(se/=J,Y/=J,Q/=J,A=se*F,N=Y*F,B=Q*F)}}}const O=$/v;I+=O*A,m+=O*N,C+=O*B,P+=O}P>0&&(s[R*3+0]=I/P,s[R*3+1]=m/P,s[R*3+2]=C/P,d[R]=1,S=!0)}if(g||!S)break}return s}function wt(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed for arrow");e.bindVertexArray(r);const i=t.attribs.get("a_corner")??-1;if(i<0)throw new Error("arrow vertex shader missing attribute a_corner");const o=e.createBuffer();if(!o)throw new Error("createBuffer failed for a_corner");e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0);function a(c,f,p,l,u){const d=t.attribs.get(c)??-1;if(d<0)throw new Error(`arrow shader missing attribute ${c}`);const T=e.createBuffer();if(!T)throw new Error(`createBuffer failed for ${c}`);e.bindBuffer(e.ARRAY_BUFFER,T),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW),e.enableVertexAttribArray(d),e.vertexAttribPointer(d,p,l,u,0,0),e.vertexAttribDivisor(d,1)}a("a_instance_position",n.positions,3,e.FLOAT,!1),a("a_instance_direction",n.directions,3,e.FLOAT,!1),a("a_instance_normal",n.normals,3,e.FLOAT,!1),a("a_instance_color",n.colors,4,e.UNSIGNED_BYTE,!0),e.bindVertexArray(null);const s=n.positions.length/3;return{vao:r,instanceCount:s,draw(){e.bindVertexArray(r),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,s),e.bindVertexArray(null)}}}function vt(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed for curved arrow");e.bindVertexArray(r);function i(c,f,p,l,u){const d=t.attribs.get(c)??-1;if(d<0)throw new Error(`curved-arrow shader missing attribute ${c}`);const T=e.createBuffer();if(!T)throw new Error(`createBuffer failed for ${c}`);e.bindBuffer(e.ARRAY_BUFFER,T),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW),e.enableVertexAttribArray(d),e.vertexAttribPointer(d,p,l,u,0,0)}i("a_position",n.positions,3,e.FLOAT,!1),i("a_tangent",n.tangents,3,e.FLOAT,!1),i("a_normal",n.normals,3,e.FLOAT,!1),i("a_color",n.colors,4,e.UNSIGNED_BYTE,!0),i("a_stripY",n.stripY,1,e.FLOAT,!1),i("a_stripSide",n.stripSide,1,e.FLOAT,!1),e.bindVertexArray(null);const o=new Int32Array(n.firstIndices),a=new Int32Array(n.counts),s=o.length;return{vao:r,firstIndices:o,counts:a,draw(){e.bindVertexArray(r);for(let c=0;c<s;c++)e.drawArrays(e.TRIANGLE_STRIP,o[c],a[c]);e.bindVertexArray(null)}}}const Ye=8;function ke(e,t,n,r,i){const o=t*i[e*3],a=t*i[e*3+1],s=t*i[e*3+2],c=Math.sqrt(o*o+a*a+s*s);if(c<1e-6)return null;const f=o/c,p=a/c,l=s/c,u=r.neighbours(e);let d=-1,T=.3,L=0;for(let h=0;h<u.length;h++){const S=u[h],g=n[S*3]-n[e*3],w=n[S*3+1]-n[e*3+1],M=n[S*3+2]-n[e*3+2],R=Math.sqrt(g*g+w*w+M*M);if(R<1e-6)continue;const b=(g*f+w*p+M*l)/R;b>T&&(T=b,d=S,L=R)}return d===-1?null:{next:d,edgeLen:L}}function yt(e,t,n,r,i,o,a,s=Ye){const c=t.length;if(e.length!==c*3)throw new Error(`buildCurvedArrowBuffers: anchors.length (${e.length}) does not match anchorAdjacencyIndices.length*3 (${c*3})`);const f=2*s+1,p=2*f,l=c*p,u=new Float32Array(l*3),d=new Float32Array(l*3),T=new Float32Array(l*3),L=new Uint8Array(l*4),h=new Float32Array(l),S=new Float32Array(l),g=new Int32Array(c),w=new Int32Array(c),M=new Int32Array(f),R=new Float32Array(f*3),b=new Float32Array(f*3),D=new Float32Array(f*3),v=new Uint8Array(f*4);for(let x=0;x<c;x++){const y=t[x];for(let m=0;m<f;m++)M[m]=y;let _=y;for(let m=0;m<s;m++){const C=ke(_,-1,n,r,i);if(!C)break;_=C.next,M[s-1-m]=_}M[s]=y,_=y;for(let m=0;m<s;m++){const C=ke(_,1,n,r,i);if(!C)break;_=C.next,M[s+1+m]=_}for(let m=0;m<f;m++){const C=M[m];m===s?(R[m*3+0]=e[x*3+0],R[m*3+1]=e[x*3+1],R[m*3+2]=e[x*3+2]):(R[m*3+0]=n[C*3+0],R[m*3+1]=n[C*3+1],R[m*3+2]=n[C*3+2]);const P=i[C*3+0],U=i[C*3+1],E=i[C*3+2],k=Math.sqrt(P*P+U*U+E*E)||1;b[m*3+0]=P/k,b[m*3+1]=U/k,b[m*3+2]=E/k;const z=o[C*3+0],X=o[C*3+1],$=o[C*3+2],G=Math.sqrt(z*z+X*X+$*$)||1;D[m*3+0]=z/G,D[m*3+1]=X/G,D[m*3+2]=$/G,v[m*4+0]=a[C*4+0],v[m*4+1]=a[C*4+1],v[m*4+2]=a[C*4+2],v[m*4+3]=255}const I=x*p;g[x]=I,w[x]=p;for(let m=0;m<f;m++){const P=2*(m/(f-1))-1;for(let U=0;U<2;U++){const E=I+m*2+U;u[E*3+0]=R[m*3+0],u[E*3+1]=R[m*3+1],u[E*3+2]=R[m*3+2],d[E*3+0]=b[m*3+0],d[E*3+1]=b[m*3+1],d[E*3+2]=b[m*3+2],T[E*3+0]=D[m*3+0],T[E*3+1]=D[m*3+1],T[E*3+2]=D[m*3+2],L[E*4+0]=v[m*4+0],L[E*4+1]=v[m*4+1],L[E*4+2]=v[m*4+2],L[E*4+3]=v[m*4+3],h[E]=P,S[E]=U===0?-1:1}}}return{positions:u,tangents:d,normals:T,colors:L,stripY:h,stripSide:S,firstIndices:g,counts:w}}const _t="di-cache",ue="datasets",bt=1,Re="current";function Le(){return new Promise(e=>{if(typeof indexedDB>"u"){e(null);return}let t;try{t=indexedDB.open(_t,bt)}catch(n){console.warn("[datasetCache] indexedDB.open threw:",n),e(null);return}t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(ue)||n.createObjectStore(ue)},t.onsuccess=()=>e(t.result),t.onerror=()=>{console.warn("[datasetCache] failed to open DB:",t.error),e(null)},t.onblocked=()=>{console.warn("[datasetCache] open blocked by another connection"),e(null)}})}async function ze(e){const t=await Le();if(t)try{await new Promise(n=>{const r=t.transaction(ue,"readwrite"),i=r.objectStore(ue),o={...e,savedAt:Date.now()},a=i.put(o,Re);a.onerror=()=>{console.warn("[datasetCache] put failed:",a.error)},r.oncomplete=()=>n(),r.onerror=()=>{console.warn("[datasetCache] save tx error:",r.error),n()},r.onabort=()=>{console.warn("[datasetCache] save tx aborted:",r.error),n()}})}catch(n){console.warn("[datasetCache] saveDataset threw:",n)}finally{t.close()}}async function xt(){const e=await Le();if(!e)return null;try{return await new Promise(t=>{const n=e.transaction(ue,"readonly"),i=n.objectStore(ue).get(Re);i.onsuccess=()=>{const o=i.result;if(!o){t(null);return}typeof o.name=="string"&&typeof o.plyText=="string"&&typeof o.labelsText=="string"&&typeof o.orderText=="string"&&typeof o.savedAt=="number"?t(o):(console.warn("[datasetCache] cached record has unexpected shape; ignoring"),t(null))},i.onerror=()=>{console.warn("[datasetCache] get failed:",i.error),t(null)},n.onerror=()=>{console.warn("[datasetCache] load tx error:",n.error),t(null)},n.onabort=()=>{console.warn("[datasetCache] load tx aborted:",n.error),t(null)}})}catch(t){return console.warn("[datasetCache] loadCachedDataset threw:",t),null}finally{e.close()}}async function Et(){const e=await Le();if(e)try{await new Promise(t=>{const n=e.transaction(ue,"readwrite"),i=n.objectStore(ue).delete(Re);i.onerror=()=>{console.warn("[datasetCache] delete failed:",i.error)},n.oncomplete=()=>t(),n.onerror=()=>{console.warn("[datasetCache] clear tx error:",n.error),t()},n.onabort=()=>{console.warn("[datasetCache] clear tx aborted:",n.error),t()}})}catch(t){console.warn("[datasetCache] clearDataset threw:",t)}finally{e.close()}}function At(e,t){const n=e.length,r=new Uint8Array(n);for(let i=0;i<n;i++){const o=e[i],a=t.neighbours(i);for(let s=0;s<a.length;s++)if(e[a[s]]!==o){r[i]=1;break}}return r}function Tt(e,t,n,r,i,o,a=.05,s){const c=t.vertexCount,f=a*a,p=new Int32Array(c);for(let b=0;b<c;b++)p[b]=b;let l=3737844653;const u=()=>(l=l*1664525+1013904223>>>0,(l&4294967295)/4294967295);for(let b=c-1;b>0;b--){const D=Math.floor(u()*(b+1)),v=p[b];p[b]=p[D],p[D]=v}const d=new Uint8Array(c),T=new Float32Array(c),L=[];for(let b=0;b<c;b++){const D=p[b];if(d[D]||s&&!s[D])continue;const v=n[D*3],x=n[D*3+1],y=n[D*3+2];if(v*v+x*x+y*y<f)continue;L.push(D),T.fill(1/0),T[D]=0,d[D]=1;const _=[{d:0,u:D}];for(;_.length>0;){let I=0;for(let E=1;E<_.length;E++)_[E].d<_[I].d&&(I=E);const m=_[I];_[I]=_[_.length-1],_.pop();const C=m.d,P=m.u;if(C>T[P])continue;if(C>o)break;d[P]=1;const U=t.neighbours(P);for(let E=0;E<U.length;E++){const k=U[E],z=e[k*3]-e[P*3],X=e[k*3+1]-e[P*3+1],$=e[k*3+2]-e[P*3+2],G=Math.sqrt(z*z+X*X+$*$),q=C+G;q<T[k]&&q<=o&&(T[k]=q,_.push({d:q,u:k}))}}}const h=L.length,S=new Float32Array(h*3),g=new Float32Array(h*3),w=new Float32Array(h*3),M=new Uint8Array(h*4),R=new Int32Array(h);for(let b=0;b<h;b++){const D=L[b];R[b]=D,S[b*3+0]=e[D*3+0],S[b*3+1]=e[D*3+1],S[b*3+2]=e[D*3+2];const v=n[D*3],x=n[D*3+1],y=n[D*3+2],_=Math.sqrt(v*v+x*x+y*y)||1;g[b*3+0]=v/_,g[b*3+1]=x/_,g[b*3+2]=y/_,w[b*3+0]=r[D*3],w[b*3+1]=r[D*3+1],w[b*3+2]=r[D*3+2],M[b*4+0]=i[D*4],M[b*4+1]=i[D*4+1],M[b*4+2]=i[D*4+2],M[b*4+3]=255}return{positions:S,directions:g,normals:w,colors:M,vertexIDs:R}}function Ct(e,t,n=.8){const r=e.positions.length/3;if(r===0)return e;const i=(t*n)**2,o=t*n,a=new Map,s=new Uint8Array(r),c=new Float32Array(r),f=new Float32Array(r),p=new Float32Array(r);for(let w=0;w<r;w++)c[w]=e.positions[w*3],f[w]=e.positions[w*3+1],p[w]=e.positions[w*3+2];for(let w=0;w<r;w++){const M=Math.floor(c[w]/o),R=Math.floor(f[w]/o),b=Math.floor(p[w]/o);let D=!1;e:for(let v=-1;v<=1;v++)for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++){const _=`${M+y},${R+x},${b+v}`,I=a.get(_);if(I)for(let m=0;m<I.length;m++){const C=I[m],P=c[C]-c[w],U=f[C]-f[w],E=p[C]-p[w];if(P*P+U*U+E*E<i){D=!0;break e}}}if(!D){s[w]=1;const v=`${M},${R},${b}`,x=a.get(v);x?x.push(w):a.set(v,[w])}}let l=0;for(let w=0;w<r;w++)s[w]&&l++;const u=new Float32Array(l*3),d=new Float32Array(l*3),T=new Float32Array(l*3),L=new Uint8Array(l*4),h=e.vertexIDs??null,S=h?new Int32Array(l):null;let g=0;for(let w=0;w<r;w++)s[w]&&(u[g*3+0]=e.positions[w*3+0],u[g*3+1]=e.positions[w*3+1],u[g*3+2]=e.positions[w*3+2],d[g*3+0]=e.directions[w*3+0],d[g*3+1]=e.directions[w*3+1],d[g*3+2]=e.directions[w*3+2],T[g*3+0]=e.normals[w*3+0],T[g*3+1]=e.normals[w*3+1],T[g*3+2]=e.normals[w*3+2],L[g*4+0]=e.colors[w*4+0],L[g*4+1]=e.colors[w*4+1],L[g*4+2]=e.colors[w*4+2],L[g*4+3]=e.colors[w*4+3],S&&h&&(S[g]=h[w]),g++);return{positions:u,directions:d,normals:T,colors:L,vertexIDs:S}}function gt(e,t,n,r,i,o,a,s=.05){const c=t.vertexCount,f=s*s,p=new Int32Array(c);for(let v=0;v<c;v++)p[v]=v;let l=1592651789;const u=()=>(l=l*1664525+1013904223>>>0,(l&4294967295)/4294967295);for(let v=c-1;v>0;v--){const x=Math.floor(u()*(v+1)),y=p[v];p[v]=p[x],p[x]=y}const d=new Uint8Array(c),T=[];function L(v,x){const y=x*n[v*3],_=x*n[v*3+1],I=x*n[v*3+2],m=Math.sqrt(y*y+_*_+I*I);if(m<1e-6)return null;const C=y/m,P=_/m,U=I/m,E=t.neighbours(v);let k=-1,z=.3,X=0;for(let $=0;$<E.length;$++){const G=E[$],q=e[G*3]-e[v*3],j=e[G*3+1]-e[v*3+1],F=e[G*3+2]-e[v*3+2],A=Math.sqrt(q*q+j*j+F*F);if(A<1e-6)continue;const N=(q*C+j*P+F*U)/A;N>z&&(z=N,k=G,X=A)}return k===-1?null:{next:k,edgeLen:X}}function h(v){const x=new Map;x.set(v,0);const y=[{d:0,u:v}];for(;y.length>0;){let _=0;for(let C=1;C<y.length;C++)y[C].d<y[_].d&&(_=C);const I=y[_];if(y[_]=y[y.length-1],y.pop(),I.d>(x.get(I.u)??1/0))continue;if(I.d>a)break;d[I.u]=1;const m=t.neighbours(I.u);for(let C=0;C<m.length;C++){const P=m[C],U=e[P*3]-e[I.u*3],E=e[P*3+1]-e[I.u*3+1],k=e[P*3+2]-e[I.u*3+2],z=Math.sqrt(U*U+E*E+k*k),X=I.d+z;X<=a&&X<(x.get(P)??1/0)&&(x.set(P,X),y.push({d:X,u:P}))}}}function S(v,x,y){const _=[];let I=v,m=0;y&&_.push(I);const C=500;for(let P=0;P<C;P++){const U=L(I,x);if(!U||d[U.next])break;if(m+=U.edgeLen,I=U.next,m>=o){const E=n[I*3],k=n[I*3+1],z=n[I*3+2];if(E*E+k*k+z*z<f)break;_.push(I),m=0}}return _}for(let v=0;v<c;v++){const x=p[v];if(d[x])continue;const y=n[x*3],_=n[x*3+1],I=n[x*3+2];if(y*y+_*_+I*I<f)continue;const m=S(x,1,!0),C=S(x,-1,!1),P=m.concat(C);if(P.length!==0){for(const U of P)h(U);T.push(...P)}}const g=T.length,w=new Float32Array(g*3),M=new Float32Array(g*3),R=new Float32Array(g*3),b=new Uint8Array(g*4),D=new Int32Array(g);for(let v=0;v<g;v++){const x=T[v];D[v]=x,w[v*3+0]=e[x*3+0],w[v*3+1]=e[x*3+1],w[v*3+2]=e[x*3+2];const y=n[x*3],_=n[x*3+1],I=n[x*3+2],m=Math.sqrt(y*y+_*_+I*I)||1;M[v*3+0]=y/m,M[v*3+1]=_/m,M[v*3+2]=I/m,R[v*3+0]=r[x*3],R[v*3+1]=r[x*3+1],R[v*3+2]=r[x*3+2],b[v*4+0]=i[x*4],b[v*4+1]=i[x*4+1],b[v*4+2]=i[x*4+2],b[v*4+3]=255}return{positions:w,directions:M,normals:R,colors:b,vertexIDs:D}}const xe={showLIC:!1,showColor:!0,showArrows:!0,useLabelColors:!1,licIterations:50,licHighContrast:!0,licEmphasizeSingular:!1,arrowCurved:!1,arrowBorderMode:!1,arrowDensity:.02,arrowScale:.008,arrowHeight:1.3,arrowWidth:.9,arrowBodyWidth:.25,arrowDist:.5,arrowOpacity:.72,arrowFlipDirection:!0,arrowColorR:0,arrowColorG:0,arrowColorB:0,bgColorR:.07,bgColorG:.07,bgColorB:.07,parcelSmoothing:1,parcelRefinement:0,surfaceAmbient:.04,surfaceDiffuse:.75,surfaceSpecular:.4,surfaceShininess:80,screenshotDPI:600,lastDatasetName:null},Ie="di-panel-params-v1";function St(){try{const e=window.localStorage.getItem(Ie);if(!e)return{...xe};const t=JSON.parse(e);return{...xe,...t}}catch{return{...xe}}}function Ee(e){try{window.localStorage.setItem(Ie,JSON.stringify(e))}catch{}}const Rt=[{key:"showLIC",label:"LIC streamlines",type:"checkbox"},{key:"showColor",label:"Parcellation colors",type:"checkbox"},{key:"useLabelColors",label:"Use label-order palette (override PLY RGB)",type:"checkbox"},{key:"showArrows",label:"Arrows",type:"checkbox"}],Lt=[{key:"licIterations",label:"Streamline length (iterations)",type:"range",min:5,max:100,step:1},{key:"licHighContrast",label:"High contrast",type:"checkbox"},{key:"licEmphasizeSingular",label:"Emphasize singularities",type:"checkbox"}],It=[{key:"arrowBorderMode",label:"Borders only (M2 mode)",type:"checkbox",expensive:!0},{key:"arrowDensity",label:"Density (smaller = denser)",type:"range",min:.02,max:.18,step:.005,expensive:!0},{key:"arrowScale",label:"Size",type:"range",min:.002,max:.025,step:5e-4,expensive:!0},{key:"arrowHeight",label:"Length",type:"range",min:.5,max:8,step:.1,expensive:!0},{key:"arrowWidth",label:"Head width",type:"range",min:.5,max:4,step:.1},{key:"arrowBodyWidth",label:"Body width (fraction of head)",type:"range",min:.05,max:1,step:.02},{key:"arrowDist",label:"Distance from surface",type:"range",min:0,max:5,step:.1},{key:"arrowOpacity",label:"Opacity",type:"range",min:0,max:1,step:.02},{key:"arrowFlipDirection",label:"Flip direction",type:"checkbox"},{key:"arrowColorR",label:"Color",type:"color"}],Ft=[{key:"bgColorR",label:"Background",type:"color"}],Dt=[{key:"surfaceAmbient",label:"Ambient",type:"range",min:0,max:.5,step:.01},{key:"surfaceDiffuse",label:"Diffuse",type:"range",min:0,max:1.5,step:.05},{key:"surfaceSpecular",label:"Specular (glare)",type:"range",min:0,max:1,step:.02},{key:"surfaceShininess",label:"Shininess (sharpness)",type:"range",min:1,max:400,step:1}],Fe="di-panel-collapsed-v1";function Pt(){try{const e=window.localStorage.getItem(Fe);if(!e)return new Set;const t=JSON.parse(e);return Array.isArray(t)?new Set(t.filter(n=>typeof n=="string")):new Set}catch{return new Set}}function Mt(e){try{window.localStorage.setItem(Fe,JSON.stringify(Array.from(e)))}catch{}}function fe(e,t,n,r){const i=document.createElement("div");if(i.className="panel-control",e.type==="range"){const o=document.createElement("label");o.className="panel-label";const a=document.createElement("span");a.className="panel-label-text",a.textContent=e.label,o.appendChild(a);const s=l=>e.step!==void 0&&String(e.step).includes(".")?l.toFixed(3):String(l),c=document.createElement("input");c.type="text",c.className="panel-value panel-value-input",c.inputMode="decimal",c.spellcheck=!1,c.value=s(t[e.key]),c.title=`Click to type a value (range: ${e.min}–${e.max})`,o.appendChild(c);const f=document.createElement("input");f.type="range",f.min=String(e.min),f.max=String(e.max),f.step=String(e.step),f.value=String(t[e.key]);const p=l=>{let u=l;e.min!==void 0&&u<e.min&&(u=e.min),e.max!==void 0&&u>e.max&&(u=e.max),t[e.key]=u,f.value=String(u),c.value=s(u),n()};f.addEventListener("input",()=>p(parseFloat(f.value))),c.addEventListener("focus",()=>c.select()),c.addEventListener("keydown",l=>{if(l.key==="Enter"){l.preventDefault();const u=parseFloat(c.value);Number.isFinite(u)?p(u):c.value=s(t[e.key]),c.blur()}else l.key==="Escape"&&(c.value=s(t[e.key]),c.blur())}),c.addEventListener("blur",()=>{const l=parseFloat(c.value);Number.isFinite(l)?p(l):c.value=s(t[e.key])}),i.appendChild(o),i.appendChild(f)}else if(e.type==="checkbox"){i.classList.add("checkbox-row");const o=document.createElement("input");o.type="checkbox",o.checked=!!t[e.key],o.id=`panel-cb-${String(e.key)}`,o.addEventListener("change",()=>{t[e.key]=o.checked,n()});const a=document.createElement("label");a.className="panel-label",a.htmlFor=o.id;const s=document.createElement("span");s.className="panel-label-text",s.textContent=e.label,a.appendChild(s),i.appendChild(o),i.appendChild(a)}else if(e.type==="color"){const o=document.createElement("label");o.className="panel-label";const a=document.createElement("span");a.className="panel-label-text",a.textContent=e.label,o.appendChild(a);const s=e.key,c=s,f=s.replace(/R$/,"G"),p=s.replace(/R$/,"B"),l=t,u=document.createElement("input");u.type="color";const d=L=>Math.max(0,Math.min(255,Math.round(L*255))),T=(L,h,S)=>"#"+[L,h,S].map(g=>d(g).toString(16).padStart(2,"0")).join("");u.value=T(l[c],l[f],l[p]),u.addEventListener("input",()=>{const L=u.value.slice(1);l[c]=parseInt(L.slice(0,2),16)/255,l[f]=parseInt(L.slice(2,4),16)/255,l[p]=parseInt(L.slice(4,6),16)/255,n()}),i.appendChild(o),i.appendChild(u)}if(r){const o=document.createElement("div");o.className="panel-note",o.textContent="Recomputed on release (~200 ms)",i.appendChild(o)}return i}function Ut(e,t,n,r,i,o){const a=document.createElement("div");a.id="panel-root";const s=document.createElement("button");s.id="panel-toggle",s.title="Toggle controls",s.setAttribute("aria-label","Toggle controls"),s.innerHTML='<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 2L7.5 7L2.5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';const c=document.createElement("div");c.id="panel";const f=document.createElement("div");f.id="panel-titlebar";const p=document.createElement("span");p.id="panel-title",p.textContent="Controls";const l=document.createElement("button");l.id="panel-collapse-btn",l.type="button",l.title="Hide controls",l.setAttribute("aria-label","Hide controls"),l.innerHTML='<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',f.appendChild(p),f.appendChild(l),c.appendChild(f);const u=Pt(),d=(y,_)=>{const I=document.createElement("section");I.className="panel-section",I.dataset.section=y;const m=document.createElement("button");m.type="button",m.className="panel-heading",m.setAttribute("aria-expanded","true");const C=document.createElement("span");C.className="panel-heading-caret",C.textContent="▾";const P=document.createElement("span");P.className="panel-heading-title",P.textContent=_,m.appendChild(C),m.appendChild(P);const U=document.createElement("div");U.className="panel-section-body";const E=document.createElement("div");E.className="panel-section-inner",U.appendChild(E);const k=z=>{I.classList.toggle("collapsed",z),C.textContent=z?"▸":"▾",m.setAttribute("aria-expanded",z?"false":"true")};return k(u.has(y)),m.addEventListener("click",()=>{const z=!I.classList.contains("collapsed");k(z),z?u.add(y):u.delete(y),Mt(u)}),I.appendChild(m),I.appendChild(U),c.appendChild(I),E};if(n){const y=d("data","Data"),_=document.createElement("div");if(_.className="panel-note",e.lastDatasetName?(_.textContent=`Loaded: ${e.lastDatasetName}`,_.style.color="var(--ok)"):_.textContent="Pick a .ply + .labels + .labelorder triple",y.appendChild(_),o){const P=document.createElement("div");P.className="panel-control";const U=document.createElement("div");U.className="panel-label-text",U.textContent="Bundled datasets";const E=document.createElement("select");E.className="panel-select";const k=document.createElement("option");k.value="",k.textContent="Loading…",k.disabled=!0,k.selected=!0,E.appendChild(k),P.appendChild(U),P.appendChild(E),y.appendChild(P);let z="";(async()=>{try{const X=await fetch("/directionality-indicator-webgl/data/manifest.json");if(!X.ok)throw new Error(`manifest ${X.status}`);const $=await X.json();E.replaceChildren();const G=document.createElement("option");G.value="",G.textContent="Pick a bundled dataset…",G.disabled=!0,G.selected=!0,E.appendChild(G);for(const q of $.datasets){const j=document.createElement("option");j.value=q,j.textContent=q,E.appendChild(j)}}catch{E.replaceChildren();const X=document.createElement("option");X.textContent="(no manifest)",X.disabled=!0,X.selected=!0,E.appendChild(X)}})(),E.addEventListener("change",async()=>{const X=E.value;if(!(!X||X===z)){_.textContent=`Loading ${X}…`,_.style.color="var(--text-mute)";try{await o(X),e.lastDatasetName=`${X}.ply`,Ee(e),_.textContent=`Loaded: ${X} (bundled)`,_.style.color="var(--ok)",z=X}catch($){_.textContent="Error: "+($ instanceof Error?$.message:String($)),_.style.color="var(--danger)",E.value=z}}})}const I=document.createElement("div");I.className="panel-file-row";const m=document.createElement("input");m.type="file",m.multiple=!0,m.accept=".ply,.labels,.labelorder",m.id="panel-file-input",m.className="panel-file-input";const C=document.createElement("label");C.htmlFor=m.id,C.className="panel-file-label",C.innerHTML='<span class="icon" aria-hidden="true">⬆</span><span>Or upload local files…</span>',m.addEventListener("change",async()=>{if(!m.files)return;const P=Array.from(m.files),U=P.find(z=>z.name.toLowerCase().endsWith(".ply")),E=P.find(z=>z.name.toLowerCase().endsWith(".labels")),k=P.find(z=>z.name.toLowerCase().endsWith(".labelorder"));if(!U||!E||!k){_.textContent="Need exactly one .ply, .labels, and .labelorder",_.style.color="var(--danger)";return}_.textContent="Loading…",_.style.color="var(--text-mute)";try{await n({ply:U,labels:E,labelorder:k}),e.lastDatasetName=U.name,Ee(e),_.textContent=`Loaded: ${U.name}`,_.style.color="var(--ok)"}catch(z){_.textContent="Error: "+(z instanceof Error?z.message:String(z)),_.style.color="var(--danger)"}}),I.appendChild(m),I.appendChild(C),y.appendChild(I)}let T=!1,L=null;const h=()=>{Ee(e),T&&(L!==null&&clearTimeout(L),L=window.setTimeout(()=>{L=null;const y=T;T=!1,t(e,y)},250)),t(e,!1)};if(i){const y=d("view","View"),_=document.createElement("div");_.className="panel-view-grid";const I=[{name:"lateral-left",label:"Lateral L"},{name:"lateral-right",label:"Lateral R"},{name:"anterior",label:"Anterior"},{name:"posterior",label:"Posterior"},{name:"dorsal",label:"Dorsal"},{name:"ventral",label:"Ventral"}];for(const C of I){const P=document.createElement("button");P.type="button",P.className="panel-view-btn",P.textContent=C.label,P.addEventListener("click",()=>i.set(C.name)),_.appendChild(P)}y.appendChild(_);const m=document.createElement("div");m.className="panel-note",m.textContent="Or rotate freely with mouse drag. Position auto-saves.",y.appendChild(m)}const S=d("visibility","Visibility");for(const y of Rt)S.appendChild(fe(y,e,h,!1));const g=d("lic","LIC");for(const y of Lt)g.appendChild(fe(y,e,h,!1));const w=d("scene","Scene");for(const y of Ft)w.appendChild(fe(y,e,h,!1));const M=d("surface","Surface shading");for(const y of Dt)M.appendChild(fe(y,e,h,!1));const R=d("arrows","Arrows");for(const y of It){const _=!!y.expensive;R.appendChild(fe(y,e,()=>{_&&(T=!0),h()},_))}if(r){const y=d("screenshot","Screenshot"),_=document.createElement("div");_.className="panel-note",_.textContent="Saves PNG with transparent background",y.appendChild(_);const I={key:"screenshotDPI",label:"Resolution (DPI)",type:"range",min:72,max:1200,step:6};y.appendChild(fe(I,e,h,!1));const m=document.createElement("button");m.type="button",m.className="panel-btn",m.innerHTML='<span class="icon" aria-hidden="true">⤓</span><span>Current view</span>',m.addEventListener("click",async()=>{m.disabled=!0;try{await r.current()}finally{m.disabled=!1}}),y.appendChild(m);const C=document.createElement("button");C.type="button",C.className="panel-btn",C.style.marginTop="8px",C.innerHTML='<span class="icon" aria-hidden="true">▦</span><span>All canonical views</span>',C.addEventListener("click",async()=>{C.disabled=!0;try{await r.canonical()}finally{C.disabled=!1}}),y.appendChild(C)}const b=document.createElement("div");b.className="panel-control",b.style.marginTop="22px";const D=document.createElement("button");D.id="panel-reset",D.type="button",D.innerHTML='<span class="icon" aria-hidden="true">↻</span><span>Reset to defaults</span>',D.addEventListener("click",async()=>{try{window.localStorage.removeItem(Ie)}catch{}try{window.localStorage.removeItem(Fe)}catch{}try{window.localStorage.removeItem("di-camera-state-v1")}catch{}await Et(),window.location.reload()}),b.appendChild(D),c.appendChild(b);let v=!0;const x=y=>{v=y,c.classList.toggle("closed",!v),s.classList.toggle("closed",!v),s.title=v?"Hide controls":"Show controls",s.setAttribute("aria-label",v?"Hide controls":"Show controls")};return s.addEventListener("click",()=>x(!v)),l.addEventListener("click",()=>x(!1)),x(!0),a.appendChild(s),a.appendChild(c),{element:a,toggle:()=>x(!v)}}function Ae(e,t){if(t.colors.some(c=>c.type===e.FLOAT||c.type===e.HALF_FLOAT)&&!e.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float not supported — cannot create float-format FBO");const r=e.createFramebuffer();if(!r)throw new Error("createFramebuffer failed");let i=[],o=null;function a(c,f){e.bindFramebuffer(e.FRAMEBUFFER,r);for(const l of i)e.deleteTexture(l);if(o&&e.deleteTexture(o),i=[],o=null,t.colors.forEach((l,u)=>{const d=e.createTexture();if(!d)throw new Error(`createTexture failed for color attachment ${u}`);e.bindTexture(e.TEXTURE_2D,d),e.texImage2D(e.TEXTURE_2D,0,l.internalFormat,c,f,0,l.format,l.type,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,l.minFilter??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,l.magFilter??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,l.wrapS??e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,l.wrapT??e.CLAMP_TO_EDGE),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+u,e.TEXTURE_2D,d,0),i.push(d)}),t.depth){const l=e.createTexture();if(!l)throw new Error("createTexture failed for depth attachment");e.bindTexture(e.TEXTURE_2D,l),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT32F,c,f,0,e.DEPTH_COMPONENT,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,l,0),o=l}const p=e.checkFramebufferStatus(e.FRAMEBUFFER);if(p!==e.FRAMEBUFFER_COMPLETE)throw new Error(`Framebuffer incomplete: 0x${p.toString(16)}`);e.bindFramebuffer(e.FRAMEBUFFER,null)}return a(t.width,t.height),{fbo:r,get width(){return t.width},get height(){return t.height},get colorTextures(){return i},get depthTexture(){return o},bind(){e.bindFramebuffer(e.FRAMEBUFFER,r),e.viewport(0,0,t.width,t.height);const c=t.colors.map((f,p)=>e.COLOR_ATTACHMENT0+p);e.drawBuffers(c)},resize(c,f){t.width=c,t.height=f,a(c,f)},generateMipmaps(){t.colors.forEach((c,f)=>{c.mipmap&&(e.bindTexture(e.TEXTURE_2D,i[f]),e.generateMipmap(e.TEXTURE_2D))}),t.depth&&o&&(e.bindTexture(e.TEXTURE_2D,o),e.generateMipmap(e.TEXTURE_2D))}}}function Te(e,t){if(t<0)throw new Error("screenQuad: a_position attribute not found in program");const n=e.createVertexArray();if(!n)throw new Error("createVertexArray failed for screenQuad");e.bindVertexArray(n);const r=e.createBuffer();if(!r)throw new Error("createBuffer failed for screenQuad");return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),n}function Bt(e){let t=e>>>0;return function(){t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),(n^n>>>14)>>>0}}function Nt(e,t,n,r){const i=Bt(r),o=new Uint8Array(e*t*n);for(let a=0;a<o.length;a++)o[a]=i()&255;return o}const kt=`#version 300 es
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
`,zt=`#version 300 es
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
`,Vt=`// Minimal Phong helper, parameterized via uniforms so the panel can tune the
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
`,Ot=`#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
`,Xt=`#version 300 es
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
`,Ht=`#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
`,Gt=`#version 300 es
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
`,$t=`#version 300 es
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
`;function qt(e){const t=e.indexOf("void main()");if(t<0)throw new Error("transform.frag.glsl: void main() not found");return e.slice(0,t)+Vt+`
`+e.slice(t)}function Wt(e,t,n){const r=pe(e,kt,qt(zt),"lic.transform"),i=pe(e,Ot,Xt,"lic.edge"),o=pe(e,Ht,Gt,"lic.advect"),a=pe(e,$t,Yt,"lic.compose"),s=Te(e,i.attribs.get("a_position")??-1),c=Te(e,o.attribs.get("a_position")??-1),f=Te(e,a.attribs.get("a_position")??-1);let p=Ae(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT},{internalFormat:e.R8,format:e.RED,type:e.UNSIGNED_BYTE},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT}],depth:!0}),l=Ae(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE,mipmap:!0}],depth:!1}),u=Ae(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE}],depth:!1});const d=128,T=Nt(d,d,d,12345),L=e.createTexture();if(!L)throw new Error("createTexture failed for noiseTex");e.bindTexture(e.TEXTURE_3D,L),e.texImage3D(e.TEXTURE_3D,0,e.R8,d,d,d,0,e.RED,e.UNSIGNED_BYTE,T),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_R,e.REPEAT);function h(w,M,R,b,D){const v=w.uniforms.get(M);v&&(e.activeTexture(e.TEXTURE0+R),e.bindTexture(b,D),e.uniform1i(v,R))}function S(w,M,R,b,D){const v=e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);p.bind(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.enable(e.CULL_FACE),e.cullFace(e.BACK),e.useProgram(r.program),e.uniformMatrix4fv(r.uniforms.get("u_view"),!1,M),e.uniformMatrix4fv(r.uniforms.get("u_projection"),!1,R),e.uniform3fv(r.uniforms.get("u_meshBBMin"),w.meshBBMin),e.uniform3fv(r.uniforms.get("u_meshBBMax"),w.meshBBMax),e.uniform1f(r.uniforms.get("u_surfaceAmbient"),w.surfaceAmbient??.04),e.uniform1f(r.uniforms.get("u_surfaceDiffuse"),w.surfaceDiffuse??.75),e.uniform1f(r.uniforms.get("u_surfaceSpecular"),w.surfaceSpecular??.4),e.uniform1f(r.uniforms.get("u_surfaceShininess"),w.surfaceShininess??80),h(r,"u_noiseSampler",0,e.TEXTURE_3D,L),e.bindVertexArray(w.meshVAO),e.drawElements(e.TRIANGLES,w.meshIndexCount,w.meshIndexType,0),e.bindVertexArray(null),p.generateMipmaps(),l.bind(),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.useProgram(i.program),e.uniform2f(i.uniforms.get("u_viewportSize"),p.width,p.height),h(i,"u_depthSampler",0,e.TEXTURE_2D,p.depthTexture),e.bindVertexArray(s),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),l.generateMipmaps(),u.bind(),e.useProgram(o.program),e.uniform2f(o.uniforms.get("u_viewportSize"),p.width,p.height),e.uniform2f(o.uniforms.get("u_viewportScale"),1,1),e.uniform1f(o.uniforms.get("u_noiseRatio"),0),e.uniform1i(o.uniforms.get("u_numIter"),w.licIterations??50),h(o,"u_depthSampler",0,e.TEXTURE_2D,p.depthTexture),h(o,"u_noiseSampler",1,e.TEXTURE_2D,p.colorTextures[2]),h(o,"u_vecSampler",2,e.TEXTURE_2D,p.colorTextures[1]),h(o,"u_edgeSampler",3,e.TEXTURE_2D,l.colorTextures[0]),e.bindVertexArray(c),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.bindFramebuffer(e.FRAMEBUFFER,v),e.viewport(0,0,b,D),e.useProgram(a.program),e.uniform1i(a.uniforms.get("u_useHighContrast"),w.useHighContrast??!0?1:0),e.uniform1i(a.uniforms.get("u_showLIC"),w.showLIC??!0?1:0),e.uniform1i(a.uniforms.get("u_showColor"),w.showColor??!0?1:0),e.uniform1i(a.uniforms.get("u_emphasizeSingular"),w.emphasizeSingular??!1?1:0),h(a,"u_colorSampler",0,e.TEXTURE_2D,p.colorTextures[0]),h(a,"u_vecSampler",1,e.TEXTURE_2D,p.colorTextures[1]),h(a,"u_depthSampler",2,e.TEXTURE_2D,p.depthTexture),h(a,"u_edgeSampler",3,e.TEXTURE_2D,l.colorTextures[0]),h(a,"u_noiseSampler",4,e.TEXTURE_2D,p.colorTextures[2]),h(a,"u_advectSampler",5,e.TEXTURE_2D,u.colorTextures[0]),e.enable(e.DEPTH_TEST),e.bindVertexArray(f),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}function g(w,M){p.resize(w,M),l.resize(w,M),u.resize(w,M)}return{render:S,resize:g,transformAttribs:r.attribs,getTransformDepthTexture:()=>p.depthTexture,getColorTexture:()=>p.colorTextures[0],getVecTexture:()=>p.colorTextures[1],getNormalTexture:()=>p.colorTextures[3],getPosTexture:()=>p.colorTextures[4]}}const jt=`#version 300 es
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
`,Ve=`#version 300 es
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
`,Kt=`#version 300 es
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
`;async function Ce(e){const t=await fetch(e);if(!t.ok)throw new Error(`Fetch failed ${e}: ${t.status} ${t.statusText}`);return t.text()}function Qt(e){const t=H(1/0,1/0,1/0),n=H(-1/0,-1/0,-1/0),r=H(0,0,0),i=e.length/3;for(let a=0;a<i;a++){const s=e[a*3+0],c=e[a*3+1],f=e[a*3+2];s<t[0]&&(t[0]=s),s>n[0]&&(n[0]=s),c<t[1]&&(t[1]=c),c>n[1]&&(n[1]=c),f<t[2]&&(t[2]=f),f>n[2]&&(n[2]=f),r[0]+=s,r[1]+=c,r[2]+=f}He(r,r,1/i);let o=0;for(let a=0;a<i;a++){const s=e[a*3+0]-r[0],c=e[a*3+1]-r[1],f=e[a*3+2]-r[2];o=Math.max(o,s*s+c*c+f*f)}return{center:r,radius:Math.sqrt(o),bbMin:t,bbMax:n}}async function Jt(e){const t=ot(e),n=t.gl;if(!n.getExtension("EXT_color_buffer_float")){Se("Your browser does not support EXT_color_buffer_float; LIC requires it.");return}const r=Wt(n,t.width||1,t.height||1),i=pe(n,jt,Ve,"arrow"),o=pe(n,Kt,Ve,"arrow.curved"),a=at(),s=St();let c=null,f=null,p=null,l=null,u=null,d=null,T=null,L=null,h=null,S=null,g=null,w=null;function M(F){if(!c||!T||!f||!p||!l||!S)return;const A=2*F.arrowHeight*F.arrowScale*S.radius,N=.5*F.arrowWidth*F.arrowScale*S.radius;let B;if(F.arrowBorderMode&&L){const V=S.radius*F.arrowDensity,K=Math.max(V,A);B=Tt(c.vertices,T,f,p,l,K,.05,L)}else{const V=A*1.2,K=S.radius*F.arrowDensity,W=Math.max(K,Math.max(N*1.5,A*.4));B=gt(c.vertices,T,f,p,l,V,W,.05)}const O=Ct(B,A,1);if(g=wt(n,i,{positions:O.positions,directions:O.directions,normals:O.normals,colors:O.colors}),O.vertexIDs&&c&&T&&f&&p&&l){const V=yt(O.positions,Array.from(O.vertexIDs),c.vertices,T,f,p,l,Ye);w=vt(n,o,V)}else w=null}function R(F,A,N){const B=it(F),O=st(A),V=lt(N);if(O.length!==B.vertices.length/3)throw new Error(`Vertex count mismatch: mesh has ${B.vertices.length/3} vertices, labels has ${O.length}`);const K=B.vertices.length/3;let W=null;if(B.colors&&B.colors.length===K*3){W=new Uint8Array(K*4);for(let Q=0;Q<K;Q++)W[Q*4+0]=B.colors[Q*3+0],W[Q*4+1]=B.colors[Q*3+1],W[Q*4+2]=B.colors[Q*3+2],W[Q*4+3]=255}const de=ft(O,V),oe=!s.useLabelColors&&W?W:de,Z=ht(B.vertices,B.indices),ee=pt(B.indices,B.vertices.length/3),ae=At(O,ee),ie=mt({vertices:B.vertices,indices:B.indices,labels:O,labelOrder:V,adjacency:ee,normals:Z}),te=Qt(B.vertices),ne=r.transformAttribs,se=Ne(n,[{def:{name:"a_position",data:B.vertices,size:3,type:n.FLOAT,normalized:!1},location:ne.get("a_position")??-1},{def:{name:"a_normal",data:Z,size:3,type:n.FLOAT,normalized:!1},location:ne.get("a_normal")??-1},{def:{name:"a_color",data:oe,size:4,type:n.UNSIGNED_BYTE,normalized:!0},location:ne.get("a_color")??-1},{def:{name:"a_vector",data:ie,size:3,type:n.FLOAT,normalized:!1},location:ne.get("a_vector")??-1}],B.indices);c=B,f=ie,p=Z,l=oe,u=W,d=de,T=ee,L=ae,h=se,S=te,M(s),a.fitSphere(te.center,te.radius);const Y=y();Y?a.setLookAt(H(Y.eye[0],Y.eye[1],Y.eye[2]),H(Y.target[0],Y.target[1],Y.target[2]),H(Y.up[0],Y.up[1],Y.up[2])):v("lateral-left",te.center,te.radius),t.requestRender()}function b(F){if(!c||!f||!p)return;const A=F||!u?d:u;if(!A)return;const N=r.transformAttribs;h=Ne(n,[{def:{name:"a_position",data:c.vertices,size:3,type:n.FLOAT,normalized:!1},location:N.get("a_position")??-1},{def:{name:"a_normal",data:p,size:3,type:n.FLOAT,normalized:!1},location:N.get("a_normal")??-1},{def:{name:"a_color",data:A,size:4,type:n.UNSIGNED_BYTE,normalized:!0},location:N.get("a_color")??-1},{def:{name:"a_vector",data:f,size:3,type:n.FLOAT,normalized:!1},location:N.get("a_vector")??-1}],c.indices),l=A,M(s)}function D(F,A,N,B=2.5){const O=N*B;switch(F){case"lateral-left":return{eye:H(A[0]-O,A[1],A[2]),up:H(0,0,1)};case"lateral-right":return{eye:H(A[0]+O,A[1],A[2]),up:H(0,0,1)};case"anterior":return{eye:H(A[0],A[1]+O,A[2]),up:H(0,0,1)};case"posterior":return{eye:H(A[0],A[1]-O,A[2]),up:H(0,0,1)};case"dorsal":return{eye:H(A[0],A[1],A[2]+O),up:H(0,1,0)};case"ventral":return{eye:H(A[0],A[1],A[2]-O),up:H(0,1,0)}}}function v(F,A,N){const{eye:B,up:O}=D(F,A,N);a.setLookAt(B,A,O)}const x="di-camera-state-v1";function y(){try{const F=window.localStorage.getItem(x);if(!F)return null;const A=JSON.parse(F);return A&&Array.isArray(A.eye)&&Array.isArray(A.target)&&Array.isArray(A.up)?A:null}catch{return null}}let _=null;function I(){_!==null&&clearTimeout(_),_=window.setTimeout(()=>{_=null;try{window.localStorage.setItem(x,JSON.stringify(a.getViewState()))}catch{}},350)}const m=R;async function C(F){const[A,N,B]=await Promise.all([Ce(`/directionality-indicator-webgl/data/${F}.ply`),Ce(`/directionality-indicator-webgl/data/${F}.labels`),Ce(`/directionality-indicator-webgl/data/${F}.labelorder`)]);m(A,N,B),await ze({name:`${F}.ply`,plyText:A,labelsText:N,orderText:B})}const P=await xt();P?m(P.plyText,P.labelsText,P.orderText):await C("label18"),t.onResize(()=>{a.resize(t.width,t.height),r.resize(t.width,t.height),t.requestRender()}),a.attach(t.canvas,()=>{t.requestRender(),I()}),a.resize(t.width,t.height),r.resize(t.width,t.height);let U=s.useLabelColors;const{element:E}=Ut(s,(F,A)=>{F.useLabelColors!==U?(U=F.useLabelColors,b(F.useLabelColors)):A&&M(F),t.requestRender()},async({ply:F,labels:A,labelorder:N})=>{const[B,O,V]=await Promise.all([F.text(),A.text(),N.text()]);m(B,O,V),await ze({name:F.name,plyText:B,labelsText:O,orderText:V})},{current:()=>G(),canonical:()=>j()},{set:F=>{S&&(v(F,S.center,S.radius),I(),t.requestRender())}},C);e.appendChild(E);function k(F){if(n.clearColor(s.bgColorR,s.bgColorG,s.bgColorB,F),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),!h||!S||(r.render({meshVAO:h.vao,meshIndexCount:h.indexCount,meshIndexType:h.indexType,meshBBMin:S.bbMin,meshBBMax:S.bbMax,licIterations:s.licIterations,useHighContrast:s.licHighContrast,showLIC:s.showLIC,showColor:s.showColor,emphasizeSingular:s.licEmphasizeSingular,surfaceAmbient:s.surfaceAmbient,surfaceDiffuse:s.surfaceDiffuse,surfaceSpecular:s.surfaceSpecular,surfaceShininess:s.surfaceShininess},a.view,a.projection,t.width,t.height),!s.showArrows))return;const A=s.arrowCurved&&w!==null,N=A?o:i;!A&&!g||(n.disable(n.DEPTH_TEST),n.disable(n.CULL_FACE),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.useProgram(N.program),n.uniformMatrix4fv(N.uniforms.get("u_view"),!1,a.view),n.uniformMatrix4fv(N.uniforms.get("u_projection"),!1,a.projection),n.uniform1f(N.uniforms.get("u_arrowWidth"),s.arrowWidth),n.uniform1f(N.uniforms.get("u_arrowDist"),s.arrowDist),n.uniform1f(N.uniforms.get("u_arrowScale"),S.radius*s.arrowScale),n.uniform1f(N.uniforms.get("u_directionSign"),s.arrowFlipDirection?-1:1),n.uniform1f(N.uniforms.get("u_widthTails"),s.arrowBodyWidth),n.uniform4f(N.uniforms.get("u_arrowColor"),s.arrowColorR,s.arrowColorG,s.arrowColorB,1),n.uniform1f(N.uniforms.get("u_arrowOpacity"),s.arrowOpacity),A||n.uniform1f(N.uniforms.get("u_arrowHeight"),s.arrowHeight),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,r.getPosTexture()),n.uniform1i(N.uniforms.get("u_posSampler"),0),A&&w?w.draw():g&&g.draw(),n.disable(n.BLEND))}t.onRender(()=>k(1));const z=5e7;function X(F,A,N){const B=t.canvas,O=B.width,V=B.height;B.width=F,B.height=A,n.viewport(0,0,F,A),a.resize(F,A),r.resize(F,A);try{return N()}finally{B.width=O,B.height=V,n.viewport(0,0,O,V),a.resize(O,V),r.resize(O,V)}}function $(){const F=Math.max(.5,s.screenshotDPI/96);let A=Math.round(t.canvas.width*F),N=Math.round(t.canvas.height*F);if(A*N>z){const B=Math.sqrt(z/(A*N));A=Math.round(A*B),N=Math.round(N*B),console.warn(`Screenshot pixel cap: clamped ${s.screenshotDPI} DPI to ${Math.round(96*B*(s.screenshotDPI/96))} effective DPI to stay under 50 MP`)}return{w:A,h:N}}async function G(){if(!S)return;const{w:F,h:A}=$();await q(F,A,"directionality-current.png"),k(1)}async function q(F,A,N){let B="";X(F,A,()=>{k(0),B=t.canvas.toDataURL("image/png")}),await new Promise(O=>{const V=new Image;V.onload=async()=>{const K=document.createElement("canvas");K.width=V.width,K.height=V.height;const W=K.getContext("2d");if(!W){O();return}W.drawImage(V,0,0);const de=W.getImageData(0,0,V.width,V.height).data;let oe=V.width,Z=V.height,ee=-1,ae=-1;for(let Y=0;Y<V.height;Y++){const Q=Y*V.width*4;for(let J=0;J<V.width;J++)de[Q+J*4+3]>0&&(J<oe&&(oe=J),J>ee&&(ee=J),Y<Z&&(Z=Y),Y>ae&&(ae=Y))}if(ee<0){O();return}const ie=ee-oe+1,te=ae-Z+1,ne=document.createElement("canvas");ne.width=ie,ne.height=te;const se=ne.getContext("2d");if(!se){O();return}se.drawImage(K,oe,Z,ie,te,0,0,ie,te),await new Promise(Y=>{ne.toBlob(Q=>{if(Q){const J=URL.createObjectURL(Q),he=document.createElement("a");he.href=J,he.download=N,document.body.appendChild(he),he.click(),document.body.removeChild(he),URL.revokeObjectURL(J)}Y()},"image/png")}),O()},V.src=B})}async function j(){if(!S)return;const F=S.radius,A=S.center,N=["lateral-left","lateral-right","anterior","posterior","dorsal","ventral"],{w:B,h:O}=$();for(const K of N){const{eye:W,up:de}=D(K,A,F,3.2);a.setLookAt(W,A,de),await q(B,O,`directionality-${K}.png`)}const V=y();V?a.setLookAt(H(V.eye[0],V.eye[1],V.eye[2]),H(V.target[0],V.target[1],V.target[2]),H(V.up[0],V.up[1],V.up[2])):v("lateral-left",A,F),k(1)}t.requestRender()}const Oe=document.getElementById("app");Oe?Jt(Oe).catch(e=>{console.error(e),Se(e instanceof Error?e.message:String(e))}):Se("Internal error: #app container missing");
//# sourceMappingURL=index-CIQ4Tq6t.js.map
