
function create_token() {
    let token = Math.floor((Math.random() * 10000000000 - 1) + 1000000000);
    token = token.toString();
    token += (Number(get_date()) + 2).toString();

    return token;
}

function token_valid(sent_token, db_token) {
    let token_len = sent_token.length;
    let date = get_date();
    let user_num = sent_token.substr(0, token_len - 10);
    let user_date = sent_token.substr(token_len - 10, token_len - 1);
    let is_valid = {
        "num": false,
        "date": false
    }
    if (Number(db_token.substr(0, token_len - 10)) == Number(user_num)) {
        is_valid.num = true;
    }

    if (Number(user_date.substr(0, 4)) == Number(date.substr(0, 4))) { // year
        if (Number(user_date.substr(4, 2)) == Number(date.substr(4, 2))) { // month
            if (Number(user_date.substr(6, 2)) == Number(date.substr(6, 2))) { // day
                if (Number(user_date.substr(8, 2)) > Number(date.substr(8, 2))) { // hour
                    is_valid.date = true;
                }
            }
        }
    }

    if (is_valid.date == true && is_valid.num == true) {
        return true;
    }
    return false;
}


function get_date() {
    let date = "";
    date += new Date().getFullYear();
    if (new Date().getMonth() < 10) {
        date += "0";
    }
    date += new Date().getMonth();
    if (new Date().getDate() < 10) {
        date += "0";
    }
    date += new Date().getDate();
    if (new Date().getHours() < 10) {
        date += "0";
    }
    date += new Date().getHours();
    return date;
}

function update_token(token) {
    let token_len = token.length;
    let date = get_date();
    let new_token = "";
    let user_date = token.substr(token_len - 10, token_len - 1);

    if (Number(user_date.substr(0, 4)) == Number(date.substr(0, 4))) { // year
        if (Number(user_date.substr(4, 2)) == Number(date.substr(4, 2))) { // month
            if (Number(user_date.substr(6, 2)) == Number(date.substr(6, 2))) { // day
                if (Number(user_date.substr(8, 2)) == Number(date.substr(8, 2)) + 1) { // hour
                    new_token = token.substr(0, 18) + (Number(token.substr(18, 2)) + 1).toString();
                }
            }
        }
    }

    return new_token;

}



module.exports = {
    create_token,
    token_valid,
    get_date,
    update_token
}

// console.log(create_token());