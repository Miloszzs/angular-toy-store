export interface OrderModel {
    toyId: number,
    count: number,
    createdAt: string,
    state: 'rezervisano' | 'pristiglo' | 'otkazano'
}