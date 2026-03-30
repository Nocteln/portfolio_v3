---
title: "SQL Injection - Web 500"
ctf: "HackTheBox Cyber Apocalypse 2026"
platform: "HackTheBox"
date: "2026-03-30"
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000"
description: "A cool SQLi challenge."
---

# Introduction

Ce challenge était particulièrement intéressant car il combinait une simple injection SQL avec un filtre WAF récalcitrant.

## Reconnaissance

En arrivant sur la page web, nous trouvons un simple formulaire de login.
Une tentative basique de `' OR 1=1 --` renvoie une erreur inattendue.

```python
import requests
req = requests.post("http://challenge.ctf.htb/login", data={"user": "' OR 1=1 --", "pass": "admin"})
print(req.text)
```

## Exploitation

La solution consistait à utiliser l'encodage URL pour bypasser les filtres :

1. Identification de la base (SQLite)
2. Extraction de la table secrète
3. Et enfin le flag !

> Flag: `HTB{w4f_byp4ss_m4st3r}`
