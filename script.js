async function loadBounties() {
    try {
        const res = await fetch('bounties.json');
        const data = await res.json();

        const liveContainer = document.getElementById('live-bounties');
        const completedContainer = document.getElementById('completed-bounties');

        data.bounties.forEach(bounty => {
            const card = document.createElement('div');
            card.className = 'royal-scroll bounty-card';

            const statusClass = bounty.status === 'live' ? 'live' : 'completed';

            card.innerHTML = `
                <div class="scroll-content">
                    <div><span class="status ${statusClass}">${bounty.status.toUpperCase()}</span></div>
                    <h3>${bounty.title}</h3>
                    <div class="bounty-meta">
                        <strong>Reward:</strong> <span class="reward">${bounty.reward} SOL</span><br>
                        <strong>Deadline:</strong> ${bounty.deadline}<br>
                        <strong>Entries:</strong> ${bounty.entries}
                    </div>
                    <p>${bounty.description}</p>
                    ${bounty.submission ? 
                        `<a href="${bounty.submission}" target="_blank" class="submission-link">Watch Submission →</a>` : 
                        `<a href="https://pump.fun/go" target="_blank" class="submission-link">Submit on Pump.fun →</a>`}
                </div>
                <div class="scroll-bottom"></div>
            `;

            if (bounty.status === 'live') {
                liveContainer.appendChild(card);
            } else {
                completedContainer.appendChild(card);
            }
        });
    } catch (e) {
        console.error(e);
        if (document.getElementById('live-bounties')) {
            document.getElementById('live-bounties').innerHTML = 
                '<p style="color:#a52a2a;">Could not load bounties.</p>';
        }
    }
}

loadBounties();