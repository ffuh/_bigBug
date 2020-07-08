import BarrEmi , { EmiPOS }from "./BarrEmi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BarrEmi_Sect extends BarrEmi 
{

    @property(cc.Label)
    label: cc.Label = null;

    @property
    Angle: number = 100;
    @property
    Count: number = 2;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    start()
    {

        // if(this.Count % 2==1)
        // {
        //     this._EmiPos.push({pos:cc.Vec3.ZERO, angle:0});
        // }
        if(this.Count>0)
        {   
            let dd = this.Angle*1.0/(this.Count-1);
            for(var i=0; i<this.Count ; i++ )
            {
                this._EmiPos.push({pos:cc.Vec2.ZERO, angle:-0.5*this.Angle+i*dd});

            }
        }


       
    }

    // EnumPos():Array<EmiPOS>
    // {

    //     return null;
    // }
    // update (dt) {}
}
