---
draft: false
title: CyberHeros
ctf: ''
platform: TryHackMe
date: 2026-04-04
image: /img/writeups/cyberheroes.png
description: ''
---

### Exploiting Client-Side Authentication

This write-up covers a straightforward, beginner-friendly CTF challenge called [Cyber heroes](https://tryhackme.com/room/cyberheroes/).

Exploring the target webpage, we immediately notice a **"Login"** section. Given the challenge description, successfully bypassing or utilizing this login form is our primary objective.

Navigating to the page presents us with a standard authentication form:

![](/img/writeups/20260404-182539.png)

Instead of attempting to brute-force or guess credentials right away, it is always best practice to check under the hood. Inspecting the page's source code reveals a crucial `<script>` tag containing the authentication logic:

```javascript

<script>

function authenticate() {

    a = document.getElementById('uname');

    b = document.getElementById('pass');

    // Simple string reversal function

    const RevereString = str => [...str].reverse().join('');

    if (a.value == "h3ck3rBoi" && b.value == RevereString("54321@terceSrepuS")) {

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {

                document.getElementById("flag").innerHTML = this.responseText;

                document.getElementById("todel").innerHTML = "";

                document.getElementById("rm").remove();

            }

        };

        xhttp.open("GET", "RandomLo0o0o0o0o0o0o0o0o0o0gpath12345_Flag_" + a.value + "_" + b.value + ".txt", true);

        xhttp.send();

    } else {

        alert("Incorrect Password, try again.. you got this hacker !");

    }

}

</script>

```

By analyzing this JavaScript snippet, we uncover a classic **client-side authentication vulnerability**. The validation logic is exposed directly in the browser rather than being handled securely on a backend server.

The script checks our inputs against hardcoded values:

* **Username:** `h3ck3rBoi`
* **Password:** The code uses a weak obfuscation technique by reversing a string. The expected password is the reverse of `54321@terceSrepuS`, which translates to `SuperSecret@12345`.

Armed with these credentials, we can successfully submit the form. The script then securely fetches the text file containing the flag via an `XMLHttpRequest`. Just like that, we bypass the login and retrieve the flag!

![](/img/writeups/20260404-182916.png)
