// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BBarrage from "./BBarrage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Barrage_TTTTT extends cc.Component {

    @property(cc.Button)
    btn: cc.Button = null;

    @property(cc.Node)
    barrage: BBarrage = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        if(this.btn == null)
            this.btn = this.getComponent(cc.Button);
        
        this.btn.node.on("click",this.OnClick);
    }

    OnClick(){
        this.barrage.canFire = !this.barrage.canFire;
        if(this.barrage.canFire)
            this.btn.getComponentInChildren(cc.Label).string = "已开火"
        else
            this.btn.getComponentInChildren(cc.Label).string = "已关闭"
    }

    // update (dt) {}
}
