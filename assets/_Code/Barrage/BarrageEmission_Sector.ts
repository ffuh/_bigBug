// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BarrageEmission, { BulletInitParams } from "./BarrageEmission";
import BANumberLoop from "./BANumberLoop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BarrageEmission_Sector extends BarrageEmission {

    @property
    firstAngleLoops: string = "";

    @property
    random: boolean = false;

    @property
    angle: number = 0;

    @property
    count: number = 0;

    @property
    FirstAngle : number = 0;

    mFirstAngleLoop : BANumberLoop;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
        this.mRangeLoop = new BANumberLoop(this.RangeLoops,this.angle);
        this.mCountLoop = new BANumberLoop(this.CountLoops,this.count);
        this.mFirstAngleLoop = new BANumberLoop(this.firstAngleLoops,this.FirstAngle);
    }

    GetInitParams () : Array<BulletInitParams> {
        let _roter = cc.Vec3.ZERO;
        let _dir = cc.Vec3.ZERO;

        let _count = this.CountNow;
        let _width = this.RangeNow;
        let _offset = this.OffsetNow;
        let _firstAngle = this.mFirstAngleLoop.Num;

        let _rotarand = 0;

        //计算角度
        let UP = cc.Vec3.ZERO;
      
        if(this.mBulletParams.length  != _count){

            if(this.mBulletParams.length < _count){
                for (let i = length; i < _count; i++) {

                    let tmpParams = new BulletInitParams();
                    this.mBulletParams.push(tmpParams);                
                }
            }
            else{
                for (let i = 0; i < this.mBulletParams.length; i++) {
                    
                    if(this.mBulletParams != null)
                        this.mBulletParams[i].enable = false;
                    
                }
            }
        }

        for (let i = 0; i < _count / 2; i++) {
            
            if(this.mBulletParams[i*2] == null)
                this.mBulletParams[i*2] = new BulletInitParams();
            
            if(this.mBulletParams[i*2+1] == null)
                this.mBulletParams[i*2+1] = new BulletInitParams();
            

            let pos = cc.Vec3.ZERO;
            pos = this.node.right.mul(_offset);
            pos.addSelf(this.node.position);

            this.mBulletParams[i*2].pos.set(pos);
            this.mBulletParams[i*2+1].pos.set(pos);

            if(this.random){

                //角度计算
                //_roter = ************
                this.mBulletParams[i * 2].dir.set(_roter);
                this.mBulletParams[i * 2 + 1].dir.set(_roter);
            }
            else{

                //角度计算
                //_roter = ************
                this.mBulletParams[i * 2].dir.set(_roter);

                //角度计算
                //_roter = ************
                this.mBulletParams[i * 2 + 1].dir.set(_roter);
            }
            
            this.mBulletParams[i * 2].enable = true;
            this.mBulletParams[i * 2 + 1].enable = true;
        }

        if(_count % 2 != 0){

            if(this.mBulletParams[_count -1] == null)
                this.mBulletParams[_count -1] = new BulletInitParams();
            
            let pos = cc.Vec3.ZERO;
            pos = this.node.right.mul(_offset);
            pos.addSelf(this.node.position);

            this.mBulletParams[_count - 1].pos.set(pos);
            this.mBulletParams[_count - 1].dir.set(UP);
            this.mBulletParams[_count - 1].enable = true;

        }



        return this.mBulletParams;
    }



    // update (dt) {}
}
