var editModal = document.getElementById('editModal')
editModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  // Extract info from data-bs-* attributes
  var id = button.getAttribute('data-id')
  
  //AJAX Request
  $.ajax({
		url: "/products/"+id,
		type: 'GET',
		cache: false,
		success: (data) => {
      populateEditModal(data);
		},
		error: () => {
			$('.error').toast('show');
		},
	});

  // Update modal's content with the information of the product.
  function populateEditModal (data) {
    editModal.querySelector("#product-id").value = data.id[0];
    $("#editModalSelect").val(data.category)
    editModal.querySelector("#product-title").value = data.title[0];
    editModal.querySelector("#product-price").value = data.price[0];
    editModal.querySelector("#product-image").value = data.image[0];
    editModal.querySelector("#product-description").value = data.description[0];
  }
})