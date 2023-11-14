document.addEventListener("DOMContentLoaded", function () {
    const sidenav = document.getElementById("sidenav");
    const manageContainer = document.getElementById("outlet-container");
    let originalMarginLeft;

    sidenav.addEventListener("mouseenter", function () {
        originalMarginLeft = getComputedStyle(manageContainer).marginLeft;
        sidenav.classList.add("expanded");
        setManageContainerSize("expanded");
    });

    sidenav.addEventListener("mouseleave", function () {
        sidenav.classList.remove("expanded");
        setManageContainerSize("collapsed");
    });

    function setManageContainerSize(state) {
        if (state === "expanded") {
            manageContainer.style.marginLeft = "13%";
        } else {
            manageContainer.style.marginLeft = originalMarginLeft;
        }
    }

    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach((row, index) => {
        const noColumn = row.querySelector('td:first-child');
        noColumn.textContent = index + 1;
    });

    let sidenavLinks = document.querySelectorAll('.sidenav a');

    sidenavLinks.forEach(function (link) {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    const deleteOutletButtons = document.querySelectorAll('.delete-outlet-btn');
    deleteOutletButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const outletId = button.getAttribute('data-outlet-id');
            const outletName = button.getAttribute('data-outlet-name');

            const confirmationModal = document.getElementById('confirm-delete');
            const confirmationText = document.getElementById('delete-confirmation-text');
            
            // Set the confirmation text with the outlet name
            confirmationText.innerHTML = `Are you sure you want to delete <strong>${outletName}</strong>?`;

            confirmationModal.style.display = 'block';

            document.getElementById('confirmDelete').addEventListener('click', function () {
                // Send the DELETE request to the server to delete the outlet
                fetch(`/outlet/deleteOutlet/${outletId}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.ok) {
                        // Reload the page after successful deletion
                        location.reload();
                    } else {
                        console.error('Error deleting outlet');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });

                // Hide the confirmation modal
                confirmationModal.style.display = 'none';
            });

            // Event listener for "No" button in the confirmation modal
            document.getElementById('cancelDelete').addEventListener('click', function () {
                // Hide the confirmation modal
                confirmationModal.style.display = 'none';
            });
        });
    });
});