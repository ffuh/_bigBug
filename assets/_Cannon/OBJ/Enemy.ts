// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Cannon from "./Cannon";
import BaseObj, { OBJState } from "./BaseObj";
import ClockObj from "./ClockObj";


    const {ccclass, property} = cc._decorator;

    @ccclass
    export default class Enemy extends ClockObj {
    
        
        // LIFE-CYCLE CALLBACKS:
    
        // onLoad () {}
    
    
        start () {
            this.Live();
        }
        
        Live():Enemy
        {
            this.State= OBJState.osLiving;
            return this;
        }

        update (dt) 
        {
            super.update(dt);

            if(this.State==OBJState.osLiving && this.TurnLifeLeft>0)
            {
                this.node.position= this.node.position.add(cc.v3(-1*this.Speed*dt,0,0));
            }

        }
    }


