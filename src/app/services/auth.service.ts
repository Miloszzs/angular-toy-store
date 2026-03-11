import { UserModel } from "../../models/user.model"
const ACTIVE = 'active'
const USERS = 'users'
export class AuthService {
    
    static getUsers() {
        if(localStorage.getItem(USERS) == null) {
            localStorage.setItem(USERS, JSON.stringify({
                firstName: 'Example',
                lastName: 'User',
                email: 'user@example.com',
                password: 'user123',
                orders: []
            }))
        } return JSON.parse(localStorage.getItem(USERS)!)
    }

    static login(email: string, password: string) {
        const users = this.getUsers()
        for(let u of users){
            if(u.email === email && u.password === password) {
                localStorage.setItem(ACTIVE, email)
                return true
            }
        } return false
    }

    static getActiveUser(): UserModel | null {
        const users = this.getUsers()
        for(let u of users){
            if(u.email === localStorage.getItem(ACTIVE)){
                return u
            }
        } return null
    }
}