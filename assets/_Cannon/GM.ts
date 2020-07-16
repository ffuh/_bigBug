// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Cannon from "./OBJ/Cannon";
import Level from "./Level/Level";
import WinSuccess from "./UI/WinSuccess";
import UI from "../__Lib/Base/UI";
import { EX } from "../__Lib/EX";
import WinLevel from "./UI/WinLevel";
import WinControl from "./UI/WinControl";
import UILevelWind from "./Level/UILevelWind";
import Home from "./OBJ/Home";
import Win from "../__Lib/Base/Win";
import Follow from "../__Lib/Base/Follow";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GM extends cc.Component 
{

    @property(Follow)
    MainCamera: Follow = null;

    @property
    text: string = 'hello';

    @property (cc.Prefab)
    Mod_WinLevel:WinLevel=null;
    
    @property (cc.Prefab)
    Mod_WinControl:WinControl=null;

    @property (cc.Prefab)
    Mod_Wind:UILevelWind=null;

    @property (cc.Prefab)
    Mod_WinSuccess:WinSuccess=null;
    @property (cc.Prefab)
    Mod_WinFaild:Win=null;

    @property (cc.Prefab)
    Mod_EFF_BGM:cc.Node=null;

    static  CAMERA:Follow;
    static  LEVEL: Level = null;
    static  CANNON: Cannon = null;
    static  HOME   :Home=null;
    static G =500;
    static W =0;
    static  WA_MAX =1000;
    static CONTROLTIME=15;
    static INCONTROLING=false;
    
    static WA(stable:number,hy:number):cc.Vec2
    {
        var xx=  GM.WA_MAX*(GM.W/10)*(1- stable/(100+stable));

        return cc.v2(xx,0);
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        GM.G=-500;

        GM.CAMERA=this.MainCamera;

        cc.director.getCollisionManager().enabled = true; //开启碰撞检测，默认为关闭
        cc.director.getCollisionManager().enabledDebugDraw = true; //开启碰撞检测范围的绘制
        cc.director.getCollisionManager().enabledDrawBoundingBox = true; //开启碰撞组件的包围盒绘制
    }

    start () 
    {
      
        this.schedule(this._Init,0.3);
    }
    _Win_Control :WinControl;
    _Init()
    {
        if(GM.LEVEL==null || GM.CANNON==null|| GM.HOME==null)   
        {
            return;
        }
        this.unscheduleAllCallbacks();

        UI.CreateWindow<WinLevel>(this.Mod_WinLevel);
        
        UI.CreateWindow<UILevelWind>(this.Mod_Wind);

        this._Win_Control= UI.CreateWindow<WinControl>(this.Mod_WinControl)?.getComponent(WinControl);
        this._Win_Control?.Close();

        
        GM.LEVEL.Begin().WaitEnd(result=>
            {
                this._DoSuccess(result);
            });

        GM.CANNON.Begin().WaitShoot(oo=>
            {
               if(oo!=null)
               {
                    GM.CAMERA?.Follow(oo);
               }     

            }).WaitWaiting(w=>
            {
                this._DoEnemyTime();

            }).WaitWaitingOver(w=>
            {
                this._DoPlayTime();
            });    
        
        GM.HOME.WaitDead(w=>
            {
                this._DoFaild();
            });

        if(this.Mod_EFF_BGM!=null)
        {
            cc.instantiate(this.Mod_EFF_BGM).setParent(cc.director.getScene());
        }


    }
    _DoPlayTime()
    {
        GM.INCONTROLING=true;
        this._Win_Control.Show();
        GM.CAMERA?.PosTo(GM.CANNON.GetWorldPosition().add(cc.v2(0,-500)));
    }
    _DoEnemyTime()
    {
        GM.INCONTROLING=false;
    }

    _DoSuccess(f)
    {
        if(this.Mod_WinSuccess!=null)
        {
            var win = UI.CreateWindow<WinSuccess>(this.Mod_WinSuccess);

            if(win!=null && win.getComponent(WinSuccess)!=null)
                win.getComponent(WinSuccess)?.Set(f).WaitMsg((w,m)=>
                    {
                        if(m=="OK")  this._DoNext();
   
                        if(m=="RETRY") this._DoReplay();

                    }).Show();
        }
    }
    _DoFaild()
    {
        if(this.Mod_WinFaild!=null)
        {
            var win = UI.CreateWindow<Win>(this.Mod_WinFaild);

            if(win!=null && win.getComponent(Win)!=null)
                win.getComponent(Win)?.WaitMsg((w,m)=>
                    {
     
                        if(m=="RETRY") this._DoReplay();

                    }).Show();
        }
    }

    _DoNext()
    {
        var name="sc_Level - "+ EX.PrefixInteger(GM.LEVEL.ID+1,3);

        cc.director.loadScene(name);
    }
    _DoReplay()
    {
        var name="sc_Level - "+ EX.PrefixInteger(GM.LEVEL.ID,3);

        cc.director.loadScene(name);
    }




    // update (dt) {}
}
