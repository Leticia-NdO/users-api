import { Request, Response } from "express";
import User, { IDbUserInstance } from "../entities/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../helpers/emailconfig";

class UserController {

    // Get all users

    async findAll(req: any, res: Response) {

        const users = await User.findAll()

        if (users.length > 0) {
            return res.status(200).json(users)
        } else {
            return res.status(204);
        }

    }

    // Get a specific user
    async findById(req: Request, res: Response) {

        const { userId } = req.params;

        const user = await User.findOne({
            where: {
                id: userId,
            }
        })

        return user ? res.status(200).json(user) : res.status(204).send();
    }

    async findByEmail(req: Request, res: Response) {

        const { userEmail } = req.params;

        const user = await User.findOne({
            where: {
                email: userEmail,
            }
        })

        return user ? res.status(200).json(user) : res.status(204).send();
    }

    // Update a specific user data
    async update(req: Request, res: Response) {

        const { userId } = req.params;

        const user: IDbUserInstance | any = await User.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {

            return res.status(404).send('Usuário não encontrado!')
        }

        let avatar = user.avatar

        const { email, name, premuim } = req.body;

        if (req.file) {
            avatar = "users-api/uploads/" + req.file.filename
        }

        await User.update({
            email,
            name,
            premuim,
            avatar,
        }, {
            where: {
                id: userId,
            }
        })

        return res.status(204).send();
    }

    // Delete a specific user
    async destroy(req: Request, res: Response) {

        const { userId } = req.params;

        await User.destroy({
            where: {
                id: userId
            }
        })

        return res.status(204).send();
    }

    logout(request: Request, response: Response) {
        request.logOut()
        response.redirect('/login')
    }

    // Create a user
    async create(request: Request, response: Response, file: any) {

        const { email, name, premuim = 0 } = request.body;
        const avatar = "/uploads/" // adicionar o caminho para uma imagem default

        await bcrypt.hash(request.body.password, 10).then(async (hashedPassword) => {
            if (hashedPassword) {
                const user = await User.create({
                    email,
                    name,
                    password: hashedPassword,
                    premuim,
                    avatar,
                })

                return response.status(200).json(user);
            } else {
                return response.status(404).send("erro")
            }
        })

    }

    // Create one time reset password

    async resetLinkGenerator(request: Request, response: Response) {
        const email = request.body.email

        const user = await User.findOne({
            where: {
                email: email,
            }
        })

        if (!user) {
            response.status(404).send('Email não cadastrado')
            return
        }

        if (user.provider_name === "Google") {
            response.send("E")
            return
        }

        const secret = process.env.RESET_PASSWORD_SECRET + user.password

        const token = jwt.sign(user.toJSON(), secret, { expiresIn: '15m' })

        const link = `http://localhost:8888/reset-password/${user.id}/${token}`


        transporter.sendMail({
            from: process.env.UMBLER_EMAIL,
            to: email,
            subject: 'Recuperação de senha',
            text: "Aqui o seu link de recuperação de senha",
            html: `<p>${link}</p>`
        }).then((result: any) => {
            console.log(result)
            return response.send('Um link para recuperação de senha foi enviado para o seu email...')
        }).catch(err => {
            console.log(err)
            return response.status(500)
        })


    }

    async resetPassword(request: Request, response: Response) {
        const { id, token } = request.params
        const password = await bcrypt.hash(request.body.password, 10)

        await User.update({ password }, {
            where: {
                id: id,
            }
        })

        return response.status(200).send('Senha alterada com sucesso!');
    }

}

export default new UserController()

