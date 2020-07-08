// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import OBJ from "./OBJ";





const {ccclass, property} = cc._decorator;
export enum  OBJState
{
    osNone=0,
    osLiving=1,
    osDead=2,
}
@ccclass
export default class BaseObj extends OBJ 
{

    @property
    ID: number=1;
    @property
    Name: string = 'Name';
    @property
    Desc: string = 'Desc';


    @property
    HP: number =100;

    @property
    Denf: number = 0;

    @property
    Speed: number = 50;

    @property(cc.Prefab)
    MOD_Tip: cc.Node ;

    @property(cc.Prefab)
    MOD_Info: cc.Node ;

    State: OBJState = OBJState.osNone;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () 
    {

    }

    // update (dt) {}

    ShowTip(_tip:string):cc.Label
    {
        if(this.MOD_Tip==null)
            return;

        let _new=    cc.instantiate(this.MOD_Tip);

        _new.parent= cc.director.getScene();

        _new.position=cc.v3( this.GetWorldPositionX(cc.Vec2.UP.mul(200)));


        let _label =_new.getComponent(cc.Label);

        if(_label!=null)
        {
            _label.string =_tip;

            
        }
        return _label;

    }

    _InfoLable:cc.Label;
    
    ShowInfo(_info:string):cc.Label
    {
        if(this.MOD_Info==null)
            return;

        if(this._InfoLable==null)
        {
            let _new=    cc.instantiate(this.MOD_Info);

            _new.parent= this.node;
    
            _new.position=cc.Vec3.UP.mul(200);
            
            this._InfoLable =_new.getComponent(cc.Label);            
        }

        if(this._InfoLable!=null)
        {
            this._InfoLable.string =_info;  
            this._InfoLable.node.active=true;
        }
      
        return this._InfoLable;


    }
    CloseInfo()
    {
        if(this._InfoLable!=null)
        {
            this._InfoLable.node.active=false;
        } 
    }

}



