// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GM from "../GM";
import Win from "../../__Lib/Base/Win";
import UIShooter from "./UIShooter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinControl extends Win {

    @property(cc.Label)
    Yaw: cc.Label = null;

    @property(cc.Label)
    PowerNum: cc.Label = null;

    @property(cc.Sprite)
    Powering: cc.Sprite = null;

    uiShooters :UIShooter[];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start ()
    {
        this.uiShooters=this.getComponentsInChildren(UIShooter);
    }

    update (dt) 
    {
        if(this.Yaw!=null && GM.CANNON!=null)
        {
            this.Yaw.string=GM.CANNON.Yawing.toString();
        }
        if(this.PowerNum!=null && GM.CANNON!=null)
        {
            
            this.PowerNum.string=Math.floor(GM.CANNON.Powering).toString();
        }
        if(this.Powering!=null && GM.CANNON!=null)
        {
            
            this.Powering.fillRange= GM.CANNON.Powering/100;
        }

        if(this.uiShooters!=null && GM.CANNON!=null)
        {
            var NN=0;
            this.uiShooters.forEach(ui=>
                {
                    ui.Set(GM.CANNON.GetShoot(NN++));
                })
        }


    }
}
