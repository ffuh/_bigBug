// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Cannon from "./OBJ/Cannon";
import Level from "./Level/Level";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GM extends cc.Component 
{

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    static  LEVEL: Level = null;
    static  CANNON: Cannon = null;
    static  LEVEL:Level=null;
    static G =500;
    static W =0;
    static  WA_MAX =1000;
    

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        GM.G=-500;

        cc.director.getCollisionManager().enabled = true; //开启碰撞检测，默认为关闭
        cc.director.getCollisionManager().enabledDebugDraw = true; //开启碰撞检测范围的绘制
        cc.director.getCollisionManager().enabledDrawBoundingBox = true; //开启碰撞组件的包围盒绘制
    }

    start () {

    }

    static WA(stable:number,hy:number):cc.Vec2
    {
        var xx=  GM.WA_MAX*(GM.W/10)*(1- stable/(100+stable));

        return cc.v2(xx,0);
    }

    // update (dt) {}
}
