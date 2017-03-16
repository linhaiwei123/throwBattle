cc.Class({
    extends: cc.Component,

    properties: {
        _touchEnemy: null,
        _pickedEnemy: null,
    },

     onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;


        cc.systemEvent.on("keyup", this.onKeyUp, this);
        this.node.zIndex = 1000;
    },

    onCollisionEnter: function(other,self) {
        if(other.node.group == 'enemy'){
            this.onTouchEnemy(other,self);
        }
    },

    onCollisionExit: function(other,self) {
        if(other.node.group == 'enemy'){
            this.onLeaveEnemy(other,self);
        }
    },

    onTouchEnemy: function(other,self){
        other.node.getComponent('enemy-control').touch(this);
    },

    onLeaveEnemy: function(other,self){
        other.node.getComponent('enemy-control').leave(this);
    },

    onKeyUp: function(e){
        if(e.keyCode == cc.KEY.space){
            this.onSpaceUp();
        }
    },

    onSpaceUp: function(){
        if(this._pickedEnemy){this._pickedEnemy.getComponent('enemy-control').drop(this)}
        if(this._touchEnemy){this._touchEnemy.getComponent('enemy-control').pick(this)}
    }

});
