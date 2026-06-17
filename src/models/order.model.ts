import { AgeGroup } from "./age-group.model"
import { ToyType } from "./toy-type.model"

export interface OrderModel {
    toyId: number,
    price: number,
    name: string,
    ageGroup: AgeGroup,
    type: ToyType,
    count: number,
    createdAt: string,
    state: 'rezervisano' | 'pristiglo' | 'otkazano'
}