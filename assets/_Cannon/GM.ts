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

const {ccclass, property} = cc._decorator;

@ccclass
export default class GM extends cc.Component 
{

    @property(cc.Label)
    label: cc.Label = null;

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
    Mod_WinFaild:WinSuccess=null;

    static  LEVEL: Level = null;
    static  CANNON: Cannon = null;
    static G =500;
    static W =0;
    static  WA_MAX =1000;
    
    static WA(stable:number,hy:number):cc.Vec2
    {
        var xx=  GM.WA_MAX*(GM.W/10)*(1- stable/(100+stable));

        return cc.v2(xx,0);
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        GM.G=-500;

        cc.director.getCollisionManager().enabled = true; //开启碰撞检测，默认为关闭
        cc.director.getCollisionManager().enabledDebugDraw = true; //开启碰撞检测范围的绘制
        cc.director.getCollisionManager().enabledDrawBoundingBox = true; //开启碰撞组件的包围盒绘制
    }

    start () 
    {
      
        this.scheduleOnce(this._Init,0.3);
    }

    _Init()
    {
        if(GM.LEVEL==null || GM.CANNON==null)   
        {
            this.scheduleOnce(this._Init,0.3);
            return;
        }


        UI.CreateWindow<WinLevel>(this.Mod_WinLevel);
        UI.CreateWindow<WinControl>(this.Mod_WinControl);
        UI.CreateWindow<UILevelWind>(this.Mod_Wind);
        
        GM.LEVEL.Begin().WaitEnd(result=>
            {
                this._DoSuccess(result);
            });
        

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

    _DoNext()
    {
        var name="sc_Level - "+ EX.PrefixInteger(GM.LEVEL.ID+1,3);

        cc.director.loadScene(name);
    }
    _DoReplay()
    {
        var now=cc.director.getScene().name;
        cc.director.loadScene(now);
    }




    // update (dt) {}
}
