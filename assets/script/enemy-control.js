cc.Class({
    extends: cc.Component,

    properties: {
        //_customUpdateHandler: null,
        _customEnable: false,
        customEnable: {
            get: function(){
                return this._customEnable;
            },
            set: function(v){
                this._customEnable = v;
                if(v == true){
                    //this._customUpdateHandler = this.schedule(this.customUpdate,1/60);
                    this.schedule(this.customUpdate,1/60);
                }else{
                    //if(this._customUpdateHandler){
                        this.unschedule(this.customUpdate);
                    //}
                }
            }
        },
        movePixel: 20,//warning enmey should larger than movePixel
        _startPosition: null,
        _dirVector: null,

        //
        _fsm : null,
    },

    onLoad: function () {
        this.node.zIndex = 100;

        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this._fsm = require("enemy-fsm").create();
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'wall'){
            this.onTouchWall();
        }
    },

    onTouchWall: function(){
        this.customEnable = false;
    },

    pick: function(dropPickControl){
        dropPickControl._pickedEnemy = this.node;
        this.node.removeFromParent(false);
    },

    drop: function(dropPickControl){
        dropPickControl._pickedEnemy = null;
        let canvas = cc.find('Canvas');
        canvas.addChild(this.node);
        this.node.position = dropPickControl.node.position;
        this.node.zIndex = 100;
    },

    touch: function(dropPickControl){
        dropPickControl._touchEnemy = this.node;
    },

    leave: function(dropPickControl){
        if(dropPickControl._touchEnemy == this.node){
            dropPickControl._touchEnemy = null;
        }
    },

    throw: function(startPosition,dirVector,dropPickControl){
        dropPickControl._pickedEnemy = null;
        this._startPosition = startPosition;
        this._dirVector = dirVector;

        let canvas = cc.find('Canvas');
        canvas.addChild(this.node);
        this.node.position = this._startPosition;
        this.node.zIndex = 100;

        this.customEnable = true;
    },

    customUpdate: function(){
        if(this._startPosition && this._dirVector){
            this.node.position = cc.pAdd(this.node.position,cc.pMult(this._dirVector,this.movePixel));
        }
    },



});
