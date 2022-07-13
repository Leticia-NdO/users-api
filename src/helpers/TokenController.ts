import jwt from 'jsonwebtoken'
import User from '../entities/User'
import Bundle from './bundle'

class Control {

    async authenticateToken(request: any, response: any, next: any) {

        const token = request.headers.authorization

        if (!token) return response.status(403).send("Forbidden access")

        if (token === undefined || null) return response.status(401)

        const accessTokenSecret: any = process.env.ACCESS_TOKEN_SECRET

        jwt.verify(token, accessTokenSecret, async (err: any, result: any) => {
            if (err) return response.sendStatus(403)

            const id = result.id;

            const user = await User.findOne({
                where: {
                    id,
                }
            })

            Bundle.setBundle(request, user, null)
            next()
        })
    }

    generateToken({ id, role }: any) {
        const accessTokenSecret: any = process.env.ACCESS_TOKEN_SECRET
        return jwt.sign({
            id: id,
            role: role
        }, accessTokenSecret, {
            expiresIn: 43200  // 12 hours
        })
    }

    async resetPasswordAuthentication(request: any, response: any, next: any) {

        const { id, token } = request.params

        const user = await User.findOne({
            where: {
                id: id,
            }
        })

        if (!user) {
            response.send('Link inválido')
            return
        }

        const secret = process.env.RESET_PASSWORD_SECRET + user.password

        jwt.verify(token, secret, (err: any, result: any) => {
            if (err) {
                console.log(err)
                response.send("Link inválido")
            }

            next()

        })
    }
}

export default new Control()