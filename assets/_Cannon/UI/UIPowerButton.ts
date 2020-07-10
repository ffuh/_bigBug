// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GM from "../GM";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIPowerButton extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
       // this._Button=this.getComponent(cc.Button);
        this.node.on(cc.Node.EventType.TOUCH_START,this.onMouseDown,this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onMouseUp, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onMouseUp, this);
    }
    //_Button:cc.Button;
    start () 
    {
        
    }
    onMouseDown()
    {
        GM.CANNON.PowerBegin();
    }
    onMouseUp()
    {
        GM.CANNON.PowerEnd();
    }
    // update (dt) {}
}
