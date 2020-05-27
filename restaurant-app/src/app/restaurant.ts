import { User } from './user';
import { Review } from './review';

export interface Restaurant {
    _id: string;
    name: string;
    location: string;
    description: string;
    user: string;
}

export interface SelectedRestaurant {
    _id: string;
    name: string;
    location: string;
    description: string;
    user: User;
    reviews: Review[];
}
