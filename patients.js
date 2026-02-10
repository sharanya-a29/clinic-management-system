async function savePatient() {
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const phone = document.getElementById('patientPhone').value;

    if (!name || !age) return alert("Please enter Name and Age");

    try {
        await db.collection('patients').add({
            name: name,
            age: parseInt(age),
            phone: phone,
            status: 'Registered',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Success! Patient data saved.");
        sysLog("REGISTER_PATIENT", { name: name });
        location.reload(); 
    } catch (e) {
        alert("Error: " + e.message);
    }
}