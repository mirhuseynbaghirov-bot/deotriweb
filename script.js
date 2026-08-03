// Modal Aç/Bağla
function openModal() {
    document.getElementById('leadModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('leadModal').classList.add('hidden');
    document.getElementById('leadForm').classList.remove('hidden');
    document.getElementById('successMessage').classList.add('hidden');
}

// Müraciəti Firestore-a yazmaq
async function handleLeadSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.innerText = "Göndərilir...";
    btn.disabled = true;

    const name = document.getElementById('leadName').value;
    const phone = document.getElementById('leadPhone').value;
    const projectType = document.getElementById('leadProjectType').value;

    try {
        await db.collection('leads').add({
            name: name,
            phone: phone,
            projectType: projectType,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        document.getElementById('leadForm').reset();
        document.getElementById('leadForm').classList.add('hidden');
        document.getElementById('successMessage').classList.remove('hidden');
    } catch (error) {
        alert("Xəta baş verdi: " + error.message);
    } finally {
        btn.innerText = "Müraciəti Göndər";
        btn.disabled = false;
    }
}
