import Model from '../models';

export class Utils {
    static EmailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    static async GetRank(userid) {
        var rank = 0;
        const customer:any = await Model.Customer.findAll({order: [['xp_gained', 'DESC']],});

        for(var i = 0; i < customer.length; i++) {
            if(customer[i].id === userid) {
                rank = i+1;
            }
         }
        return rank;
    }
}
