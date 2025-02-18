import { Routes, Route } from 'react-router-dom';
import Testnets from '../components/pages/Testnets';

export default function ContentContainer() {
	return (
		<main className="page-content">
			<Routes>
				{/* Routing to Testnets page by default */}
				<Route path="*" element={<Testnets />} />
			</Routes>
		</main>
	);
}
