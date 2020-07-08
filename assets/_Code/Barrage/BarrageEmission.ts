// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BANumberLoop from "./BANumberLoop";
import BB from "./BB";
import BBarrage from "./BBarrage";
import Time from "../Time/Time";

const {ccclass, property} = cc._decorator;

export class BulletInitParams{
    enable: boolean = false;
    pos :   cc.Vec3 = cc.Vec3.ZERO;
    dir :   cc.Vec3 = cc.Vec3.ZERO;
}

@ccclass
export default class BarrageEmission extends cc.Component {

    mOwner: BBarrage = null;

    mBulletParams : Array<BulletInitParams> = new Array<BulletInitParams>();

    @property
    id : number = -1;

    @property(cc.Prefab)
    bulletPrefab : cc.Node

    @property
    canFire: boolean = true;


    @property
    rate : number = 0

    public get Rate() : number {
        if(this.rate < 0.1)
            return 0.1
        else
            return this.rate
    }

    @property
    OffsetLoops : string = "";

    @property
    RangeLoops : string = "";

    @property
    CountLoops : string = "";

    @property
    RangeZoom: number = 1;
    
    mOffsetLoop: BANumberLoop;
    mRangeLoop: BANumberLoop;
    mCountLoop: BANumberLoop;



    _timer: number =0;
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
        this.mOffsetLoop = new BANumberLoop(this.OffsetLoops, 0);
        this.mRangeLoop = new BANumberLoop(this.RangeLoops, 0);
        this.mCountLoop = new BANumberLoop(this.CountLoops, 1);

    }

     update (dt) {

        while ((Time.time - this._timer) <= this.Rate) {
            return;
        }
        this.canFire = true;
     }

    SetUp(_owner: BBarrage) : BarrageEmission {
        this.mOwner =  _owner;
        return this;
    }

    //开启
    Open () {
        this.canFire = true;
    }

    //关闭
    Close () {
        this.canFire = false;
    }

    //开火
    Fire (dt) {
        this._timer = Time.time;
        this.canFire = false;
    }

    //重置
    Reset () {

    }

    //获取发射子弹信息
    GetInitParams () : Array<BulletInitParams> {
        return this.mBulletParams;
    }

    
    public get OffsetNow() : number {
        return this.mOffsetLoop.Num;  
    }

    
    public get RangeNow(): number {
        if (this.RangeZoom == 0)
            this.RangeZoom = 1;
        return this.mRangeLoop.Num * this.RangeZoom;  
    }


    
    public get CountNow(): number {
        if (this.mCountLoop == null)
            return 1;
        return this.mCountLoop.Num; 
    }
    
    
    

}
