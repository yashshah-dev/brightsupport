const fs = require('fs');
const files = ['messages/zh.json', 'messages/ar.json', 'messages/vi.json'];

files.forEach(file => {
    try {
        const rawContent = fs.readFileSync(file, 'utf8');
        const content = JSON.parse(rawContent);
        
        if (content.ServiceDetails && content.ServiceDetails.supportCoordination) {
            const sc = content.ServiceDetails.supportCoordination;
            const oldFeatures = sc.features || {};
            
            sc.features = {
                connection: {
                    title: oldFeatures.expert ? oldFeatures.expert.title : "Support Connection",
                    description: oldFeatures.expert ? oldFeatures.expert.description : "Short-term assistance to understand your plan."
                },
                coordination: {
                    title: oldFeatures.independent ? oldFeatures.independent.title : "Coordination of Supports",
                    description: oldFeatures.independent ? oldFeatures.independent.description : "Ongoing support to build your skills."
                },
                specialist: {
                    title: oldFeatures.network ? oldFeatures.network.title : "Specialist Support Coordination",
                    description: oldFeatures.network ? oldFeatures.network.description : "Higher-level support for complex situations."
                },
                capacity: {
                    title: oldFeatures.capacity ? oldFeatures.capacity.title : "Capacity Building",
                    description: oldFeatures.capacity ? oldFeatures.capacity.description : "Building your confidence to self-direct your supports."
                }
            };
            
            fs.writeFileSync(file, JSON.stringify(content, null, 4));
            console.log(`✓ Updated ${file}`);
        }
    } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
    }
});
