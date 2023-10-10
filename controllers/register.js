export const handleRegister = (req, res, knex, bcrypt) => {
    const {email, name, password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('Incorrect form submission')
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    knex.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginemail => {
            trx('users')
                .returning('*')
                .insert({
                    email: loginemail[0].email,
                    name: name, 
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
}