function showOutletPopup() {
    const outletPopup = document.getElementById('outlet-popup');
    outletPopup.style.display = 'block';

    setTimeout(function() {
      outletPopup.style.display = 'none';
    }, 3000);
  }

function showBrandPopup() {
    const brandPopup = document.getElementById('brand-popup');
    brandPopup.style.display = 'block';
  
    setTimeout(function() {
      brandPopup.style.display = 'none';
    }, 3000);
  }

function showProductPopup() {
  const productPopup = document.getElementById('product-popup');
  productPopup.style.display = 'block';
  
    setTimeout(function() {
      productPopup.style.display = 'none';
    }, 3000);
  }

  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('outlet') && urlParams.get('outlet') === 'true') {
    showOutletPopup();
  } else if (urlParams.has('brand') && urlParams.get('brand') === 'true') {
    showBrandPopup();
  } else if (urlParams.has('product') && urlParams.get('product') === 'true') {
    showProductPopup();
  }