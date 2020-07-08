
import Time from "../Time/Time";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BUUnit extends cc.Component implements BOwner
 {
  
    GetOwner(){
        return <any>this;
    }


    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Button)
    btn: cc.Button = null;

    @property(cc.Node)
    Owner: BUUnit = null;

    // LIFE-CYCLE CALLBACKS:

     onLoad () {

     }

    start () {


        this.Owner = this.GetOwner();


    }
    Lifing:number=0;
     update (dt) 
     {

        this.Lifing+=dt;
        this.node.x=200* Math.sin(this.Lifing); 
     }
}
