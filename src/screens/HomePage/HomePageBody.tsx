import React, { useEffect, useRef, useState } from "react";
import { SearchResultCard } from "../../components/cards/SearchResult";
import { search } from "../../services";
import "./HomePage.scss";
export interface HomePageBodyProps {}

export const HomePageBody: React.FC<HomePageBodyProps> = (props) => {
	const [source, setSource] = useState<"text" | "audio">("text");
	const [clir, setClir] = useState<{
		query: any;
		results: {
			id: string;
			score: number;
			description?: string;
			source?: string;
		}[];
	}>();
	const [queryid, setQueryid] = useState<string>();
	const searchInput = useRef<HTMLInputElement>(null);
	const [queryText, setQueryText] = useState<string | null>(null);
	const [lang, setLang] = useState<string>("fa");
	const size = 20;
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const [dialogContent, setDialogContent] = useState<string>("");
	const [docName, setDocName] = useState<string>("");
	useEffect(() => {
		setClir(undefined);
		setDialogContent("");
		setDocName("");
		setShowDialog(false);
		setQueryid(undefined);
	}, [
		source,
		lang,
		queryText,
		setClir,
		setDialogContent,
		setDocName,
		setShowDialog,
		setQueryid,
	]);
	const handleSearchClick = () => {
		if (searchInput) {
			const query = searchInput.current?.value || "";
			setQueryText(query);
			search(query, lang, source, size).then((resp) => {
				console.log(resp);
				if (resp.success) {
					const clir_results = JSON.parse(resp.result);
					console.log(clir_results);
					setQueryid(resp.queryid.replace(".json", ""));
					setClir(clir_results);
				}
			});
		}
	};
	return (
		<div>
			<div className={"searchbar"}>
				<div className={"searchbaritem"} style={{ width: "20rem" }}>
					<input
						type="text"
						ref={searchInput}
						style={{
							boxSizing: "border-box",
							lineHeight: "1.5rem",
							width: "100%",
							borderRadius: "0.5rem",
							borderColor: "rgb(66, 91, 132)",
						}}
					/>
				</div>
				<div className={"searchbaritem"}>
					<select
						id="lang"
						name="lang"
						style={{
							fontSize: "1rem",
							padding: "0.25rem 0",
							borderRadius: "0.5rem",
							boxSizing: "border-box",
							border: "2px solid rgb(66, 91, 132)",
							minWidth: "8rem",
						}}
						value={lang}
						onChange={(selection) => {
							setLang(selection.target.value as any);
						}}
					>
						<option value="fa">Farsi</option>
						<option value="ps">Pashto</option>
					</select>
				</div>
				<div className={"searchbaritem"}>
					<select
						id="source"
						name="source"
						style={{
							fontSize: "1rem",
							padding: "0.25rem 0",
							borderRadius: "0.5rem",
							boxSizing: "border-box",
							border: "2px solid rgb(66, 91, 132)",
							minWidth: "8rem",
						}}
						value={source}
						onChange={(selection) => {
							setSource(selection.target.value as any);
						}}
					>
						<option value="text">Text</option>
						<option value="audio">Audio</option>
					</select>
				</div>
				<div
					className={"searchbaritem"}
					style={{
						width: "8rem",
					}}
				>
					<button
						style={{
							backgroundColor: "transparent",
							borderRadius: "0.5rem",
							width: "100%",
							border: "2px solid rgb(66, 91, 132)",
						}}
						onClick={handleSearchClick}
					>
						Search
					</button>
				</div>
			</div>
			<div></div>
			<div
				className={"searchresults"}
				style={{ overflow: "auto", height: "calc(100vh - 15rem)" }}
			>
				{queryText && queryid ? (
					<div
						style={{
							backgroundColor: "rgb(232, 242, 254)",
							color: "rgb(68, 90, 132)",
							fontWeight: "bold",
						}}
					>
						<p>Query: {queryText}</p>
					</div>
				) : null}
				{clir?.results.map((c, index) => {
					return (
						<SearchResultCard
							filename={c.id}
							description={c.description || ""}
							score={c.score}
							queryid={queryid!}
							lang={lang}
							source={source}
							key={c.id}
							showDialog={(content: string, doc: string) => {
								setShowDialog(true);
								setDialogContent(content);
								setDocName(doc);
							}}
						/>
					);
				})}
			</div>
			{showDialog ? (
				<div
					style={{
						display: "inline-block",
						width: "40%",
						position: "absolute",
						overflow: "auto",
						height: "calc(100vh - 15rem)",
					}}
				>
					<div
						style={{
							backgroundColor: "rgb(232, 242, 254)",
							color: "rgb(68, 90, 132)",
							fontWeight: "bold",
						}}
					>
						<p>Document: {docName}</p>
					</div>
					<div
						dangerouslySetInnerHTML={{ __html: dialogContent }}
					></div>
				</div>
			) : null}
		</div>
	);
};
