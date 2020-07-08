// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

interface BOwner{
    GetOwner<T>(): T
}

// @ccclass
// export default class BOwner extends cc.Component implements test {

//     GetOwner():object{
//         return this;
//     }

//     //@property(cc.Label)
//     //label: cc.Label = null;

//     //@property
//     //text: string = 'hello';

//     // LIFE-CYCLE CALLBACKS:

//     // onLoad () {}

//     // start () {

//     // }

//     // update (dt) {}
// }
