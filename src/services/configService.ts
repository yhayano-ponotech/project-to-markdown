import * as vscode from 'vscode';
import { IConfig } from './../types/config';

export class ConfigService {
    static getConfiguration(): IConfig {
        const config = vscode.workspace.getConfiguration('projectToMarkdown');
        return {
            includePattern: config.get<string>('includePattern') || '**/*.{md,ts,js,py,java,cs,html,css}',
            excludePattern: config.get<string>('excludePattern') || '**/node_modules/**',
            outputFileName: config.get<string>('outputFileName') || 'CombinedProjectFiles.md',
            outputDirectory: config.get<string>('outputDirectory') || '',
            maxFileSize: config.get<number>('maxFileSize') || 1024 * 1024, // 1MB default
            includeFileMetadata: config.get<boolean>('includeFileMetadata') || true,
            includeTableOfContents: config.get<boolean>('includeTableOfContents') || true,
            includeSyntaxHighlighting: config.get<boolean>('includeSyntaxHighlighting') || true
        };
    }
}