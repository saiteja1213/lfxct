const { sql, config } = require('../../../db');

module.exports = async function (context, req) {
    const id = parseInt(context.bindingData.id);

    try {
        await sql.connect(config);
        await sql.query`
            UPDATE predictions SET approved = 1 WHERE id = ${id}
        `;
        context.res = { status: 200, body: "Approved" };
    } catch (err) {
        context.res = { status: 500, body: err.message };
    }
};
