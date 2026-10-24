// Run: node visuals/test-lab.cjs
const fs = require("node:fs"), vm = require("node:vm"), assert = require("node:assert/strict");
const html = fs.readFileSync(__dirname + "/signals-lab.html", "utf8");
const source = html.match(/<script id="math-model">([\s\S]*?)<\/script>/)[1];
const m = vm.runInNewContext(source + "\nmodel");
for (const [t,y] of [[-1,0],[0,0],[.5,.125],[1,.5],[1.5,.5],[2,.5],[2.5,.375],[3,0],[4,0]]) assert.ok(Math.abs(m.area(t)-y)<1e-10);
for (let t=-1;t<=4;t+=.13) {
  const dx=.0005;
  let total=0;
  for(let q=-1.5;q<4.5;q+=dx) total+=m.x(q+dx/2)*m.h(t-q-dx/2)*dx;
  assert.ok(Math.abs(total-m.area(t))<.002,"numeric convolution: "+t);
}
assert.equal(m.step(3,"rectangle"),2);
assert.equal(m.step(3,"bipolar"),0);
assert.equal(m.step(4,"integrator"),4);
for(const a of [-2,-1,-.5,.5,1,2]) for(const b of [-3,0,3]) assert.equal(m.triangle(a*((b+1/a)-b)),2);
for(const k of ["delay","square"]) for(let t=-2;t<9;t+=.07){const [a,b]=m.paths(t,1,k);assert.ok(Math.abs(a-b)<1e-10);}
for(const k of ["compress","clock"]) assert.ok(Array.from({length:160},(_,i)=>m.paths(i/20,1,k)).some(([a,b])=>Math.abs(a-b)>.1));
console.log("PASS: convolution, signed accumulation, breakpoint mapping, TI paths");
