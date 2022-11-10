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

export function login(name: string, email: string, password: string) {
    session.user = {
        name,
        email,
        password
    };
}

export function logout() {
    session.user = null;
}

export interface User {
    name: string;
    email: string;
    password?: string;
}

export default session;