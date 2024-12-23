import * as vscode from 'vscode';
import { FileService } from '../services/fileService';
import { MarkdownService } from '../services/markdownService';
import { ConfigService } from '../services/configService';
import { showProgress } from '../types/progress';

export async function exportToMarkdown() {
    try {
        const config = ConfigService.getConfiguration();
        const fileService = new FileService(config);
        const markdownService = new MarkdownService(config);

        await showProgress('Exporting project to markdown...', async (progress) => {
            // Get workspace files
            progress.report({ message: 'Collecting files...' });
            const files = await fileService.getWorkspaceFiles();

            if (files.length === 0) {
                throw new Error('No files found matching the current configuration.');
            }

            // Generate markdown
            progress.report({ message: 'Generating markdown content...' });
            const markdown = await markdownService.generateMarkdown(files, (current, total) => {
                progress.report({
                    message: `Processing files (${current}/${total})...`,
                    increment: (1 / total) * 100
                });
            });

            // Save to file
            progress.report({ message: 'Saving markdown file...' });
            const outputFile = await fileService.saveMarkdown(markdown);

            vscode.window.showInformationMessage(
                'Successfully exported project to markdown!',
                'Open File'
            ).then(selection => {
                if (selection === 'Open File') {
                    vscode.window.showTextDocument(outputFile);
                }
            });
        });
    } catch (err) {
        const error = err as Error;
        vscode.window.showErrorMessage(`Export failed: ${error.message || 'Unknown error occurred'}`);
    }
}