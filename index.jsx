import React from "react";
import ReactDom from "react-dom/client";
import App1 from "./src/f0";
import App2 from "./src/f1";

ReactDom.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App1 />
		<App2 />
	</React.StrictMode>
);

		
		