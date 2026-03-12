const { sql, config } = require('../db');

module.exports = async function (context, req) {
    try {
        await sql.connect(config);

        const result = await sql.query`
            SELECT match_name
            FROM matches
            WHERE match_date = CAST(GETDATE() AS DATE)
        `;

        context.res = { status: 200, body: result.recordset };
    } catch (err) {
        context.res = { status: 500, body: err.message };
    }
};
