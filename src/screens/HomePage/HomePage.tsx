import React from "react";
import { HomePageBody } from "./HomePageBody";
import { HomePageHeader } from "./HomePageHeader";

export interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = (props) => {
	return (
		<div>
			<HomePageHeader />
			<HomePageBody />
		</div>
	);
};
