// Update the 'Tokens Issued' count on the dashboard
db.collection('stats').doc('tokenCount').onSnapshot((doc) => {
    if (doc.exists) {
        document.getElementById('tokenCount').innerText = doc.data().current;
    }
});