// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:

import OBJ from "../OBJ/OBJ";
import Enemy from "../OBJ/Enemy";

const {ccclass, property} = cc._decorator;

    @ccclass
    export default class Hatcher extends OBJ {

        @property
        Delay :number =10;

        @property (cc.Prefab)
        Mod_Enemy:Enemy;
        @property
        Count :number =1;
        @property
        Duration :number =0;


        Live():Hatcher
        {
            
            this.schedule(this._Do,this.Delay<=0?0.01:this.Delay);
            return this;
        }
        private _Counted=0;

        _Do()
        {
            if(this._Counted>=this.Count)
            {
                this._Over();
                return
            };
            
            let enm = cc.instantiate(this.Mod_Enemy)?.getComponent(Enemy);
            if(enm != null)
            {                  
                enm.node.parent = cc.director.getScene();
                enm.node.setPosition( this.GetWorldPosition()   );   
                
                if(this._ONHatch!=null) this._ONHatch(enm);
            }
            this._Counted++;

            

            if(this._Counted>=this.Count)
            {
                this._Over();
                return
            };

            this.schedule(this._Do,this.Duration);
        }
        _Over()
        {
            this.node.destroy();
        }


        _ONHatch:Function;
        WaitHatch(on:(who:Enemy)=>void ):Hatcher
        {
            this._ONHatch=on;
            return this;
        }
    }
