// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import OO from "./OO";
import GM from "../GM";
import ClockObj from "./ClockObj";
import Shooter from "./Shooter/Shooter";


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
    PowerSpeed: number = 100;

    @property
    Actiony: number = 100;

    @property(cc.Prefab)
    EFF_ShooterUse:cc.Node;


    Powering:number=0;
    Yawing= 30;

    _Shooters:Shooter[];

    _NowShooter:Shooter;

    _Waiting=0;
    _WaitingMax=0;
    onLoad ()
    {
        this.Name="MY";
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this._Shooters=this.getComponentsInChildren(Shooter);

        GM.CANNON=this;
    }

    UseShoot(num):Cannon
    {
        if(this._Shooters==null || this._Shooters.length<1)
        return this;

        if(num>this._Shooters.length) num =this._Shooters.length-1;

        this._NowShooter = this._Shooters[num];

        if(this.EFF_ShooterUse!=null)
        {
            var eff=  cc.instantiate(this.EFF_ShooterUse);
            eff.setParent(cc.director.getScene());
        }

        return this;
    }
    // UseShootEx(sh:Shooter):Cannon
    // {
    //     if(this._Shooters==null || this._Shooters.length<1)
    //     return this;

    //     this._NowShooter = sh;

    //     if(this.EFF_ShooterUse!=null)
    //     {
    //         var eff=  cc.instantiate(this.EFF_ShooterUse);
    //         eff.setParent(cc.director.getScene());
    //     }
            

    //     return this;
    // }
    GetShoot(num):Shooter
    {
        if(this._Shooters==null || this._Shooters.length<1) return null;

        if(num>this._Shooters.length)  return null; 

        return this._Shooters[num];
    }

    Shoot()
    {
        if(this._NowShooter==null)  this.UseShoot(0);
        if(this._NowShooter==null) return;


        let _speed = new cc.Vec2(Math.cos(this.Yawing*3.14/180),Math.sin(this.Yawing*3.14/180)).mul(this.Powering*this.PowerBase);

        this._NowShooter.Shoot(_speed);
        this.AddWaiting(this._NowShooter.CD);
        return ;
    }
    AddWaiting(wt)
    {
        this._Waiting+=wt;
        this._WaitingMax=this._Waiting;
    }
    WaitPercemt(){return this._WaitingMax<=0?0:  this._Waiting/ this._WaitingMax;    }

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
                   this.YawAdd(1)  
                      break;   
            case cc.macro.KEY.down:         
                this.YawAdd(-1)  
                    break;   
            case cc.macro.KEY.space:
                if(!this._Powering) 
                    this.PowerBegin()   ;
                 break;    
        }    
    }  
    SetYaw(_yaw:number)
    {
        this.Yawing=_yaw;
        if(this.Yawing>this.ShootYawMax)
            this.Yawing=this.ShootYawMax;
        if(this.Yawing<this.ShootYawMin)
            this.Yawing=this.ShootYawMin;
    }
    YawAdd(_dd:number)
    {
        this.Yawing+=_dd;
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
            this.Powering+= dt*this.PowerSpeed;
            if(this.Powering>100)
                this.Powering=100;
        }

        if(this._Waiting>0)
            this._Waiting-=dt;
    }

    FireCDing()
    {
        if(this._NowShooter==null) this.UseShoot(0);
        if(this._NowShooter==null) return 1;

        return this._NowShooter.CDing();
    }
}
