import requestify from "requestify";

const dbQuery = {
    findOne({model, query, populate}) {
        return new Promise((res, rej) => {
            populate = populate || '';
            model.findOne(query, (err, data) => {
                if (err) {
                    rej(err);
                }
                res(data);
            }).populate(populate)
        });
    },
    createOne({model, items}) {
        return new Promise((res, rej) => {
            if (!items)
                rej('Items or model are empty');

            const record = new model(items);
            record.save(items, (err) => {
                if (err) {
                    rej(err);
                }
                res(record)
            });
        });
    },
    findOneAndUpdate({model, query, update}) {
        return new Promise((res, rej) => {
            model.findOneAndUpdate(query, update, (err, data) => {
                if (err) {
                    rej(err);
                }
                res(data);
            });
        });
    },
    findOneAndRemove({model, query}) {
        return new Promise((res, rej) => {
            model.findOneAndRemove(query, (err, data) => {
                if (err) {
                    rej(err);
                }
                res(data);
            });
        });
    },
    find({
             model, query, limit, params, sort, skip,
         }) {
        limit = limit || 20;
        sort = sort || ('updateAt');
        skip = skip || 0;
        params = params || {};
        return new Promise((res, rej) => {
            model.find(query, params).limit(+limit).skip(+skip).sort(sort)
                .exec((err, data) => {
                    if (err) {
                        rej(err);
                    }
                    res(data);
                });
        });
    },
    async postRemoteRequest(url) {
        const resp = await requestify.get(url);
        return resp.getBody();
    }
};

module.exports.dbQuery = dbQuery;
