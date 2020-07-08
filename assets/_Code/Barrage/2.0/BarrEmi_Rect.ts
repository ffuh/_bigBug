import BarrEmi , { EmiPOS }from "./BarrEmi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BarrEmi_Rect extends BarrEmi 
{

    @property(cc.Label)
    label: cc.Label = null;

    @property
    Width: number = 100;
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
            let dd = this.Width*1.0/(this.Count-1);
            for(var i=0; i<this.Count ; i++ )
            {
                this._EmiPos.push({pos:new cc.Vec2( this.Width*-0.5 +i*dd,0 ), angle:0});

            }
        }


       
    }

    // EnumPos():Array<EmiPOS>
    // {

    //     return null;
    // }
    // update (dt) {}
}
