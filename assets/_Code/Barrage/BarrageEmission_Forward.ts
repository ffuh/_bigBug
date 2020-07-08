// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BarrageEmission, { BulletInitParams } from "./BarrageEmission";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BarrageEmission_Forward extends BarrageEmission {

    Reset() {
        if (this.mBulletParams.length <= 0)
            this.mBulletParams.push(new BulletInitParams());
    }

    GetInitParams(): Array<BulletInitParams> {
        this.mBulletParams[0].dir = this.node.up;
        this.mBulletParams[0].pos = this.node.position;
        this.mBulletParams[0].enable = true;
        return this.mBulletParams;
    }

    Fire (dt) {
        cc.log("fire");
    }

}
