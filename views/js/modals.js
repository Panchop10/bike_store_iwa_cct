var editModal = document.getElementById('editModal')
editModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  // Extract info from data-bs-* attributes
  var id = button.getAttribute('data-id')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  var modalTitle = editModal.querySelector('.modal-title')
  // var modalBodyInput = editModal.querySelector('.modal-body input')

  modalTitle.textContent = id
  // modalBodyInput.value = recipient
})