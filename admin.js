// Auth Vəziyyətini Yoxlamaq (Avtomatik Keçid)
auth.onAuthStateChanged(user => {
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');

    if (user) {
        // Giriş edilibsə: Login pəncərəsini tam Gizlət, Dashboard-u Göstər
        loginSection.classList.add('hidden');
        loginSection.style.display = 'none';
        
        dashboardSection.classList.remove('hidden');
        dashboardSection.style.display = 'block';
        
        fetchLeads();
    } else {
        // Çıxış edilibsə: Login-i Göstər, Dashboard-u Gizlət
        loginSection.classList.remove('hidden');
        loginSection.style.display = 'block';
        
        dashboardSection.classList.add('hidden');
        dashboardSection.style.display = 'none';
    }
});

// Admin Girişi
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const pass = document.getElementById('adminPassword').value;

    try {
        await auth.signInWithEmailAndPassword(email, pass);
    } catch (err) {
        alert("Giriş uğursuz oldu: " + err.message);
    }
}

// Çıxış Etmək
function handleLogout() {
    auth.signOut();
}

// Real-Time Müraciətləri Gətirmək
function fetchLeads() {
    db.collection('leads').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        const tbody = document.getElementById('leadsTable');
        tbody.innerHTML = '';

        if (snapshot.empty) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#64748b; padding:2rem;">Hələ müraciət yoxdur.</td></tr>';
            return;
        }

        let rowsHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const id = doc.id;
            const date = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleDateString('az-AZ') : 'İndi';

            // WhatsApp linki hazırlığı
            const cleanPhone = (data.phone || '').replace(/[^0-9]/g, '');
            const waMsg = encodeURIComponent(`Salam ${data.name}! WebStudio-ya göndərdiyiniz müraciətlə bağlı yazıram. Sizə necə kömək edə bilərəm?`);
            const waUrl = `https://wa.me/${cleanPhone.startsWith('994') ? cleanPhone : '994' + cleanPhone.replace(/^0/, '')}?text=${waMsg}`;

            rowsHTML += `
                <tr>
                    <td style="font-weight: bold;">${data.name || ''}</td>
                    <td>${data.phone || ''}</td>
                    <td><span style="background: #334155; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.8rem;">${data.projectType || ''}</span></td>
                    <td style="color: #94a3b8; font-size: 0.85rem;">${date}</td>
                    <td style="text-align: right;">
                        <a href="${waUrl}" target="_blank" class="btn-wa">
                            <i class="fa-brands fa-whatsapp"></i> WhatsApp
                        </a>
                        <button onclick="deleteLead('${id}')" class="btn-delete" style="margin-left: 0.5rem;">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        tbody.innerHTML = rowsHTML;
    });
}

// Müraciəti Silmək
async function deleteLead(id) {
    if (confirm("Bu müraciəti silmək istədiyinizə əminsiniz?")) {
        await db.collection('leads').doc(id).delete();
    }
}
