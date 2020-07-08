// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Time from "../Time/Time";

const {ccclass, property} = cc._decorator;

enum BBLiveMode
{
    lmByBound=0,
    lbByTime=1,
    lbByDistance=2,
}
enum BBLifeHurtMode
{
    hdOnce=0,
    hdCount=1,
    hdLife=2,
}
enum BBDeadResult
{
    drSelf=0,
    drHited=2,
}

@ccclass
export default class BB extends cc.Component {
    
    @property
    LiveMode: BBLiveMode= BBLiveMode.lbByTime;

    @property
    LifeMax: number = 5;

    // //痕迹节点
    // // @property(cc.Node)
    // // TarilRoot: cc.Node

    // //痕迹特效
    // // @property(cc.Prefab)
    // // Mod_Trail: cc.Prefab;

    // @property
    // LifeHurtMode: BBLifeHurtMode

    // @property
    // Point: number;

    // //音效

    // //特效
    // // @property(cc.Prefab)
    // // Mod_ReliveEFF: cc.Prefab

    // @property
    // DeadResult: BBDeadResult

    // //特效
    // // @property(cc.Prefab)
    // // Mod_EffOnDead: cc.Prefab

    // //特效
    // // @property(cc.Prefab)
    // // Mod_EffOnHit: cc.Prefab

    // //子弹消失音效?
    // //子弹打击音效?

    // @property(cc.Node)
    // mOwner: cc.Node

    // @property
    // _TimeOfLived: number = 0

    // @property(cc.Vec3)
    // _PosOfLived : cc.Vec3

    // @property(cc.Vec2)
    // mOSize: cc.Vec2

    // @property
    // mEnSize: number

    // @property
    // mEnSpeed: number

    // @property(cc.RigidBody)
    // mRigi: cc.RigidBody;

    // @property(cc.PhysicsCollider)
    // mCollider: cc.PhysicsCollider;

    // // @property(cc.Prefab)
    // // mTrail: cc.Prefab;


    // public get Life() : number {      
    //     return Time.time - this._TimeOfLived;
    // }

    
    // public get Distance() : number {
    //     let distance = this.node.position.sub(this._PosOfLived).mag();
    //     return distance;
    // }

 

    // // LIFE-CYCLE CALLBACKS:

    //  onLoad () {
    //     this.node.getScale(this.mOSize);
    //     this.mRigi = this.getComponent(cc.RigidBody);
    //     if(this.mRigi == null)
    //         this.mRigi = this.addComponent(cc.RigidBody);
    //     if(this.mRigi != null)
    //         this.mRigi.fixedRotation = true;
        
    //     this.mCollider = this.getComponentInChildren(cc.PhysicsCollider);
    //     if(this.mCollider != null)
    //         this.mCollider.sensor = false;

    //  }

    // start () {
        
    // }

    Dead(_dead: BBDeadResult):BB
    {
        this.DeadResult = _dead;
        
        
        this.OnDead();

        // if(this.node.active)
        //     this.node.active = false;

        this.node.destroy();
        //痕迹特效
        return this;
    }

    OnDead (){
        //子弹死亡特效
        //子弹死亡音效
    }


    // Fire (_obj: cc.Node):BB{
    //     this.mOwner = _obj;
    //     if(this.mOwner != null)
    //         this.node.group = this.mOwner.group;
        
    //     this._TimeOfLived = Time.time;
    //     this.node.getPosition(this._PosOfLived);

    //     if(!this.node.active)
    //         this.node.active =  true;
        
    //     this.OnFire(this.mOwner);

    //     //播放音效

    //     //特效痕迹


    //    return this; 
    // }

    // OnFire (_obj: cc.Node){

    // }

    // Hit (_who: cc.Node,_dhp: number){
    //     if(this.LifeHurtMode == BBLifeHurtMode.hdOnce)
    //         this.Dead(BBDeadResult.drHited);
        
    //     this.OnHit(_who,_dhp);
    // }

    // OnHit (_who: cc.Node,_dhp: number){
    //     //击中音效
    //     //击中特效
    // }

    _LifeCheck ():boolean
    {

        switch (this.LiveMode) {
            case BBLiveMode.lmByBound:
                //越界判定
                break;
            
            case BBLiveMode.lbByTime:
                return this.Lifing <= this.LifeMax;

            case BBLiveMode.lbByDistance:
                return this.Distancing < this.LifeMax;
        
        }

        return true;
    }


    

    // lateUpdate(dt){
    //     if(!this.LiveCheck())
    //         this.Dead(BBDeadResult.drSelf);
    // }

    @property
    speed : number = 1;

    @property
    canMove: boolean = false;


    Lifing:number;
    Distancing:number;
    DeadResult: BBDeadResult;
    onEnable()
    {
        this.Lifing=0;
    }
    update (dt)
    {

        this.Lifing+=dt;

        if(!this._LifeCheck())
        {
            this.Dead(BBDeadResult.drSelf);
            return;
        }

        if(!this.canMove)
        return;

        let pos = this.node.up.mul(dt * this.speed);
        pos = this.node.position.add(pos);
        this.node.setPosition(pos);
     }

    SetUp(_pos:cc.Vec3,_dir:cc.Vec3) : BB
    {
        this.node.setPosition(_pos);
        this.node.up = _dir;
        this.canMove = true;
        return this;
    }
    SetPOS(_pos:cc.Vec2):BB
    {
        this.node.setPosition(_pos);
        return this;
    }
    SetROTE(_angle:number):BB
    {
        this.node.rotation=_angle;
        return this;
    }
    Reset():BB
    {
        this.canMove = true;
        
        return this;
    }


    onDisable(){
        this.canMove = false;
    }

    onDestroy() {
        this.canMove = false;
    }
}
