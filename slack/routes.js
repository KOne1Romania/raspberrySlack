/**
 * Created by matei.misarca on 29/01/16.
 */

module.exports = function(app) {
    app.post('/order', (req, res) => {
console.log("success ", req.body)
        res.json({ok: true})
    })
}