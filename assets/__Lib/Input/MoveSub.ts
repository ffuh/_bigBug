// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MoveSub extends cc.Component {

    @property
    SpeedFactor:number = 1;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    DoMove(pos:cc.Vec2)
    {
        this.node.position=  this.node.position.add( cc.v3(  pos.mul(this.SpeedFactor)));
    }

    // update (dt) {}
}
