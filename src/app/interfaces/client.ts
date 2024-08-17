export interface Client {
    _id: string;
    name: string;
    lastname: string;
    age: number;
    address: string;
    phone: string;
    vehicleBrand: string;
    vehicleModel: string;
    mileage: number;
    createdAt: Date;
    reforms: any[]
}