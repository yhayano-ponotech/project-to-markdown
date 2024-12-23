export interface IConfig {
    includePattern: string;
    excludePattern: string;
    outputFileName: string;
    outputDirectory: string;
    maxFileSize: number;
    includeFileMetadata: boolean;
    includeTableOfContents: boolean;
    includeSyntaxHighlighting: boolean;
}