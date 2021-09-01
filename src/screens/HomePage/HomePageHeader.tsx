import React from "react";
import CUHeader from "../../assests/cu-header.svg";
import ScriptsImage from "../../assests/scripts.png";
export interface HomePageHeaderProps {}

export const HomePageHeader: React.FC<HomePageHeaderProps> = (props) => {
	return (
		<nav>
			<div
				style={{
					backgroundColor: "#0849A3",
					padding: "1rem",
					position: "relative",
				}}
			>
				<img src={CUHeader} style={{ height: "4rem" }} />
				<img
					src={ScriptsImage}
					style={{
						height: "4rem",
						position: "absolute",
						right: "1rem",
					}}
				/>
			</div>
		</nav>
	);
};
