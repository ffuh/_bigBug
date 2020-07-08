// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BarrageEmission, { BulletInitParams } from "./BarrageEmission";
import BANumberLoop from "./BANumberLoop";
import BB from "./BB";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BarrageEmission_Rect extends BarrageEmission {

    @property
    random: boolean = false;

    @property
    width: number = 0;

    @property
    count: number = 1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    
    start () {
        super.start();
        this.mRangeLoop = new BANumberLoop(this.RangeLoops, this.width);
        this.mCountLoop = new BANumberLoop(this.CountLoops, this.count);
      
    }



    GetInitParams(): Array<BulletInitParams> {
        let _pos,_step,_dir;
        _pos = cc.Vec3.ZERO;
        _step =cc.Vec3.ZERO;
        _dir = this.node.up;

        let _count = this.CountNow;
        let _widht = this.RangeNow;
        let _offset = this.OffsetNow;

        
        if (this.mBulletParams.length != _count) {
            //根据子弹数量 生成对应子弹信息
            if (this.mBulletParams.length < _count) {
                for (let i = length; i < _count; i++) {

                    let tmpParams = new BulletInitParams();
                    this.mBulletParams.push(tmpParams);                
                }
            }
            else {
            //多余的子弹信息 隐藏
                for (let i = _count; i < this.mBulletParams.length; i++) {
                    this.mBulletParams[i].enable = false;                  
                }       
            }
        }

        //如果不随机
        if (!this.random) {
            //如果大于1发子弹，按照宽度 + 便宜 + 自身 ，计算位置
            if (this.count > 1) {
                _pos = this.node.right.mul((_offset + _widht / -2));
                _pos = this.node.position.add(_pos);
                //没发子弹的间隔
                _step = this.node.right.mul(_widht/(_count - 1));
            }
            //如果小于1发子弹, 就在发射器正中
            else {
                _pos = this.node.right.mul(_offset);
                _pos = this.node.position.add(_pos);
            }
        }

        //遍历所有子弹信息
        for (let i = 0; i < _count; i++) {
            //如果有空，就创建个空
            if (this.mBulletParams[i] == null)
                this.mBulletParams[i] = new BulletInitParams();
            
            //如果随机
            if (this.random) {
                let pos = this.node.right.mul(_widht);
                pos = pos.mul(cc.randomRange(-0.5,0.5));
                pos = pos.add(this.node.position);
                this.mBulletParams[i].pos.set(pos);
            }
            else {
                this.mBulletParams[i].pos.set(_pos);
                _pos.addSelf(_step);
            }
            //方向
            this.mBulletParams[i].dir.set(_dir);
            this.mBulletParams[i].enable = true;
        }


        return this.mBulletParams;
    }

    Fire (dt) {

        if(!this.canFire)
        return;

        if(this.bulletPrefab == null){
            cc.log("没有子弹");
            return;
        }


        let _pList = this.GetInitParams();
        _pList.forEach(p => {
            if(p != null && p.enable){


                let _bb = cc.instantiate(this.bulletPrefab);
                if(_bb != null){                  
                     _bb.parent = this.node;
                     _bb.getComponent(BB).SetUp(p.pos,p.dir);                 
                }


            }
        });


        super.Fire(dt);
    }

    // update (dt) {}
}
