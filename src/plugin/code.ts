figma.showUI(__html__, { width: 500, height: 500 });

// handle selection change
figma.on("selectionchange", () => {});

// Handle page change
figma.on("currentpagechange", () => {});

// Handle app close
figma.on("close", () => {});

// Handle incoming data from ./src/app/
figma.ui.onmessage = (msg) => {
	const { type = null, payload = null } = msg;

	switch (type) {
		case "UI_MESSAGE":
			figma.notify(payload);
			notifyUI("Hi UI, I'm Figma!");
			break;
		case "CLOSE":
			figma.closePlugin();
			break;
		default: // Do nothing
	}
};

// Send data to ./src/app/
const notifyUI = (message: string) => {
	figma.ui.postMessage({ type: "PLUGIN_MESSAGE", payload: message });
};
