import { useEffect, useState } from "react";
import { summary } from "../../services";
import "./SearchResult.scss";
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
		<div>
			<div>
				<p
					style={{
						backgroundColor: "#C4C4C4",
						color: "rgb(66, 90, 131)",
						fontWeight: "bold",
					}}
				>
					{props.filename}
				</p>
				<p
					className="card-text"
					dangerouslySetInnerHTML={{ __html: desc || "" }}
				></p>
			</div>
		</div>
	);
};
