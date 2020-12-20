function load_table(){
	$("#results").empty();
	$.getJSONuncached = function (url){
		return $.ajax({
			url: url,
			type: 'GET',
			cache: false,
			success: function (html)
			{
				$("#results").append(html);
			}
		});
	};
	$.getJSONuncached("/products")
};

$(document).ready(function (){
	load_table();
});