/**
 * Created by matei.misarca on 29/01/16.
 */

/*
 var dummy = {
 fromUser: "matei.misarca",
 product: "cafea",
 toUser: "radu.parachiv",
 location: "AICI"
 }


 */

module.exports = function (app) {
    app.post('/order', (req, res) => {
        console.log("success ", req.body)
        res.json({ok: true})
        fetch('http://81.196.110.34:4243/hubot/notify/order_coffee', {
            method: 'POST',
            body: JSON.stringify(req.body),
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            console.log("response ", response.status);
        });
    })
}
