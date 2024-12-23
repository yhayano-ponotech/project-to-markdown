import * as vscode from 'vscode';
import * as path from 'path';
import { TextDecoder } from 'util';

export async function isTextFile(uri: vscode.Uri): Promise<boolean> {
    try {
        const content = await vscode.workspace.fs.readFile(uri);
        // Check for null bytes which typically indicate binary files
        const hasNullByte = content.includes(0);
        if (hasNullByte) {
            return false;
        }

        // Try to decode the content as UTF-8
        try {
            new TextDecoder().decode(content);
            return true;
        } catch {
            return false;
        }
    } catch (error) {
        console.error(`Error checking file type for ${uri.fsPath}:`, error);
        return false;
    }
}

export function getLanguageId(uri: vscode.Uri): string {
    const extension = path.extname(uri.fsPath).toLowerCase();
    // Mapping of file extensions to language IDs
    const languageMap: { [key: string]: string } = {
        '.ts': 'typescript',
        '.js': 'javascript',
        '.jsx': 'javascriptreact',
        '.tsx': 'typescriptreact',
        '.py': 'python',
        '.java': 'java',
        '.c': 'c',
        '.cpp': 'cpp',
        '.cs': 'csharp',
        '.html': 'html',
        '.css': 'css',
        '.scss': 'scss',
        '.sass': 'sass',
        '.less': 'less',
        '.json': 'json',
        '.xml': 'xml',
        '.yaml': 'yaml',
        '.yml': 'yaml',
        '.md': 'markdown',
        '.sh': 'shell',
        '.bash': 'shell',
        '.php': 'php',
        '.rb': 'ruby',
        '.go': 'go',
        '.rs': 'rust',
        '.swift': 'swift',
        '.sql': 'sql',
        '.kt': 'kotlin',
        '.kts': 'kotlin',
        '.dart': 'dart',
        '.r': 'r',
        '.lua': 'lua',
        '.pl': 'perl',
        '.pm': 'perl'
    };

    return languageMap[extension] || '';
}

export async function getFileSize(filePath: string): Promise<number> {
    const stat = await vscode.workspace.fs.stat(vscode.Uri.file(filePath));
    return stat.size;
}

export function normalizeFilePath(filePath: string): string {
    return filePath.split(path.sep).join(path.posix.sep);
}

export function getRelativePath(filePath: string, baseDir: string): string {
    const relativePath = path.relative(baseDir, filePath);
    return normalizeFilePath(relativePath);
}

export function isExcluded(filePath: string, excludePatterns: string[]): boolean {
    const normalizedPath = normalizeFilePath(filePath);
    return excludePatterns.some(pattern => {
        const regex = new RegExp(pattern.replace(/\*/g, '.*'));
        return regex.test(normalizedPath);
    });
}