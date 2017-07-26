$(document).ready(function () {

	saveValue();
	deleteNotes();
	showTravolta();
	appendAllData();
	showWarning();


});

/**
 * Global variables !
 * @type {Element}
 */

var save_button = document.getElementById("save_note");
var inp = document.getElementById("note_input");
if (!localStorage.getItem("note_count")) {
	localStorage.setItem("note_count", "0");
	var count = Number(localStorage.getItem("note_count"));
}
else {
	var count = Number(localStorage.getItem("note_count"));
}

/**
 * Cookies setter/getter
 */


function set_cookie(name, value, nHours, add) {
	if (nHours == null || nHours == 0) nHours = 1;
	var today = new Date();
	var expire = new Date();
	expire.setTime(today.getTime() + 3600000 * nHours);
	var value_name_new = '';
	if (add === true) {
		var value_name = get_cookie(name);
		if (value_name) {
			arrayValue = value_name.split(" ");
			for (var i = 0; i < arrayValue.length; i++) {
				if (String(arrayValue[i]) != String(value))
					value_name_new += String(arrayValue[i]) + ' ';
			}
		}
		else {
		}
		document.cookie = name + "=" + escape(value_name_new + value) + "; expires=" + expire.toGMTString() + "; path=/;";
	}
	else {
		document.cookie = name + "=" + value + "; expires=" + expire.toGMTString() + "; path=/;";
	}
	return true;
}
function get_cookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	}
	else {
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}


function delete_cookie(name, path, domain) {
	if (get_cookie(name)) {
		document.cookie = name + "=" +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}


/**
 * Check if input is empty
 */
inp.addEventListener("input", function (e) {
	if (e.target.value.length > 0) {
		document.getElementById('tooltip_input').classList.remove('open')
	}
});

/**
 * If no notes - display surprise
 */

function showTravolta() {
	var travolta = document.getElementById('empty_notes');
	if (localStorage.length === 1) {
		travolta.classList.add('open');
	}
	else if (localStorage.length >= 2) {
		travolta.classList.remove('open');
	}
}
/**
 * Saving new input and manipulate with it
 */


function saveValue() {
	
	var notes = document.getElementsByClassName('notes_block')[0];
	var travolta = document.getElementById('empty_notes');

	
	save_button.addEventListener('click', function (e) {
		
		if (inp.value == '') {
			document.getElementById('tooltip_input').classList.add('open');
			return false;
		}
		
		e.preventDefault();
		
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		
		var newDate = year + "/" + month + "/" + day;
		localStorage.setItem("note_count", ++count);
		
		console.log(count);
		
		var input = document.getElementById('note_input');
		
		localStorage.setItem("note_text_" + count, input.value);
		
		var gettingValueName = localStorage.getItem("note_text_" + count);
		
		var note = '<p class="note_text cf">';
		var note_number = '<span class="note_count_number f_left"> ' + newDate + '</span>';
		
		var result = $(note).text(gettingValueName);
		var res = $(result).append(note_number);
		
		$(notes).append(res);
		
		input.value = '';

		travolta.classList.remove('open')
		
	})
}

/**
 * Whenever page is reloading, appending all data from LocalStorage into page
 */

function appendAllData() {
	var notes = document.getElementsByClassName('notes_block')[0];
	var block = '<p class="note_text">';

	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	var newDate = year + "/" + month + "/" + day;
	var note_number = '<span class="note_count_number f_left"> ' + newDate + '</span>';


	for (var i in localStorage) {
		if (i == 'note_count') continue;
		if (localStorage.hasOwnProperty(i)) {
			console.log(localStorage[i]);
			var result = $(block).text(localStorage[i]);
			var res = $(result).append(note_number);
			$(notes).append(res);
		}
	} 
}
/**
 * Button for delete all notes form page
 */
function deleteNotes() {
	var deleteBtn = document.getElementById('reset_notes');
	deleteBtn.addEventListener('click', function (e) {
		console.log('1');
		e.preventDefault();
		document.location.reload(true);
		localStorage.clear();
	})
}

/**
 * Open/close popup on load
 * @param e
 */
function showWarning() {
	if (get_cookie('warning') != 1) {
		set_cookie('warning', 1, 24, false);
		var popup = document.getElementById('pop-up-warning');
		var close = document.getElementById('close_popup');
		popup.classList.add('open');
		close.addEventListener('click', function (e) {
			e.preventDefault();
			popup.classList.remove('open');
		})
	}
}




