// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GM from "../GM";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILevelBug extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    onLoad () 
    {
         this.node.on(cc.Node.EventType.TOUCH_END,this.OnDown,this);

    }
    NNN=0;
    OnDown()
    {
        if(this.NNN++>5)
        {
            GM._Instance.GoLevelLast();
            this.NNN=0;
        }
        this.unscheduleAllCallbacks();
        this.scheduleOnce(this._Clear,0.5);
    }
    _Clear()
    {
        this.NNN=0;
    }

}
