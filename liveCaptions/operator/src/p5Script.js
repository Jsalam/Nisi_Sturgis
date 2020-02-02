var captions;
let colNames = "Seq	_in	speakerID_A	name_A	caption_A	duration_A	style_A	speakerID_B	name_B	caption_B	duration_B	style_B	speakerID_C	name_C	caption_C	duration_C	style_C	speakerID_D	name_D	caption_D	duration_D	style_D"

function preload() {
	loadTable('script/wolvesScript.csv', 'header', csvLoaded)
}

function csvLoaded(data) {
	captions = data.getObject()

	// html table
	let table = document.getElementById("table1");

	for (let i = 0; i < Object.keys(captions).length; i++) {
		// get object
		const entry = captions[i];

		// reformat object
		let cells = reformat4HTML(entry);

		// cell keys
		let nKeys = Object.keys(cells);

		// html row
		let row = table.insertRow();

		for (let j = 0; j < nKeys.length; j++) {
			const value = cells[nKeys[j]];
			let cellTmp = row.insertCell();
			cellTmp.innerHTML = value;
		}
	}
}

function reformat4HTML(entry) {

	let rtn = {
		seq:
			"<p class=seq>" + entry.Seq + "</p>",
		in:
			"<p class=time>" + entry._in + "</p>",
		cue:
			"<p class=cue>" + entry.cue + "</p>",
		captionA:
			"<p class=name>" + entry.name_A + "</p>"
			+ "<p class=" + entry.style_A + ">" + entry.caption_A + "</p>"
			//+ "<p>" + entry.duration_A + "</p>"
			,
		captionB:
			"<p class=name>" + entry.name_B + "</p>" 
			+ "<p class=" + entry.style_B + ">" + entry.caption_B + "</p>"
			//+ "<p>" + entry.duration_B + "</p>"
			,
		captionC:
			"<p class=name>" + entry.name_C + "</p>" 
			+ "<p class=" + entry.style_C + ">" + entry.caption_C + "</p>" 
			//+ "<p>" + entry.duration_C + "</p>"
			,
		captionD:
			"<p class=name>" + entry.name_D + "</p>" 
			+ "<p class=" + entry.style_D + ">" + entry.caption_D + "</p>" 
			//+ "<p>" + entry.duration_D + "</p>"
	}
	return rtn;
}

function setup(){

}

