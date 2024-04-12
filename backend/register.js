const handleregister = (req,res,bcrypt,db,saltRounds)=>{
        const { name, email, password } = req.body;
        const hash = bcrypt.hashSync(password, saltRounds);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .insert({
                    email:loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                .returning('*')
                .then(user => {
                    res.json(user[0])
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('err'))
    }

module.exports = {
    handleregister: handleregister,
}