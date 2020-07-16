// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GM_intro extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onMouseUp, this);
    }
    onMouseUp()
    {
        cc.director.loadScene("sc_Level - 001");
    }
    start () {

    }

    // update (dt) {}
}
