import json
import re
from pathlib import Path

BLOG_PATH = Path('src/data/blog-posts.json')
posts = json.loads(BLOG_PATH.read_text())

preferred_anchor = {
    '/ndis-support-coordination': 'NDIS support coordination in Shepparton',
    '/dailylivingin-homesupport': 'NDIS daily living support in Shepparton',
    '/communitynursingandcomplexcare': 'community nursing and complex care in Shepparton',
    '/physiotherapyservices': 'NDIS physiotherapy services in Shepparton',
    '/positivebehavioursupport': 'positive behaviour support in Shepparton',
    '/our-services': 'NDIS services in Shepparton',
    '/registered-ndis-provider-shepparton': 'registered NDIS provider in Shepparton',
    '/ndis-plan-management-shepparton': 'NDIS plan management in Shepparton',
    '/communityparticipationgroupprograms': 'NDIS community participation programs in Shepparton',
}

anchor_re = re.compile(r"<a href='([^']+)'([^>]*)>(.*?)</a>")
changes = 0
changed_posts = 0

for post in posts:
    content = post.get('content', '')
    original = content

    def repl(match: re.Match) -> str:
        global changes
        href = match.group(1)
        attrs = match.group(2)
        text = match.group(3)
        target = preferred_anchor.get(href)
        if not target or text == target:
            return match.group(0)
        nonlocal_changes[0] += 1
        return f"<a href='{href}'{attrs}>{target}</a>"

    nonlocal_changes = [0]
    content = anchor_re.sub(repl, content)
    if content != original:
        post['content'] = content
        changed_posts += 1
        changes += nonlocal_changes[0]

BLOG_PATH.write_text(json.dumps(posts, ensure_ascii=True, indent=2) + '\n')
print(f'changed_posts={changed_posts}')
print(f'changed_anchors={changes}')
