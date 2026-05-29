import { KEYS } from "../config/keys.js";
import { polyfly } from "../api/polyfly.js";

let prev = false;
let targets = [];
let idx = 0;

polyfly.physics.onWorkerMessage((d) => {
  if (Array.isArray(d.__pfCheckpoints)) {
    const cps = d.__pfCheckpoints.map(c => ({ ...c, kind: "checkpoint" }));
    const fins = (Array.isArray(d.__pfFinishes) ? d.__pfFinishes : []).map(f => ({ ...f, kind: "finish", order: Infinity }));
    targets = [...cps, ...fins];
    idx = 0;
  }
});

function tryWarp() {
  if (!polyfly.physics.isReady() || targets.length === 0) return;
  if (idx >= targets.length) idx = 0;
  const t = targets[idx];
  polyfly.physics.setCarPos(t.x, t.y, t.z);
  if (t.rotationAxis === 0) {
    polyfly.physics.setYaw((t.rotation || 0) * Math.PI / 2 + Math.PI);
  }
  polyfly.physics.stop();
  idx++;
}

export const warp = {
  name: "warp",
  label: "Warp",
  description: "Teleport to next checkpoint, then finish",
  category: "Movement",
  toggleKey: KEYS.warp,
  toggleable: false,
  settings: {},
  onState(state) {
    const cur = !!state.keys?.[KEYS.warp];
    if (cur && !prev) tryWarp();
    prev = cur;
  },
  workerPatches: [
    [
      "null!=l.detector?l.detector.type:-1",
      "((l.detector?.type===1)&&((self.__pfFinishPartIds=self.__pfFinishPartIds||new Set()).add(l.id)),null!=l.detector?l.detector.type:-1)",
    ],
    [
      "function r(e,i,r,s,n){",
      "function r(e,i,r,s,n){self.__pfCheckpoints=[];self.__pfFinishes=[];",
    ],
    [
      "forEachPart(((t,e,i,r,s,n,a,o)=>{",
      "forEachPart(((t,e,i,r,s,n,a,o)=>{if(o!=null)self.__pfCheckpoints.push({x:t*5,y:e*5+1,z:i*5,rotation:s,rotationAxis:n,order:o});else if(self.__pfFinishPartIds&&self.__pfFinishPartIds.has(r))self.__pfFinishes.push({x:t*5,y:e*5+1,z:i*5,rotation:s,rotationAxis:n});",
    ],
    [
      '})),t.ccall("createCarModel"',
      '})),(self.__pfCheckpoints.sort((a,b)=>a.order-b.order),postMessage({__pfCheckpoints:self.__pfCheckpoints,__pfFinishes:self.__pfFinishes})),t.ccall("createCarModel"',
    ],
  ],
};