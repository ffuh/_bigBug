// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UIOBJ from "../../__Lib/Base/UIOBJ";
import Shooter from "../OBJ/Shooter/Shooter";
import OO from "../OBJ/OO";
import GM from "../GM";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIShooter extends UIOBJ {

    @property(cc.Sprite)
    ICON: cc.Sprite = null;



    Shooter:  Shooter ;
    onLoad () 
    {
         this.node.on(cc.Node.EventType.TOUCH_END,this.onSelect,this);
    }
    Set(sh:  Shooter):UIShooter
    {
        if(sh==null)
        {
            this.node.active=false; return;
        }
        if(this.Shooter==sh)    return;
        this.Shooter =sh;
        if(this.ICON!=null && this.Shooter!=null)
            this.ICON.spriteFrame = this.Shooter.GetICON();
        return this;
    }
    onSelect()
    {
        if(GM.CANNON!=null)
            GM.CANNON.UseShootEx(this.Shooter);
    }

 
}
