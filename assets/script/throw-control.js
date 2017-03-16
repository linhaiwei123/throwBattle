cc.Class({
    extends: cc.Component,

    properties: {
        _dropPickControl: {
            get: function(){
                return this.getComponent('drop-pick-control');
            }
        }
    },

    onLoad: function () {
        cc.find('Canvas').on('mouseup',this.onMouseUp,this)
    },

    onMouseUp: function(e){
        //让我回忆下先。。
        //如果有picked 投掷 
        //碰到墙壁后回到投掷那一刻的位置
        if(this._dropPickControl._pickedEnemy){
            let startPosition = this.node.position;
            let dirVector = cc.pNormalize(this.node.convertToNodeSpaceAR(e.getLocation()));
            let dropPickControl = this._dropPickControl;
            this._dropPickControl._pickedEnemy.getComponent('enemy-control').throw(startPosition,dirVector,dropPickControl);
        }
    }

});
