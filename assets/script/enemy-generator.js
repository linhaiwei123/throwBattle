cc.Class({
    extends: cc.Component,

    properties: {
       enemyPrefabArray: [cc.Prefab],
       player: cc.Node,
       generateDeltaDuration: 12,
       generateTimes: 10,
    },

   
    onLoad: function () {
        window.score = 0;
        window.sceneLoad = false;
        this.generator();

        this.schedule(this.generator,this.generateDeltaDuration,this.generateTimes);
    },

    generator: function(){
        let length = this.enemyPrefabArray.length;
        let randomIdx = Math.floor(Math.random() * length);
        let enemy = cc.instantiate(this.enemyPrefabArray[randomIdx]);
        cc.find('Canvas').addChild(enemy);
        let position = null;
        let sign = Math.sign(cc.randomMinus1To1());
        if(sign == 0){sign = 1}
        if(Math.random() >= 0.5){
            position = cc.v2(cc.randomMinus1To1() * 417, sign * 260);
        }else{
            position = cc.v2(sign * 417, cc.randomMinus1To1() * 260);
        }
        enemy.getComponent('enemy-control').init(this.player);
        enemy.position = position;
    }
    
});
