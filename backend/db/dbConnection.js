const mongoose = require("mongoose");

async function run(getUrl) {
    const dbOptions = {
        dbname:"mernDb",
    };
    await mongoose.connect(getUrl, dbOptions);
    console.log("connected Db Successfully");
}

module.exports = run;
