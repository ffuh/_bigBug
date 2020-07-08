// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class OBJ extends cc.Component {

    GetWorldPosition():cc.Vec2
    {   
          return this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
    }
    GetWorldPositionX(dpos:cc.Vec2):cc.Vec2
    {   
          return this.node.convertToWorldSpaceAR(dpos);
    }

    
    SetWorldPosition(pos:cc.Vec2)
    {

        this.node.position =cc.v3( this.node.parent.convertToNodeSpaceAR(pos));

    }
    Life :number;
    onEnable()
    {
        this.Life=0;
    }
}
