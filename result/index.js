const { sql, config } = require('../db');

module.exports = async function(context, req){
    const { id, correct } = req.body;

    try{
        await sql.connect(config);
        const result = await sql.query`
            SELECT bold FROM predictions WHERE id=${id}
        `;
        const bold = result.recordset[0].bold;
        let score = 0;
        if(correct) score = bold ? 2 : 1;

        await sql.query`
            UPDATE predictions SET actual=${correct}, score=${score} WHERE id=${id}
        `;

        context.res={status:200, body:"Result updated"};
    }catch(err){
        context.res={status:500, body:err.message};
    }
};
