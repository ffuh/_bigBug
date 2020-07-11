// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UIOBJ from "../../__Lib/Base/UIOBJ";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinSuccess extends UIOBJ {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    private  __EndResult:number;
    Set(result:number):WinSuccess
    {
        this.__EndResult =result;
        return this;
    }
    OnShow()
    {
        super.OnShow();
    }


    // update (dt) {}
}
