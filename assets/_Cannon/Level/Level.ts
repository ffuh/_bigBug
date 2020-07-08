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


    const {ccclass, property} = cc._decorator;

    @ccclass
    export default class Level extends cc.Component {
    

        ID:number=1;
        Life:number=180;

        _CLOCK:LevelClock;
        _MY :Cannon;
        start () 
        {
            this._CLOCK =this.getComponent(LevelClock);
            this._MY =this.getComponentInChildren(Cannon);

            this.scheduleOnce(this.Begin,2);


        }
        _OnObj(who:ClockObj)
        {
            if(who==null)   return;
            
            who.WaitTrunOver((who)=>
            {
                console.log("ONAction:"+who.Name);
                 this._CLOCK.Add(who,5);

                if(who!=null && who.Name=="MY")
                {
                    this._CLOCK.Run();

                }

            }).WaitTurn((who:ClockObj)=>
            {
                if(who!=null && who.Name=="MY")
                {
                    this._CLOCK.Pause();

                }
            })  ;   
            
            if(this._CLOCK!=null )
                this._CLOCK.Add(who,1);
        }
        Begin()
        {
            if( this._MY !=null)
            {
                this._MY.Name="MY";
                this._OnObj(this._MY);


            }



            let _hatches =this.getComponentsInChildren(Hatcher);

            _hatches?.forEach((hhh)=>
            {
                hhh.Live().WaitHatch(this._OnObj.bind(this));
            })


            if(this._CLOCK!=null)
            {
                this._CLOCK.Wait((who:ClockObj)=>
                {
                    who.DoTurn();
                }).Run();
            }


        }

        End()
        {

        }

    }


