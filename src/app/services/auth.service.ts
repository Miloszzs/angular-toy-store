import { OrderModel } from "../../models/order.model"
import { Toy } from "../../models/toy.model"
import { UserModel } from "../../models/user.model"
const ACTIVE = 'active'
const USERS = 'users'
export class AuthService {
    
    static getUsers(): UserModel[] {
        const baseUser : UserModel = {
                firstName: 'Example',
                lastName: 'User',
                email: 'user@example.com',
                address: 'Miroslava Tirse 19',
                phone: '012662705',
                password: 'user123',
                toyType: 'Vozilo',
                orders: []
            }
        if(localStorage.getItem(USERS) == null) {
            localStorage.setItem(USERS, JSON.stringify([baseUser]))
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

    static updateActiveUser(newUserData: UserModel) {
        const users = this.getUsers()
        for(let u of users){
            if(u.email === localStorage.getItem(ACTIVE)){
                u.firstName = newUserData.firstName
                u.lastName = newUserData.lastName
                u.address = newUserData.address
                u.phone = newUserData.phone
                u.toyType = newUserData.toyType
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static updateActiveUserPassword(newPassword: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.password = newPassword
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static logout() {
        localStorage.removeItem(ACTIVE)
    }

    static createOrder(order: Partial<OrderModel>, toy: Toy) {
        order.toyId = toy.toyId
        order.name = toy.name
        order.type = toy.type
        order.ageGroup = toy.ageGroup
        order.price = toy.price
        order.createdAt = new Date().toISOString()
        order.state = 'rezervisano'
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.orders.push(order as OrderModel)
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static cancelOrder(createdAt: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                for (let o of u.orders) {
                    if (o.state == 'rezervisano' && o.createdAt == createdAt) {
                        o.state = 'otkazano'
                    }
                }
            }
        }localStorage.setItem(USERS, JSON.stringify(users))
    }

    static payOrder() {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                for (let o of u.orders) {
                    if (o.state == 'rezervisano') {
                        o.state = 'pristiglo'
                    }
                }
            }
        }localStorage.setItem(USERS, JSON.stringify(users))
    }

    static getOrdersByState(state: 'rezervisano' | 'pristiglo' | 'otkazano') {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                return u.orders.filter((o) => o.state === state) 
            }
        }
        return []
    }
}