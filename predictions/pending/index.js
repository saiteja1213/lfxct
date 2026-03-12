const { sql, config } = require('../../db');

module.exports = async function (context, req) {
    try {
        await sql.connect(config);
        const result = await sql.query`
            SELECT id, username, match_name, prediction, bold
            FROM predictions
            WHERE approved = 0
            ORDER BY submitted_at ASC
        `;
        context.res = { status: 200, body: result.recordset };
    } catch (err) {
        context.res = { status: 500, body: err.message };
    }
};
