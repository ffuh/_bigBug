// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
export enum  OBJState
{
    osNone=0,
    osLiving=1,
    osDead=2,
}
@ccclass
export default class OBJ extends cc.Component 
{
    static OBJ_UDD=14151;

    @property
    UDD:number;

    State: OBJState = OBJState.osNone;

    NameUDD():string{return  this.node.name+"["+this.UDD.toString()+"]"; }



    GetWorldPosition():cc.Vec2
    {   
          return this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
    }
    GetWorldPositionX(dpos:cc.Vec2):cc.Vec2
    {   
          return this.node.convertToWorldSpaceAR(dpos);
    }

    
    SetWorldPosition(pos:cc.Vec2):OBJ
    {

        this.node.position =cc.v3( this.node.parent.convertToNodeSpaceAR(pos));
        return this;
    }
    Lifing :number;
    onEnable()
    {
       this.Live();
    }
    Live():OBJ
    {
        this.UDD=OBJ.OBJ_UDD++;


        this.Lifing=0;
        this.State= OBJState.osLiving;




        this.OnLive();

        return this;
    }
    OnLive()
    {

    }
    Dead()
    {
        this.State= OBJState.osDead;
        this.scheduleOnce(this._DoDead,0.02);
        this.OnDead();
        return this;
    }

    OnDead()
    {

    }
    _DoDead()
    {
        this.node.destroy();
    }
    update(dt)
    {
        if(this.State!=OBJState.osLiving)   return;
        this.Lifing+=dt;
    }
}
