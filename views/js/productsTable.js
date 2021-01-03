// Ajax request to print table in the homepage
function load_table() {
	$("#products").empty();
	$.getJSONuncached = function (url){
		return $.ajax({
			url: url,
			type: 'GET',
			cache: false,
			success: function (html)
			{
				$("#products").append(html);
			}
		});
	};
	$.getJSONuncached("/products")
};

// Ajax request to delete products
function deleteProduct(id){
	$.ajax({
		url: "/products/"+id,
		type: 'DELETE',
		cache: false,
		success: function () {
			$('.success').toast('show');
			load_table();
		},
		error: function () {
			$('.error').toast('show');
		},
	});
};

// Load table when the page loads.
$(document).ready(function () {
	load_table();
});