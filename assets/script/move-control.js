cc.Class({
    extends: cc.Component,

    properties: {
        //move prop
        _left: false,
        _right: false,
        _up: false,
        _down: false,
        movePixel: 5,

        //block prop
        _leftBlock: false,
        _rightBlock: false,
        _upBlock: false,
        _downBlock: false,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

        cc.systemEvent.on("keydown", this.onKeyDown, this);
        cc.systemEvent.on("keyup", this.onKeyUp, this);
    },

    onKeyDown: function(e){
        switch(e.keyCode){
            case cc.KEY.w : {this._up = true;break;}
            case cc.KEY.s : {this._down = true;break;}
            case cc.KEY.a : {this._left = true;break;}
            case cc.KEY.d : {this._right = true;break;}
        }
    },

    onKeyUp: function(e){
        switch(e.keyCode){
            case cc.KEY.w : {this._up = false;break;}
            case cc.KEY.s : {this._down = false;break;}
            case cc.KEY.a : {this._left = false;break;}
            case cc.KEY.d : {this._right = false;break;}
        }
    },

    onCollisionEnter: function(other,self){
        //console.log("collision");
        //console.log(other.node.group);
        if(other.node.group == 'wall'){
            this.onTouchWall(other,self);
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'wall'){
            this.onLeaveWall(other,self);
        }
    },

    onTouchWall: function(other,self){
        let wallName = other.node.name;
        let dir = wallName.split("-")[0];
        let blockPropName = "_" + dir + 'Block';
        this[blockPropName] = true;
    },

    onLeaveWall: function(other,self){
        let wallName = other.node.name;
        let dir = wallName.split("-")[0];
        let blockPropName = "_" + dir + 'Block';
        this[blockPropName] = false;
    },

    lateUpdate: function(){
        let moveStep = cc.v2(0,0);
        if(this._left && !this._leftBlock){moveStep.x -= this.movePixel};
        if(this._right && !this._rightBlock){moveStep.x += this.movePixel};
        if(this._up && !this._upBlock){moveStep.y += this.movePixel};
        if(this._down && !this._downBlock){moveStep.y -= this.movePixel};

        this.node.position = cc.pAdd(this.node.position,moveStep);
    }

});
