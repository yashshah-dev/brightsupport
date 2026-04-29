import json
from pathlib import Path

p = Path('src/data/blog-posts.json')
posts = json.loads(p.read_text())

inject = {
    'what-is-ndis-daily-living-support-everything-you-need-know': "<p class='text-lg leading-relaxed text-gray-700 mb-6'>Many participants pair daily living supports with <a href='/ndis-support-coordination' class='text-indigo-700 underline'>NDIS support coordination in Shepparton</a> to organise providers and routines more effectively.</p>",
    'positive-behaviour-support-pbs-under-ndis-explained': "<p class='text-lg leading-relaxed text-gray-700 mb-6'>If you are looking for local implementation support, see our <a href='/positivebehavioursupport' class='text-indigo-700 underline'>positive behaviour support service</a> and how it integrates with coordinated care.</p>",
    'understanding-ndis-funding-budget-make-it-work-for-you': "<p class='text-lg leading-relaxed text-gray-700 mb-6'>For practical invoice and budget support, review <a href='/ndis-plan-management-shepparton' class='text-indigo-700 underline'>NDIS plan management in Shepparton</a> as part of your funding strategy.</p>",
    'best-disability-support-services-near-shepparton-local-guide': "<p class='text-lg leading-relaxed text-gray-700 mb-6'>To compare support categories quickly, start with our <a href='/our-services' class='text-indigo-700 underline'>NDIS services overview</a> before shortlisting providers.</p>",
}

changed = 0
for post in posts:
    slug = post.get('slug')
    if slug not in inject:
        continue
    content = post.get('content', '')
    snippet = inject[slug]
    if snippet in content:
        continue
    marker = "<h3 class='text-2xl font-bold text-gray-900 mt-6 mb-4'>"
    idx = content.find(marker)
    if idx != -1:
        content = content[:idx] + snippet + content[idx:]
        post['content'] = content
        changed += 1

p.write_text(json.dumps(posts, ensure_ascii=True, indent=2) + '\n')
print(f'changed_posts={changed}')
