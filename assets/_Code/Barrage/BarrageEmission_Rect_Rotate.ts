// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BarrageEmission, { BulletInitParams } from "./BarrageEmission";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BarrageEmission_Rect_Rotate extends BarrageEmission {

    @property(cc.Label)
    random: boolean = false;

    @property
    agnle: number;

    @property
    count: number;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    Reset() {
        if (this.mBulletParams.length != this.count) {
            if (this.mBulletParams.length < this.count)
                this.mBulletParams.push(new BulletInitParams[this.count - this.mBulletParams.length])
            else {
                for (let i = 0; i < this.mBulletParams.length; i++) {
                    if (this.mBulletParams != null)
                        this.mBulletParams[i].enable = false;
                    
                }
            }
        }
    }


    // GetInitParams(): Array<BulletInitParams> {

        







    // }


}
