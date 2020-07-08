// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class BANumberLoop {

    mNums: number [];
    mNowIndex: number;


    constructor(_Nums : string, _default : number) {
        
        if (_Nums != "") {
			_Nums = _Nums.replace (";", ",");
			_Nums = _Nums.replace ("，", ",");
            _Nums = _Nums.replace("；", ",");
            
            let str = _Nums.split(",");

            if (str.length > 0) {
                
                this.mNums = new Number[str.length];
                for (let i = 0; i < str.length; i++) {
                    let F = _default;
                    F = Number.parseFloat(str[i])
                    if (F != NaN) {
                        this.mNums[i] = F;
                    }
                    else {
                        this.mNums[i] = _default;
                    }

                    
                }
            }
        }

        if (this.mNums == null || this.mNums.length < 1) {
            this.mNums = [_default];
        }

        this.mNowIndex = -1;
    }

    
    public get Num(): number {
        if (++this.mNowIndex >= this.mNums.length)
            this.mNowIndex = 0;
        return this.mNums[this.mNowIndex];
    }
    

}
