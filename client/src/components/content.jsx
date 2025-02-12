import { useEffect, useState } from "react";

export default function Content() {
	  const [items, setItems] = useState([]);
	  const [loading, setLoading] = useState(true);
	  const [error, setError] = useState(null);
	
	  
	  useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/testnets`)
		  .then((response) => response.json())
		  .then((data) => {
			setItems(data.data.testnet);
			setLoading(false);
		  })
		  .catch((err) => {
			setError(err);
			setLoading(false);
		  });
	  }, []); 
	
	  if (loading) {
		return <div>Loading...</div>;
	  }
	
	  if (error) {
		return <div>Error: {error.message}</div>;
	  }
	

	return (
		<section>
			<h1>Testnet Items List</h1>
			<ul>
				{items.map((item) => (
				<li key={item.id}>{item.name}</li>
				))}
			</ul>
		</section>
	);
}
