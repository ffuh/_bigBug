// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BUUnit from "../Unit/BUUint";
import BCAttacky from "./BCAttacky";

const {ccclass, property} = cc._decorator;

enum BCombatMathOption{
    cdFixed = 0,
    cdByOwner = 1,
    cdDiviedByCount = 2,
}

enum BCAvailableModel{
    amALL = 0, //所有
    amFixed = 1, //只有这个
    amExcept = 2, //除了是这个
    amLarger = 3, //大于等于
    amSmaller = 4,//小于等于
}

@ccclass
export default class BCombater extends cc.Component {

    @property
    BaseAtt: number  = 0

    @property
    AutoStart: boolean = false;

    @property
    Delay: number = 0;

    @property
    duration: number = 1;

    @property
    startSpeed: number = 1;

    @property
    CombatModel: BCombatMathOption = BCombatMathOption.cdFixed;

    @property
    CombatFactor: number = 1

    //声音
    
    //开火音效

    @property
    MinDurationFire: number = 0.2;

    @property
    mOwner: BUUnit;

    @property
    Running: boolean = false;



    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    onEnable(){

    }

    start () {
        if(this.AutoStart){
            open();
        }
    }

    // update (dt) {}

    onDisable(){
        close();
    }

    setUp(_obj:any[]){

    }

    
    public get Duration() : number {
        return this.duration;
    }
    
    
    public get StartSpeed() : number {
        return this.StartSpeed * 0.9;
    }

    
    public get Owner() : BUUnit {
        return this.mOwner;
    }
    

    open(){
        if(this.Running){
            return;
        }

        this.Running = true;
        //播放音效
    }

    close(){
        this.Running = false;
        //播放音效
    }

    mLastLoopFire:number;
    onLoopShot(){
        if(this.Running){
            if(this.mLastLoopFire > this.MinDurationFire){
                //音效?? 
            }
        }
    }

    AddAttacky(_obj: cc.Node,_count: number):BCAttacky{
        var _att = BCAttacky.AddAttacky(_obj,this.Owner,0);
        var _ownerPoint = this.CombatFactor;

        return _att;
    }


    checkActiveCom(_obj:any){
        //BAActive
    }


}
