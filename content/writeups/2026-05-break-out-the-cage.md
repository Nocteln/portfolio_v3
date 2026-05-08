---
draft: true
title: Break Out The Cage
ctf: ''
platform: TryHackMe
date: 2026-05-08
image: ''
description: ''
ctf_link: https://tryhackme.com/room/breakoutthecage1
difficulty: Easy
---

```plain
[nocteln@arch breakoutthecage]$ cat nmap_scan 
# Nmap 7.99 scan initiated Fri May  8 19:10:05 2026 as: nmap -sV -o nmap_scan 10.82.169.149
Nmap scan report for 10.82.169.149
Host is up (0.017s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Fri May  8 19:10:12 2026 -- 1 IP address (1 host up) scanned in 7.40 seconds
```

![website homepage](/img/writeups/pasted-image-1778264072334.png "website homepage")

By doeing a gobuster scan, we can see some things interestings : 

First, the scripts directory, which contains differents scripts of movies

![](/img/writeups/20260508-191819.png)

![](/img/writeups/20260508-191838.png)

Secondly, we got /contracts with nothing but an empty folder in it

![](/img/writeups/20260508-191914.png)

And finaly /auditions, wich contain an mp3 file with weirds sounds in it.

![](/img/writeups/20260508-192022.png)

Interesting, I downloaded it using grep and imported it into audacity.

\`grep http://10.82.169.149/auditions/must_practice_corrupt_file.mp3 -o must_practice_file.mp3\`

And by looking at the spectrogram, BINGO! We got an image saying "namelesstwo"

![](/img/writeups/20260508-192742.png)

Now, what does it mean and where can I use this info??
