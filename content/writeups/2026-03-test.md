---
draft: false
title: Hidden Deep Into my Heart
ctf: TryHeartMe
platform: TryHackMe
date: 2026-03-31
image: https://tryhackme-images.s3.eu-west-1.amazonaws.com/room-icons/5ed5961c6276df568891c3ea-1770943704072
description: ''
---

This is an easy challenge from the TryHackMe event **TryHeartMe**.

First things first, let's export the target's IP to an environment variable:

```bash
export IP="10.130.161.225"
```

Now that this is done, let's start by running an Nmap scan:

```bash
nmap -sV $IP

Starting Nmap 7.98 ( https://nmap.org ) at 2026-03-30 18:51 +0100
Nmap scan report for website.thm (10.130.155.202)
Host is up (0.0059s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.10 (Ubuntu Linux; protocol 2.0)
5000/tcp open  http    Werkzeug httpd 3.1.5 (Python 3.10.12)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.42 seconds
```

We can see two services running:

- **SSH** on port 22
- **HTTP** (Werkzeug/Python) on port 5000

Let's start by looking at the web application on port 5000. 

While checking for known vulnerabilities, I found one for Werkzeug version `0.15.4`, but this doesn't match our target's much newer version (`3.1.5`).

So, I continued with basic directory enumeration using Gobuster:

```bash
gobuster dir -w thm/SecLists-master/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt -u http://$IP:5000
```

This scan revealed a `/console` directory, but it turned out to be a dead end.

Next, I checked the `robots.txt` file (often used by developers to hide specific pages from search engine crawlers):

And bingo! I found the following:

```plain
User-agent: *
Disallow: /cupids_secret_vault/*

# cupid_arrow_2026!!!
```

This revealed another hidden directory: `/cupids_secret_vault`!

Navigating to it, we are greeted with a little message: 

![Cupid's Secret Vault](/img/writeups/20260331-164515.png)

So let's run Gobuster again, this time targeting the new directory:

```bash
gobuster dir -w thm/SecLists-master/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt -u http://$IP:5000/cupids_secret_vault
```

This uncovered a new path: `/cupids_secret_vault/administrator`, which contains a login page.

![login page](/img/writeups/20260331-164712.png)

I tried some default credentials (`admin:admin`, `admin:password`, etc.), but none of them worked.

I was about to brute-force the form with Hydra when I remembered the `robots.txt` file we checked earlier. It had a suspicious comment at the end: `# cupid_arrow_2026!!!`. I tried using this as the password with `admin` as the username, and BINGO, we're in and the flag is ours!

![flag](/img/writeups/20260331-165054.png)

## What did I learn from this CTF?

Sometimes, overthinking isn't the right approach. The solution might be right under your nose from the very beginning!
