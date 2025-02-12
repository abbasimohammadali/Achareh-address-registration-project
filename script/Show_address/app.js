const addressListElement = document.getElementById('address-list');
const errorMessageElement = document.getElementById('error-message');

async function fetchAddresses() {
    try {
        const response = await fetch('https://stage.achareh.ir/api/karfarmas/address', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
            }
        });

        if (!response.ok) {
            throw new Error('خطا در دریافت داده‌ها');
        }

        const addresses = await response.json();
        console.log(addresses);
        displayAddresses(addresses);
    } catch (error) {
        errorMessageElement.textContent = error.message;
    }
}

function displayAddresses(addresses) {
    if (addresses.length === 0) {
        addressListElement.innerHTML = '<p>هیچ آدرسی وجود ندارد.</p>';
        return;
    }

    addresses.forEach(address => {

        console.log(address)
        const addressItem = document.createElement('div');
        addressItem.className = 'address-item row';
        addressItem.innerHTML = `
            <div class="col-lg-3 col-sm-12 pb-2">
                <p>نام</p>
                <p>${address.first_name}</p>
            </div>
            <div class="col-lg-3 col-sm-12 pb-2">
                <p>نام خانوادگی</p>
                <p>${address.last_name}</p>
            </div>
            <div class="col-lg-6 col-sm-12 pb-2">
                <p>شماره تلفن همراه</p>
                <p> ${address.coordinate_mobile}+</p>
            </div>
            <div class="col-lg-3 col-sm-12 pb-2">
                <p>شماره تلفن ثابت</p>
                <p>${address.coordinate_phone_number}+</p>
            </div>
            <div class="col-lg-3 col-sm-12 pb-2">
                <p>جنسیت</p>
                <p> ---- </p>
            </div>
            <div class="col-lg-6 col-sm-12 pb-2">
                <p>آدرس</p>
                <p>${address.address}</p>
            </div>
        `;
        addressListElement.appendChild(addressItem);
    });
}

fetchAddresses();