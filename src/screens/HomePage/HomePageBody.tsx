import React, { useRef, useState } from "react";
import { SearchResultCard } from "../../components/cards/SearchResult";
import { search } from "../../services";

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

	const handleSourceSelect = (source: "text" | "audio") => {
		setSource(source);
	};
	const handleSearchClick = () => {
		if (searchInput) {
			const query = searchInput.current?.value || "";
			const lang = "ps";
			const size = 20;
			search(query, lang, source, size).then((resp) => {
				console.log(resp);
				if (resp.success) {
					const clir_results = JSON.parse(resp.result);
					console.log(clir_results);
					setClir(clir_results);
					setQueryid(resp.queryid);
				}
			});
		}
	};
	return (
		<div className="container">
			<div className="d-flex flex-row">
				<div>
					<button type="button" className="btn btn-primary">
						{source}
					</button>
					<button
						type="button"
						className="btn btn-primary dropdown-toggle dropdown-toggle-split"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<span className="visually-hidden">Toggle Dropdown</span>
					</button>
					<ul className="dropdown-menu">
						<li>
							<a
								className="dropdown-item"
								onClick={() => {
									handleSourceSelect("text");
								}}
							>
								text
							</a>
						</li>
						<li>
							<a
								className="dropdown-item"
								onClick={() => {
									handleSourceSelect("audio");
								}}
							>
								audio
							</a>
						</li>
					</ul>
				</div>
				<div style={{ flex: 1, marginRight: "5px", marginLeft: "5px" }}>
					<input
						type="text"
						className="form-control"
						id="exampleFormControlInput1"
						placeholder="type your query here"
						ref={searchInput}
					/>
				</div>
				<div>
					<button
						className="btn btn-primary"
						onClick={handleSearchClick}
					>
						Search
					</button>
				</div>
			</div>
			<div className="row mt-4">
				{clir?.results.map((c, index) => {
					return (
						<SearchResultCard
							filename={c.id}
							description={c.description || ""}
							score={c.score}
							queryid={queryid!}
							key={index}
						/>
					);
				})}
			</div>
		</div>
	);
};
