async function issueToken() {
    const pName = document.getElementById('pName').value;
    if (!pName) return alert("Enter Patient Name");

    // References for the transaction
    const statsRef = db.collection('stats').doc('tokenCount');
    const newPatientRef = db.collection('patients').doc(); // Create a new doc ID

    try {
        await db.runTransaction(async (transaction) => {
            const statsDoc = await transaction.get(statsRef);
            
            // If the document doesn't exist yet, start at 1
            const newCount = (statsDoc.exists ? statsDoc.data().current : 0) + 1;

            // UPDATE the counter
            transaction.set(statsRef, { current: newCount });

            // ADD the patient using the reference we created
            transaction.set(newPatientRef, {
                name: pName,
                token: newCount,
                status: 'waiting',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Update the screen inside the transaction
            document.getElementById('tokenDisplay').innerText = `Token: #${newCount}`;
        });

        sysLog("TOKEN_GENERATED", { name: pName });
        console.log("Token issued successfully!");
    } catch (e) {
        console.error("Transaction failed: ", e);
        alert("Error: " + e.message);
    }
}