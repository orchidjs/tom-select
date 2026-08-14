
export type RBOptions = {
	label     ?: string,
	title     ?: string,
	className ?: string,
	tabindex  ?: number,
	role      ?: string,
	html      ?: (data: RBOptions) => string,
};
