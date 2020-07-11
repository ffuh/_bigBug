// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseObj from "./BaseObj";
import GM from "../GM";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Home extends BaseObj{

    onLoad()
    {
        GM.HOME=this;
    }

    BeEated(d)
    {
        this.NowHP-=d;
        if(this.NowHP<=0)
            this.Dead();
    }
    
}
