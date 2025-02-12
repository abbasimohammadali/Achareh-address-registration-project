let map;
let marker;
let selectedCoords = null;

// بخش اول: اعتبارسنجی فرم و نمایش نقشه
document.getElementById('next-btn').addEventListener('click', () => {
    const form = document.getElementById('address-form');
    if (form.checkValidity()) {
        document.querySelector('.form-section').classList.add('hidden');
        document.querySelector('.map-section').classList.remove('hidden');
        initMap();
    } else {
        alert('لطفاً تمام فیلدهای اجباری را به درستی پر کنید.');
    }
});

// بخش دوم: مقداردهی نقشه
function initMap() {
    map = L.map('map').setView([35.6892, 51.3890], 13); // مختصات تهران
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    map.on('click', (e) => {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.latlng).addTo(map);
        selectedCoords = e.latlng;
    });
}

// ارسال داده‌ها به سرور
document.getElementById('submit-btn').addEventListener('click', async () => {
    if (!selectedCoords) {
        alert('لطفاً یک نقطه روی نقشه انتخاب کنید.');
        return;
    }

    const formData = {
        first_name: document.getElementById('first-name').value,
        last_name: document.getElementById('last-name').value,
        coordinate_mobile: document.getElementById('mobile').value,
        coordinate_phone_number: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        region: 1 ,
        lat: selectedCoords.lat,
        lng: selectedCoords.lng,
        gender: document.getElementById('gender').value
    };

    try {
        const response = await fetch('https://stage.achareh.ir/api/karfarmas/address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' ,
                'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4' ,
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
    alert('آدرس با موفقیت ثبت شد!');
    window.location.reload(); // ریست فرم
} else {
    const errorData = await response.json(); // دریافت اطلاعات خطا
    alert(`خطا در ثبت آدرس: ${errorData.message || 'لطفاً دوباره تلاش کنید.'}`);
}
    } catch (error) {
        console.error('Error:', error);
        alert('خطا در ارتباط با سرور.');
    }
});