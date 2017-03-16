cc.Class({
    extends: cc.Component,

    properties: {
        //_customUpdateHandler: null,
        // _customEnable: false,
        // customEnable: {
        //     get: function(){
        //         return this._customEnable;
        //     },
        //     set: function(v){
        //         this._customEnable = v;
        //         if(v == true){
        //             //this._customUpdateHandler = this.schedule(this.customUpdate,1/60);
        //             this.schedule(this.customUpdate,1/60);
        //         }else{
        //             //if(this._customUpdateHandler){
        //                 this.unschedule(this.customUpdate);
        //             //}
        //         }
        //     }
        // },
        movePixel: 60,//warning enmey should larger than movePixel
        _startPosition: null,
        _dirVector: null,

        //
        _fsm : null,

        sleepDuration: 5000,
        _sleepTimeStamp: null,

        _player: null
    },


    init: function (player) {
        this._player = player;
        this.node.zIndex = 100;


        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this._sleepTimeStamp = Date.now();

        this._fsm = require("enemy-fsm").create();
        //this._fsm.onthrowing = this.throw.bind(this);
        //this._fsm.onpicking = this.onPicking.bind(this);
        //this._fsm.onleavesleeping = this.onLeaveSleeping.bind(this);
        this._fsm.startup();


    },

    // onLeaveSleeping: function() {
    //     this.node.getChildByName("sleep-rest-duration").active = true;
    // },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'wall'){
            this.onTouchWall();
        }
        if(other.node.group == 'enemy'){
            let otherEnemyControl = other.node.getComponent('enemy-control');
            let selfEnemyControl = self.node.getComponent('enemy-control');
            if(otherEnemyControl._fsm.current == 'following' && selfEnemyControl._fsm.current == 'throwing'){
                otherEnemyControl._sleepTimeStamp = Date.now();
                otherEnemyControl._fsm.sleep();
                selfEnemyControl._sleepTimeStamp = Date.now();
                selfEnemyControl._fsm.sleep();

                this.node.position = this._startPosition;
                //add up score
                window.score += 100;
            }
        }
        if(other.node.group == 'player'){
           let selfEnemyControl = self.node.getComponent('enemy-control');
           if(selfEnemyControl._fsm.current == 'following' ){
               //game over
               if(!window.sceneLoad){
                   window.sceneLoad = true;
                   cc.director.loadScene('game-over-scene');
               }
               
           }
        }
    },

    onTouchWall: function(){
        //this.customEnable = false;
        this._sleepTimeStamp = Date.now();
        this._fsm.sleep();
    },

    // onPicking: function(){

    // },

    pick: function(dropPickControl){
        if(this._fsm.current == 'sleeping'){
            dropPickControl._pickedEnemy = this.node;
            this.node.getChildByName("sleep-rest-duration").getComponent(cc.Label).string = "";
            this.node.removeFromParent(false);
            this._fsm.pick();
        }
    },

    drop: function(dropPickControl){
        dropPickControl._pickedEnemy = null;
        let canvas = cc.find('Canvas');
        canvas.addChild(this.node);
        this.node.position = dropPickControl.node.position;
        this.node.zIndex = 100;

        this._sleepTimeStamp = Date.now();
        this._fsm.sleep();
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

        this._fsm.throw();

        //this.customEnable = true;
    },

    lateUpdate: function(){
        if(this._fsm.current == "throwing"){
            this.node.position = cc.pAdd(this.node.position,cc.pMult(this._dirVector,this.movePixel * 10));
        }else if(this._fsm.current == "sleeping"){
            if(Date.now() - this._sleepTimeStamp > this.sleepDuration){
                this.node.getChildByName("sleep-rest-duration").getComponent(cc.Label).string = "";
                this._fsm.follow();
            }else{
                let string = Math.ceil((this.sleepDuration + this._sleepTimeStamp - Date.now())/1000);
                this.node.getChildByName("sleep-rest-duration").getComponent(cc.Label).string = string;
            }
        }else if(this._fsm.current == 'following'){
            let dirVector = cc.pNormalize(cc.pSub(this._player.position,this.node.position));
            this.node.position = cc.pAdd(this.node.position,cc.pMult(dirVector,this.movePixel));
        }
    },



});
