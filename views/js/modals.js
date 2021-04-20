var editModal = document.getElementById('editModal')
editModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  // Extract info from data-bs-* attributes
  var id = button.getAttribute('data-id');

  //AJAX Request
  $.ajax({
		url: "/products/"+id,
		type: 'GET',
    cache: false,
    data: {id: id},
		success: (data) => {
      populateEditModal(data);
		},
		error: () => {
			$('.error').toast('show');
		},
	});

  // Update modal's content with the information of the product.
  function populateEditModal (data) {
    editModal.querySelector("#product-id").value = data[0]._id;
    $("#editModalSelect").val(data[0].category)
    editModal.querySelector("#product-title").value = data[0].title;
    editModal.querySelector("#product-price").value = data[0].price;
    editModal.querySelector("#product-image").value = data[0].image;
    editModal.querySelector("#product-description").value = data[0].description;
  }
})