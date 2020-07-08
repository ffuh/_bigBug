// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Learn extends cc.Component {

    //按钮绑定
    @property(cc.Button)
    btn: cc.Button = null;
    //this.btn.node.on('click',this.OnBtnClick.bind(this));
    //OnBtnClick(button){console.log("按钮点击- $(button.name)");}

    //场景跳转
    //cc.director.loadScene('sc_Main');

    //数组
    array: number [] = []; //初始化,开辟空间
    //array.push()  //添加
    //this.array.forEach(point=>{let nextPoint = this.Check(point)})
    //Check(point:number):number{point++;return point;}
    

    //构造
    //constructor()

    //实例化
    //let node =  cc.instantiate(this.Mod_Hero)
    //let tmpHero = node.getcompoment(BUUnit)

    //映射
    // const HERONAME_MAP = {
    //     "1":"倒霉熊",
    //     "2":"乌乌",
    //     "3":"拉拉",
    // }
    //映射使用
    //HERONAME_MAP[1]

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
       
    }

    

    // update (dt) {}

}
