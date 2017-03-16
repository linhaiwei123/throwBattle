cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label
    },

    onLoad: function () {
        this.node.on("touchstart",this.restart.bind(this));
        this.scoreLabel.string = 'your score: ' + window.score;
    },

    restart: function(){
         //window.score = 0;
         cc.director.loadScene('main-scene');
    },

    onDestroy: function(){
        this.node.off("touchstart",this.restart.bind(this));
    }
});
