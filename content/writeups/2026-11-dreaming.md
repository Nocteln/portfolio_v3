---
draft: true
title: Dreaming
ctf: ''
platform: TryHackMe
date: 2026-11-20
image: ''
description: ''
ctf_link: ''
difficulty: Easy
---

Je commence ma reconaissance avec un nmap basique qui me permet d'observer que Apache tourne.
```
nmap -sV -sC 10.82.191.227
Starting Nmap 7.992 ( https://nmap.org ) at 2026-11-20 18:02 +0100
Nmap scan report for 10.82.191.227
Host is up (0.020s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.13 (Ubuntu Linux; protocol 2.0)
|_rpcinfo: ERROR: Script execution failed (use -d to debug)
|_vmware-version: ERROR: Script execution failed (use -d to debug)
| ssh-hostkey: 
|   3072 75:d8:09:17:ab:9f:c7:b0:d2:75:16:e9:ce:78:6e:56 (RSA)
|   256 1d:69:5b:09:d1:2f:00:a6:3f:73:a3:6e:71:c9:60:fb (ECDSA)
|_  256 62:b4:9d:a6:f0:52:0d:eb:0e:b8:11:43:62:8a:fe:19 (ED25519)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_hnap-info: ERROR: Script execution failed (use -d to debug)
|_http-title: Apache2 Ubuntu Default Page: It works
|_http-trane-info: ERROR: Script execution failed (use -d to debug)
|_https-redirect: ERROR: Script execution failed (use -d to debug)
|_http-server-header: ERROR: Script execution failed (use -d to debug)
|_rpcinfo: ERROR: Script execution failed (use -d to debug)
|_vmware-version: ERROR: Script execution failed (use -d to debug)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 7.90 seconds
```
