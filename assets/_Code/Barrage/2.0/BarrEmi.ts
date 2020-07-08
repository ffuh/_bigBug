

const {ccclass, property} = cc._decorator;


export class EmiPOS
{
    pos :   cc.Vec2 = cc.Vec2.ZERO;
    angle :   number;
}

@ccclass
export default class BarrEmi extends cc.Component {



    @property
    Duration: number = 0.2;
    @property
    Times: number = 1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _EmiPos: Array<EmiPOS> =new  Array<EmiPOS> ();

    start () 
    {
        this._EmiPos.push({pos:cc.Vec2.ZERO, angle:0});
    }

    Reset():BarrEmi
    {
       
        return this;
    }

    EnumPos():Array<EmiPOS>
    {

        return this._EmiPos;
    }

    Loop(on:(emi:EmiPOS)=>void):BarrEmi
    {
  
        this._DoLoop(on);     
        return this;
    }
    async _DoLoop(on:(emi:EmiPOS)=>void)
    {
        await 0;

        for(var i=0;i<this.Times;i++)
        {
            this.EnumPos()?.forEach((pos)=>
            {
                on(pos);
            });

            await this.__Sleep(this.Duration*1000);
        }

    }


    __Sleep (time) 
    {
        return new Promise(function (resolve, reject) 
        {
            setTimeout(function () 
            {
                resolve(132);
            }, time);
        })
    }

}
