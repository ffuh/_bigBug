// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UIOBJ from "../../__Lib/Base/UIOBJ";
import Win from "../../__Lib/Base/Win";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinSuccess extends Win {

    @property(cc.Button)
    btOK: cc.Button = null;
    @property(cc.Button)
    btRetry: cc.Button = null;

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


    // OnMsgCall(m)
    // {
    //     if(m=="OK")  this._DoNext();
   
    //     if(m=="RETRY") this._DoReplay();
    // }
    // _DoNext()
    // {

    // }
    // _DoReplay()
    // {
    //     var now=cc.director.getScene().name;
    //     cc.director.loadScene(now);

    // }
    // update (dt) {}
}
