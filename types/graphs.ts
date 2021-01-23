/**
 * One node in graph
 */
export interface GraphNode {
	id: string
	label: string
}

/**
 * A link between nodes
 */
export interface GraphEdge {
	source: string
	target: string
}

/**
 * Data for a node relationship graph
 */
export interface NodeGraphData {
	nodes: GraphNode[]
	links: GraphEdge[]
}
