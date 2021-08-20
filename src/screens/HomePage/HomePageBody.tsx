import React, { useRef, useState } from "react";
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
	const lang = "ps";
	const size = 20;
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const [dialogContent, setDialogContent] = useState<string>("");
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
			<div className={"searchresults"}>
				{queryText ? (
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
							showDialog={(content: string) => {
								setShowDialog(true);
								setDialogContent(content);
							}}
						/>
					);
				})}
			</div>
			{showDialog ? (
				<div
					style={{
						display: "initial",
						position: "fixed",
						top: "0",
						left: "0",
						width: "100vw",
						height: "100vh",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
					}}
					onClick={() => {
						console.log("clicked outside");
						setShowDialog(false);
					}}
				>
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							maxHeight: "60vh",
							maxWidth: "80vw",
							overflow: "scroll",
							backgroundColor: "white",
							padding: "2rem",
							borderRadius: "1rem",
						}}
						onClick={(event) => {
							console.log("clicked inside");
							event.stopPropagation();
						}}
						dangerouslySetInnerHTML={{ __html: dialogContent }}
					></div>
				</div>
			) : null}
		</div>
	);
};
