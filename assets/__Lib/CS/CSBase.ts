// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseObj from "../../_Cannon/OBJ/BaseObj";
import OBJ from "../../_Cannon/OBJ/OBJ";

const {ccclass, property} = cc._decorator;


export enum  DeadActionOption
{
    daNone=0,
    daDestroy=1,
    daDisactive=2,
}

@ccclass
export default class CSBase extends cc.Component {
    



    @property
    Life: number =1;
    @property
    Delay: number =0;

    @property
    DeadAction: DeadActionOption = DeadActionOption.daNone;



    Living:boolean=false;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () 
    {

    }
    onEnable()
    {
        this.Living=false;

        this.OnWake();
        if(this.Delay>0)
            this.schedule(this._Live,this.Delay);
        else
            this._Live();
    }

    OnWake()
    {

    }
        
    private  _Live()
    {
        this.Living=true;

        this.OnLive();
        
    }



    protected  OnLive()
    {
        this.schedule(this._DoDead,this.Life);
    }
    protected OnDead()
    {

    }

    private _DoDead()
    {
        this.Living=false;
        this.OnDead();

        switch(this.DeadAction)
        {
            case DeadActionOption.daDestroy:
                this.node.destroy();break;
            case DeadActionOption.daDisactive:
                this.node.active=false;break;    
        }
    }
    
    
}
