import * as vscode from 'vscode';
import { exportToMarkdown } from './commands/exportToMarkdown';

export function activate(context: vscode.ExtensionContext) {
    // Register the command
    let disposable = vscode.commands.registerCommand('project-to-markdown.export', exportToMarkdown);
    context.subscriptions.push(disposable);

    // Show welcome message on first activation
    const config = vscode.workspace.getConfiguration('projectToMarkdown');
    const hasShownWelcome = config.get<boolean>('hasShownWelcome');
    if (!hasShownWelcome) {
        vscode.window.showInformationMessage('Project To Markdown is now active! Use the command palette (Ctrl/Cmd+Shift+P) and type "Export Project to Markdown" to get started.');
        config.update('hasShownWelcome', true, true);
    }
}

export function deactivate() {
    // Clean up resources
}