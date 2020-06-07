import { Driver } from './driver.class';
import { Passenger } from './passenger.class';
import { Vehicle } from './vehicle.class';

export class Trip {
    id?: string;
    recurrency?: string;
    time?:string;
    origin?:string;
    destination?:string;
    stops?:string;
    driver?: Driver;
    passengers?: Passenger; 
    vehicle?: Vehicle;

}