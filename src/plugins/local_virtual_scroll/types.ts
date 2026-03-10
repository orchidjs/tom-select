export type LVSOptions = {
	pageSize?: number; // items per page, default: 50
	maxDomItems?: number; // max items in DOM, default: pageSize * 3
	scrollThreshold?: number; // 0-1, default: 0.9
};

export type FlatItem =
	| { type: 'header'; optgroup: string; el?: HTMLElement }
	| { type: 'option'; id: string; optgroup: string };
