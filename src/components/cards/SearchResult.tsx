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
}
export const SearchResultCard: React.FC<SearchResultCardProps> = (props) => {
	const [desc, setDesc] = useState<string>();
	const [docSource, setDocSource] = useState<string>("");
	const [translatedDoc, setTranslatedDoc] = useState<string>("");
	const [showDialog, setShowDialog] = useState<"hidden" | "initial">(
		"hidden"
	);
	const [dialogContent, setDialogContent] = useState<string>("");
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
						resp.content.evidence.translations["umd-smt"]
					);
				}
			});
		}, 200 + Math.random() * 1000);
	}, []);
	const handleShowEnglish = useCallback(() => {
		setDialogContent(translatedDoc);
		setShowDialog("initial");
	}, [translatedDoc]);
	const handleShowSource = useCallback(() => {
		setDialogContent(docSource);
		setShowDialog("initial");
	}, [docSource]);
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
			<div
				style={{
					display: showDialog,
					position: "absolute",
					margin: "0 auto",
					top: "50%",
					bottom: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				{dialogContent}
			</div>
		</div>
	);
};
