import { reactive } from "vue";

const session = reactive( {
    user: null as User | null,
    /*get token() {
        return this.user?.token; //? means may be undefined, if user is null return null and stop trying to access properties
    },
    set token(token: string | undefined) {
        if(this.user) {
            this.user.token = token;
        }
    },*/
});

export function login(firstName: string, lastName: string) {
    session.user = {
        firstName,
        lastName,
    };
}

export function logout() {
    session.user = null;
}

export class User {
    public firstName?: string;
    public lastName?: string;
    //public token?: string | undefined;
}

export default session;