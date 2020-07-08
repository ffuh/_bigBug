// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseObj from "./BaseObj";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ClockObj extends BaseObj 
{
    @property
    TurnLife:number=2;

    TurnLifeLeft=0;
    DoTurn():ClockObj
    {
        this.TurnLifeLeft=this.TurnLife;



        this.OnTurn();

        if(this._ONTurn!=null)
            this._ONTurn(this);
        return this;
    }
    TurnOver():ClockObj
    {
        this.OnTurnOver();
        if(this._ONTurnOver!=null)
            this._ONTurnOver(this);
        return this;
    }

    OnTurn()
    {
        

    }
    OnTurnOver()
    {
        

    }

    _ONTurn:(who:ClockObj)=>void ;
    WaitTurn(on:(who:ClockObj)=>void ):ClockObj
    {
        this._ONTurn=on;
        return this;
    }

    _ONTurnOver:(who:ClockObj)=>void ;
    WaitTrunOver( on:(who:ClockObj)=>void  ):ClockObj
    {
        this._ONTurnOver=on;
        return this;
    }


    update(dt)
    {


        if(this.TurnLifeLeft>0)
        {
            this.TurnLifeLeft-=dt;
            if(this.TurnLifeLeft<=0)
                this.TurnOver();
        }
            
    }
}
