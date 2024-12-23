import * as vscode from 'vscode';
import { IConfig } from './../types/config';

export class ConfigService {
    static getConfiguration(): IConfig {
        const config = vscode.workspace.getConfiguration('projectToMarkdown');
        
        // Get raw extension settings
        const extensions = config.get<string>('extensions') || 'md,ts,js,py,java,cs,html,css';
        const excludeFolders = config.get<string>('excludeFolders') || 'node_modules,dist,build,.git';

        // Convert simple extension list to glob pattern
        const includePattern = extensions
            .split(',')
            .filter(ext => ext.trim())
            .map(ext => `**/*.${ext.trim()}`)
            .join(', ');

        // Convert simple folder list to glob pattern
        const excludePattern = excludeFolders
            .split(',')
            .filter(folder => folder.trim())
            .map(folder => `**/${folder.trim()}/**`)
            .join(', ');

        return {
            includePattern,
            excludePattern,
            outputFileName: config.get<string>('outputFileName') || 'CombinedProjectFiles.md',
            outputDirectory: config.get<string>('outputDirectory') || '',
            maxFileSize: config.get<number>('maxFileSize') || 1024 * 1024, // 1MB default
            includeFileMetadata: config.get<boolean>('includeFileMetadata') || true,
            includeTableOfContents: config.get<boolean>('includeTableOfContents') || true,
            includeSyntaxHighlighting: config.get<boolean>('includeSyntaxHighlighting') || true
        };
    }
}