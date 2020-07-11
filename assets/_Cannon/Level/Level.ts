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
import GM from "../GM";
import Enemy from "../OBJ/Enemy";
import LevelWind from "./LevelWind";
import { EX } from "../../__Lib/EX";
import UIOBJ from "../../__Lib/Base/UIOBJ";
import UI from "../../__Lib/Base/UI";
import WinSuccess from "../UI/WinSuccess";




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

        @property (cc.Prefab)
        Mod_WinSuccess:WinSuccess=null;
        @property (cc.Prefab)
        Mod_WinFaild:WinSuccess=null;


        _CLOCK:LevelClock;
        _MY :Cannon;

        _Lifing=0;
        _Runing=false;
        _Enmes:Array<Enemy>;
        _Wind :LevelWind;
        start () 
        {
            GM.LEVEL = this;
            
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
            let _enm:Enemy = who.getComponent(Enemy);
  
            if(_enm!=null)
            {
                this._Enmes.push(
                    _enm.WaitDead((w=>
                    {
                    EX.ListRemove(this._Enmes,w);

                    }).bind(this))
                    );

            }





        }
        Begin()
        {
            this._Enmes=new Array<Enemy>();
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

            this._Lifing=0;
            this._Runing=true;
            if(this._Wind!=null)
            {
                this._Wind.Set(this.WindForce,this.WindStable).Reset();
            }

        }
        EndResult=0;
        End(result)
        {
            this.EndResult =result;

            this._Runing=false;

            if(result>0)
            {
                this.__DoSuccess(result);
            }else
            {
                this.__DoFaile();
            }

        }
        private __DoSuccess(factor)
        {
            
           
            if(this.Mod_WinSuccess!=null)
            {
                var win = UI.CreateWindow<WinSuccess>(this.Mod_WinSuccess);

                if(win!=null && win.getComponent(WinSuccess)!=null)
                    win.getComponent(WinSuccess).Set(factor).Show();
            }
            
        }
        private __DoFaile()
        {
            if(this.Mod_WinFaild!=null)
            {
                var win = UI.CreateWindow<WinSuccess>(this.Mod_WinFaild);

                if(win!=null && win.getComponent(WinSuccess)!=null)
                    win.getComponent(WinSuccess).Set(factor).Show();
            }

        }
        Progress():number  {  return this._Runing?this._Lifing/this.Life:0;     }
        GetEnemyCount() { return  this._Enmes==null?0:this._Enmes.length;  }
        
       
        private __Passcheck=0;
        update(dt)
        {
            if(!this._Runing)      return;

            this._Lifing+=dt;

            if(this._Lifing>this.Life)
                this._Lifing=this.Life;

            this.__Passcheck+=dt;

            if(this.__Passcheck<1)
                return;

            this.__Passcheck=0;

            var _end =this._CheckEnd();
            if(_end !=0)
            {
                this.End(_end);
            }
            
        }
        Winding():number { return this._Wind==null?0:this._Wind.Now;}

        private  _CheckEnd():number
        {
            if(this._Lifing>this.Life)
            {
                return this._Enmes.length<=0?1:0;
            }else
            {
                let _hatches =this.getComponentsInChildren(Hatcher);

                return (_hatches==null || _hatches.length<  1) &&  this._Enmes.length<=0  ?2:0;
            }
        }
    }


