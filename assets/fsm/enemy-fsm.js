let StateMachine = require('state-machine');
let fsmData = {
initial: 'nope',
//please select the enter-state here ↓
events: [
{"name":"startup","from":"nope","to":"sleeping"},
{"name":"pick","from":"sleeping","to":"picking"},
{"name":"sleep","from":"picking","to":"sleeping"},
{"name":"sleep","from":"following","to":"sleeping"},
{"name":"sleep","from":"throwing","to":"sleeping"},
{"name":"follow","from":"sleeping","to":"following"},
{"name":"throw","from":"picking","to":"throwing"}
]
};
let create = function(){
let fsm = StateMachine.create(fsmData);
fsm.ASYNC = StateMachine.ASYNC;
return fsm;
}
module.exports = {create}