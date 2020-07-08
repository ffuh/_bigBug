import BB from "../BB";
import BarrEmi, { EmiPOS } from "./BarrEmi";


const {ccclass, property} = cc._decorator;




@ccclass
export default class Barr extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    //发射间隔
    @property
    rate : number = 100;

    @property(cc.Prefab)
    bulletPrefab : cc.Node;

    @property(cc.CurveRange)
    SpeedCurve:cc.CurveRange;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
     _EmiArr :BarrEmi[];

    start()
    {
        this._EmiArr=this.getComponentsInChildren(BarrEmi);   
  
    }

    AA:number=0;
    _Run()
    {
        if(this._EmiArr==null || this._EmiArr.length<1)
            return;
        
        console.log("Barr._Run()");
        this._EmiArr.forEach((emi)=>
        {
            if(emi.node.active)
            {
                emi.Loop((POS)=>
                {
                    let _bb = cc.instantiate(this.bulletPrefab);
                    if(_bb != null)
                    {                  
                            _bb.parent = this.node.parent.parent.parent;
  
                            _bb.getComponent(BB)?.SetPOS(this.node.convertToWorldSpace( POS.pos)).SetROTE(POS.angle).Reset();  
 
                           // _bb.setParent(this.node.parent.parent);
                    }
    
                }).Reset();
            }



        });

    }
    _Passed:number=0;
    update (dt) 
    {
        this._Passed+=dt;
        if(this._Passed<this.rate)
            return;
        this._Passed-=this.rate;


        this._Run();
    }

}
