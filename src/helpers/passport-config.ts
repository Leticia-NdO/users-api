import bcrypt from 'bcrypt'
import LocalStrategy from 'passport-local'
import User from '../entities/User'
import Control from './TokenController'

const localStrategy = LocalStrategy.Strategy

function initialize(passport: any) {

    const authenticateUser = (email: any, password: any, done: (arg0: any, arg1: any, arg2: { message: string }) => any) => {

        User.findOne({ where: { email: email } }).then((user: any) => {
            if (!user) {
                return done(null, false, { message: "Essa conta não existe" })
            }



            bcrypt.compare(password, user.dataValues.password, (err, check) => {
                if (check) {
                    const accessToken = Control.generateToken(user.dataValues)
                    const newUser = [{...user.dataValues}, accessToken]  // esse array que será enviado ao front
                    return done(null, newUser, { message: " " })
                } else {
                    console.log(err)
                    return done(null, false, { message: "senha incorreta" })
                }
            })
        })
    }

    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser))
    passport.serializeUser((usuario: any, done: (arg0: any, arg1: any) => void) => {
        done(null, usuario)
    })
    passport.deserializeUser((usuario: any, done: (arg0: any, arg1: any) => void) => {
        done(null, usuario)
    })
}

export default initialize
