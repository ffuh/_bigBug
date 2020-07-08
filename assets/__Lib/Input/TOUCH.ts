// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
export namespace NL.Input
{
    const {ccclass, property} = cc._decorator;

    @ccclass
    export  class TOUCH extends cc.Component 
    {
        @property(cc.Rect)
        Bound :cc.Rect;
    
        onLoad () 
        {
            this.node.on(cc.Node.EventType.TOUCH_MOVE,this.OnTouchMove,this);
        }
        OnTouchMove(touch :cc.Touch)
        {
            let dd =touch.getDelta();

            let pos= this.node.position.sub(cc.v3(dd));

            if(pos.x<this.Bound.xMin)
                pos.x=this.Bound.xMin;
            if(pos.x>this.Bound.xMax)
                pos.x=this.Bound.xMax;    

            if(pos.y<this.Bound.yMin)
                pos.y=this.Bound.yMin;
            if(pos.y>this.Bound.yMax)
                pos.y=this.Bound.yMax;    


            this.node.position=pos;
        }
        // update (dt) {}
    }
}

