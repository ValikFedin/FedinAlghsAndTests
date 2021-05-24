import {Item} from './item';
 
export enum Order {MIN, MAX};
export interface IHeap {
    insert(item:Item):void;
    extract():Item;
    peek():Item;
    size():number;
};