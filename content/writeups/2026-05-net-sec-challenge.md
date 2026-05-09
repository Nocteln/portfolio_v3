---
draft: true
title: Net Sec Challenge
ctf: ''
platform: TryHackMe
date: 2026-05-09
image: https://assets.tryhackme.com/room-banners/netsecmodule.png
description: ''
ctf_link: https://tryhackme.com/room/netsecchallenge
difficulty: ''
---

```bash
root@ip-10-82-121-125:~# nmap -p- 10.82.190.27
Starting Nmap 7.80 ( https://nmap.org ) at 2026-05-09 19:28 BST
mass_dns: warning: Unable to open /etc/resolv.conf. Try using --system-dns or specify valid servers with --dns-servers
mass_dns: warning: Unable to determine any DNS servers. Reverse DNS is disabled. Try using --system-dns or specify valid servers with --dns-servers
Nmap scan report for 10.82.190.27
Host is up (0.0017s latency).
Not shown: 65529 closed ports
PORT      STATE SERVICE
22/tcp    open  ssh
80/tcp    open  http
139/tcp   open  netbios-ssn
445/tcp   open  microsoft-ds
8080/tcp  open  http-proxy
10021/tcp open  unknown

Nmap done: 1 IP address (1 host up) scanned in 4.56 seconds
```
