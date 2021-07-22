export interface SearchResultCardProps {
	filename: string;
	description: string;
	score: number;
	queryid: string;
}
export const SearchResultCard: React.FC<SearchResultCardProps> = (props) => {
	return (
		<div className="card">
			<div className="card-body">
				<p className="card-text">{props.description}</p>
				<p className="card-text">
					<span className="badge bg-secondary rounded-pill">
						file: {props.filename}
					</span>
					<span className="badge bg-secondary rounded-pill">
						score: {props.score}
					</span>
				</p>
			</div>
		</div>
	);
};
