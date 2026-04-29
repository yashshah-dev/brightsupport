import json
from pathlib import Path

p = Path('src/data/blog-posts.json')
posts = json.loads(p.read_text())

repls = {
    'what-is-ndis-daily-living-support-everything-you-need-know': [
        (
            "Let's explore everything you need to know about daily living support in Shepparton.",
            "Let's explore everything you need to know about daily living support in Shepparton, including how it connects to <a href='/ndis-support-coordination' class='text-indigo-700 underline'>support coordination</a> for plan implementation.",
        ),
        (
            "Once you have your NDIS plan, you can choose which provider you'd like to use for daily living support.",
            "Once you have your NDIS plan, you can choose which provider you'd like to use for daily living support. You can compare your options on our <a href='/dailylivingin-homesupport' class='text-indigo-700 underline'>daily living support service page</a>.",
        ),
    ],
    'ndis-community-nursing-complex-care-need-know': [
        (
            "NDIS community nursing provides skilled nursing care in your home or community.",
            "NDIS community nursing provides skilled nursing care in your home or community. If you need local service details, visit our <a href='/communitynursingandcomplexcare' class='text-indigo-700 underline'>community nursing and complex care page</a>.",
        ),
        (
            "Look for registered NDIS providers in Shepparton who offer community nursing services.",
            "Look for registered NDIS providers in Shepparton who offer community nursing services. A practical way to start is with our <a href='/registered-ndis-provider-shepparton' class='text-indigo-700 underline'>registered provider checklist</a>.",
        ),
    ],
    'physiotherapy-under-ndis-services-costs-how-access': [
        (
            "Let's explore how physiotherapy works under NDIS and how it can help you improve your mobility and independence in Shepparton.",
            "Let's explore how physiotherapy works under NDIS and how it can help you improve your mobility and independence in Shepparton. You can also review our <a href='/physiotherapyservices' class='text-indigo-700 underline'>physiotherapy service page</a> for local delivery options.",
        ),
        (
            "Make sure your provider is registered with the NDIS and has experience with your specific condition or disability.",
            "Make sure your provider is registered with the NDIS and has experience with your specific condition or disability. If needed, compare providers using our <a href='/registered-ndis-provider-shepparton' class='text-indigo-700 underline'>registered provider guide</a>.",
        ),
    ],
    'positive-behaviour-support-pbs-under-ndis-explained': [
        (
            "Positive Behaviour Support (PBS) helps people with disability reduce behaviours of concern by understanding the reasons behind behaviour and using proactive, respectful strategies.",
            "Positive Behaviour Support (PBS) helps people with disability reduce behaviours of concern by understanding the reasons behind behaviour and using proactive, respectful strategies. Learn how this is delivered locally on our <a href='/positivebehavioursupport' class='text-indigo-700 underline'>positive behaviour support page</a>.",
        ),
        (
            "Your support coordinator, therapist, and family all work together to apply the plan consistently.",
            "Your support coordinator, therapist, and family all work together to apply the plan consistently. This is where <a href='/ndis-support-coordination' class='text-indigo-700 underline'>support coordination</a> becomes critical.",
        ),
    ],
    'understanding-ndis-funding-budget-make-it-work-for-you': [
        (
            "The best outcomes happen when your budget matches your real support needs and is reviewed regularly.",
            "The best outcomes happen when your budget matches your real support needs and is reviewed regularly. If you need help handling invoices and spend tracking, explore <a href='/ndis-plan-management-shepparton' class='text-indigo-700 underline'>NDIS plan management in Shepparton</a>.",
        ),
        (
            "A support coordinator can also help you organise services and avoid budget blowouts.",
            "A <a href='/ndis-support-coordination' class='text-indigo-700 underline'>support coordinator</a> can also help you organise services and avoid budget blowouts.",
        ),
    ],
    'day-in-life-ndis-support-shepparton-community': [
        (
            "From morning routines to community activities, NDIS support can make everyday life more independent and meaningful.",
            "From morning routines to community activities, NDIS support can make everyday life more independent and meaningful through services like <a href='/dailylivingin-homesupport' class='text-indigo-700 underline'>daily living support</a> and local social programs.",
        ),
        (
            "Afternoons are often dedicated to social and community participation.",
            "Afternoons are often dedicated to <a href='/communityparticipationgroupprograms' class='text-indigo-700 underline'>community participation programs</a> and social connection goals.",
        ),
    ],
    'how-choose-right-ndis-provider-10-point-checklist': [
        (
            "Some providers specialize in certain services (daily living support, nursing, therapy) while others offer a range.",
            "Some providers specialize in certain services (daily living support, nursing, therapy) while others offer a range. You can benchmark service scope on our <a href='/our-services' class='text-indigo-700 underline'>NDIS services overview</a>.",
        ),
        (
            "First and essential check: make sure the provider is officially registered with the NDIS.",
            "First and essential check: make sure the provider is officially registered with the NDIS. Our <a href='/registered-ndis-provider-shepparton' class='text-indigo-700 underline'>provider verification guide</a> can help.",
        ),
    ],
    'best-disability-support-services-near-shepparton-local-guide': [
        (
            "The right provider should offer flexible support that matches your goals and routine.",
            "The right provider should offer flexible support that matches your goals and routine. Start by comparing options in our <a href='/our-services' class='text-indigo-700 underline'>services overview</a>.",
        ),
        (
            "Always ask how quickly they can start supports and how they handle urgent changes.",
            "Always ask how quickly they can start supports and how they handle urgent changes. You can use this <a href='/registered-ndis-provider-shepparton' class='text-indigo-700 underline'>registered provider checklist</a> during provider calls.",
        ),
    ],
}

changed_posts = 0
for post in posts:
    slug = post.get('slug')
    if slug not in repls:
        continue
    content = post.get('content', '')
    original = content
    for old, new in repls[slug]:
        if old in content and new not in content:
            content = content.replace(old, new, 1)
    if content != original:
        post['content'] = content
        changed_posts += 1

p.write_text(json.dumps(posts, ensure_ascii=True, indent=2) + '\n')
print(f'changed_posts={changed_posts}')
