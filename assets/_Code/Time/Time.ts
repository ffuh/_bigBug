// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


//Cocos没有方便调用的时间接口,用此脚本代替

const {ccclass, property} = cc._decorator;

@ccclass
export default class Time extends cc.Component {

    //启动时间
    startDate: Date

    //上一帧时间
    previousDate: Date

    //从启动以来，运行世间 秒
    static time: number 

    //每帧流逝时间 毫秒
    static delayTime: number

    @property(cc.Label)
    text_time: cc.Label

    @property(cc.Label)
    text_delaytime: cc.Label

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.startDate = new Date();
    }


    update (dt) {
        Time.time = ((Date.now() - this.startDate.getTime()) / 1000);
        Time.delayTime = dt;



        if(this.text_time != null)
            this.text_time.string =  `运行时间：${(Time.time).toFixed(0)} 秒`
        if(this.text_delaytime != null)
            this.text_delaytime.string = Time.delayTime.toString();
    }

}
