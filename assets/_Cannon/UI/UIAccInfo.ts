// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ACC from "../ACC";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    uiGold: cc.Label = null;

    @property
    text: string = 'hello';



    start () 
    {

    }
    _passed =0;
    update (dt) 
    {
        this._passed+=dt;
        if(this._passed<0.5)    return;
        this._passed=0;
        
        if(this.uiGold!=null && ACC.SAVING!=null)
        {
            this.uiGold.string =ACC.SAVING.Gold.toString();
        }
    }
}
