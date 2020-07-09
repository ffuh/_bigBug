// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Hatcher from "./Hatcher";
import LevelClock from "./LevelClock";
import ClockObj from "../OBJ/ClockObj";
import Cannon from "../OBJ/Cannon";
import LevelWind from "./LevelWind";
import GM from "../GM";


    const {ccclass, property} = cc._decorator;

    @ccclass
    export default class Level extends cc.Component {
    
        @property
        ID:number=1;

        @property
        Life:number=180;
        @property
        WindForce:number =100;
        @property
        WindStable:number =100;

        _CLOCK:LevelClock;
        _MY :Cannon;
        _Wind :LevelWind;
        start () 
        {
            this._CLOCK =this.getComponent(LevelClock);
            this._Wind =this.getComponent(LevelWind);

            this._MY =this.getComponentInChildren(Cannon);
            this._Wind =this.getComponent(LevelWind);


            GM.LEVEL=this;


            this.scheduleOnce(this.Begin,2);


        }
        _OnAddObj(who:ClockObj)
        {
            if(who==null)   return;
            
            if(this._CLOCK!=null )
                this._CLOCK.Add(who,1);
        }
        Begin()
        {
            if( this._MY !=null)
            {
                this._MY.Name="MY";
                this._OnAddObj(this._MY);
            }



            let _hatches =this.getComponentsInChildren(Hatcher);

            _hatches?.forEach((hhh)=>
            {
                hhh.Live().WaitHatch(this._OnAddObj.bind(this) );
            })


            if(this._CLOCK!=null)
            {
                this._CLOCK.Wait((who:ClockObj)=>
                {
                    who.DoTurn();
                }).Run();
            }
            if(this._Wind!=null)
            {
                this._Wind.Set(this.WindForce,this.WindStable).Reset();
            }

        }

        End()
        {

        }
        Winding():number { return this._Wind==null?0:this._Wind.Now;}
    }


