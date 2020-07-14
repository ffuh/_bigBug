// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GM from "../GM";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIYawSetting extends cc.Component {


    @property 
    Speed:number =5;
    onLoad()
    {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onMouseDown,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onMouseUp,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onMouseUp,this);
    }
    _Touching=false;
    onMouseDown(event)
    {
        this._Touching=true;

    }
    onMouseUp(event)
    {
        this._Touching=false;
    }

    update(dt)
    {
        if(this._Touching)
            GM.CANNON.YawAdd(dt*this.Speed);
    }


}
