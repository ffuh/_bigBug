// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import OBJ from "./OBJ";
import GM from "../GM";
import Edge from "./Edge";



    const {ccclass, property} = cc._decorator;

    @ccclass
    export default  class OO extends OBJ {
    
        @property(cc.Label)
        label: cc.Label = null;
    
        @property
        ATT: number = 900;

        @property
        DeadStrick: number = 0.05;


        @property(cc.Node)
        Edge: cc.Node = null;

    
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

        Dead():OO
        {

            let _ob=   cc.instantiate(this.Edge);
            let _edge= _ob!=null?_ob.getComponent(Edge):null;

            if(_edge!=null)
            {
                _edge.node.parent=cc.director.getScene();
                _edge.Set(this.ATT).SetSpeed(this.Speed).SetWorldPosition(this.GetWorldPosition());
                _edge.node.active=true;
            }



            if(this.DeadStrick<=0)
                this._DoDead();
            else
                this.scheduleOnce( this._DoDead,this.DeadStrick);
            return this;
        }
        private _DoDead()
        {
            this.node.destroy();

            if(this._ONDead!=null)
                this._ONDead();
        }

        _ONDead:Function;
        WaitDead(on:Function):OO
        {
            this._ONDead=on;
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
               this._DoDead();
            }

           // console.log("OO.Speed:" +this.Speed.mag());
        }



        onCollisionEnter(other:cc.Collider ,self:cc.Collider)
        {
            console.log("OO.onCollisionEnter:"+other.node.name+":"+self.node.name);
            
            this.Dead();
        }
    }   


