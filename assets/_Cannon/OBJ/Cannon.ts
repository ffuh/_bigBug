// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseObj from "./BaseObj";
import OO from "./OO";
import GM from "../GM";
import ClockObj from "./ClockObj";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Cannon extends ClockObj {



    @property
    ShootYawMin: number = 25;
    @property
    ShootYawMax: number = 65;

    @property
    PowerBase: number = 5;

    @property
    Actiony: number = 100;

    @property(cc.Node)
    ShootRoot: cc.Node ;
    @property(cc.Prefab)
    OOMod: cc.Node ;

    Powering:number=0;
    Yawing= 30;


    onLoad ()
    {
        this.Name="MY";
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);


        GM.CANNON=this;
    }

    start () 
    {
        this.Shoot();
    }

    Shoot()
    {
        //cc.instantiate(this.OOMod)?.Set(new cc.Vec2(100,100));

        let ooo = cc.instantiate(this.OOMod);
        if(ooo != null)
        {                  
            ooo.parent = cc.director.getScene();
            ooo.setPosition( this.ShootRoot.convertToWorldSpace(cc.Vec2.ZERO)   );
            
            
            let _speed = new cc.Vec2(Math.cos(this.Yawing*3.14/180),Math.sin(this.Yawing*3.14/180)).mul(this.Powering*this.PowerBase);


            ooo.getComponent(OO)?.Set(_speed).WaitDead(()=>
            {
                this.TurnOver();

            });                 
        }
    }

    onKeyUp (event) 
    {        
        switch(event.keyCode)
        {            
            case cc.macro.KEY.a:         
                   this.Shoot()
       
                      break;    
            case cc.macro.KEY.space:
                if(this._Powering) 
                    this.PowerEnd()   ;
                    break;      
        }    
    }
    onKeyDown (event) 
    {        
        switch(event.keyCode)
        {            
            case cc.macro.KEY.up:         
                   this.Yaw(1)  
                      break;   
            case cc.macro.KEY.down:         
                this.Yaw(-1)  
                    break;   
            case cc.macro.KEY.space:
                if(!this._Powering) 
                    this.PowerBegin()   ;
                 break;    
        }    
    }  
    
    Yaw(_yaw:number)
    {
        this.Yawing+=_yaw;
        if(this.Yawing>this.ShootYawMax)
            this.Yawing=this.ShootYawMax;
        if(this.Yawing<this.ShootYawMin)
            this.Yawing=this.ShootYawMin;
    }
    _Powering=false;
    PowerBegin()
    {
        this.Powering=0;
        this._Powering=true;
    }
    PowerEnd()
    {
        this._Powering=false;

        this.Shoot();
    }

    update(dt)
    {
        super.update(dt);
        if(this._Powering)
        {
            this.Powering+= dt*70;
            if(this.Powering>100)
                this.Powering=100;
        }
    }
}
