// document.addEventListener("DOMContentLoaded", function () {
//     const sidenav = document.getElementById("sidenav");
//     const table = document.getElementById("region");
//     let originalMarginLeft;

//     sidenav.addEventListener("mouseenter", function () {
//         originalMarginLeft = getComputedStyle(table).marginLeft;
//         sidenav.classList.add("expanded");
//         setTableSize("expanded");
//     });

//     sidenav.addEventListener("mouseleave", function () {
//         sidenav.classList.remove("expanded");
//         setTableSize("collapsed");
//     });

//     function setTableSize(state) {
//         if (state === "expanded") {
//             table.style.marginLeft = "10%"; 
//         } else {
//             table.style.marginLeft = originalMarginLeft; 
//         }
//     }

//     function showRows(database) {
//         var rows = document.querySelectorAll("#database tr");
//         var count = 1;

//         for (var i = 0; i < rows.length; i++) {
//             var row = rows[i];

//             if (row.id === "header") {
//                 row.style.display = "table-row";
//                 continue;
//             }

//             row.style.display = "none";

//             if (row.getAttribute("database") === database || database === "All") {
//                 row.style.display = "table-row";

//                 if (row.getAttribute("database") === database) {
//                     row.cells[0].textContent = count;
//                     count++;
//                 } else if (database === "All") {
//                     row.cells[0].textContent = count;
//                     count++;
//                 }
//             }
//         }
//     }

//     const tableRows = document.querySelectorAll('tbody tr');

//     tableRows.forEach((row, index) => {
//         const noColumn = row.querySelector('td:first-child');
//         noColumn.textContent = index + 1;
//     });
// });

// function showImage(imagePath) {
//     var modal = document.getElementById("imageModal");
//     var modalImage = document.getElementById("modalImage");
  
//     modalImage.src = imagePath;
  
//     modal.style.display = "block";
//   }
  
//   function closeModal() {
//     var modal = document.getElementById("imageModal");
  
//     modal.style.display = "none";
//   }
  
//   document.addEventListener("DOMContentLoaded", function() {
//     var imageLinks = document.querySelectorAll(".image-link");
//     imageLinks.forEach(function(link) {
//       link.addEventListener("click", function(event) {
//         event.preventDefault();
//         var imagePath = link.getAttribute("href");
//         showImage(imagePath);
//       });
//     });
// });

const express = require('express');
const imgprocessRouter = express.Router();
const pool = require('../db/db');

imgprocessRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');

    if (req.session.user) {
        pool.query('SELECT * FROM images WHERE process_status = \'No\'', (err, result) => {
            if (!err) {
                res.render('img_process', { data: result.rows });
            } else {
                console.error('Error executing SQL query:', err);
                console.error(err.stack);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } else {
        res.redirect('/login');
    }
});

imgprocessRouter.post('/update', (req, res) => {
    if (req.session.user) {
        const recordComplianceStatus = 'No'; 
        const loggedInName = req.session.userEmail;

        const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Kuala_Lumpur',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date());

        pool.query('UPDATE images SET process_status = $1, updated_at = $2, updated_by = $3, transition_date = $4, process_date = $5 WHERE process_status = $6',
        ['Yes', formattedTimestamp, loggedInName, formattedTimestamp, formattedTimestamp, recordComplianceStatus],
        (err, result) => {
            if (!err) {
                console.log('Database updated successfully');
                // Redirect to the first URL on the client side
                
                res.redirect('http://47.250.10.195:8888/');
                if (!err) {
                    console.log('Redirecting to http://47.250.10.195:8888/');
                } else {
                    console.error('Error going to 8888:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            } else {
                console.error('Error updating records:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

module.exports = imgprocessRouter;