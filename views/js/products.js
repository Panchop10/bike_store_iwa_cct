// Ajax request to print table in the homepage
function load_table() {
	$("#products").empty();
	$.ajax({
		url: "/products",
		type: 'GET',
		cache: false,
		success: (html) => {
			$("#products").append(html);
		}
	});
};

// Ajax request to populate the selects with the product categories
function populate_selects () {
	$.ajax({
		url: "/products/categories",
		type: 'GET',
		cache: false,
		success: (options) => {
			var $cs = $("#createModalSelect");
			var $es = $("#editModalSelect");
			$.each(options, function(key,value) {
				$cs.append($("<option></option>").attr("value", value).text(key));
				$es.append($("<option></option>").attr("value", value).text(key));
			});
		}
	});
};

function validateForm (form, e) {
	// prevent form submit if form is not valid
	if (!form.checkValidity()) {
		e.preventDefault();
		e.stopPropagation();
	}

	form.classList.add('was-validated')
}

// Ajax request to delete products
function deleteProduct(id){
	$.ajax({
		url: "/products/"+id,
		type: 'DELETE',
		cache: false,
		success: () => {
			$('.success').toast('show');
			load_table();
		},
		error: () => {
			$('.error').toast('show');
		},
	});
};

// show toast after an request based on a get parameter
function showToast () { 
	// show toast in case there is a get parameter
	let searchParams = new URLSearchParams(window.location.search)
	if (searchParams.has('sucess')) {
		const parameter = searchParams.get('sucess');
		if (parameter == 'ok') {
			$('.success').toast('show');
		}
		else { 
			$('.error').toast('show');
		}
	}
}

// Load table when the page loads.
$(document).ready(function () {
	load_table();
	populate_selects();
	showToast();
})