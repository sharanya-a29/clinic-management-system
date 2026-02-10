// 1. Function to find patient by Token
async function findPatient() {
    const token = document.getElementById('tokenSearch').value;
    if (!token) return alert("Please enter a token number");

    try {
        const snapshot = await db.collection('patients')
                                 .where("token", "==", parseInt(token))
                                 .get();

        if (!snapshot.empty) {
            const data = snapshot.docs[0].data();
            document.getElementById('activePatient').innerHTML = `
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Token:</strong> #${data.token}</p>
                <p><strong>Status:</strong> ${data.status}</p>
            `;
            console.log("Patient found:", data.name);
        } else {
            document.getElementById('activePatient').innerText = "Patient not found.";
        }
    } catch (error) {
        console.error("Search Error:", error);
    }
}

// 2. Function to save the Prescription
async function saveConsultation() {
    const token = document.getElementById('tokenSearch').value;
    const notes = document.getElementById('meds').value;

    if (!token || !notes) {
        return alert("Please search for a patient and enter notes first!");
    }

    try {
        await db.collection('prescriptions').add({
            token: parseInt(token),
            medication: notes,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Success! Consultation saved for Token #" + token);
        // Clear the notes for the next patient
        document.getElementById('meds').value = ""; 
        sysLog("DOCTOR_SAVED_NOTES", { token: token });
    } catch (error) {
        alert("Error saving: " + error.message);
    }
}