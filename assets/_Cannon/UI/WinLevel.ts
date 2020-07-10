// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GM from "../GM";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinLevel extends cc.Component {

    @property(cc.Label)
    EnmCount: cc.Label ;

    @property(cc.Sprite)
    Progress: cc.Sprite = null;

    @property(cc.Label)
    ProcentText: cc.Label ;


    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
      
    }


        start () 
        {

        }

    update (dt) 
    {
        if(this.Progress!=null && GM.LEVEL!=null)
            this.Progress.fillRange= GM.LEVEL.Progress();

        if(this.ProcentText!=null && GM.LEVEL!=null)
            this.ProcentText.string =Math.ceil(GM.LEVEL.Progress()*100).toString()+"%";


        if(this.EnmCount!=null && GM.LEVEL!=null)
            this.EnmCount.string =GM.LEVEL.GetEnemyCount().toString();
    }
}
