import React, { useState } from "react";
import { SearchResultCard } from "../../components/cards/SearchResult";

export interface HomePageBodyProps {}

export const HomePageBody: React.FC<HomePageBodyProps> = (props) => {
	const [source, setSource] = useState<"Source" | "text" | "audio">("Source");
	const handleSourceSelect = (source: "text" | "audio") => {
		setSource(source);
	};
	const handleSearchClick = () => {};
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
				<SearchResultCard
					filename="abct.txt"
					description="A long summary"
					score="2.3"
				/>
			</div>
		</div>
	);
};
