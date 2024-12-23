import * as vscode from 'vscode';
import * as path from 'path';
import { workspace, Uri } from 'vscode';
import { IConfig } from './../types/config';
import { isTextFile } from './../types/fileUtils';
import { TextDecoder } from 'util';

export class FileService {
    constructor(private config: IConfig) {}

    async getWorkspaceFiles(): Promise<vscode.Uri[]> {
        if (!workspace.workspaceFolders) {
            throw new Error('No workspace folder is opened');
        }

        const files = await workspace.findFiles(
            this.config.includePattern,
            this.config.excludePattern
        );

        // Filter files based on size and text content
        const validFiles: vscode.Uri[] = [];
        for (const file of files) {
            const stat = await workspace.fs.stat(file);
            if (stat.size > this.config.maxFileSize) {
                console.warn(`Skipping ${file.fsPath}: File too large (${stat.size} bytes)`);
                continue;
            }

            if (!await isTextFile(file)) {
                console.warn(`Skipping ${file.fsPath}: Not a text file`);
                continue;
            }

            validFiles.push(file);
        }

        return validFiles;
    }

    async readFile(uri: vscode.Uri): Promise<string> {
        try {
            const content = await workspace.fs.readFile(uri);
            return new TextDecoder().decode(content);
        } catch (error) {
            console.error(`Error reading file ${uri.fsPath}:`, error);
            throw new Error(`Failed to read file ${path.basename(uri.fsPath)}`);
        }
    }

    async saveMarkdown(content: string): Promise<vscode.Uri> {
        const workspaceFolders = workspace.workspaceFolders;
        if (!workspaceFolders) {
            throw new Error('No workspace folder found');
        }

        // Create output directory if it doesn't exist
        const outputDir = this.config.outputDirectory 
            ? Uri.joinPath(workspaceFolders[0].uri, this.config.outputDirectory)
            : workspaceFolders[0].uri;

        try {
            await workspace.fs.createDirectory(outputDir);
        } catch (error) {
            console.error('Error creating output directory:', error);
            throw new Error('Failed to create output directory');
        }

        const outputPath = Uri.joinPath(
            outputDir,
            this.config.outputFileName || 'CombinedProjectFiles.md'
        );

        // Check if file exists and handle overwrite
        try {
            await workspace.fs.stat(outputPath);
            const overwrite = await vscode.window.showQuickPick(
                ['Yes', 'No'],
                {
                    placeHolder: `${this.config.outputFileName} already exists. Overwrite?`
                }
            );
            if (overwrite !== 'Yes') {
                throw new Error('Operation cancelled by user');
            }
        } catch (error) {
            // File doesn't exist, continue
        }

        // Save the file
        await workspace.fs.writeFile(outputPath, Buffer.from(content));
        return outputPath;
    }
}