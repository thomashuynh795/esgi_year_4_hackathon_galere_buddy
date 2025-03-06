export async function createPublication(publication: {
    title: string;
    problem: string;
    solution: string;
    advice: string;
}) {
    const response = await fetch('/api/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(publication),
    });
    if (!response.ok) {
        throw new Error('Failed to create publication');
    }
    return response.json();
}