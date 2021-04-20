// Ajax request to print table in the homepage
function load_table() {
  $("#products").empty();
  let html = ``;
	$.ajax({
		url: "/products/categories",
		type: 'GET',
		cache: false,
		success: (options) => {
      for (const [key, value] of Object.entries(options)) {
        html += `<div class="container">
            <div class="row mt-4">
              <h2>`;
        html += value;
        
        html += `</h2>
            </div>
          <div class="row">
        `;

        	$.ajax({
            async: false,
            url: "/products",
            type: 'GET',
            cache: false,
            data: { category: value },
            success: (products) => {
              for (const [productKey, product] of Object.entries(products)) {
              html += `
                <div class="col-lg-2 col-md-3 col-sm-4 mt-2">
                <img src="`;
                
                html += product.image;

                html += `" alt="" width="150" height="150" />
                <div class="row" style="min-height: 150px;">
                  <div class="col-md-12 mt-3">
                    <h6>`;
                    
                html += product.title;

                html += `</h6>
                  </div>
                  <div class="col-md-12">
                    <p><b>Price:</b> €`;
                
                html += product.price;

                html += `</p>
                  </div>
                </div>
                <div class="row">     
                  <div class="col-md-12 align-bottom">
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" data-id="`;
                    
                html += product._id;

                html += `">Edit</button>
                    <button type="button" class="btn btn-danger" style="margin-left:10px;" onclick="deleteProduct({`;
                    
                html += product._id;

                html += `})">Delete</button>
                  </div>
                </div>
              </div>
              `;
              }
            }
          });
        
        html += `
          </div>
        </div>
        `;
      }
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

      for (const [key, value] of Object.entries(options)) {
        $cs.append($("<option></option>").attr("value", value).text(value));
        $es.append($("<option></option>").attr("value", value).text(value));
      }
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