// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

//缓存池管理

@ccclass
export default class BPoolControl extends cc.Component {


    @property
    dic : {[key:string]:cc.NodePool} = {};

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    //出池
    Get (_obj:cc.Node) : cc.Node {
        let obj = null;

        for(let k in this.dic){
            if(k == _obj.name){
                if(this.dic[k].size() > 0){
                    obj = this.dic[k].get();
                    return obj;
                }
            }          
        }

        obj = this.CreateNode(_obj);

        return obj;
    }

    //进池
    Put (_obj:cc.Node) {

        for(let k in this.dic){
            if(k == _obj.name){
                this.dic[k].put(_obj);
                return;
            }          
        }

        this.dic[_obj.name] = new cc.NodePool;
        this.dic[_obj.name].put(_obj);
    }


    //创建池
    CreatePool (_name:string) : cc.NodePool{

        return;
    }

    //创建对象
    CreateNode (_obj:cc.Node) : cc.Node {
        let obj = cc.instantiate(_obj);
        return;
    }

    // update (dt) {}
}
