import os
import json

with open('faqs.json', 'r') as f:
    faqs = json.load(f)

for faq in faqs['terminology']:
    title = faq['title']
    body = faq['body']
    filename = f"{title.replace(' ', '-').replace('?', '').replace('/', '-').lower()}.md"
    with open(filename, 'w') as f:
        f.write(f"---\ntitle: '{title}'\n---\n\n{body}")
