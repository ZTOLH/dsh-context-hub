import { apply as applyPromptManager } from './prompt-manager.js';
import { apply as applyResourceLibrary } from './resource-library.js';

const PACKAGE_ID = 'dsh-context-hub';

export const name = PACKAGE_ID;
export const inject = ['webServer', 'systemPrompt'];

export function apply(ctx, config) {
  // Keep the two feature stores and API contracts independent while giving
  // them one plugin lifecycle and one user-facing Client entry.
  applyResourceLibrary(ctx, config?.resourceLibrary);
  applyPromptManager(ctx, config?.promptManager);
}
