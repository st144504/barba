window.onload = function() {

	function installCollapsibleBlocks() {
		forEachSynopsis(function(synopsis) {
			synopsis.onclick = toggleCollapse;
			withRightRoller(synopsis);
		});
	}

	function withRightRoller(synopsis) {
		let roller = document.createElement("div");
		roller.classList.add("roller");
		roller.onclick = toggleCollapse;
		synopsis.parentElement.insertBefore(roller, synopsis);
	}

	function insertToolsPanel() {
		let panel = document.createElement("div");
		panel.classList.add("tool-panel");
		withTool(panel, "reading", "R", "Raw", "Full text", reading);
		withTool(panel, "dry", "D", "Dry", "miss all the watery stuff", dry);
		withTool(panel, "emphasis", "E", "Emphasis", "highlight main words, shadow surroundings", emphasize);
		withTool(panel, "structure", "T", "Structure", "hide everything but structure ", structure);
		withTool(panel, "suspects", "U", "Suspects", "highlight suspicious words, show justification for the usage, shadow surroundings", suspects);
		withTool(panel, "questions", "Q", "Questions", "show open questions", questions);
		withTool(panel, "keys", "K", "Keys", "hide keys, highlight place-holders, show keys on click", keys);
		let beacon = document.getElementsByTagName("body").item(0).firstChild;
		beacon.parentElement.insertBefore(panel, beacon);

		function withTool(parent, id, letter, text, tooltip, handler) {
			let tool = document.createElement("div");
			tool.id = "tool-" + id;
			tool.innerHTML = "<span class='tool-short'>" + letter + "</span><span class='tool-full'>" + text + "</span>";
			tool.title = tooltip;
			tool.onclick = handler;
			tool.classList.add("tool");
			parent.appendChild(tool);
		}
	}

	insertToolsPanel();
	installCollapsibleBlocks();
	forEachSynopsis(function(synopsis) { synopsis.click(); });
};

function reading() {
	restore();
}

function dry() {
	water(false);
}

function water(undo) {
	for (let water of document.getElementsByClassName("water")) {
		if (undo) {
			water.classList.remove("hidden");
		} else {
			water.classList.add("hidden");
		}
	}
}

function emphasize() {
	const tool = document.getElementById("tool-emphasis");
}

function structure() {
	const tool = document.getElementById("tool-structure");
}

function keys() {
	const tool = document.getElementById("tool-keys");
}

function suspects() {
	const tool = document.getElementById("tool-suspects");
}
function questions() {
	const tool = document.getElementById("tool-questions");
}

function restore() {
	water(true);
}
function forEachSynopsis(overSynopsis) {
	for (let block of document.getElementsByClassName("block")) {
		for (let synopsis of block.getElementsByClassName("synopsis")) {
			overSynopsis(synopsis);
		}
	}
}
function toggleCollapse(event) {
	toggleCollapseOnFragment(event, "body");
	toggleCollapseOnFragment(event, "refs");
}

function toggleCollapseOnFragment(event, fragment) {
	for (let body of event.target.parentElement.getElementsByClassName(fragment)) {
		let classes = body.classList;
		if (classes.contains("collapsed")) {
			classes.remove("collapsed");
		} else {
			classes.add("collapsed");
		}
	}
}


