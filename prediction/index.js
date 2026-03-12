const { sql, config } = require('../db');

module.exports = async function (context, req) {
    const { username, match, prediction, bold } = req.body;

    try {
        await sql.connect(config);
        await sql.query`
            INSERT INTO predictions (username, match_name, prediction, bold)
            VALUES (${username}, ${match}, ${prediction}, ${bold})
        `;
        context.res = { status: 200, body: "Prediction submitted" };
    } catch (err) {
        context.res = { status: 500, body: err.message };
    }
};
