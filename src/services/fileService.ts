import * as vscode from 'vscode';
import * as path from 'path';
import { workspace, Uri } from 'vscode';
import { IConfig } from './../types/config';
import { isTextFile } from './../types/fileUtils';
import { TextDecoder } from 'util';
import * as glob from 'glob';

export class FileService {
    constructor(private config: IConfig) {}

    async getWorkspaceFiles(): Promise<vscode.Uri[]> {
        if (!workspace.workspaceFolders) {
            throw new Error('No workspace folder is opened');
        }

        const rootPath = workspace.workspaceFolders[0].uri.fsPath;
        
        // Convert glob patterns from config
        const patterns = this.config.includePattern.split(',').map(p => p.trim());
        const ignorePatterns = this.config.excludePattern.split(',').map(p => p.trim());

        // Get all files matching the patterns
        let files: string[] = [];
        for (const pattern of patterns) {
            try {
                const matches = glob.sync(pattern, {
                    cwd: rootPath,
                    ignore: ignorePatterns,
                    absolute: true,
                    nodir: true,
                    dot: false // ignore dotfiles by default
                });
                files = files.concat(matches);
            } catch (error) {
                console.error(`Error processing pattern ${pattern}:`, error);
                continue;
            }
        }

        // Remove duplicates
        files = [...new Set(files)];

        // Convert to URIs and apply filters
        const validFiles: vscode.Uri[] = [];
        for (const file of files) {
            const uri = vscode.Uri.file(file);
            try {
                // Check file size
                const stat = await workspace.fs.stat(uri);
                if (stat.size > this.config.maxFileSize) {
                    console.warn(`Skipping ${file}: File too large (${stat.size} bytes)`);
                    continue;
                }

                // Check if it's a text file
                if (!await isTextFile(uri)) {
                    console.warn(`Skipping ${file}: Not a text file`);
                    continue;
                }

                validFiles.push(uri);
            } catch (error) {
                console.error(`Error processing file ${file}:`, error);
                continue;
            }
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