// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import HTTP from "../__Lib/HTTP/HTTP";
import GM from "./GM";
import Level from "./Level/Level";
import INI from "../__Lib/INI/Ini";

const {ccclass, property} = cc._decorator;
export class ACCSaving 
{
    Level=1;
    Gold=0;
    constructor(_ini:string)
    {
        this.FromIni(  _ini);
    }


    SetLevel(level):ACCSaving
    {
        this.Level=level;
        return this;
    }
    SetGold(gold):ACCSaving
    {
        this.Gold=gold;
        return this;
    }

    FromIni( _ini:string)
    {
        var json =  INI.IniToJson(_ini);

        var data= INI.FromJsonString( json);
        try
        {
            this.Level =data.level;
        }catch{}

        try
        {
            this.Gold =data.gold;
        }catch{}
    }
    ToIni():string
    {
        return "level="+this.Level.toFixed(0) 
             +",gold="+this.Gold.toFixed(0);
    }



}

@ccclass
export default class ACC extends cc.Component {

    @property
    ACCID:string="acc";

    @property 
    URL_Record_Get:string="Saving/Get_JS";
    @property
    URL_Record_Set:string="Saving/Up";

    static SAVING:ACCSaving;

    static LOADOK:boolean;

    onLoad()
    {
        cc.game.addPersistRootNode(this.node);
        ACC.LOADOK=false;
    }

    start()
    {
        
        this._ReadRecordFromWeb("saving",()=>
        {
            ACC.LOADOK=true;
        });



        //this.SAVING =new ACCSaving ("level=1,gold=2");

        //this.SAVING.SetGold(10);

        //this._SaveRecordToWeb("saving",this.Saving.ToIni());
    }

    

    GetSaving()
    {

    }
    SetSaving( _saving:string)
    {

    }

    _ReadRecordFromWeb(name,on:()=>void)
    {
        //Saving/Get_JS?_game=SpeedJumper&_name=Leveling&_acc=acc
        HTTP.Request(this.URL_Record_Get,this.node)
            .SetForm(["_acc",this.ACCID,"_game",GM.GAMENAME,"_name",name]).Wait(( (sucess,r)=>
            {
                var info= JSON.parse(r);

                ACC.SAVING=new ACCSaving(info.saving);
       
                on?.call(this);

            } ).bind(this));
            
    }
    _SaveRecordToWeb(name,value)
    {
        //_game=Bigbug&_name=saving&_acc=acc&_saving=level1
        HTTP.Request(this.URL_Record_Set,this.node)
            .SetForm(["_acc",this.ACCID,"_game",GM.GAMENAME,"_name",name,"_saving",value]).Wait(( (sucess,r)=>
            {

            } ).bind(this));
    }

}
