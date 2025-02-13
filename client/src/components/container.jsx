import Content from "./content";
import Sidebar from "./sidebar";

export default function Container({children}) {
	return (
		<div style={{display: 'flex',}}>
			<div  style={{ flexShrink: 0}}>
				<Sidebar>this is sidebar</Sidebar>
			</div>
			<div  style={{ flexGrow: 1}}>
				<Content></Content>
			</div>
		</div>
	);
}
