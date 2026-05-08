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

```

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
