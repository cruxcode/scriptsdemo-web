import { useCallback, useEffect, useState } from "react";
import { summary } from "../../services";
import "./SearchResult.scss";
export interface SearchResultCardProps {
	filename: string;
	description: string;
	score: number;
	queryid: string;
	lang: string;
	source: string;
	showDialog: (content: string, doc: string) => void;
}
export const SearchResultCard: React.FC<SearchResultCardProps> = (props) => {
	const [desc, setDesc] = useState<string>();
	const [docSource, setDocSource] = useState<string>("");
	const [translatedDoc, setTranslatedDoc] = useState<string>("");
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
					setTranslatedDoc(
						resp.content.evidence.translations["edi-nmt"]
					);
				}
			});
		}, 200 + Math.random() * 1000);
		return () => {
			clearInterval(timer);
		};
	}, [props.queryid, props.filename, props.lang, props.source, props]);

	const handleShowEnglish = useCallback(() => {
		props.showDialog(translatedDoc, props.filename);
	}, [translatedDoc, props]);
	const handleShowSource = useCallback(() => {
		props.showDialog(docSource, props.filename);
	}, [docSource, props]);
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
				<p dangerouslySetInnerHTML={{ __html: desc || "" }}></p>
			</div>
			<div>
				<p>
					<span className="link" onClick={handleShowEnglish}>
						Show Document in English
					</span>
					{props.lang === "ps" ? (
						<span className="link" onClick={handleShowSource}>
							Show Document in Pashto
						</span>
					) : null}
					{props.lang === "fa" ? (
						<span className="link" onClick={handleShowSource}>
							Show Document in Farsi
						</span>
					) : null}
				</p>
			</div>
		</div>
	);
};
