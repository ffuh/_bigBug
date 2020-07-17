// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class SYS extends cc.Component {

    static GAMEID  :string ="BigBug";
    static Instance:SYS;
    static LOADED():boolean {return SYS.Instance!=null;}
    
    onLoad ()
    {
        SYS.Instance =this;
    }

    start () {

    }

}
