import { nextTick } from "process";
import Bundle from "./bundle";

class AccessControl {
    isAdmin(request: any, response: any, next: any) {

        const user = Bundle.getBundle(request, null)

        if (user.models.role != "admin") {
            return response.status(401).send("Acesso não autorizado.");
        }

        next()
    }

    isUserOrAdmin(request: any, response: any, next: any) {

        const user = Bundle.getBundle(request, null)

        const userId = request.params.id;

        if (user.models.id != userId && user.models.role != "admin") {
            return response.status(401).send("Acesso não autorizado.");
        }

        next()


    }
}

export default new AccessControl()