import csv, sys

# Build GSC lookup
gsc = {}
with open('Queries.csv', newline='') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        if len(row) >= 5:
            kw = row[0].strip().lower()
            try:
                pos = float(row[4])
                gsc[kw] = pos
            except:
                pass

# Manual best-match map: primary keyword -> best representative GSC query
keyword_to_gsc = {
    'ndis provider shepparton': 'ndis provider shepparton',
    'ndis services shepparton': 'ndis services shepparton',
    'ndis community participation shepparton': 'ndis community participation shepparton',
    'bright support shepparton': 'bright support shepparton',
    'registered ndis provider in shepparton': None,
    'ndis daily living support shepparton': 'assistance with self care activities ndis shepparton',
    'community nursing ndis shepparton': 'community nursing care shepparton',
    'ndis physiotherapy shepparton': 'physio shepparton',
    'companionship services shepparton': None,
    'ndis transport provider shepparton': 'ndis transport shepparton',
    'ndis hydrotherapy shepparton': 'ndis hydrotherapy',
    'ndis personal training shepparton': None,
    'positive behaviour support shepparton': None,
    'ndis cleaning services shepparton': 'ndis cleaning shepperton',
    'supported independent living shepparton': None,
    'ndis support coordination shepparton': 'support coordination shepparton',
    'contact ndis provider shepparton': None,
    'ndis blog shepparton': None,
    'ndis support shepparton': 'ndis shepparton',
    'ndis careers shepparton': None,
}

# Page-to-primary mapping (same order as CSV rows 1-20)
page_primaries = [
    ('/', 'ndis provider shepparton'),
    ('/registered-ndis-provider-shepparton', 'registered ndis provider in shepparton'),
    ('/our-services', 'ndis services shepparton'),
    ('/dailylivingin-homesupport', 'ndis daily living support shepparton'),
    ('/communitynursingandcomplexcare', 'community nursing ndis shepparton'),
    ('/physiotherapyservices', 'ndis physiotherapy shepparton'),
    ('/communityparticipationgroupprograms', 'ndis community participation shepparton'),
    ('/companion-care-services', 'companionship services shepparton'),
    ('/ndis-transport-service-provider', 'ndis transport provider shepparton'),
    ('/ndis-hydrotherapy-services', 'ndis hydrotherapy shepparton'),
    ('/ndispersonaltrainingsessions', 'ndis personal training shepparton'),
    ('/positivebehavioursupport', 'positive behaviour support shepparton'),
    ('/ndis-cleaning-services', 'ndis cleaning services shepparton'),
    ('/supported-independent-living-sil-shepparton', 'supported independent living shepparton'),
    ('/ndis-support-coordination', 'ndis support coordination shepparton'),
    ('/contact-us', 'contact ndis provider shepparton'),
    ('/about-us', 'bright support shepparton'),
    ('/blog', 'ndis blog shepparton'),
    ('/landing/ndis-support', 'ndis support shepparton'),
    ('/career', 'ndis careers shepparton'),
]

# Build rank lookup
rank_map = {}
for page, primary in page_primaries:
    lookup_term = keyword_to_gsc.get(primary, primary)
    if lookup_term and lookup_term in gsc:
        rank_map[page] = round(gsc[lookup_term], 1)
    else:
        rank_map[page] = ''

# Read and update the rank tracking template
rows = []
with open('seo-rank-tracking-template-2026.csv', newline='') as f:
    reader = csv.reader(f)
    rows = list(reader)

header = rows[0]
bl_idx = header.index('baseline_rank')

for row in rows[1:]:
    page = row[0].strip()
    if page in rank_map and rank_map[page] != '':
        row[bl_idx] = str(rank_map[page])

with open('seo-rank-tracking-template-2026.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(rows)

print("Updated baseline ranks:")
for page, rank in rank_map.items():
    print(f"  {page}: {rank if rank != '' else 'NOT IN GSC'}")
