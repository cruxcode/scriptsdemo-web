import { useEffect, useState } from "react";
import { summary } from "../../services";

export interface SearchResultCardProps {
	filename: string;
	description: string;
	score: number;
	queryid: string;
	lang: string;
	source: string;
}
export const SearchResultCard: React.FC<SearchResultCardProps> = (props) => {
	const [desc, setDesc] = useState<string>();
	const [docSource, setDocSource] = useState<string>();
	useEffect(() => {
		const timer = setInterval(() => {
			summary(
				props.queryid,
				props.filename,
				props.lang,
				props.source
			).then((resp) => {
				if (resp.success && resp.file_ready) {
					clearInterval(timer);
					setDesc(resp.content.markup);
					setDocSource(resp.content.evidence.source);
				}
			});
		}, 200 + Math.random() * 1000);
	}, []);
	return (
		<div className="card">
			<div className="card-body">
				<p
					className="card-text"
					dangerouslySetInnerHTML={{ __html: desc || "" }}
				></p>
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
