import React from "react";

export default function App() {
	const [message, setMessage] = React.useState("");

	// Handle incoming data from ./src/plugin/
	React.useEffect(() => {
		window.onmessage = (event) => {
			if (!event.data.pluginMessage) return;
			const { type = null, payload = null } = event.data.pluginMessage;

			switch (type) {
				case "PLUGIN_MESSAGE":
					setTimeout(() => {
						setMessage(payload);
					}, 1000);
					break;
				default: // Do nothing
			}
		};
	}, []);

	// Send data to ./src/plugin/
	const notifyPlugin = (message: string) => {
		parent.postMessage({ pluginMessage: { type: "UI_MESSAGE", payload: message } }, "*");
	};

	return (
		<div className="min-h-screen flex flex-col gap-5 items-center justify-center">
			<h1 className="font-mono text-2xl">{message}</h1>
			<button
				className="px-2 py-1 border border-black"
				onClick={() => notifyPlugin("Hello Figma, I'm the UI")}>
				Notify Figma
			</button>
		</div>
	);
}
