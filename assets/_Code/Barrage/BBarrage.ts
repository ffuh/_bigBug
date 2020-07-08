// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BB from "./BB";
import BarrageEmission, { BulletInitParams } from "./BarrageEmission";
import Time from "../Time/Time";

const {ccclass, property} = cc._decorator;



@ccclass
export default class BBarrage extends cc.Component {

    //能否开火
    @property
    canFire: boolean = true;

    //发射间隔
    @property
    rate : number = 0

    // //发射数量
    // @property
    // count : number = 0

    //间隔
    public get Rate() : number {
        if(this.rate < 0.1)
            return 0.1
        else
            return this.rate
    }

    // //子弹
    // @property(cc.Prefab)
    // bulletPrefab : BB = null;

    //发射器
    @property(cc.Node)
    emissions: BarrageEmission [] = null;

    //计时器
    _timer: number =0;
    
    //曲线
    //特效
    //音效


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onEnable () {
        if(this.emissions == null || this.emissions.length < 1){
            this.emissions = this.getComponentsInChildren(BarrageEmission);
            this.emissions.forEach(element => {
                element.SetUp(this);
            });
        }
    }


    start () {

    }

    //开启
    Open(){
        this.enabled = true;
        this.canFire = true;
    }

    //关闭
    Close () {
        this.canFire = false;
    }

    //开启id发射器
    OpenByID(_id:number) {
        if(_id <= -1){
            cc.log("id需>0");
            return;
        }
        this.emissions.forEach(element => {
            if (element.id == _id && element.node.active)
                element.Open();
        });
    }

    //关闭id发射器
    CloseByID(_id:number) {
        if(_id <= -1){
            cc.log("id需>0");
            return;
        }
        this.emissions.forEach(element => {
            if (element.id == _id && element.node.active)
                element.Close();
        });
    }
    

    update (dt) {

        if(!this.canFire)
        return;

        while ((Time.time - this._timer) <= this.Rate) {
            return;
        }
        this._timer = Time.time;
        this.Fire(dt);
    }

    //开火
    Fire (dt) {

        this.emissions.forEach(em => {
            if (em.node.active)
            em.Fire(dt);
        });
    }


}
