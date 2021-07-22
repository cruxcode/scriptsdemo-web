import React from "react";

export interface HomePageHeaderProps {}

export const HomePageHeader: React.FC<HomePageHeaderProps> = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">
					SCRIPTS Demo
				</a>
			</div>
		</nav>
	);
};
