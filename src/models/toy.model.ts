import { AgeGroup } from "./age-group.model"
import { ToyType } from "./toy-type.model"

export interface Toy {
    toyId: number
    name: string
    permalink: string
    description: string
    targetGroup: 'dečak' | 'devojčica' | 'svi'
    productionDate: string
    price: number
    imageUrl: string

    ageGroup: AgeGroup
    type: ToyType
}