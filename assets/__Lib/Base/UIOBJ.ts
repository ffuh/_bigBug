// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import OBJ from "./OBJ";


const {ccclass, property} = cc._decorator;


@ccclass
export default class UIOBJ extends OBJ 
{
  
    onEnable()
    {
        this.unschedule(this._DoShow);
        this.scheduleOnce(this._DoShow,0.1);
    }
    
    Show():UIOBJ
    {
        this.unschedule(this._DoShow);
        this.scheduleOnce(this._DoShow,0.1);
    
        return this;
    }
    private _DoShow() 
    {
        this.OnShow();
    }
    OnShow()
    {

    }

    Close():UIOBJ
    {
        this.unschedule(this._DoClose);
        this.scheduleOnce(this._DoClose,0.1);
    
        return this;
    }
    private _DoClose() 
    {
        this.Dead();
        this.OnClose();
    }
    OnClose()
    {

    }
}
