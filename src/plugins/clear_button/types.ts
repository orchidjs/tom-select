
export type CBOptions = {
	className	?:string,
	title		?:string,
	role		?:string,
	tabindex	?:number
	html		?: (data:CBOptions) => string,
}
