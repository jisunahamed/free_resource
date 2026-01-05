-- Clean up
TRUNCATE TABLE "Guide", "LearningPath", "Tool", "Category" RESTART IDENTITY CASCADE;

-- Insert Categories
INSERT INTO "Category" ("id", "name", "slug", "description", "icon", "updatedAt") VALUES
('cat_dev', 'Development', 'development', 'Tools for software development.', 'Code', NOW()),
('cat_design', 'Design', 'design', 'Tools for UI/UX and graphic design.', 'Palette', NOW()),
('cat_prod', 'Productivity', 'productivity', 'Tools to boost your workflow.', 'Zap', NOW());

-- Insert Tools
INSERT INTO "Tool" ("id", "name", "slug", "description", "url", "pricing", "features", "categoryId", "updatedAt") VALUES
('tool_vscode', 'VS Code', 'vs-code', 'Code editing. Redefined.', 'https://code.visualstudio.com/', 'FREE', '["IntelliSense", "Run and Debug", "Built-in Git"]'::jsonb, 'cat_dev', NOW()),
('tool_figma', 'Figma', 'figma', 'The collaborative interface design tool.', 'https://figma.com', 'FREEMIUM', '["Multiplayer", "Vector networks", "Auto Layout"]'::jsonb, 'cat_design', NOW()),
('tool_notion', 'Notion', 'notion', 'All-in-one workspace.', 'https://notion.so', 'FREEMIUM', '["Notes", "Docs", "Wikis", "Projects"]'::jsonb, 'cat_prod', NOW());

-- Insert Learning Path
INSERT INTO "LearningPath" ("id", "title", "slug", "description", "difficulty", "updatedAt") VALUES
('path_webdev', 'Web Development Zero to Hero', 'web-dev-zero-to-hero', 'Master modern web development from scratch.', 'BEGINNER', NOW());

-- Insert Guide
INSERT INTO "Guide" ("id", "title", "slug", "content", "order", "learningPathId", "toolId", "updatedAt") VALUES
('guide_setup', 'Setting up your Environment', 'setting-up-environment', '# Setup\n\nInstall VS Code and Node.js.', 1, 'path_webdev', 'tool_vscode', NOW());
