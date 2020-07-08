// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import OO from "./OO";
import OBJ from "./OBJ";
import BaseObj from "./BaseObj";
import Edge from "./Edge";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Body extends OBJ {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    Owner:BaseObj;
     onLoad () 
     {
        this.Owner=this.node.parent.getComponent(BaseObj);


     }


    start ()
    {

    }
    onCollisionEnter(other:cc.Collider ,self:cc.Collider)
    {
        console.log("onCollisionEnter:"+other.node.name+":"+self.node.name);
        
        let _edge= other.node.getComponent(Edge);
        if(_edge!=null)
        {

            let att = _edge.Attack(this.GetWorldPosition());

            //威力
            //let power= 
            console.log("att：" +Math.ceil(att));

            let tip= this.Owner.ShowTip( Math.ceil(att).toString());

            if(tip!=null)
            tip.node.color=cc.Color.RED;
        }
        
    }
    // update (dt) {}
}
