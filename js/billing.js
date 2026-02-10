async function fetchBillingDetails() {
    const token = document.getElementById('tokenSearch').value;
    if(!token) return alert("Enter Token Number");

    const snapshot = await db.collection('prescriptions')
        .where("token", "==", parseInt(token)).get();

    if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        document.getElementById('dispToken').innerText = "#" + token;
        document.getElementById('dispMeds').innerText = "Prescribed: " + data.medication;
        document.getElementById('dispTotal').innerText = "50.00";
    } else {
        alert("Token not found or no prescription entry.");
    }
}