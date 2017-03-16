let StateMachine = require('state-machine');
let fsmData = {
initial: 'nope',
//please select the enter-state here ↓
events: [
{"name":"startup","from":"nope","to":"sleeping"},
{"name":"sleep","from":"following","to":"sleeping"},
{"name":"throw","from":"sleeping","to":"throwing"},
{"name":"follow","from":"throwing","to":"following"}
]
};
let create = function(){
let fsm = StateMachine.create(fsmData);
fsm.ASYNC = StateMachine.ASYNC;
return fsm;
}
module.exports = {create}