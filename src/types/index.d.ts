
import TomSelect from '../tom-select.js';

export interface TomInput extends HTMLInputElement{
	tomselect				: TomSelect;
}

export type TomArgObject = {
	silent?: boolean,
}

export type TomOption = {[key:string]:any}

export type TomOptions = {[key: string]: TomOption };

export type TomCreateFilter = (input:string) => boolean;

export type TomCreateCallback = (data?:TomOption)=>void;

export type TomCreate = (input:string,create:TomCreateCallback) => boolean;
