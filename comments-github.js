// Функции для работы с комментариями через GitHub Issues

// Добавить комментарий
async function addComment(categoryNumber, author, text) {
    try {
        const issueNumber = categoryNumber; // Issue #1 для категории 1
        
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/issues/${issueNumber}/comments`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `token ${GITHUB_CONFIG.TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    body: `**${author}**: ${text}\n\n*Добавлено: ${new Date().toLocaleString('ru-RU')}*`
                })
            }
        );
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Ошибка добавления комментария:', error);
        throw error;
    }
}

// Получить комментарии категории
async function getComments(categoryNumber) {
    try {
        const issueNumber = categoryNumber;
        
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/issues/${issueNumber}/comments`,
            {
                headers: {
                    'Authorization': `token ${GITHUB_CONFIG.TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const comments = await response.json();
        
        // Преобразуем GitHub комментарии в наш формат
        return comments.map(comment => ({
            id: comment.id,
            author: extractAuthor(comment.body),
            text: extractText(comment.body),
            date: comment.created_at,
            githubUrl: comment.html_url
        }));
    } catch (error) {
        console.error('Ошибка загрузки комментариев:', error);
        return [];
    }
}

// Вспомогательные функции для парсинга
function extractAuthor(body) {
    const match = body.match(/\*\*(.*?)\*\*:/);
    return match ? match[1] : 'Аноним';
}

function extractText(body) {
    if (!body) return '';
    const parts = body.split('**:');
    if (parts.length > 1) {
        return parts[1].split('*Добавлено:')[0].trim();
    }
    return body;
}
