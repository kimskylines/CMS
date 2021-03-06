
class query {
    constructor () {
        this.mode = 'restful';
        this.param = '/*';
    }

    async get (c) {
        
        let id = decodeURIComponent(c.param.starPath);
        let r = c.service.docdb.getById(id);
        if (r === null) {
            c.status(404);
            return ;
        }
        c.res.body = c.service.api.ret(0, r);
    }

    async list (c) {
        let cstr = c.query.q || '';
        let count = c.query.count !== undefined ? parseInt(c.query.count) : 20;
        if (count <= 0) { count = 20; }
        let offset = c.query.offset !== undefined
                        ? parseInt(c.query.offset) 
                        : 0;
        if (offset < 0) { offset = 0; }

        let group = null;
        if (c.query.group !== undefined && c.query.group.length > 0) {
            group = c.query.group;
        }
        cstr = cstr.substring(0, 20);
        
        if ( (cstr == '' || cstr == '.*') && (group === null || group === '') )
        {
            let mtotal = c.service.docdb.total > 5 
                        ? c.service.docdb.total - 5
                        : c.service.docdb.total;
            offset = parseInt(Math.random() * 10000) % mtotal;
        }

        let result = c.service.docdb.select(cstr, count, offset, group);

        c.res.body = c.service.api.ret(0, result);
    }

    __mid () {
        return [
            /* {
                name: 'apipass',
                path: ['list', 'get']
            }, */
            {
                name: 'apicache',
                path: ['get', 'list']
            }
        ];
    }

}

module.exports = query;
