// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BUUnit from "../Unit/BUUint";


const {ccclass, property} = cc._decorator;


enum ATTMode{
    vmValue=0,
    vmPercent=1,
    vmPure=2,
}

@ccclass
export default class BCAttacky extends cc.Component {

    @property
    Mode: ATTMode = ATTMode.vmValue;

    m_Att: number = 1;
    
    public get ATT() : number {
        return this.m_Att;
    }
    
    public set ATT(v : number) {
        this.m_Att = v;
    }

    @property
    m_Crit: number = 0;

    public get Crit() : number {
        return this.m_Crit;
    }
    
    public set Crit(v : number) {
        this.m_Crit = v;
    }
    
    @property
    Target: cc.Node;

    // bb

    @property
    mOwner: BUUnit = null;
    
    public get Owner() : BUUnit {
        return this.mOwner;
    }
    
    onLoad(){
        //获取bb
    }

    canHitSome(_who: BUUnit): boolean{
        if(this.Target != null && this.Target != _who.node){
            return false;  
        }

        //bb


        return true;
    }

    init(_owner: BUUnit,_att: number,_crit: number){
        this.mOwner = _owner;
        this.ATT = _att;
        this.Crit = _crit;
    }

    static AddAttacky(_who:cc.Node,_owner: BUUnit,_att: number):BCAttacky{
        var tmpAttacky = _who.getComponent(BCAttacky);
        if(tmpAttacky == null){
            tmpAttacky = _who.addComponent(BCAttacky);
        }
        tmpAttacky.mOwner = _owner;
        tmpAttacky.ATT = _att;
        tmpAttacky.Crit = 0;

        return tmpAttacky;
    } 


}