import Content from "./content";
import Sidebar from "./sidebar";

export default function Container({children}) {
	return (
		<div>
			<Sidebar>this is sidebar</Sidebar>
			<Content></Content>
		</div>
	);
}
