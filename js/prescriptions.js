async function submitPrescription() {
    // 1. Get the values from the boxes
    const token = document.getElementById('tokenInput').value;
    const meds = document.getElementById('doctorNotes').value;

    // 2. Validation
    if (!token) {
        return alert("Please enter a Token Number first!");
    }
    if (!meds) {
        return alert("Please enter the medicines/notes.");
    }

    try {
        // 3. Save to Firebase
        await db.collection('prescriptions').add({
            token: parseInt(token),
            medication: meds,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // 4. Success feedback
        alert("Prescription for Token #" + token + " saved successfully!");
        
        // Clear the form for the next patient
        document.getElementById('tokenInput').value = "";
        document.getElementById('doctorNotes').value = "";
        
        sysLog("PRESCRIPTION_SAVED", { token: token });
    } catch (error) {
        console.error("Save Error:", error);
        alert("Error saving prescription: " + error.message);
    }
}