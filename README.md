# Klassenklar (Version 2.0)

Mobile-first PWA for learning German pig carcass classification (*Schweineklassifizierung* nach SchwHKlV, 1. & 2. FlGDV).
Version 2.0 includes an interactive **Geräte-Mediathek** with scalable visual diagrams (Auto-FOM III, ZP-Verfahren, OptiGrade MCP), integrated YouTube video guides (Frontmatec animation), 38 structured lessons, 138 training questions, 53 spaced-repetition flashcards, and an interactive lean meat percentage (MFA) simulator.
The app runs locally with Node.js and has zero third-party npm package dependencies.

## Run locally

1. Install Node.js 20 or newer.
2. From this folder run `npm start`.
3. Open <http://localhost:4173> on the computer. For a phone browser on the same trusted Wi-Fi, set `HOST=0.0.0.0` before starting and open `http://<computer-LAN-IP>:4173` on the phone. In PowerShell: `$env:HOST='0.0.0.0'; npm start`.
4. Create a local learner account or trainer account. Trainers create a group; from the trainer dashboard create a one-time invitation code. Learners can enter that code while registering to join that group.

The app creates `data.json` on first start and stores account hashes, learning progress, settings, groups and invitation codes there. Passwords are salted and hashed with Node's built-in scrypt. Session cookies are HTTP-only and server-held. This is a local prototype: it has no password reset, email delivery/verification, account recovery, TLS setup, rate limiting, database migrations, multi-instance session store, or backup service. The default is localhost. If you bind to Wi-Fi for phone access, use a trusted private network; HTTP does not encrypt login traffic, and the PWA install/offline features need HTTPS outside localhost. Do not expose the server to the public internet. A production deployment needs HTTPS, managed database and backups, secure session storage, abuse controls, privacy review and account recovery.

The demo login buttons are intentionally separate from actual registration. The Anna, Lukas and Mira profiles are marked as example data. Real learner accounts appear in their trainer's group after joining with an invitation. Trainer APIs enforce trainer role and group ownership on the server.

## Verify source syntax

Run `npm run check` for JavaScript syntax checks and a temporary integration smoke check covering registration, sign-in, invitation joining, role/group restrictions, progress and trainer confirmation. The smoke check uses a disposable data file and leaves the app's `data.json` untouched.

## Learning content

Starter facts are linked to the German SchwHKlV, its Anlagen, 1. FlGDV and EU Regulations 1308/2013 and 2017/1182. Content covers selected facts, not exhaustive exam preparation. Equipment-specific instructions are omitted because the FOM model is not known. Practical checklist items only count when a trainer confirms them.
