#!/usr/bin/env python3
"""Copies the Privacy Policy and Terms of Service text out of the Vestex app
(PrivacyPolicyView.swift / TermsOfServiceView.swift) into src/data/legal.json,
so the website always says exactly what the app says.
Usage: python3 scripts/extract-legal.py "<path to Finance App v1>"
"""
import json, re, sys, os
app = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser('~/Documents/Finance App v1')
views = os.path.join(app, 'Vestex/Vestex/App/Views')
lit = r'"((?:[^"\\]|\\.)*)"'
def unescape(s): return bytes(s, 'utf-8').decode('unicode_escape').encode('latin-1').decode('utf-8')
def parse(name):
    src = open(os.path.join(views, name)).read()
    articles = []
    for m in re.finditer(r'LegalArticle\(title: String\(localized: ' + lit + r'.*?clauses: \[(.*?)\]\)', src, re.S):
        clauses = [unescape(c) for c in re.findall(r'String\(localized: ' + lit, m.group(2))]
        articles.append({'title': unescape(m.group(1)), 'clauses': clauses})
    eff = re.search(r'effective: String\(localized: "Effective date: ([^"]+)"', src)
    return {'effective': eff.group(1) if eff else '', 'articles': articles}
out = {'privacy': parse('PrivacyPolicyView.swift'), 'terms': parse('TermsOfServiceView.swift')}
dest = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'legal.json')
json.dump(out, open(dest, 'w'), ensure_ascii=False, indent=2)
print({k: (v['effective'], len(v['articles'])) for k, v in out.items()})
