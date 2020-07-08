// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import OBJ from "./OBJ";
import GM from "../GM";



    const {ccclass, property} = cc._decorator;

    @ccclass
    export default  class OO extends OBJ {
    
        @property(cc.Label)
        label: cc.Label = null;
    
        @property
        ATT: number = 900;
    
        // LIFE-CYCLE CALLBACKS:
    
        // onLoad () {}
        Speed:cc.Vec2;
        start () 
        {
    
        }

        Set(_speed:cc.Vec2):OO
        {
            this.Speed =_speed;
            return this;
        }
        Reset(_speed:cc.Vec2):OO
        {

            return this;
        }
    
        update (dt) 
        {
    
            this.Speed=this.Speed.add( cc.v2(0,GM.G*dt));

            let _dpos =  this.Speed.mul(dt);

            let _newpos=this.node.position.add(cc.v3(_dpos)  );

            this.node.setPosition(_newpos);

            if(this.node.position.y<-1000)
            {
                this.node.destroy();
            }

           // console.log("OO.Speed:" +this.Speed.mag());
        }

        ATTo(wpos :cc.Vec2):number
        {

            // 入射速度
            let vpp=this.Speed.mag();


            //计算入射角度
            let dir:cc.Vec2 = cc.v2( wpos.sub(this.GetWorldPosition()));
            let radian = this.Speed.signAngle(dir);//获得带方向的夹角弧度值(参考方向顺时针为正值，逆时针为负值)
            let degree =cc.misc.radiansToDegrees(radian);




            return  Math.pow( Math.cos(radian),2)*this.ATT;
        }
    }   


