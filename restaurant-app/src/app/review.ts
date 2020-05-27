import { User } from './user';

export interface Review {
    created: Date;
    author: User;
    restaurant: string;
    text: string;
    rating: number;
}
