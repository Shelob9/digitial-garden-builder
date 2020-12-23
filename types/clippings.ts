export interface Clipping {
	id: number
	title: string
	content?: string
	link?: string
	created_at: string
	authorName: string
	authorUrl?: string
}

export type clippingCollection = Clipping[]
