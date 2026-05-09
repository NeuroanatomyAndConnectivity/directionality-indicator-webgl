(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();var ve=1e-6,ie=typeof Float32Array<"u"?Float32Array:Array;function We(){var e=new ie(9);return ie!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function je(e,t,n,r,i,o,a,s,c){var f=new ie(9);return f[0]=e,f[1]=t,f[2]=n,f[3]=r,f[4]=i,f[5]=o,f[6]=a,f[7]=s,f[8]=c,f}function Pe(){var e=new ie(16);return ie!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function Ke(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Qe(e,t,n,r,i){var o=1/Math.tan(t/2);if(e[0]=o/n,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=o,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,i!=null&&i!==1/0){var a=1/(r-i);e[10]=(i+r)*a,e[14]=2*i*r*a}else e[10]=-1,e[14]=-2*r;return e}var Je=Qe;function Ze(e,t,n,r){var i,o,a,s,c,f,h,l,d,u,A=t[0],L=t[1],p=t[2],F=r[0],C=r[1],m=r[2],k=n[0],S=n[1],_=n[2];return Math.abs(A-k)<ve&&Math.abs(L-S)<ve&&Math.abs(p-_)<ve?Ke(e):(h=A-k,l=L-S,d=p-_,u=1/Math.sqrt(h*h+l*l+d*d),h*=u,l*=u,d*=u,i=C*d-m*l,o=m*h-F*d,a=F*l-C*h,u=Math.sqrt(i*i+o*o+a*a),u?(u=1/u,i*=u,o*=u,a*=u):(i=0,o=0,a=0),s=l*a-d*o,c=d*i-h*a,f=h*o-l*i,u=Math.sqrt(s*s+c*c+f*f),u?(u=1/u,s*=u,c*=u,f*=u):(s=0,c=0,f=0),e[0]=i,e[1]=s,e[2]=h,e[3]=0,e[4]=o,e[5]=c,e[6]=l,e[7]=0,e[8]=a,e[9]=f,e[10]=d,e[11]=0,e[12]=-(i*A+o*L+a*p),e[13]=-(s*A+c*L+f*p),e[14]=-(h*A+l*L+d*p),e[15]=1,e)}function de(){var e=new ie(3);return ie!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function $e(e){var t=e[0],n=e[1],r=e[2];return Math.sqrt(t*t+n*n+r*r)}function q(e,t,n){var r=new ie(3);return r[0]=e,r[1]=t,r[2]=n,r}function Me(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function Ne(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e}function et(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e}function Xe(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function ye(e,t){var n=t[0],r=t[1],i=t[2],o=n*n+r*r+i*i;return o>0&&(o=1/Math.sqrt(o)),e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e}function tt(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function me(e,t,n){var r=t[0],i=t[1],o=t[2],a=n[0],s=n[1],c=n[2];return e[0]=i*c-o*s,e[1]=o*a-r*c,e[2]=r*s-i*a,e}function le(e,t,n){var r=n[0],i=n[1],o=n[2],a=n[3],s=t[0],c=t[1],f=t[2],h=i*f-o*c,l=o*s-r*f,d=r*c-i*s;return h=h+h,l=l+l,d=d+d,e[0]=s+a*h+i*d-o*l,e[1]=c+a*l+o*h-r*d,e[2]=f+a*d+r*l-i*h,e}var nt=$e;(function(){var e=de();return function(t,n,r,i,o,a){var s,c;for(n||(n=3),r||(r=0),i?c=Math.min(i*n+r,t.length):c=t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],o(e,e,a),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2];return t}})();function rt(){var e=new ie(4);return ie!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function ot(e,t){var n=t[0],r=t[1],i=t[2],o=t[3],a=n*n+r*r+i*i+o*o;return a>0&&(a=1/Math.sqrt(a)),e[0]=n*a,e[1]=r*a,e[2]=i*a,e[3]=o*a,e}(function(){var e=rt();return function(t,n,r,i,o,a){var s,c;for(n||(n=4),r||(r=0),i?c=Math.min(i*n+r,t.length):c=t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],e[3]=t[s+3],o(e,e,a),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2],t[s+3]=e[3];return t}})();function we(){var e=new ie(4);return ie!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function Se(e,t,n){n=n*.5;var r=Math.sin(n);return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=Math.cos(n),e}function Be(e,t,n){var r=t[0],i=t[1],o=t[2],a=t[3],s=n[0],c=n[1],f=n[2],h=n[3];return e[0]=r*h+a*s+i*f-o*c,e[1]=i*h+a*c+o*s-r*f,e[2]=o*h+a*f+r*c-i*s,e[3]=a*h-r*s-i*c-o*f,e}function xe(e,t,n,r){var i=t[0],o=t[1],a=t[2],s=t[3],c=n[0],f=n[1],h=n[2],l=n[3],d,u,A,L,p;return u=i*c+o*f+a*h+s*l,u<0&&(u=-u,c=-c,f=-f,h=-h,l=-l),1-u>ve?(d=Math.acos(u),A=Math.sin(d),L=Math.sin((1-r)*d)/A,p=Math.sin(r*d)/A):(L=1-r,p=r),e[0]=L*i+p*c,e[1]=L*o+p*f,e[2]=L*a+p*h,e[3]=L*s+p*l,e}function Ge(e,t){var n=t[0]+t[4]+t[8],r;if(n>0)r=Math.sqrt(n+1),e[3]=.5*r,r=.5/r,e[0]=(t[5]-t[7])*r,e[1]=(t[6]-t[2])*r,e[2]=(t[1]-t[3])*r;else{var i=0;t[4]>t[0]&&(i=1),t[8]>t[i*3+i]&&(i=2);var o=(i+1)%3,a=(i+2)%3;r=Math.sqrt(t[i*3+i]-t[o*3+o]-t[a*3+a]+1),e[i]=.5*r,r=.5/r,e[3]=(t[o*3+a]-t[a*3+o])*r,e[o]=(t[o*3+i]+t[i*3+o])*r,e[a]=(t[a*3+i]+t[i*3+a])*r}return e}var _e=ot;(function(){var e=de(),t=q(1,0,0),n=q(0,1,0);return function(r,i,o){var a=tt(i,o);return a<-.999999?(me(e,t,i),nt(e)<1e-6&&me(e,n,i),ye(e,e),Se(r,e,Math.PI),r):a>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(me(e,i,o),r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=1+a,_e(r,r))}})();(function(){var e=we(),t=we();return function(n,r,i,o,a,s){return xe(e,r,a,s),xe(t,i,o,s),xe(n,e,t,2*s*(1-s)),n}})();(function(){var e=We();return function(t,n,r,i){return e[0]=r[0],e[3]=r[1],e[6]=r[2],e[1]=i[0],e[4]=i[1],e[7]=i[2],e[2]=-n[0],e[5]=-n[1],e[8]=-n[2],_e(t,Ge(t,e))}})();function at(e){const t=document.createElement("canvas");e.appendChild(t);const n=t.getContext("webgl2",{antialias:!0,depth:!0,alpha:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0});if(!n)throw new Error("WebGL2 not supported in this browser");const r=n;let i=()=>{},o=()=>{},a=!0;const s={canvas:t,gl:r,get width(){return t.width},get height(){return t.height},requestRender(){a=!0},onRender(h){i=h},onResize(h){o=h}};function c(){const h=Math.min(window.devicePixelRatio,2),l=Math.floor(e.clientWidth*h),d=Math.floor(e.clientHeight*h);(t.width!==l||t.height!==d)&&(t.width=l,t.height=d,r.viewport(0,0,l,d),o(),a=!0)}function f(){c(),a&&(a=!1,i()),requestAnimationFrame(f)}return requestAnimationFrame(f),window.addEventListener("resize",c),s}function Re(e){const t=document.getElementById("banner");t&&(t.textContent=e,t.style.display="block")}function it(){const e=Pe(),t=Pe(),n=we(),r=q(0,0,0);let i=3,o=.01,a=1e3,s=1;function c(){const l=q(0,0,i);le(l,l,n);const d=de();Ne(d,r,l);const u=q(0,1,0);le(u,u,n),Ze(e,d,r,u)}function f(){const l=Math.PI/4,d=Math.max(.001,i*.01),u=Math.max(1e3,i*100);Je(t,l,s,d,u)}function h(l,d){const u=q(1,0,0);le(u,u,n);const A=q(0,1,0);le(A,A,n);const L=we();Se(L,u,d);const p=we();Se(p,A,l),Be(n,p,n),Be(n,L,n),_e(n,n)}return c(),f(),{view:e,projection:t,attach(l,d){let u=!1,A=0,L=0;l.addEventListener("pointerdown",p=>{u=!0,A=p.clientX,L=p.clientY,l.setPointerCapture(p.pointerId)}),l.addEventListener("pointermove",p=>{if(!u)return;const F=p.clientX-A,C=p.clientY-L;if(A=p.clientX,L=p.clientY,p.shiftKey){const m=2*i*.4142/Math.max(l.clientHeight,1),k=q(1,0,0);le(k,k,n);const S=q(0,1,0);le(S,S,n),r[0]+=(-F*k[0]+C*S[0])*m,r[1]+=(-F*k[1]+C*S[1])*m,r[2]+=(-F*k[2]+C*S[2])*m}else{const m=2*Math.PI/Math.max(l.clientWidth,1);h(-F*m,-C*m)}c(),f(),d()}),l.addEventListener("pointerup",p=>{u=!1,l.releasePointerCapture(p.pointerId)}),l.addEventListener("pointercancel",p=>{u=!1,l.releasePointerCapture(p.pointerId)}),l.addEventListener("wheel",p=>{p.preventDefault(),i*=Math.exp(p.deltaY*.001),i=Math.max(o,Math.min(a,i)),c(),f(),d()},{passive:!1})},fitSphere(l,d){Me(r,l);const u=Math.max(d,.001);i=u*2.5,o=u*.05,a=u*30,c(),f()},getViewState(){const l=q(0,0,i);le(l,l,n);const d=de();Ne(d,r,l);const u=q(0,1,0);return le(u,u,n),{eye:[d[0],d[1],d[2]],target:[r[0],r[1],r[2]],up:[u[0],u[1],u[2]]}},setLookAt(l,d,u){Me(r,d);const A=de();et(A,l,r);const L=$e(A);if(L<1e-6)return;i=L;const p=de();Xe(p,A,1/L);const F=de();ye(F,u);const C=de();me(C,F,p),ye(C,C),me(F,p,C),ye(F,F);const m=je(C[0],C[1],C[2],F[0],F[1],F[2],p[0],p[1],p[2]);Ge(n,m),_e(n,n),c(),f()},resize(l,d){s=l/Math.max(1,d),f()}}}function ke(e,t,n,r){const i=e.createShader(t);if(!i)throw new Error(`createShader failed for ${r}`);if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){const o=e.getShaderInfoLog(i)??"(no log)";throw e.deleteShader(i),new Error(`Shader compile failed [${r}]:
${o}`)}return i}function he(e,t,n,r){const i=ke(e,e.VERTEX_SHADER,t,`${r}.vert`),o=ke(e,e.FRAGMENT_SHADER,n,`${r}.frag`),a=e.createProgram();if(!a)throw new Error(`createProgram failed for ${r}`);if(e.attachShader(a,i),e.attachShader(a,o),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){const l=e.getProgramInfoLog(a)??"(no log)";throw e.deleteProgram(a),new Error(`Program link failed [${r}]:
${l}`)}const s=new Map,c=e.getProgramParameter(a,e.ACTIVE_UNIFORMS);for(let l=0;l<c;l++){const d=e.getActiveUniform(a,l);if(!d)continue;const u=e.getUniformLocation(a,d.name);u&&s.set(d.name,u)}const f=new Map,h=e.getProgramParameter(a,e.ACTIVE_ATTRIBUTES);for(let l=0;l<h;l++){const d=e.getActiveAttrib(a,l);d&&f.set(d.name,e.getAttribLocation(a,d.name))}return{program:a,uniforms:s,attribs:f}}function Ue(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed");e.bindVertexArray(r);for(const{def:o,location:a}of t){if(a<0)continue;const s=e.createBuffer();if(!s)throw new Error(`createBuffer failed for ${o.name}`);e.bindBuffer(e.ARRAY_BUFFER,s),e.bufferData(e.ARRAY_BUFFER,o.data,e.STATIC_DRAW),e.enableVertexAttribArray(a),e.vertexAttribPointer(a,o.size,o.type,o.normalized,0,0)}const i=e.createBuffer();if(!i)throw new Error("createBuffer failed for EBO");return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,i),e.bufferData(e.ELEMENT_ARRAY_BUFFER,n,e.STATIC_DRAW),e.bindVertexArray(null),{vao:r,ebo:i,indexCount:n.length,indexType:n instanceof Uint32Array?e.UNSIGNED_INT:e.UNSIGNED_SHORT}}function st(e){const t=e.split(/\r?\n/);if(t[0]!=="ply")throw new Error("Not a PLY file (missing 'ply' magic)");if(!t[1]||!t[1].startsWith("format ascii"))throw new Error("Only ASCII PLY is supported in M1");const n=[];let r=2;for(;r<t.length;){const d=t[r].trim();if(d==="end_header"){r++;break}if(d.startsWith("comment")||d===""){r++;continue}if(d.startsWith("element ")){const[,u,A]=d.split(/\s+/);n.push({name:u,count:parseInt(A,10),properties:[]})}else if(d.startsWith("property ")){const u=d.split(/\s+/);u[1]==="list"?n[n.length-1].properties.push({type:"list",countType:u[2],itemType:u[3],name:u[4]}):n[n.length-1].properties.push({type:u[1],name:u[2]})}r++}const i=n.find(d=>d.name==="vertex"),o=n.find(d=>d.name==="face");if(!i)throw new Error("PLY: no vertex element");if(!o)throw new Error("PLY: no face element");const a=new Float32Array(i.count*3),s=i.properties.findIndex(d=>d.name==="x"),c=i.properties.findIndex(d=>d.name==="red"),h=c>=0?new Uint8Array(i.count*3):null;for(let d=0;d<i.count;d++,r++){const u=t[r].trim().split(/\s+/);a[d*3+0]=parseFloat(u[s+0]),a[d*3+1]=parseFloat(u[s+1]),a[d*3+2]=parseFloat(u[s+2]),h&&(h[d*3+0]=parseInt(u[c+0],10),h[d*3+1]=parseInt(u[c+1],10),h[d*3+2]=parseInt(u[c+2],10))}const l=[];for(let d=0;d<o.count;d++,r++){const u=t[r].trim().split(/\s+/),A=parseInt(u[0],10);if(A!==3)throw new Error(`PLY: only triangle faces supported (got ${A}-gon at face ${d})`);l.push(parseInt(u[1],10),parseInt(u[2],10),parseInt(u[3],10))}return{vertices:a,normals:null,colors:h,indices:new Uint32Array(l)}}function ct(e){return Ye(e)}function Ye(e){const t=e.split(/[,\s]+/).filter(r=>r.length>0),n=new Int32Array(t.length);for(let r=0;r<t.length;r++){const i=parseInt(t[r],10);if(Number.isNaN(i))throw new Error(`labels: non-integer token at index ${r}: "${t[r]}"`);n[r]=i}return n}const lt=Ye;function dt(e){return lt(e)}function ut(e,t,n){const r=Math.floor(e*6),i=e*6-r,o=n*(1-t),a=n*(1-i*t),s=n*(1-(1-i)*t);let c=0,f=0,h=0;switch(r%6){case 0:c=n,f=s,h=o;break;case 1:c=a,f=n,h=o;break;case 2:c=o,f=n,h=s;break;case 3:c=o,f=a,h=n;break;case 4:c=s,f=o,h=n;break;case 5:c=n,f=o,h=a;break}return[Math.round(c*255),Math.round(f*255),Math.round(h*255)]}function ft(e){const t=new Map,n=e.length;for(let r=0;r<n;r++){const i=e[r],[o,a,s]=ut(r/n,.6,.95);t.set(i,[o,a,s,255])}return t}function ht(e,t){const n=ft(t),r=new Uint8Array(e.length*4),i=[128,128,128,255];for(let o=0;o<e.length;o++){const a=n.get(e[o])??i;r[o*4+0]=a[0],r[o*4+1]=a[1],r[o*4+2]=a[2],r[o*4+3]=a[3]}return r}function pt(e,t){const n=new Array(t);for(let o=0;o<t;o++)n[o]=new Set;const r=e.length/3;for(let o=0;o<r;o++){const a=e[o*3+0],s=e[o*3+1],c=e[o*3+2];n[a].add(s),n[a].add(c),n[s].add(a),n[s].add(c),n[c].add(a),n[c].add(s)}const i=n.map(o=>Array.from(o));return{vertexCount:t,neighbours(o){return i[o]??[]}}}function mt(e,t){const n=e.length/3,r=new Float32Array(n*3),i=t.length/3;for(let o=0;o<i;o++){const a=t[o*3+0],s=t[o*3+1],c=t[o*3+2],f=e[a*3+0],h=e[a*3+1],l=e[a*3+2],d=e[s*3+0],u=e[s*3+1],A=e[s*3+2],L=e[c*3+0],p=e[c*3+1],F=e[c*3+2],C=d-f,m=u-h,k=A-l,S=L-f,_=p-h,M=F-l,y=m*M-k*_,E=k*S-C*M,I=C*_-m*S;r[a*3+0]+=y,r[a*3+1]+=E,r[a*3+2]+=I,r[s*3+0]+=y,r[s*3+1]+=E,r[s*3+2]+=I,r[c*3+0]+=y,r[c*3+1]+=E,r[c*3+2]+=I}for(let o=0;o<n;o++){const a=r[o*3+0],s=r[o*3+1],c=r[o*3+2],f=Math.sqrt(a*a+s*s+c*c);f>0&&(r[o*3+0]=a/f,r[o*3+1]=s/f,r[o*3+2]=c/f)}return r}function wt(e){const{vertices:t,labels:n,labelOrder:r,adjacency:i,normals:o}=e,a=i.vertexCount,s=new Float32Array(a*3),c=new Uint8Array(a),f=new Int32Array(a).fill(-1),h=[];for(let p=0;p<a;p++){if(c[p])continue;const F=n[p],C=h.length;h.push(F);const m=[p];for(c[p]=1;m.length>0;){const k=m.shift();f[k]=C;const S=i.neighbours(k);for(let _=0;_<S.length;_++){const M=S[_];!c[M]&&n[M]===F&&(c[M]=1,m.push(M))}}}const l=new Map;for(let p=0;p<r.length;p++)l.set(r[p],p);const d=new Uint8Array(a);for(let p=0;p<a;p++)l.has(n[p])||(d[p]=1);const u=new Uint8Array(a);for(let p=0;p<a;p++)d[p]&&(u[p]=1);const A=-1;for(let p=0;p<a;p++){if(d[p])continue;const F=t[p*3+0],C=t[p*3+1],m=t[p*3+2],k=f[p],S=n[p],_=l.get(S);let M=0,y=0,E=0,I=0;const N=i.neighbours(p);for(let B=0;B<N.length;B++){const w=N[B];if(d[w])continue;const V=f[w];if(V===k)continue;const H=h[V],X=l.get(H);if(X===void 0)continue;const G=(_>X?-1:1)*A,j=t[w*3+0],P=t[w*3+1],z=t[w*3+2];let $=j-F,U=P-C,Y=z-m;const v=Math.sqrt($*$+U*U+Y*Y);v<1e-9||($=$/v*G,U=U/v*G,Y=Y/v*G,M+=$,y+=U,E+=Y,I++)}I>0&&(s[p*3+0]=M/I,s[p*3+1]=y/I,s[p*3+2]=E/I,u[p]=1)}const L=200;for(let p=0;p<L;p++){let F=!1,C=!0;const m=new Uint8Array(u),k=new Float32Array(s);for(let S=0;S<a;S++){if(u[S])continue;C=!1;const _=i.neighbours(S);let M=0,y=0;for(let X=0;X<_.length;X++){const D=_[X];if(D===S||d[D]||!m[D])continue;M++;const G=t[D*3+0]-t[S*3+0],j=t[D*3+1]-t[S*3+1],P=t[D*3+2]-t[S*3+2],z=Math.sqrt(G*G+j*j+P*P);z>y&&(y=z)}if(M<2)continue;const E=o[S*3+0],I=o[S*3+1],N=o[S*3+2];let B=0,w=0,V=0,H=0;for(let X=0;X<_.length;X++){const D=_[X];if(D===S||d[D]||!m[D])continue;const G=t[D*3+0]-t[S*3+0],j=t[D*3+1]-t[S*3+1],P=t[D*3+2]-t[S*3+2],z=Math.sqrt(G*G+j*j+P*P);let $=k[D*3+0],U=k[D*3+1],Y=k[D*3+2];const v=Math.sqrt($*$+U*U+Y*Y);let b=0,x=0,g=0;if(v>.001){const R=$/v,K=U/v,O=Y/v;if(Math.abs(R*E+K*I+O*N)<.98){const W=I*O-N*K,ee=N*R-E*O,Z=E*K-I*R,te=Math.sqrt(W*W+ee*ee+Z*Z);if(te>1e-9){const se=W/te,oe=ee/te,ae=Z/te;let ce=oe*N-ae*I,J=ae*E-se*N,ne=se*I-oe*E;const re=Math.sqrt(ce*ce+J*J+ne*ne);re>1e-9&&(ce/=re,J/=re,ne/=re,b=ce*v,x=J*v,g=ne*v)}}}const T=z/y;B+=T*b,w+=T*x,V+=T*g,H+=T}H>0&&(s[S*3+0]=B/H,s[S*3+1]=w/H,s[S*3+2]=V/H,u[S]=1,F=!0)}if(C||!F)break}return s}function vt(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed for arrow");e.bindVertexArray(r);const i=t.attribs.get("a_corner")??-1;if(i<0)throw new Error("arrow vertex shader missing attribute a_corner");const o=e.createBuffer();if(!o)throw new Error("createBuffer failed for a_corner");e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0);function a(c,f,h,l,d){const u=t.attribs.get(c)??-1;if(u<0)throw new Error(`arrow shader missing attribute ${c}`);const A=e.createBuffer();if(!A)throw new Error(`createBuffer failed for ${c}`);e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW),e.enableVertexAttribArray(u),e.vertexAttribPointer(u,h,l,d,0,0),e.vertexAttribDivisor(u,1)}a("a_instance_position",n.positions,3,e.FLOAT,!1),a("a_instance_direction",n.directions,3,e.FLOAT,!1),a("a_instance_normal",n.normals,3,e.FLOAT,!1),a("a_instance_color",n.colors,4,e.UNSIGNED_BYTE,!0),e.bindVertexArray(null);const s=n.positions.length/3;return{vao:r,instanceCount:s,draw(){e.bindVertexArray(r),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,s),e.bindVertexArray(null)}}}function yt(e,t,n){const r=e.createVertexArray();if(!r)throw new Error("createVertexArray failed for curved arrow");e.bindVertexArray(r);function i(c,f,h,l,d){const u=t.attribs.get(c)??-1;if(u<0)throw new Error(`curved-arrow shader missing attribute ${c}`);const A=e.createBuffer();if(!A)throw new Error(`createBuffer failed for ${c}`);e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW),e.enableVertexAttribArray(u),e.vertexAttribPointer(u,h,l,d,0,0)}i("a_position",n.positions,3,e.FLOAT,!1),i("a_tangent",n.tangents,3,e.FLOAT,!1),i("a_normal",n.normals,3,e.FLOAT,!1),i("a_color",n.colors,4,e.UNSIGNED_BYTE,!0),i("a_stripY",n.stripY,1,e.FLOAT,!1),i("a_stripSide",n.stripSide,1,e.FLOAT,!1),e.bindVertexArray(null);const o=new Int32Array(n.firstIndices),a=new Int32Array(n.counts),s=o.length;return{vao:r,firstIndices:o,counts:a,draw(){e.bindVertexArray(r);for(let c=0;c<s;c++)e.drawArrays(e.TRIANGLE_STRIP,o[c],a[c]);e.bindVertexArray(null)}}}const qe=8;function ze(e,t,n,r,i){const o=t*i[e*3],a=t*i[e*3+1],s=t*i[e*3+2],c=Math.sqrt(o*o+a*a+s*s);if(c<1e-6)return null;const f=o/c,h=a/c,l=s/c,d=r.neighbours(e);let u=-1,A=.3,L=0;for(let p=0;p<d.length;p++){const F=d[p],C=n[F*3]-n[e*3],m=n[F*3+1]-n[e*3+1],k=n[F*3+2]-n[e*3+2],S=Math.sqrt(C*C+m*m+k*k);if(S<1e-6)continue;const _=(C*f+m*h+k*l)/S;_>A&&(A=_,u=F,L=S)}return u===-1?null:{next:u,edgeLen:L}}function bt(e,t,n,r,i,o,a,s=qe){const c=t.length;if(e.length!==c*3)throw new Error(`buildCurvedArrowBuffers: anchors.length (${e.length}) does not match anchorAdjacencyIndices.length*3 (${c*3})`);const f=2*s+1,h=2*f,l=c*h,d=new Float32Array(l*3),u=new Float32Array(l*3),A=new Float32Array(l*3),L=new Uint8Array(l*4),p=new Float32Array(l),F=new Float32Array(l),C=new Int32Array(c),m=new Int32Array(c),k=new Int32Array(f),S=new Float32Array(f*3),_=new Float32Array(f*3),M=new Float32Array(f*3),y=new Uint8Array(f*4);for(let E=0;E<c;E++){const I=t[E];for(let w=0;w<f;w++)k[w]=I;let N=I;for(let w=0;w<s;w++){const V=ze(N,-1,n,r,i);if(!V)break;N=V.next,k[s-1-w]=N}k[s]=I,N=I;for(let w=0;w<s;w++){const V=ze(N,1,n,r,i);if(!V)break;N=V.next,k[s+1+w]=N}for(let w=0;w<f;w++){const V=k[w];w===s?(S[w*3+0]=e[E*3+0],S[w*3+1]=e[E*3+1],S[w*3+2]=e[E*3+2]):(S[w*3+0]=n[V*3+0],S[w*3+1]=n[V*3+1],S[w*3+2]=n[V*3+2]);const H=i[V*3+0],X=i[V*3+1],D=i[V*3+2],G=Math.sqrt(H*H+X*X+D*D)||1;_[w*3+0]=H/G,_[w*3+1]=X/G,_[w*3+2]=D/G;const j=o[V*3+0],P=o[V*3+1],z=o[V*3+2],$=Math.sqrt(j*j+P*P+z*z)||1;M[w*3+0]=j/$,M[w*3+1]=P/$,M[w*3+2]=z/$,y[w*4+0]=a[V*4+0],y[w*4+1]=a[V*4+1],y[w*4+2]=a[V*4+2],y[w*4+3]=255}const B=E*h;C[E]=B,m[E]=h;for(let w=0;w<f;w++){const H=2*(w/(f-1))-1;for(let X=0;X<2;X++){const D=B+w*2+X;d[D*3+0]=S[w*3+0],d[D*3+1]=S[w*3+1],d[D*3+2]=S[w*3+2],u[D*3+0]=_[w*3+0],u[D*3+1]=_[w*3+1],u[D*3+2]=_[w*3+2],A[D*3+0]=M[w*3+0],A[D*3+1]=M[w*3+1],A[D*3+2]=M[w*3+2],L[D*4+0]=y[w*4+0],L[D*4+1]=y[w*4+1],L[D*4+2]=y[w*4+2],L[D*4+3]=y[w*4+3],p[D]=H,F[D]=X===0?-1:1}}}return{positions:d,tangents:u,normals:A,colors:L,stripY:p,stripSide:F,firstIndices:C,counts:m}}const _t="di-cache",ue="datasets",xt=1,Fe="current";function Le(){return new Promise(e=>{if(typeof indexedDB>"u"){e(null);return}let t;try{t=indexedDB.open(_t,xt)}catch(n){console.warn("[datasetCache] indexedDB.open threw:",n),e(null);return}t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(ue)||n.createObjectStore(ue)},t.onsuccess=()=>e(t.result),t.onerror=()=>{console.warn("[datasetCache] failed to open DB:",t.error),e(null)},t.onblocked=()=>{console.warn("[datasetCache] open blocked by another connection"),e(null)}})}async function Ve(e){const t=await Le();if(t)try{await new Promise(n=>{const r=t.transaction(ue,"readwrite"),i=r.objectStore(ue),o={...e,savedAt:Date.now()},a=i.put(o,Fe);a.onerror=()=>{console.warn("[datasetCache] put failed:",a.error)},r.oncomplete=()=>n(),r.onerror=()=>{console.warn("[datasetCache] save tx error:",r.error),n()},r.onabort=()=>{console.warn("[datasetCache] save tx aborted:",r.error),n()}})}catch(n){console.warn("[datasetCache] saveDataset threw:",n)}finally{t.close()}}async function Et(){const e=await Le();if(!e)return null;try{return await new Promise(t=>{const n=e.transaction(ue,"readonly"),i=n.objectStore(ue).get(Fe);i.onsuccess=()=>{const o=i.result;if(!o){t(null);return}typeof o.name=="string"&&typeof o.plyText=="string"&&typeof o.labelsText=="string"&&typeof o.orderText=="string"&&typeof o.savedAt=="number"?t(o):(console.warn("[datasetCache] cached record has unexpected shape; ignoring"),t(null))},i.onerror=()=>{console.warn("[datasetCache] get failed:",i.error),t(null)},n.onerror=()=>{console.warn("[datasetCache] load tx error:",n.error),t(null)},n.onabort=()=>{console.warn("[datasetCache] load tx aborted:",n.error),t(null)}})}catch(t){return console.warn("[datasetCache] loadCachedDataset threw:",t),null}finally{e.close()}}async function At(){const e=await Le();if(e)try{await new Promise(t=>{const n=e.transaction(ue,"readwrite"),i=n.objectStore(ue).delete(Fe);i.onerror=()=>{console.warn("[datasetCache] delete failed:",i.error)},n.oncomplete=()=>t(),n.onerror=()=>{console.warn("[datasetCache] clear tx error:",n.error),t()},n.onabort=()=>{console.warn("[datasetCache] clear tx aborted:",n.error),t()}})}catch(t){console.warn("[datasetCache] clearDataset threw:",t)}finally{e.close()}}function gt(e,t){const n=e.length,r=new Uint8Array(n);for(let i=0;i<n;i++){const o=e[i],a=t.neighbours(i);for(let s=0;s<a.length;s++)if(e[a[s]]!==o){r[i]=1;break}}return r}function Tt(e,t,n,r,i,o,a=.05,s){const c=t.vertexCount,f=a*a,h=new Int32Array(c);for(let _=0;_<c;_++)h[_]=_;let l=3737844653;const d=()=>(l=l*1664525+1013904223>>>0,(l&4294967295)/4294967295);for(let _=c-1;_>0;_--){const M=Math.floor(d()*(_+1)),y=h[_];h[_]=h[M],h[M]=y}const u=new Uint8Array(c),A=new Float32Array(c),L=[];for(let _=0;_<c;_++){const M=h[_];if(u[M]||s&&!s[M])continue;const y=n[M*3],E=n[M*3+1],I=n[M*3+2];if(y*y+E*E+I*I<f)continue;L.push(M),A.fill(1/0),A[M]=0,u[M]=1;const N=[{d:0,u:M}];for(;N.length>0;){let B=0;for(let D=1;D<N.length;D++)N[D].d<N[B].d&&(B=D);const w=N[B];N[B]=N[N.length-1],N.pop();const V=w.d,H=w.u;if(V>A[H])continue;if(V>o)break;u[H]=1;const X=t.neighbours(H);for(let D=0;D<X.length;D++){const G=X[D],j=e[G*3]-e[H*3],P=e[G*3+1]-e[H*3+1],z=e[G*3+2]-e[H*3+2],$=Math.sqrt(j*j+P*P+z*z),U=V+$;U<A[G]&&U<=o&&(A[G]=U,N.push({d:U,u:G}))}}}const p=L.length,F=new Float32Array(p*3),C=new Float32Array(p*3),m=new Float32Array(p*3),k=new Uint8Array(p*4),S=new Int32Array(p);for(let _=0;_<p;_++){const M=L[_];S[_]=M,F[_*3+0]=e[M*3+0],F[_*3+1]=e[M*3+1],F[_*3+2]=e[M*3+2];const y=n[M*3],E=n[M*3+1],I=n[M*3+2],N=Math.sqrt(y*y+E*E+I*I)||1;C[_*3+0]=y/N,C[_*3+1]=E/N,C[_*3+2]=I/N,m[_*3+0]=r[M*3],m[_*3+1]=r[M*3+1],m[_*3+2]=r[M*3+2],k[_*4+0]=i[M*4],k[_*4+1]=i[M*4+1],k[_*4+2]=i[M*4+2],k[_*4+3]=255}return{positions:F,directions:C,normals:m,colors:k,vertexIDs:S}}function Ct(e,t,n=.8){const r=e.positions.length/3;if(r===0)return e;const i=(t*n)**2,o=t*n,a=new Map,s=new Uint8Array(r),c=new Float32Array(r),f=new Float32Array(r),h=new Float32Array(r);for(let m=0;m<r;m++)c[m]=e.positions[m*3],f[m]=e.positions[m*3+1],h[m]=e.positions[m*3+2];for(let m=0;m<r;m++){const k=Math.floor(c[m]/o),S=Math.floor(f[m]/o),_=Math.floor(h[m]/o);let M=!1;e:for(let y=-1;y<=1;y++)for(let E=-1;E<=1;E++)for(let I=-1;I<=1;I++){const N=`${k+I},${S+E},${_+y}`,B=a.get(N);if(B)for(let w=0;w<B.length;w++){const V=B[w],H=c[V]-c[m],X=f[V]-f[m],D=h[V]-h[m];if(H*H+X*X+D*D<i){M=!0;break e}}}if(!M){s[m]=1;const y=`${k},${S},${_}`,E=a.get(y);E?E.push(m):a.set(y,[m])}}let l=0;for(let m=0;m<r;m++)s[m]&&l++;const d=new Float32Array(l*3),u=new Float32Array(l*3),A=new Float32Array(l*3),L=new Uint8Array(l*4),p=e.vertexIDs??null,F=p?new Int32Array(l):null;let C=0;for(let m=0;m<r;m++)s[m]&&(d[C*3+0]=e.positions[m*3+0],d[C*3+1]=e.positions[m*3+1],d[C*3+2]=e.positions[m*3+2],u[C*3+0]=e.directions[m*3+0],u[C*3+1]=e.directions[m*3+1],u[C*3+2]=e.directions[m*3+2],A[C*3+0]=e.normals[m*3+0],A[C*3+1]=e.normals[m*3+1],A[C*3+2]=e.normals[m*3+2],L[C*4+0]=e.colors[m*4+0],L[C*4+1]=e.colors[m*4+1],L[C*4+2]=e.colors[m*4+2],L[C*4+3]=e.colors[m*4+3],F&&p&&(F[C]=p[m]),C++);return{positions:d,directions:u,normals:A,colors:L,vertexIDs:F}}function St(e,t,n,r,i,o,a,s=.05){const c=t.vertexCount,f=s*s,h=new Int32Array(c);for(let y=0;y<c;y++)h[y]=y;let l=1592651789;const d=()=>(l=l*1664525+1013904223>>>0,(l&4294967295)/4294967295);for(let y=c-1;y>0;y--){const E=Math.floor(d()*(y+1)),I=h[y];h[y]=h[E],h[E]=I}const u=new Uint8Array(c),A=[];function L(y,E){const I=E*n[y*3],N=E*n[y*3+1],B=E*n[y*3+2],w=Math.sqrt(I*I+N*N+B*B);if(w<1e-6)return null;const V=I/w,H=N/w,X=B/w,D=t.neighbours(y);let G=-1,j=.3,P=0;for(let z=0;z<D.length;z++){const $=D[z],U=e[$*3]-e[y*3],Y=e[$*3+1]-e[y*3+1],v=e[$*3+2]-e[y*3+2],b=Math.sqrt(U*U+Y*Y+v*v);if(b<1e-6)continue;const x=(U*V+Y*H+v*X)/b;x>j&&(j=x,G=$,P=b)}return G===-1?null:{next:G,edgeLen:P}}function p(y){const E=new Map;E.set(y,0);const I=[{d:0,u:y}];for(;I.length>0;){let N=0;for(let V=1;V<I.length;V++)I[V].d<I[N].d&&(N=V);const B=I[N];if(I[N]=I[I.length-1],I.pop(),B.d>(E.get(B.u)??1/0))continue;if(B.d>a)break;u[B.u]=1;const w=t.neighbours(B.u);for(let V=0;V<w.length;V++){const H=w[V],X=e[H*3]-e[B.u*3],D=e[H*3+1]-e[B.u*3+1],G=e[H*3+2]-e[B.u*3+2],j=Math.sqrt(X*X+D*D+G*G),P=B.d+j;P<=a&&P<(E.get(H)??1/0)&&(E.set(H,P),I.push({d:P,u:H}))}}}function F(y,E,I){const N=[];let B=y,w=0;I&&N.push(B);const V=500;for(let H=0;H<V;H++){const X=L(B,E);if(!X||u[X.next])break;if(w+=X.edgeLen,B=X.next,w>=o){const D=n[B*3],G=n[B*3+1],j=n[B*3+2];if(D*D+G*G+j*j<f)break;N.push(B),w=0}}return N}for(let y=0;y<c;y++){const E=h[y];if(u[E])continue;const I=n[E*3],N=n[E*3+1],B=n[E*3+2];if(I*I+N*N+B*B<f)continue;const w=F(E,1,!0),V=F(E,-1,!1),H=w.concat(V);if(H.length!==0){for(const X of H)p(X);A.push(...H)}}const C=A.length,m=new Float32Array(C*3),k=new Float32Array(C*3),S=new Float32Array(C*3),_=new Uint8Array(C*4),M=new Int32Array(C);for(let y=0;y<C;y++){const E=A[y];M[y]=E,m[y*3+0]=e[E*3+0],m[y*3+1]=e[E*3+1],m[y*3+2]=e[E*3+2];const I=n[E*3],N=n[E*3+1],B=n[E*3+2],w=Math.sqrt(I*I+N*N+B*B)||1;k[y*3+0]=I/w,k[y*3+1]=N/w,k[y*3+2]=B/w,S[y*3+0]=r[E*3],S[y*3+1]=r[E*3+1],S[y*3+2]=r[E*3+2],_[y*4+0]=i[E*4],_[y*4+1]=i[E*4+1],_[y*4+2]=i[E*4+2],_[y*4+3]=255}return{positions:m,directions:k,normals:S,colors:_,vertexIDs:M}}const Ee={showLIC:!1,showColor:!0,showArrows:!0,useLabelColors:!1,licIterations:50,licHighContrast:!0,licEmphasizeSingular:!1,arrowCurved:!1,arrowBorderMode:!1,arrowDensity:.02,arrowScale:.008,arrowHeight:1.3,arrowWidth:.9,arrowBodyWidth:.25,arrowHeadFrac:.25,arrowDist:.5,arrowOpacity:.72,arrowFlipDirection:!0,arrowColorR:0,arrowColorG:0,arrowColorB:0,bgColorR:.07,bgColorG:.07,bgColorB:.07,parcelSmoothing:1,parcelRefinement:0,surfaceAmbient:.04,surfaceDiffuse:.75,surfaceSpecular:.4,surfaceShininess:80,screenshotDPI:600,lastDatasetName:null,lastDatasetFiles:null},Ie="di-panel-params-v1";function Rt(){try{const e=window.localStorage.getItem(Ie);if(!e)return{...Ee};const t=JSON.parse(e);return{...Ee,...t}}catch{return{...Ee}}}function be(e){try{window.localStorage.setItem(Ie,JSON.stringify(e))}catch{}}function Ft(e){be(e)}function Ae(e,t){if(e.replaceChildren(),t.lastDatasetFiles){const n=t.lastDatasetFiles,r=document.createElement("div");r.textContent="Loaded:",e.appendChild(r);const i=document.createElement("div");i.style.paddingLeft="8px",i.style.opacity="0.9";for(const o of[n.ply,n.labels,n.labelorder]){const a=document.createElement("div");a.textContent=o,i.appendChild(a)}e.appendChild(i),e.style.color="var(--ok)"}else t.lastDatasetName?(e.textContent=`Loaded: ${t.lastDatasetName}`,e.style.color="var(--ok)"):(e.textContent="Pick a .ply + .labels + .labelorder triple",e.style.color="")}const Lt=[{key:"showLIC",label:"LIC streamlines",type:"checkbox"},{key:"showColor",label:"Parcellation colors",type:"checkbox"},{key:"useLabelColors",label:"Use label-order palette (override PLY RGB)",type:"checkbox"},{key:"showArrows",label:"Arrows",type:"checkbox"}],It=[{key:"licIterations",label:"Streamline length (iterations)",type:"range",min:5,max:100,step:1},{key:"licHighContrast",label:"High contrast",type:"checkbox"},{key:"licEmphasizeSingular",label:"Emphasize singularities",type:"checkbox"}],Dt=[{key:"arrowBorderMode",label:"Borders only (M2 mode)",type:"checkbox",expensive:!0},{key:"arrowDensity",label:"Density (smaller = denser)",type:"range",min:.02,max:.18,step:.005,expensive:!0},{key:"arrowScale",label:"Size",type:"range",min:.002,max:.025,step:5e-4,expensive:!0},{key:"arrowDist",label:"Distance from surface",type:"range",min:0,max:5,step:.1}],Pt=[{key:"arrowHeight",label:"Length",type:"range",min:.5,max:8,step:.1,expensive:!0},{key:"arrowWidth",label:"Head width",type:"range",min:.5,max:4,step:.1},{key:"arrowBodyWidth",label:"Body width (fraction of head)",type:"range",min:.05,max:1,step:.02},{key:"arrowOpacity",label:"Opacity",type:"range",min:0,max:1,step:.02},{key:"arrowFlipDirection",label:"Flip direction",type:"checkbox"},{key:"arrowColorR",label:"Color",type:"color"}],Mt=[{key:"bgColorR",label:"Background",type:"color"}],Nt=[{key:"surfaceAmbient",label:"Ambient",type:"range",min:0,max:.5,step:.01},{key:"surfaceDiffuse",label:"Diffuse",type:"range",min:0,max:1.5,step:.05},{key:"surfaceSpecular",label:"Specular (glare)",type:"range",min:0,max:1,step:.02},{key:"surfaceShininess",label:"Shininess (sharpness)",type:"range",min:1,max:400,step:1}],De="di-panel-collapsed-v1";function Bt(){try{const e=window.localStorage.getItem(De);if(!e)return new Set;const t=JSON.parse(e);return Array.isArray(t)?new Set(t.filter(n=>typeof n=="string")):new Set}catch{return new Set}}function kt(e){try{window.localStorage.setItem(De,JSON.stringify(Array.from(e)))}catch{}}function fe(e,t,n,r){const i=document.createElement("div");if(i.className="panel-control",e.type==="range"){const o=document.createElement("label");o.className="panel-label";const a=document.createElement("span");a.className="panel-label-text",a.textContent=e.label,o.appendChild(a);const s=l=>e.step!==void 0&&String(e.step).includes(".")?l.toFixed(3):String(l),c=document.createElement("input");c.type="text",c.className="panel-value panel-value-input",c.inputMode="decimal",c.spellcheck=!1,c.value=s(t[e.key]),c.title=`Click to type a value (range: ${e.min}–${e.max})`,o.appendChild(c);const f=document.createElement("input");f.type="range",f.min=String(e.min),f.max=String(e.max),f.step=String(e.step),f.value=String(t[e.key]);const h=l=>{let d=l;e.min!==void 0&&d<e.min&&(d=e.min),e.max!==void 0&&d>e.max&&(d=e.max),t[e.key]=d,f.value=String(d),c.value=s(d),n()};f.addEventListener("input",()=>h(parseFloat(f.value))),c.addEventListener("focus",()=>c.select()),c.addEventListener("keydown",l=>{if(l.key==="Enter"){l.preventDefault();const d=parseFloat(c.value);Number.isFinite(d)?h(d):c.value=s(t[e.key]),c.blur()}else l.key==="Escape"&&(c.value=s(t[e.key]),c.blur())}),c.addEventListener("blur",()=>{const l=parseFloat(c.value);Number.isFinite(l)?h(l):c.value=s(t[e.key])}),i.appendChild(o),i.appendChild(f)}else if(e.type==="checkbox"){i.classList.add("checkbox-row");const o=document.createElement("input");o.type="checkbox",o.checked=!!t[e.key],o.id=`panel-cb-${String(e.key)}`,o.addEventListener("change",()=>{t[e.key]=o.checked,n()});const a=document.createElement("label");a.className="panel-label",a.htmlFor=o.id;const s=document.createElement("span");s.className="panel-label-text",s.textContent=e.label,a.appendChild(s),i.appendChild(o),i.appendChild(a)}else if(e.type==="color"){const o=document.createElement("label");o.className="panel-label";const a=document.createElement("span");a.className="panel-label-text",a.textContent=e.label,o.appendChild(a);const s=e.key,c=s,f=s.replace(/R$/,"G"),h=s.replace(/R$/,"B"),l=t,d=document.createElement("input");d.type="color";const u=L=>Math.max(0,Math.min(255,Math.round(L*255))),A=(L,p,F)=>"#"+[L,p,F].map(C=>u(C).toString(16).padStart(2,"0")).join("");d.value=A(l[c],l[f],l[h]),d.addEventListener("input",()=>{const L=d.value.slice(1);l[c]=parseInt(L.slice(0,2),16)/255,l[f]=parseInt(L.slice(2,4),16)/255,l[h]=parseInt(L.slice(4,6),16)/255,n()}),i.appendChild(o),i.appendChild(d)}if(r){const o=document.createElement("div");o.className="panel-note",o.textContent="Recomputed on release (~200 ms)",i.appendChild(o)}return i}function Ut(e,t,n,r,i,o){const a=document.createElement("div");a.id="panel-root";const s=document.createElement("button");s.id="panel-toggle",s.title="Toggle controls",s.setAttribute("aria-label","Toggle controls"),s.innerHTML='<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 2L7.5 7L2.5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';const c=document.createElement("div");c.id="panel";const f=document.createElement("div");f.id="panel-titlebar";const h=document.createElement("span");h.id="panel-title",h.textContent="Controls";const l=document.createElement("button");l.id="panel-collapse-btn",l.type="button",l.title="Hide controls",l.setAttribute("aria-label","Hide controls"),l.innerHTML='<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',f.appendChild(h),f.appendChild(l),c.appendChild(f);const d=Bt(),u=(P,z)=>{const $=document.createElement("section");$.className="panel-section",$.dataset.section=P;const U=document.createElement("button");U.type="button",U.className="panel-heading",U.setAttribute("aria-expanded","true");const Y=document.createElement("span");Y.className="panel-heading-caret",Y.textContent="▾";const v=document.createElement("span");v.className="panel-heading-title",v.textContent=z,U.appendChild(Y),U.appendChild(v);const b=document.createElement("div");b.className="panel-section-body";const x=document.createElement("div");x.className="panel-section-inner",b.appendChild(x);const g=T=>{$.classList.toggle("collapsed",T),Y.textContent=T?"▸":"▾",U.setAttribute("aria-expanded",T?"false":"true")};return g(d.has(P)),U.addEventListener("click",()=>{const T=!$.classList.contains("collapsed");g(T),T?d.add(P):d.delete(P),kt(d)}),$.appendChild(U),$.appendChild(b),c.appendChild($),x};if(n){const P=u("data","Data"),z=document.createElement("div");if(z.className="panel-note",Ae(z,e),P.appendChild(z),o){const v=document.createElement("div");v.className="panel-control";const b=document.createElement("div");b.className="panel-label-text",b.textContent="Bundled datasets";const x=document.createElement("select");x.className="panel-select";const g=document.createElement("option");g.value="",g.textContent="Loading…",g.disabled=!0,g.selected=!0,x.appendChild(g),v.appendChild(b),v.appendChild(x),P.appendChild(v);let T="";(async()=>{try{const R=await fetch("/directionality-indicator-webgl/data/manifest.json");if(!R.ok)throw new Error(`manifest ${R.status}`);const K=await R.json();x.replaceChildren();const O=document.createElement("option");O.value="",O.textContent="Pick a bundled dataset…",O.disabled=!0,O.selected=!0,x.appendChild(O);for(const Q of K.datasets){const W=document.createElement("option");W.value=Q,W.textContent=Q,x.appendChild(W)}}catch{x.replaceChildren();const R=document.createElement("option");R.textContent="(no manifest)",R.disabled=!0,R.selected=!0,x.appendChild(R)}})(),x.addEventListener("change",async()=>{const R=x.value;if(!(!R||R===T)){z.textContent=`Loading ${R}…`,z.style.color="var(--text-mute)";try{await o(R),e.lastDatasetName=`${R}.ply`,e.lastDatasetFiles={ply:`${R}.ply`,labels:`${R}.labels`,labelorder:`${R}.labelorder`},be(e),Ae(z,e),T=R}catch(K){z.textContent="Error: "+(K instanceof Error?K.message:String(K)),z.style.color="var(--danger)",x.value=T}}})}const $=document.createElement("div");$.className="panel-file-row";const U=document.createElement("input");U.type="file",U.multiple=!0,U.accept=".ply,.labels,.labelorder",U.id="panel-file-input",U.className="panel-file-input";const Y=document.createElement("label");Y.htmlFor=U.id,Y.className="panel-file-label",Y.innerHTML='<span class="icon" aria-hidden="true">⬆</span><span>Or upload local files…</span>',U.addEventListener("change",async()=>{if(!U.files)return;const v=Array.from(U.files),b=v.find(T=>T.name.toLowerCase().endsWith(".ply")),x=v.find(T=>T.name.toLowerCase().endsWith(".labels")),g=v.find(T=>T.name.toLowerCase().endsWith(".labelorder"));if(!b||!x||!g){z.textContent="Need exactly one .ply, .labels, and .labelorder",z.style.color="var(--danger)";return}z.textContent="Loading…",z.style.color="var(--text-mute)";try{await n({ply:b,labels:x,labelorder:g}),e.lastDatasetName=b.name,e.lastDatasetFiles={ply:b.name,labels:x.name,labelorder:g.name},be(e),Ae(z,e)}catch(T){z.textContent="Error: "+(T instanceof Error?T.message:String(T)),z.style.color="var(--danger)"}}),$.appendChild(U),$.appendChild(Y),P.appendChild($)}let A=!1,L=null;const p=()=>{be(e),A&&(L!==null&&clearTimeout(L),L=window.setTimeout(()=>{L=null;const P=A;A=!1,t(e,P)},250)),t(e,!1)};if(i){const P=u("view","View"),z=document.createElement("div");z.className="panel-view-grid";const $=[{name:"lateral-left",label:"Lateral L"},{name:"lateral-right",label:"Lateral R"},{name:"anterior",label:"Anterior"},{name:"posterior",label:"Posterior"},{name:"dorsal",label:"Dorsal"},{name:"ventral",label:"Ventral"}];for(const Y of $){const v=document.createElement("button");v.type="button",v.className="panel-view-btn",v.textContent=Y.label,v.addEventListener("click",()=>i.set(Y.name)),z.appendChild(v)}P.appendChild(z);const U=document.createElement("div");U.className="panel-note",U.textContent="Or rotate freely with mouse drag. Position auto-saves.",P.appendChild(U)}const F=u("visibility","Visibility");for(const P of Lt)F.appendChild(fe(P,e,p,!1));const C=u("lic","LIC");for(const P of It)C.appendChild(fe(P,e,p,!1));const m=u("scene","Scene");for(const P of Mt)m.appendChild(fe(P,e,p,!1));const k=u("surface","Surface shading");for(const P of Nt)k.appendChild(fe(P,e,p,!1));const S=u("arrows","Glyphs");for(const P of Dt){const z=!!P.expensive;S.appendChild(fe(P,e,()=>{z&&(A=!0),p()},z))}const _=document.createElement("div");_.className="glyph-designer";const M=document.createElement("div");M.className="glyph-designer-heading",M.textContent="Glyph designer",_.appendChild(M);const y=document.createElement("div");y.className="glyph-preview-wrap";const E="http://www.w3.org/2000/svg",I=document.createElementNS(E,"svg");I.setAttribute("viewBox","-80 -45 160 90"),I.setAttribute("class","glyph-preview"),I.setAttribute("aria-label","Glyph preview");const N=document.createElementNS(E,"g");N.setAttribute("class","glyph-preview-group");const B=document.createElementNS(E,"line");B.setAttribute("x1","-76"),B.setAttribute("x2","76"),B.setAttribute("y1","0"),B.setAttribute("y2","0"),B.setAttribute("stroke","rgba(128,128,128,0.25)"),B.setAttribute("stroke-dasharray","2 3"),I.appendChild(B),I.appendChild(N);const w=document.createElementNS(E,"path");w.setAttribute("stroke-linejoin","round"),N.appendChild(w),y.appendChild(I),_.appendChild(y);const V=()=>{const $=2*e.arrowHeight*12,U=e.arrowWidth*12,Y=U*e.arrowBodyWidth,v=$/2,b=$*e.arrowHeadFrac,x=-v+b,g=v,T=Y/2,R=U/2,K=`M ${-T} ${g} L ${-T} ${x} L ${-R} ${x} L 0 ${-v} L ${R} ${x} L ${T} ${x} L ${T} ${g} Z`;w.setAttribute("d",K);const O=Math.round(e.arrowColorR*255),Q=Math.round(e.arrowColorG*255),W=Math.round(e.arrowColorB*255);w.setAttribute("fill",`rgb(${O}, ${Q}, ${W})`),w.setAttribute("fill-opacity",String(e.arrowOpacity)),w.setAttribute("stroke","rgba(128,128,128,0.45)"),w.setAttribute("stroke-width","0.6");const ee=e.arrowFlipDirection?90:-90;N.setAttribute("transform",`rotate(${ee})`);const Z=.299*e.arrowColorR+.587*e.arrowColorG+.114*e.arrowColorB,te=Z>.5?"rgba(28, 28, 28, 0.92)":"rgba(238, 238, 238, 0.95)";y.style.backgroundColor=te,B.setAttribute("stroke",Z>.5?"rgba(255,255,255,0.22)":"rgba(0,0,0,0.18)")},H=()=>{const P=document.createDocumentFragment(),z=.05,$=.95,U=.01,Y=O=>O.toFixed(2),v=O=>Math.max(z,Math.min($,O)),b=O=>{const Q=document.createElement("div");Q.className="panel-control";const W=document.createElement("label");W.className="panel-label";const ee=document.createElement("span");ee.className="panel-label-text",ee.textContent=O,W.appendChild(ee);const Z=document.createElement("input");Z.type="text",Z.className="panel-value panel-value-input",Z.inputMode="decimal",Z.spellcheck=!1,Z.title=`Click to type a value (range: ${z}–${$})`,W.appendChild(Z);const te=document.createElement("input");return te.type="range",te.min=String(z),te.max=String($),te.step=String(U),Q.appendChild(W),Q.appendChild(te),{wrap:Q,slider:te,input:Z}},x=b("Body length (fraction)"),g=b("Head length (fraction)"),T=()=>{const O=1-e.arrowHeadFrac,Q=e.arrowHeadFrac;x.slider.value=String(O),x.input.value=Y(O),g.slider.value=String(Q),g.input.value=Y(Q)};T();const R=(O,Q)=>{const W=v(Q?O:1-O);e.arrowHeadFrac=W,T(),p(),V()};x.slider.addEventListener("input",()=>R(parseFloat(x.slider.value),!1)),g.slider.addEventListener("input",()=>R(parseFloat(g.slider.value),!0));const K=(O,Q)=>{O.addEventListener("focus",()=>O.select()),O.addEventListener("keydown",W=>{if(W.key==="Enter"){W.preventDefault();const ee=parseFloat(O.value);Number.isFinite(ee)?R(ee,Q):T(),O.blur()}else W.key==="Escape"&&(T(),O.blur())}),O.addEventListener("blur",()=>{const W=parseFloat(O.value);Number.isFinite(W)?R(W,Q):T()})};return K(x.input,!1),K(g.input,!0),P.appendChild(x.wrap),P.appendChild(g.wrap),P};for(const P of Pt){const z=!!P.expensive;_.appendChild(fe(P,e,()=>{z&&(A=!0),p(),V()},z)),P.key==="arrowHeight"&&_.appendChild(H())}if(V(),S.appendChild(_),r){const P=u("screenshot","Screenshot"),z=document.createElement("div");z.className="panel-note",z.textContent="Saves PNG with transparent background",P.appendChild(z);const $={key:"screenshotDPI",label:"Resolution (DPI)",type:"range",min:72,max:1200,step:6};P.appendChild(fe($,e,p,!1));const U=document.createElement("button");U.type="button",U.className="panel-btn",U.innerHTML='<span class="icon" aria-hidden="true">⤓</span><span>Current view</span>',U.addEventListener("click",async()=>{U.disabled=!0;try{await r.current()}finally{U.disabled=!1}}),P.appendChild(U);const Y=document.createElement("button");Y.type="button",Y.className="panel-btn",Y.style.marginTop="8px",Y.innerHTML='<span class="icon" aria-hidden="true">▦</span><span>All canonical views</span>',Y.addEventListener("click",async()=>{Y.disabled=!0;try{await r.canonical()}finally{Y.disabled=!1}}),P.appendChild(Y)}const X=document.createElement("div");X.className="panel-control",X.style.marginTop="22px";const D=document.createElement("button");D.id="panel-reset",D.type="button",D.innerHTML='<span class="icon" aria-hidden="true">↻</span><span>Reset to defaults</span>',D.addEventListener("click",async()=>{try{window.localStorage.removeItem(Ie)}catch{}try{window.localStorage.removeItem(De)}catch{}try{window.localStorage.removeItem("di-camera-state-v1")}catch{}await At(),window.location.reload()}),X.appendChild(D),c.appendChild(X);let G=!0;const j=P=>{G=P,c.classList.toggle("closed",!G),s.classList.toggle("closed",!G),s.title=G?"Hide controls":"Show controls",s.setAttribute("aria-label",G?"Hide controls":"Show controls")};return s.addEventListener("click",()=>j(!G)),l.addEventListener("click",()=>j(!1)),j(!0),a.appendChild(s),a.appendChild(c),{element:a,toggle:()=>j(!G)}}function ge(e,t){if(t.colors.some(c=>c.type===e.FLOAT||c.type===e.HALF_FLOAT)&&!e.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float not supported — cannot create float-format FBO");const r=e.createFramebuffer();if(!r)throw new Error("createFramebuffer failed");let i=[],o=null;function a(c,f){e.bindFramebuffer(e.FRAMEBUFFER,r);for(const l of i)e.deleteTexture(l);if(o&&e.deleteTexture(o),i=[],o=null,t.colors.forEach((l,d)=>{const u=e.createTexture();if(!u)throw new Error(`createTexture failed for color attachment ${d}`);e.bindTexture(e.TEXTURE_2D,u),e.texImage2D(e.TEXTURE_2D,0,l.internalFormat,c,f,0,l.format,l.type,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,l.minFilter??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,l.magFilter??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,l.wrapS??e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,l.wrapT??e.CLAMP_TO_EDGE),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+d,e.TEXTURE_2D,u,0),i.push(u)}),t.depth){const l=e.createTexture();if(!l)throw new Error("createTexture failed for depth attachment");e.bindTexture(e.TEXTURE_2D,l),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT32F,c,f,0,e.DEPTH_COMPONENT,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,l,0),o=l}const h=e.checkFramebufferStatus(e.FRAMEBUFFER);if(h!==e.FRAMEBUFFER_COMPLETE)throw new Error(`Framebuffer incomplete: 0x${h.toString(16)}`);e.bindFramebuffer(e.FRAMEBUFFER,null)}return a(t.width,t.height),{fbo:r,get width(){return t.width},get height(){return t.height},get colorTextures(){return i},get depthTexture(){return o},bind(){e.bindFramebuffer(e.FRAMEBUFFER,r),e.viewport(0,0,t.width,t.height);const c=t.colors.map((f,h)=>e.COLOR_ATTACHMENT0+h);e.drawBuffers(c)},resize(c,f){t.width=c,t.height=f,a(c,f)},generateMipmaps(){t.colors.forEach((c,f)=>{c.mipmap&&(e.bindTexture(e.TEXTURE_2D,i[f]),e.generateMipmap(e.TEXTURE_2D))}),t.depth&&o&&(e.bindTexture(e.TEXTURE_2D,o),e.generateMipmap(e.TEXTURE_2D))}}}function Te(e,t){if(t<0)throw new Error("screenQuad: a_position attribute not found in program");const n=e.createVertexArray();if(!n)throw new Error("createVertexArray failed for screenQuad");e.bindVertexArray(n);const r=e.createBuffer();if(!r)throw new Error("createBuffer failed for screenQuad");return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),n}function zt(e){let t=e>>>0;return function(){t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),(n^n>>>14)>>>0}}function Vt(e,t,n,r){const i=zt(r),o=new Uint8Array(e*t*n);for(let a=0;a<o.length;a++)o[a]=i()&255;return o}const Ot=`#version 300 es
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
`,Ht=`#version 300 es
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
`,$t=`// Minimal Phong helper, parameterized via uniforms so the panel can tune the
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
`,Xt=`#version 300 es
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
`,Yt=`#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
`,qt=`#version 300 es
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
`,Wt=`#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
`,jt=`#version 300 es
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
`;function Kt(e){const t=e.indexOf("void main()");if(t<0)throw new Error("transform.frag.glsl: void main() not found");return e.slice(0,t)+$t+`
`+e.slice(t)}function Qt(e,t,n){const r=he(e,Ot,Kt(Ht),"lic.transform"),i=he(e,Xt,Gt,"lic.edge"),o=he(e,Yt,qt,"lic.advect"),a=he(e,Wt,jt,"lic.compose"),s=Te(e,i.attribs.get("a_position")??-1),c=Te(e,o.attribs.get("a_position")??-1),f=Te(e,a.attribs.get("a_position")??-1);let h=ge(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT},{internalFormat:e.R8,format:e.RED,type:e.UNSIGNED_BYTE},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT},{internalFormat:e.RGBA16F,format:e.RGBA,type:e.HALF_FLOAT}],depth:!0}),l=ge(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE,mipmap:!0}],depth:!1}),d=ge(e,{width:t,height:n,colors:[{internalFormat:e.RGBA8,format:e.RGBA,type:e.UNSIGNED_BYTE}],depth:!1});const u=128,A=Vt(u,u,u,12345),L=e.createTexture();if(!L)throw new Error("createTexture failed for noiseTex");e.bindTexture(e.TEXTURE_3D,L),e.texImage3D(e.TEXTURE_3D,0,e.R8,u,u,u,0,e.RED,e.UNSIGNED_BYTE,A),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_R,e.REPEAT);function p(m,k,S,_,M){const y=m.uniforms.get(k);y&&(e.activeTexture(e.TEXTURE0+S),e.bindTexture(_,M),e.uniform1i(y,S))}function F(m,k,S,_,M){const y=e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);h.bind(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.enable(e.CULL_FACE),e.cullFace(e.BACK),e.useProgram(r.program),e.uniformMatrix4fv(r.uniforms.get("u_view"),!1,k),e.uniformMatrix4fv(r.uniforms.get("u_projection"),!1,S),e.uniform3fv(r.uniforms.get("u_meshBBMin"),m.meshBBMin),e.uniform3fv(r.uniforms.get("u_meshBBMax"),m.meshBBMax),e.uniform1f(r.uniforms.get("u_surfaceAmbient"),m.surfaceAmbient??.04),e.uniform1f(r.uniforms.get("u_surfaceDiffuse"),m.surfaceDiffuse??.75),e.uniform1f(r.uniforms.get("u_surfaceSpecular"),m.surfaceSpecular??.4),e.uniform1f(r.uniforms.get("u_surfaceShininess"),m.surfaceShininess??80),p(r,"u_noiseSampler",0,e.TEXTURE_3D,L),e.bindVertexArray(m.meshVAO),e.drawElements(e.TRIANGLES,m.meshIndexCount,m.meshIndexType,0),e.bindVertexArray(null),h.generateMipmaps(),l.bind(),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.useProgram(i.program),e.uniform2f(i.uniforms.get("u_viewportSize"),h.width,h.height),p(i,"u_depthSampler",0,e.TEXTURE_2D,h.depthTexture),e.bindVertexArray(s),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),l.generateMipmaps(),d.bind(),e.useProgram(o.program),e.uniform2f(o.uniforms.get("u_viewportSize"),h.width,h.height),e.uniform2f(o.uniforms.get("u_viewportScale"),1,1),e.uniform1f(o.uniforms.get("u_noiseRatio"),0),e.uniform1i(o.uniforms.get("u_numIter"),m.licIterations??50),p(o,"u_depthSampler",0,e.TEXTURE_2D,h.depthTexture),p(o,"u_noiseSampler",1,e.TEXTURE_2D,h.colorTextures[2]),p(o,"u_vecSampler",2,e.TEXTURE_2D,h.colorTextures[1]),p(o,"u_edgeSampler",3,e.TEXTURE_2D,l.colorTextures[0]),e.bindVertexArray(c),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.bindFramebuffer(e.FRAMEBUFFER,y),e.viewport(0,0,_,M),e.useProgram(a.program),e.uniform1i(a.uniforms.get("u_useHighContrast"),m.useHighContrast??!0?1:0),e.uniform1i(a.uniforms.get("u_showLIC"),m.showLIC??!0?1:0),e.uniform1i(a.uniforms.get("u_showColor"),m.showColor??!0?1:0),e.uniform1i(a.uniforms.get("u_emphasizeSingular"),m.emphasizeSingular??!1?1:0),p(a,"u_colorSampler",0,e.TEXTURE_2D,h.colorTextures[0]),p(a,"u_vecSampler",1,e.TEXTURE_2D,h.colorTextures[1]),p(a,"u_depthSampler",2,e.TEXTURE_2D,h.depthTexture),p(a,"u_edgeSampler",3,e.TEXTURE_2D,l.colorTextures[0]),p(a,"u_noiseSampler",4,e.TEXTURE_2D,h.colorTextures[2]),p(a,"u_advectSampler",5,e.TEXTURE_2D,d.colorTextures[0]),e.enable(e.DEPTH_TEST),e.bindVertexArray(f),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}function C(m,k){h.resize(m,k),l.resize(m,k),d.resize(m,k)}return{render:F,resize:C,transformAttribs:r.attribs,getTransformDepthTexture:()=>h.depthTexture,getColorTexture:()=>h.colorTextures[0],getVecTexture:()=>h.colorTextures[1],getNormalTexture:()=>h.colorTextures[3],getPosTexture:()=>h.colorTextures[4]}}const Jt=`#version 300 es
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
`,Zt=`#version 300 es
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
`;async function Ce(e){const t=await fetch(e);if(!t.ok)throw new Error(`Fetch failed ${e}: ${t.status} ${t.statusText}`);return t.text()}function en(e){const t=q(1/0,1/0,1/0),n=q(-1/0,-1/0,-1/0),r=q(0,0,0),i=e.length/3;for(let a=0;a<i;a++){const s=e[a*3+0],c=e[a*3+1],f=e[a*3+2];s<t[0]&&(t[0]=s),s>n[0]&&(n[0]=s),c<t[1]&&(t[1]=c),c>n[1]&&(n[1]=c),f<t[2]&&(t[2]=f),f>n[2]&&(n[2]=f),r[0]+=s,r[1]+=c,r[2]+=f}Xe(r,r,1/i);let o=0;for(let a=0;a<i;a++){const s=e[a*3+0]-r[0],c=e[a*3+1]-r[1],f=e[a*3+2]-r[2];o=Math.max(o,s*s+c*c+f*f)}return{center:r,radius:Math.sqrt(o),bbMin:t,bbMax:n}}async function tn(e){const t=at(e),n=t.gl;if(!n.getExtension("EXT_color_buffer_float")){Re("Your browser does not support EXT_color_buffer_float; LIC requires it.");return}const r=Qt(n,t.width||1,t.height||1),i=he(n,Jt,Oe,"arrow"),o=he(n,Zt,Oe,"arrow.curved"),a=it(),s=Rt();let c=null,f=null,h=null,l=null,d=null,u=null,A=null,L=null,p=null,F=null,C=null,m=null;function k(v){if(!c||!A||!f||!h||!l||!F)return;const b=2*v.arrowHeight*v.arrowScale*F.radius,x=.5*v.arrowWidth*v.arrowScale*F.radius;let g;if(v.arrowBorderMode&&L){const R=F.radius*v.arrowDensity,K=Math.max(R,b);g=Tt(c.vertices,A,f,h,l,K,.05,L)}else{const R=b*1.2,K=F.radius*v.arrowDensity,O=Math.max(K,Math.max(x*1.5,b*.4));g=St(c.vertices,A,f,h,l,R,O,.05)}const T=Ct(g,b,1);if(C=vt(n,i,{positions:T.positions,directions:T.directions,normals:T.normals,colors:T.colors}),T.vertexIDs&&c&&A&&f&&h&&l){const R=bt(T.positions,Array.from(T.vertexIDs),c.vertices,A,f,h,l,qe);m=yt(n,o,R)}else m=null}function S(v,b,x){const g=st(v),T=ct(b),R=dt(x);if(T.length!==g.vertices.length/3)throw new Error(`Vertex count mismatch: mesh has ${g.vertices.length/3} vertices, labels has ${T.length}`);const K=g.vertices.length/3;let O=null;if(g.colors&&g.colors.length===K*3){O=new Uint8Array(K*4);for(let ne=0;ne<K;ne++)O[ne*4+0]=g.colors[ne*3+0],O[ne*4+1]=g.colors[ne*3+1],O[ne*4+2]=g.colors[ne*3+2],O[ne*4+3]=255}const Q=ht(T,R),W=!s.useLabelColors&&O?O:Q,ee=mt(g.vertices,g.indices),Z=pt(g.indices,g.vertices.length/3),te=gt(T,Z),se=wt({vertices:g.vertices,indices:g.indices,labels:T,labelOrder:R,adjacency:Z,normals:ee}),oe=en(g.vertices),ae=r.transformAttribs,ce=Ue(n,[{def:{name:"a_position",data:g.vertices,size:3,type:n.FLOAT,normalized:!1},location:ae.get("a_position")??-1},{def:{name:"a_normal",data:ee,size:3,type:n.FLOAT,normalized:!1},location:ae.get("a_normal")??-1},{def:{name:"a_color",data:W,size:4,type:n.UNSIGNED_BYTE,normalized:!0},location:ae.get("a_color")??-1},{def:{name:"a_vector",data:se,size:3,type:n.FLOAT,normalized:!1},location:ae.get("a_vector")??-1}],g.indices);c=g,f=se,h=ee,l=W,d=O,u=Q,A=Z,L=te,p=ce,F=oe,k(s),a.fitSphere(oe.center,oe.radius);const J=I();J?a.setLookAt(q(J.eye[0],J.eye[1],J.eye[2]),q(J.target[0],J.target[1],J.target[2]),q(J.up[0],J.up[1],J.up[2])):y("lateral-left",oe.center,oe.radius),t.requestRender()}function _(v){if(!c||!f||!h)return;const b=v||!d?u:d;if(!b)return;const x=r.transformAttribs;p=Ue(n,[{def:{name:"a_position",data:c.vertices,size:3,type:n.FLOAT,normalized:!1},location:x.get("a_position")??-1},{def:{name:"a_normal",data:h,size:3,type:n.FLOAT,normalized:!1},location:x.get("a_normal")??-1},{def:{name:"a_color",data:b,size:4,type:n.UNSIGNED_BYTE,normalized:!0},location:x.get("a_color")??-1},{def:{name:"a_vector",data:f,size:3,type:n.FLOAT,normalized:!1},location:x.get("a_vector")??-1}],c.indices),l=b,k(s)}function M(v,b,x,g=2.5){const T=x*g;switch(v){case"lateral-left":return{eye:q(b[0]-T,b[1],b[2]),up:q(0,0,1)};case"lateral-right":return{eye:q(b[0]+T,b[1],b[2]),up:q(0,0,1)};case"anterior":return{eye:q(b[0],b[1]+T,b[2]),up:q(0,0,1)};case"posterior":return{eye:q(b[0],b[1]-T,b[2]),up:q(0,0,1)};case"dorsal":return{eye:q(b[0],b[1],b[2]+T),up:q(0,1,0)};case"ventral":return{eye:q(b[0],b[1],b[2]-T),up:q(0,1,0)}}}function y(v,b,x){const{eye:g,up:T}=M(v,b,x);a.setLookAt(g,b,T)}const E="di-camera-state-v1";function I(){try{const v=window.localStorage.getItem(E);if(!v)return null;const b=JSON.parse(v);return b&&Array.isArray(b.eye)&&Array.isArray(b.target)&&Array.isArray(b.up)?b:null}catch{return null}}let N=null;function B(){N!==null&&clearTimeout(N),N=window.setTimeout(()=>{N=null;try{window.localStorage.setItem(E,JSON.stringify(a.getViewState()))}catch{}},350)}const w=S;async function V(v){const[b,x,g]=await Promise.all([Ce(`/directionality-indicator-webgl/data/${v}.ply`),Ce(`/directionality-indicator-webgl/data/${v}.labels`),Ce(`/directionality-indicator-webgl/data/${v}.labelorder`)]);w(b,x,g),await Ve({name:`${v}.ply`,plyText:b,labelsText:x,orderText:g}),s.lastDatasetName=`${v}.ply`,s.lastDatasetFiles={ply:`${v}.ply`,labels:`${v}.labels`,labelorder:`${v}.labelorder`},Ft(s)}const H=await Et();H?w(H.plyText,H.labelsText,H.orderText):await V("label18"),t.onResize(()=>{a.resize(t.width,t.height),r.resize(t.width,t.height),t.requestRender()}),a.attach(t.canvas,()=>{t.requestRender(),B()}),a.resize(t.width,t.height),r.resize(t.width,t.height);let X=s.useLabelColors;const{element:D}=Ut(s,(v,b)=>{v.useLabelColors!==X?(X=v.useLabelColors,_(v.useLabelColors)):b&&k(v),t.requestRender()},async({ply:v,labels:b,labelorder:x})=>{const[g,T,R]=await Promise.all([v.text(),b.text(),x.text()]);w(g,T,R),await Ve({name:v.name,plyText:g,labelsText:T,orderText:R})},{current:()=>$(),canonical:()=>Y()},{set:v=>{F&&(y(v,F.center,F.radius),B(),t.requestRender())}},V);e.appendChild(D);function G(v){if(n.clearColor(s.bgColorR,s.bgColorG,s.bgColorB,v),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),!p||!F||(r.render({meshVAO:p.vao,meshIndexCount:p.indexCount,meshIndexType:p.indexType,meshBBMin:F.bbMin,meshBBMax:F.bbMax,licIterations:s.licIterations,useHighContrast:s.licHighContrast,showLIC:s.showLIC,showColor:s.showColor,emphasizeSingular:s.licEmphasizeSingular,surfaceAmbient:s.surfaceAmbient,surfaceDiffuse:s.surfaceDiffuse,surfaceSpecular:s.surfaceSpecular,surfaceShininess:s.surfaceShininess},a.view,a.projection,t.width,t.height),!s.showArrows))return;const b=s.arrowCurved&&m!==null,x=b?o:i;!b&&!C||(n.disable(n.DEPTH_TEST),n.disable(n.CULL_FACE),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.useProgram(x.program),n.uniformMatrix4fv(x.uniforms.get("u_view"),!1,a.view),n.uniformMatrix4fv(x.uniforms.get("u_projection"),!1,a.projection),n.uniform1f(x.uniforms.get("u_arrowWidth"),s.arrowWidth),n.uniform1f(x.uniforms.get("u_arrowDist"),s.arrowDist),n.uniform1f(x.uniforms.get("u_arrowScale"),F.radius*s.arrowScale),n.uniform1f(x.uniforms.get("u_directionSign"),s.arrowFlipDirection?-1:1),n.uniform1f(x.uniforms.get("u_widthTails"),s.arrowBodyWidth),n.uniform1f(x.uniforms.get("u_arrowHeadFrac"),s.arrowHeadFrac),n.uniform4f(x.uniforms.get("u_arrowColor"),s.arrowColorR,s.arrowColorG,s.arrowColorB,1),n.uniform1f(x.uniforms.get("u_arrowOpacity"),s.arrowOpacity),b||n.uniform1f(x.uniforms.get("u_arrowHeight"),s.arrowHeight),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,r.getPosTexture()),n.uniform1i(x.uniforms.get("u_posSampler"),0),b&&m?m.draw():C&&C.draw(),n.disable(n.BLEND))}t.onRender(()=>G(1));const j=5e7;function P(v,b,x){const g=t.canvas,T=g.width,R=g.height;g.width=v,g.height=b,n.viewport(0,0,v,b),a.resize(v,b),r.resize(v,b);try{return x()}finally{g.width=T,g.height=R,n.viewport(0,0,T,R),a.resize(T,R),r.resize(T,R)}}function z(){const v=Math.max(.5,s.screenshotDPI/96);let b=Math.round(t.canvas.width*v),x=Math.round(t.canvas.height*v);if(b*x>j){const g=Math.sqrt(j/(b*x));b=Math.round(b*g),x=Math.round(x*g),console.warn(`Screenshot pixel cap: clamped ${s.screenshotDPI} DPI to ${Math.round(96*g*(s.screenshotDPI/96))} effective DPI to stay under 50 MP`)}return{w:b,h:x}}async function $(){if(!F)return;const{w:v,h:b}=z();await U(v,b,"directionality-current.png"),G(1)}async function U(v,b,x){let g="";P(v,b,()=>{G(0),g=t.canvas.toDataURL("image/png")}),await new Promise(T=>{const R=new Image;R.onload=async()=>{const K=document.createElement("canvas");K.width=R.width,K.height=R.height;const O=K.getContext("2d");if(!O){T();return}O.drawImage(R,0,0);const Q=O.getImageData(0,0,R.width,R.height).data;let W=R.width,ee=R.height,Z=-1,te=-1;for(let J=0;J<R.height;J++){const ne=J*R.width*4;for(let re=0;re<R.width;re++)Q[ne+re*4+3]>0&&(re<W&&(W=re),re>Z&&(Z=re),J<ee&&(ee=J),J>te&&(te=J))}if(Z<0){T();return}const se=Z-W+1,oe=te-ee+1,ae=document.createElement("canvas");ae.width=se,ae.height=oe;const ce=ae.getContext("2d");if(!ce){T();return}ce.drawImage(K,W,ee,se,oe,0,0,se,oe),await new Promise(J=>{ae.toBlob(ne=>{if(ne){const re=URL.createObjectURL(ne),pe=document.createElement("a");pe.href=re,pe.download=x,document.body.appendChild(pe),pe.click(),document.body.removeChild(pe),URL.revokeObjectURL(re)}J()},"image/png")}),T()},R.src=g})}async function Y(){if(!F)return;const v=F.radius,b=F.center,x=["lateral-left","lateral-right","anterior","posterior","dorsal","ventral"],{w:g,h:T}=z();for(const K of x){const{eye:O,up:Q}=M(K,b,v,3.2);a.setLookAt(O,b,Q),await U(g,T,`directionality-${K}.png`)}const R=I();R?a.setLookAt(q(R.eye[0],R.eye[1],R.eye[2]),q(R.target[0],R.target[1],R.target[2]),q(R.up[0],R.up[1],R.up[2])):y("lateral-left",b,v),G(1)}t.requestRender()}const He=document.getElementById("app");He?tn(He).catch(e=>{console.error(e),Re(e instanceof Error?e.message:String(e))}):Re("Internal error: #app container missing");
//# sourceMappingURL=index-D4VzzD87.js.map
