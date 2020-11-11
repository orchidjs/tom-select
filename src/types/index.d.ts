
import TomSelect from '../tom-select.js';

export interface TomInput extends HTMLInputElement{
	tomselect				: TomSelect;
}

export type TomArgObject = {
	silent?: boolean,
}
