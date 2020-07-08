// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ClockObj from "../OBJ/ClockObj";


export class ActionObj 
{
    Obj:ClockObj;
    Waiting:number;
    constructor(obj:ClockObj,waiting:number)
    {
        this.Obj=obj;
        this.Waiting=waiting;
    }
    Update(dt:number):ActionObj
    {
        this.Waiting-=dt;
        return this;
    }


}


const {ccclass, property} = cc._decorator;
@ccclass
export default class LevelClock extends cc.Component {

    _ObjArr:Array<ActionObj>;


    Add(obj:ClockObj,waiting:number):LevelClock
    {
        if(this._ObjArr==null)
            this._ObjArr=new Array<ActionObj>();


        this._ObjArr.forEach(e => 
        {
            if(e.Obj.Name==name)
            {
                e.Waiting+=waiting;
                return this;
            }
        })

        this._ObjArr.push(new ActionObj(obj,waiting));

        return this;
    }

    _OneTurn(who:ClockObj)
    {

        if(this._ONClock!=null)  this._ONClock(who);
    }

    _ONClock:(who:ClockObj)=>void;

    Wait(callback: (who:ClockObj)=>void):LevelClock
    {
        this._ONClock=callback;
        return this;
    }
    _Runing:boolean;
    Run():LevelClock
    {
        this._Runing =true; return this;
    }
    Pause():LevelClock
    {
        this._Runing =false; return this;
    }
    update(dt)
    {
        if(!this._Runing)
            return;

        if(this._ObjArr==null || this._ObjArr.length<1)
            return;

        this._ObjArr.forEach(e => 
        {
           
            if(e.Update(dt).Waiting<=0)
            {
                this._OneTurn(e.Obj);
            }
        });
    }
}
