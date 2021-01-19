export declare type betKeyType =
    'zs' | 'fq' | 'yz' | 'gz' | 'kq' | 'ly' |
    'sy' | 'sz' | 'xm' | 'hz' | 'tz';
const oddsMap: Map<string, number> = new Map<string, number>();
oddsMap.set('走兽', 2);
oddsMap.set('飞禽', 2);
oddsMap.set('燕子', 6);
oddsMap.set('鸽子', 8);
oddsMap.set('孔雀', 8);
oddsMap.set('老鹰', 12);
oddsMap.set('鲨鱼', 24);
oddsMap.set('狮子', 12);
oddsMap.set('熊猫', 8);
oddsMap.set('猴子', 8);
oddsMap.set('兔子', 6);
const betMap: Map<string, betKeyType> = new Map();
betMap.set('走兽', 'zs');
betMap.set('飞禽', 'fq');
betMap.set('燕子', 'yz');
betMap.set('鸽子', 'gz');
betMap.set('孔雀', 'kq');
betMap.set('老鹰', 'ly');
betMap.set('鲨鱼', 'sy');
betMap.set('狮子', 'sz');
betMap.set('熊猫', 'xm');
betMap.set('猴子', 'hz');
betMap.set('兔子', 'tz');

export class BetEntity{
    zs = 0;
    fq =  0;
    yz = 0;
    gz =  0;
    kq = 0;
    ly = 0;
    sy = 0;
    sz = 0;
    xm = 0;
    hz = 0;
    tz =  0;
    public clear(): void {
        this.zs = 0;
        this.fq =  0;
        this.yz = 0;
        this.gz =  0;
        this.kq = 0;
        this.ly = 0;
        this.sy = 0;
        this.sz = 0;
        this.xm = 0;
        this.hz = 0;
        this.tz =  0;
    }
    public total(): number{
        return this.zs + this.fq + this.yz + this.gz + this.kq + this.ly + this.sy +  this.sz + this.xm + this.hz + this.tz;
    }
    public getGeneralIndemnityNumber() {
        let res = 0;
        res += this.zs * 2 + this.fq * 2;
        res += this.yz * 6 + this.tz * 6;
        res += this.gz * 8 + this.kq * 8 + this.hz * 8 + this.xm * 8;
        res += this.ly * 12 + this.sz * 12;
        res += this.sy * 24;
        return res;
    }


}


const betEntity = new BetEntity();

export const initBetMap = betMap;
export const initOddsMap = oddsMap;
export const initBetEntity = betEntity;

